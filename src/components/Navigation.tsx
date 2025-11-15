import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Lock } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const navItems = [
    { label: "Try Platform", href: "/platform" },
    { label: "Algorithms", href: "/algorithms" },
    { label: "History", href: "/history" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-radius-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors">
            <Lock className="w-5 h-5 text-primary" />
            <span>CSM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isWalletConnected && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleConnectWallet}
              variant={isWalletConnected ? "secondary" : "default"}
              className="font-semibold"
            >
              {isWalletConnected ? "Disconnect Wallet" : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {isWalletConnected && (
              <div className="flex flex-col gap-4 mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <Button
              onClick={handleConnectWallet}
              variant={isWalletConnected ? "secondary" : "default"}
              className="w-full font-semibold"
            >
              {isWalletConnected ? "Disconnect Wallet" : "Connect Wallet"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
