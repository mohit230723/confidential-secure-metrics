"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Lock } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Try Platform", href: "/platform" },
    { label: "Algorithms", href: "/algorithms" },
    { label: "History", href: "/history" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-12 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-teal-600">
            <Lock className="w-8 h-8" />
            <span>FHE Analytics</span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/platform"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-medium text-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/platform"
              className="block mx-4 mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
