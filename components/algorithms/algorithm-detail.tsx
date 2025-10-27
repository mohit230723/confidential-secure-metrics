"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function AlgorithmDetail({ algorithm, onBack }: any) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-8">
        <ArrowLeft className="w-5 h-5" />
        Back to Algorithms
      </button>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{algorithm.name}</h1>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
            {algorithm.useCase}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            Supervised Learning
          </span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* What It Does */}
        <section className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What It Does</h2>
          <p className="text-gray-700 text-lg">{algorithm.description}</p>
        </section>

        {/* When to Use */}
        <section className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Use This Algorithm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-green-600 mb-4">✅ Good for:</h3>
              <ul className="space-y-2">
                {algorithm.whenToUse.good.map((item: string) => (
                  <li key={item} className="text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-4">❌ Not ideal for:</h3>
              <ul className="space-y-2">
                {algorithm.whenToUse.notGood.map((item: string) => (
                  <li key={item} className="text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-semibold mb-2">Speed</p>
              <p className="text-2xl font-bold text-teal-600">{algorithm.speedTime}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-semibold mb-2">Accuracy</p>
              <p className="text-2xl font-bold text-teal-600">{algorithm.accuracy}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-semibold mb-2">Best For</p>
              <p className="text-lg font-bold text-teal-600">{algorithm.bestFor}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 border-2 border-teal-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Try This Algorithm?</h3>
          <Link
            href="/platform"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-semibold transition-colors"
          >
            Use Sample Data
          </Link>
        </div>
      </div>
    </div>
  )
}
