"use client"

import { ArrowRight } from "lucide-react"

export function AlgorithmCard({ algorithm, onLearnMore }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{algorithm.name}</h3>
      <p className="text-sm text-teal-600 font-semibold mb-4">{algorithm.useCase}</p>

      <div className="space-y-3 mb-6">
        <div>
          <p className="text-xs text-gray-600 font-semibold">Use Cases:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {algorithm.useCases.slice(0, 3).map((useCase: string) => (
              <li key={useCase}>• {useCase}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 font-semibold">⚡ Speed</p>
            <p className="text-gray-700">{algorithm.speed}</p>
            <p className="text-xs text-gray-500">{algorithm.speedTime}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">🎯 Accuracy</p>
            <p className="text-gray-700">{algorithm.accuracy}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onLearnMore}
        className="w-full flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-semibold group"
      >
        Learn More
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}
