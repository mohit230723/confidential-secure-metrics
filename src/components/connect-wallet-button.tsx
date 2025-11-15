// connect-wallet-button.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConnectWalletModal from "./connect-wallet-modal";

declare global {
  interface Window {
    currentConnectedAddress: string | null;
  }
}

/**
 * Connect button wired with Pera + AlgoSigner + MyAlgo.
 * - Persists address in localStorage key 'csm_connected_address'
 * - Dispatches 'csm_wallet_changed' event on connect/disconnect
 *
 * Requires:
 *   npm install @perawallet/connect
 * optional:
 *   npm install @randlabs/myalgo-connect
 */

export default function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<"Pera" | "AlgoSigner" | "MyAlgo" | null>(null);
  const [connecting, setConnecting] = useState(false);

  // detection state for modal hints (not strictly required)
  const [available, setAvailable] = useState({ pera: true, algoSigner: false, myAlgo: false });

  useEffect(() => {
    // detect AlgoSigner
    const hasAlgoSigner = typeof (window as any).AlgoSigner !== "undefined";
    // detect MyAlgo global variable (rare), but we'll rely on dynamic import
    const hasMyAlgoGlobal = typeof (window as any).MyAlgoConnect !== "undefined";
    setAvailable((s) => ({ ...s, algoSigner: hasAlgoSigner, myAlgo: hasMyAlgoGlobal }));

    const saved = window.localStorage.getItem("csm_connected_address");
    if (saved) {
      setAddress(saved);
      setProvider((window.localStorage.getItem("csm_connected_provider") as any) || null);
      window.currentConnectedAddress = saved;
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "csm_connected_address") {
        setAddress(e.newValue);
        window.currentConnectedAddress = e.newValue;
      }
    };
    const onCustom = () => {
      const cur = (window as any).currentConnectedAddress || window.localStorage.getItem("csm_connected_address") || null;
      setAddress(cur);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("csm_wallet_changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("csm_wallet_changed", onCustom);
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ----------------------------
  // Pera Wallet connection
  // ----------------------------
  async function connectPera() {
    setConnecting(true);
    try {
      const PeraModule = await import("@perawallet/connect").catch(() => null);
      if (!PeraModule) {
        alert("Pera SDK not installed. Run: npm install @perawallet/connect");
        return;
      }
      const PeraWalletConnect = (PeraModule as any).default || PeraModule.PeraWalletConnect || PeraModule;
      // create instance
      const peraWallet = new PeraWalletConnect({
        chainId: "testnet", // use "testnet" for testnet deep-link
      });

      // peraWallet.connect() opens a deep-link / extension flow and returns accounts
      const connectResult = await peraWallet.connect();
      // connectResult usually returns an array of addresses
      const accounts = connectResult || (await peraWallet.reconnectSession()).accounts || [];
      if (!accounts || accounts.length === 0) {
        // some flows give session object with activeAccounts property
        // try fallback
        const session = (peraWallet as any).activeAccount || (peraWallet as any).session || {};
        const fallback = session?.activeAccount ? [session.activeAccount] : [];
        if (fallback.length === 0) {
          alert("Pera connected but no accounts returned");
          return;
        }
        const addr = fallback[0];
        setAddress(addr);
        setProvider("Pera");
        window.currentConnectedAddress = addr;
        window.localStorage.setItem("csm_connected_address", addr);
        window.localStorage.setItem("csm_connected_provider", "Pera");
        window.dispatchEvent(new Event("csm_wallet_changed"));
        closeModal();
        return;
      }

      const addr = Array.isArray(accounts) ? accounts[0] : accounts;
      setAddress(addr);
      setProvider("Pera");
      window.currentConnectedAddress = addr;
      window.localStorage.setItem("csm_connected_address", addr);
      window.localStorage.setItem("csm_connected_provider", "Pera");
      window.dispatchEvent(new Event("csm_wallet_changed"));
      closeModal();
    } catch (err: any) {
      console.error("Pera connect error:", err);
      alert("Pera connect failed: " + (err?.message || err));
    } finally {
      setConnecting(false);
    }
  }

  // ----------------------------
  // AlgoSigner connection
  // ----------------------------
  async function connectAlgoSigner() {
    if (typeof (window as any).AlgoSigner === "undefined") {
      alert("AlgoSigner extension not detected. Install AlgoSigner extension and switch to TestNet.");
      return;
    }
    try {
      setConnecting(true);
      await (window as any).AlgoSigner.connect();
      const accts = await (window as any).AlgoSigner.accounts({ ledger: "TestNet" });
      if (!accts || accts.length === 0) {
        alert("AlgoSigner connected but returned no accounts. Ensure TestNet is selected in AlgoSigner.");
        return;
      }
      const addr = accts[0].address;
      setAddress(addr);
      setProvider("AlgoSigner");
      window.currentConnectedAddress = addr;
      window.localStorage.setItem("csm_connected_address", addr);
      window.localStorage.setItem("csm_connected_provider", "AlgoSigner");
      window.dispatchEvent(new Event("csm_wallet_changed"));
      closeModal();
    } catch (err: any) {
      console.error("AlgoSigner connect error:", err);
      alert("AlgoSigner connect failed: " + (err?.message || err));
    } finally {
      setConnecting(false);
    }
  }

  // ----------------------------
  // MyAlgo connect (optional)
  // ----------------------------
  async function connectMyAlgo() {
    try {
      setConnecting(true);
      const MyAlgoModule = await import("@randlabs/myalgo-connect").catch(() => null);
      if (!MyAlgoModule) {
        alert("MyAlgoConnect package not installed. Run: npm install @randlabs/myalgo-connect");
        return;
      }
      const MyAlgoConnect = (MyAlgoModule as any).default || MyAlgoModule;
      const myAlgo = new MyAlgoConnect();
      const accts = await myAlgo.connect();
      if (!accts || accts.length === 0) {
        alert("MyAlgo returned no accounts");
        return;
      }
      const addr = accts[0].address;
      setAddress(addr);
      setProvider("MyAlgo");
      window.currentConnectedAddress = addr;
      window.localStorage.setItem("csm_connected_address", addr);
      window.localStorage.setItem("csm_connected_provider", "MyAlgo");
      window.dispatchEvent(new Event("csm_wallet_changed"));
      closeModal();
    } catch (err: any) {
      console.error("MyAlgo connect error:", err);
      alert("MyAlgo connect failed: " + (err?.message || err));
    } finally {
      setConnecting(false);
    }
  }

  function disconnect() {
    setAddress(null);
    setProvider(null);
    window.currentConnectedAddress = null;
    window.localStorage.removeItem("csm_connected_address");
    window.localStorage.removeItem("csm_connected_provider");
    window.dispatchEvent(new Event("csm_wallet_changed"));
  }

  return (
    <>
      <Button onClick={openModal} className="bg-white hover:bg-white/90 text-black">
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
      </Button>

      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        available={available}
        connected={{ address, provider }}
        connecting={connecting}
        onConnectPera={connectPera}
        onConnectAlgoSigner={connectAlgoSigner}
        onConnectMyAlgo={connectMyAlgo}
        onDisconnect={disconnect}
      />
    </>
  );
}
