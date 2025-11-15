// src/contexts/WalletContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import algosdk from "algosdk";

type ProviderName = "AlgoSigner" | "MyAlgo" | null;

type WalletContextType = {
  address: string | null;
  provider: ProviderName;
  connecting: boolean;
  connectWithAlgoSigner: () => Promise<void>;
  connectWithMyAlgo: () => Promise<void>;
  disconnect: () => void;
  signAndSendRawTx?: (rawTxn: Uint8Array) => Promise<string>; // optional helper for later
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ProviderName>(null);
  const [connecting, setConnecting] = useState(false);

  // Restore from storage
  useEffect(() => {
    const a = localStorage.getItem("csm_wallet_address");
    const p = localStorage.getItem("csm_wallet_provider") as ProviderName | null;
    if (a) setAddress(a);
    if (p) setProvider(p);
  }, []);

  // AlgoSigner connect
  const connectWithAlgoSigner = useCallback(async () => {
    if (typeof (window as any).AlgoSigner === "undefined") {
      throw new Error("AlgoSigner not available");
    }
    setConnecting(true);
    try {
      await (window as any).AlgoSigner.connect();
      // Request accounts for TestNet (or MainNet if you want)
      const accts = await (window as any).AlgoSigner.accounts({ ledger: "TestNet" });
      if (!accts || accts.length === 0) throw new Error("No accounts returned by AlgoSigner");
      const addr = accts[0].address;
      setAddress(addr);
      setProvider("AlgoSigner");
      localStorage.setItem("csm_wallet_address", addr);
      localStorage.setItem("csm_wallet_provider", "AlgoSigner");
    } finally {
      setConnecting(false);
    }
  }, []);

  // MyAlgo connect
  const connectWithMyAlgo = useCallback(async () => {
    setConnecting(true);
    try {
      // dynamic import so project still builds if not installed
      const MyAlgoModule = await import("@randlabs/myalgo-connect").catch(() => null);
      if (!MyAlgoModule) throw new Error("MyAlgoConnect package not installed. Run npm install @randlabs/myalgo-connect");
      const MyAlgoConnect = (MyAlgoModule as any).default || MyAlgoModule;
      const myAlgo = new MyAlgoConnect();
      const accts = await myAlgo.connect();
      if (!accts || accts.length === 0) throw new Error("MyAlgo returned no accounts");
      const addr = accts[0].address;
      setAddress(addr);
      setProvider("MyAlgo");
      localStorage.setItem("csm_wallet_address", addr);
      localStorage.setItem("csm_wallet_provider", "MyAlgo");
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setProvider(null);
    localStorage.removeItem("csm_wallet_address");
    localStorage.removeItem("csm_wallet_provider");
  }, []);

  // helper: sign & send raw tx (works for AlgoSigner & MyAlgo when available)
  const signAndSendRawTx = useCallback(async (rawTxn: Uint8Array) => {
    // suggested: caller builds the unsigned tx bytes (algosdk encodeUnsignedTransaction)
    if (provider === "AlgoSigner") {
      // AlgoSigner signs base64 strings
      const b64 = Buffer.from(rawTxn).toString("base64");
      const signed = await (window as any).AlgoSigner.signTxn([{ txn: b64 }]);
      const blob = signed?.[0]?.blob;
      if (!blob) throw new Error("AlgoSigner did not return signed blob");
      const signedBytes = new Uint8Array(Buffer.from(blob, "base64"));
      const algod = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const resp: any = await algod.sendRawTransaction(signedBytes).do();
      return resp.txId || resp.txID || JSON.stringify(resp);
    } else if (provider === "MyAlgo") {
      // use MyAlgoConnect signTransaction
      const MyAlgoModule = await import("@randlabs/myalgo-connect").catch(() => null);
      if (!MyAlgoModule) throw new Error("MyAlgoConnect not available");
      const MyAlgoConnect = (MyAlgoModule as any).default || MyAlgoModule;
      const myAlgo = new MyAlgoConnect();
      const signed = await myAlgo.signTransaction(rawTxn);
      // signed may include blob or raw bytes
      const blob = signed?.blob || signed;
      const signedBytes = blob instanceof Uint8Array ? blob : new Uint8Array(Buffer.from(blob, "base64"));
      const algod = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const resp: any = await algod.sendRawTransaction(signedBytes).do();
      return resp.txId || resp.txID || JSON.stringify(resp);
    } else {
      throw new Error("No wallet provider connected");
    }
  }, [provider]);

  const ctx: WalletContextType = {
    address,
    provider,
    connecting,
    connectWithAlgoSigner,
    connectWithMyAlgo,
    disconnect,
    signAndSendRawTx,
  };

  return <WalletContext.Provider value={ctx}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
