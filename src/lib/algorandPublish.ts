// src/lib/algorandPublish.ts
// Standalone helper to publish ciphertext (base64 string) to Algorand TestNet using Pera Wallet.
// Returns: { txId: string } on success, throws Error on failure.

export async function publishCiphertextWithPera(ciphertextB64: string): Promise<{ txId: string }> {
  if (!ciphertextB64) throw new Error("ciphertext missing");

  // dynamic imports so bundler doesn't choke if packages are absent
  const peramod = await import("@perawallet/connect").catch(() => null);
  if (!peramod) throw new Error("Missing @perawallet/connect. Run: npm install @perawallet/connect");

  const algosdk = await import("algosdk").catch(() => null);
  if (!algosdk) throw new Error("Missing algosdk. Run: npm install algosdk");

  const { PeraWalletConnect } = peramod as any;
  const { Algodv2, makePaymentTxnWithSuggestedParamsFromObject, encodeUnsignedTransaction } = algosdk as any;

  // create pera instance (testnet)
  const pera = new PeraWalletConnect({ chainId: 416002 }); // TestNet chain id used by many pera configs

  // try reconnect session first (silent)
  let accounts: string[] = [];
  try {
    const maybe = await pera.reconnectSession();
    // reconnectSession may return account array or session object; handle both
    if (Array.isArray(maybe)) accounts = maybe;
    else if (maybe?.accounts) accounts = maybe.accounts;
  } catch (e) {
    // ignore reconnect errors
  }

  // if not connected, prompt user
  if (!accounts || accounts.length === 0) {
    try {
      const result = await pera.connect();
      // connect() often returns an array of addresses
      if (Array.isArray(result)) accounts = result;
      else if (result?.accounts) accounts = result.accounts;
    } catch (err: any) {
      // user likely closed modal or rejected
      throw new Error("Pera connect failed: " + (err?.message || String(err)));
    }
  }

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts returned from Pera Wallet");
  }

  const from = accounts[0];

  // algod client (public TestNet node)
  // ------------------- THIS IS THE FIX -------------------
  // We use algonode.cloud, which has the correct CORS headers for browser dapps
  const algodClient = new Algodv2("", "https://testnet-api.algonode.cloud", "");
  // -------------------------------------------------------

  // suggested params
  const sp = await algodClient.getTransactionParams().do();

  const noteBytes = new TextEncoder().encode(ciphertextB64);

  const txn = makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to: from,
    amount: 0,
    note: noteBytes,
    suggestedParams: sp,
  });

  // Pera expects an array of "SignerTransaction" objects for signTransaction
  // but @perawallet/connect signTransaction API varies. We'll use signTransaction with base64 encoded txn.
  // Build an unsigned tx group as expected by some Pera versions:
  const unsignedTxn = {
    txn: encodeUnsignedTransaction(txn).toString("base64"),
    signers: [from],
  };

  // sign via pera
  let signedResult: any;
  try {
    // newer pera has pera.signTransaction(txns) where txns is array of { txn: base64, signers: [] }
    signedResult = await pera.signTransaction([unsignedTxn]);
  } catch (err: any) {
    // some versions return different structure; attempt alternative call
    try {
      signedResult = await pera.signTransaction([txn]);
    } catch (err2: any) {
      throw new Error("Pera signing failed: " + (err?.message || err2?.message || String(err)));
    }
  }

  // signedResult should be an array of base64 blobs (or objects with 'blob')
  // Normalize to Uint8Array
  let signedBytes: Uint8Array | null = null;
  if (Array.isArray(signedResult) && signedResult.length > 0) {
    const first = signedResult[0];
    if (first && first.blob) {
      signedBytes = Uint8Array.from(atob(first.blob), c => c.charCodeAt(0));
    } else if (typeof first === "string") {
      // base64 string
      signedBytes = Uint8Array.from(atob(first), c => c.charCodeAt(0));
    } else if (first?.signedTx) {
      // some connectors return { signedTx: base64 }
      signedBytes = Uint8Array.from(atob(first.signedTx), c => c.charCodeAt(0));
    }
  } else if (signedResult && signedResult.blob) {
    signedBytes = Uint8Array.from(atob(signedResult.blob), c => c.charCodeAt(0));
  }

  if (!signedBytes) {
    throw new Error("Unable to parse signed transaction result from Pera");
  }

  // submit
  const sendRes = await algodClient.sendRawTransaction(signedBytes).do();
  const txId = sendRes?.txId || sendRes?.txID || sendRes?.txid || sendRes?.txid;

  if (!txId) throw new Error("Algod sendRawTransaction returned no txid: " + JSON.stringify(sendRes));

  return { txId };
}