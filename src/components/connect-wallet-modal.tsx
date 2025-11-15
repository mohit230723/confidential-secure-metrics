// connect-wallet-modal.tsx
"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  available: {
    pera?: boolean;
    algoSigner: boolean;
    myAlgo: boolean;
  };
  connected: { address: string | null; provider: "Pera" | "AlgoSigner" | "MyAlgo" | null };
  connecting: boolean;
  onConnectPera: () => Promise<void>;
  onConnectAlgoSigner: () => Promise<void>;
  onConnectMyAlgo: () => Promise<void>;
  onDisconnect: () => void;
};

export default function ConnectWalletModal(props: Props) {
  const {
    isOpen,
    onClose,
    available,
    connected,
    connecting,
    onConnectPera,
    onConnectAlgoSigner,
    onConnectMyAlgo,
    onDisconnect,
  } = props;

  useEffect(() => {
    // prevent body scroll while modal open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Connect Wallet</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Pera Wallet */}
          <div
            className={`flex justify-between items-center p-3 rounded border ${
              available.pera ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div>
              <div className="font-medium">Pera Wallet (mobile / extension)</div>
              <div className="text-xs text-muted-foreground">{available.pera ? "Available" : "Will open mobile/extension flow"}</div>
            </div>
            <div>
              {connected.provider === "Pera" ? (
                <button className="px-3 py-1 rounded border" onClick={onDisconnect}>
                  Disconnect
                </button>
              ) : (
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                  onClick={onConnectPera}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect"}
                </button>
              )}
            </div>
          </div>

          {/* AlgoSigner */}
          <div
            className={`flex justify-between items-center p-3 rounded border ${
              available.algoSigner ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div>
              <div className="font-medium">AlgoSigner (browser extension)</div>
              <div className="text-xs text-muted-foreground">{available.algoSigner ? "Detected" : "Not detected"}</div>
            </div>
            <div>
              {connected.provider === "AlgoSigner" ? (
                <button className="px-3 py-1 rounded border" onClick={onDisconnect}>
                  Disconnect
                </button>
              ) : (
                <button
                  className="px-3 py-1 rounded bg-green-600 text-white"
                  onClick={onConnectAlgoSigner}
                  disabled={!available.algoSigner || connecting}
                >
                  {connecting ? "Connecting..." : "Connect"}
                </button>
              )}
            </div>
          </div>

          {/* MyAlgo */}
          <div className="flex justify-between items-center p-3 rounded border border-gray-200 bg-gray-50">
            <div>
              <div className="font-medium">MyAlgo (wallet via package)</div>
              <div className="text-xs text-muted-foreground">Requires package: npm install @randlabs/myalgo-connect</div>
            </div>
            <div>
              {connected.provider === "MyAlgo" ? (
                <button className="px-3 py-1 rounded border" onClick={onDisconnect}>
                  Disconnect
                </button>
              ) : (
                <button
                  className="px-3 py-1 rounded bg-green-600 text-white"
                  onClick={onConnectMyAlgo}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect"}
                </button>
              )}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            If none are available, install AlgoSigner extension or run <code>npm install @perawallet/connect @randlabs/myalgo-connect</code>.
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-1 rounded border" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
