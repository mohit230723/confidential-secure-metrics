"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const section = sectionRef.current
    section?.addEventListener("mousemove", handleMouseMove)
    return () => section?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(32, 178, 170, 0.15), transparent 80%), linear-gradient(to bottom right, rgb(249, 250, 251), rgb(255, 255, 255))`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Unlock Insights from Encrypted Data—Without Ever Exposing It
            </h1>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Privacy-first analytics using Fully Homomorphic Encryption on Algorand
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/platform"
                className="bg-teal-600 text-white px-10 py-4 rounded-lg hover:bg-teal-700 font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
              >
                Try Demo
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/how-it-works"
                className="border-2 border-teal-600 text-teal-600 px-10 py-4 rounded-lg hover:bg-teal-50 font-medium text-lg transition-colors"
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-12 border border-gray-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="text-base font-semibold text-gray-600">Raw Data</div>
                  <div className="text-5xl font-bold text-gray-900 mt-3">📊</div>
                </div>
                <div className="text-teal-600 font-bold text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="text-base font-semibold text-gray-600">Encrypted</div>
                  <div className="text-5xl font-bold text-gray-900 mt-3">🔒</div>
                </div>
                <div className="text-teal-600 font-bold text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="text-base font-semibold text-gray-600">Computing</div>
                  <div className="text-5xl font-bold text-gray-900 mt-3">⚙️</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="text-base font-semibold text-gray-600">Results</div>
                  <div className="text-5xl font-bold text-gray-900 mt-3">📈</div>
                </div>
                <div className="text-teal-600 font-bold text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="text-base font-semibold text-gray-600">Decrypted</div>
                  <div className="text-5xl font-bold text-gray-900 mt-3">🔓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
