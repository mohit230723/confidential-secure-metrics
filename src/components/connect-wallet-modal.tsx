// connect-wallet-modal.tsx
"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { type Wallet, useWallet } from "@txnlab/use-wallet-react";
import { toast } from "react-toastify";

/**
 * Portal-based ConnectWalletModal
 * - Appends modal to document.body (portal) so it is not constrained by parent layout.
 * - Centers vertically & horizontally; allows scrolling on small viewports.
 * - Keeps previous styling and wallet logic.
 */

export default function ConnectWalletModal({
  wallets = [],
  isOpen = false,
  onClose = () => {},
}: {
  wallets?: Wallet[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeAccount } = useWallet();

  // Prevent background scroll while modal open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWalletClick = async (wallet: Wallet) => {
    try {
      if (wallet.isConnected) {
        if (wallet.setActive) {
          await wallet.setActive();
        } else {
          await wallet.connect();
        }
        toast.success("Wallet set as active");
      } else {
        await wallet.connect();
        if (wallet.setActive) {
          await wallet.setActive();
        }
        toast.success("Wallet connected successfully");
      }
      onClose();
    } catch (error: any) {
      console.error("Wallet connect error:", error);
      toast.error("Failed to connect wallet: " + (error?.message || String(error)));
    }
  };

  const disconnectWallets = async () => {
    try {
      for (const wallet of wallets) {
        if (wallet.isConnected && wallet.disconnect) {
          await wallet.disconnect();
        }
      }
      toast.success("Disconnected from all wallets");
      onClose();
    } catch (error: any) {
      console.error("Wallet disconnect error:", error);
      toast.error("Failed to disconnect wallets: " + (error?.message || String(error)));
    }
  };

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all
                   max-h-[calc(100vh-4rem)] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Connect to a wallet</h3>
            <p className="text-sm text-gray-500 mt-1">Choose your preferred Algorand wallet to continue</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-4 inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wallet list */}
        <div className="space-y-3">
          {Array.isArray(wallets) && wallets.length > 0 ? (
            wallets.map((wallet) => {
              const name = wallet.metadata?.name || wallet.id || "Wallet";
              const icon = wallet.metadata?.icon;
              const desc = "";
              const isConnected = !!wallet.isConnected;
              const activeAddr = wallet.activeAccount?.address;

              return (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletClick(wallet)}
                  className={`w-full flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-white shadow-md border border-transparent hover:shadow-lg transition-shadow focus:outline-none`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{name}</span>
                      <span className="text-xs text-gray-500">
                        {activeAddr ? `${activeAddr.slice(0, 6)}...${activeAddr.slice(-4)}` : desc}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isConnected && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-100">
                        Connected
                      </span>
                    )}

                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-50 border border-gray-100">
                      {icon ? (
                        <img src={icon} alt={`${name} icon`} className="w-6 h-6 object-contain" />
                      ) : (
                        <div className="w-6 h-6 text-gray-500 flex items-center justify-center">{name?.charAt(0)}</div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-center text-sm text-gray-500">
              No wallet connectors available. Make sure your wallet provider is configured.
            </div>
          )}
        </div>

        {/* Disconnect row */}
        {activeAccount && (
          <div className="mt-5">
            <button
              onClick={disconnectWallets}
              className="w-full px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 transition"
            >
              Disconnect {activeAccount && `[${activeAccount.address.slice(0, 6)}...${activeAccount.address.slice(-4)}]`}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            New to Algorand?{" "}
            <a
              href="https://algorand.com/wallets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Learn more about wallets
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
