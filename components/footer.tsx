import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/platform" className="hover:text-teal-400">
                  Try Demo
                </Link>
              </li>
              <li>
                <Link href="/algorithms" className="hover:text-teal-400">
                  Algorithms
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-teal-400">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-400">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-teal-400">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Team CSM
                </a>
              </li>
              <li>
                <a href="mailto:contact@fheanalytics.com" className="hover:text-teal-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8 border-t border-gray-700 pt-8">
          <a href="#" className="hover:text-teal-400">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-teal-400">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-teal-400">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-teal-400">
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-8">
          <p>&copy; 2025 FHE Analytics. All rights reserved. Built with privacy-first principles.</p>
        </div>
      </div>
    </footer>
  )
}
