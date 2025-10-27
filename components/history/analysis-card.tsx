"use client"

import { MoreVertical, Eye, RefreshCw, Trash2 } from "lucide-react"
import { useState } from "react"

export function AnalysisCard({ analysis }: any) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <span className="text-3xl">{analysis.icon}</span>
          <div>
            <h3 className="font-bold text-gray-900">
              {analysis.title} #{analysis.id}
            </h3>
            <p className="text-sm text-gray-600">{analysis.date}</p>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Full Report
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Re-run Analysis
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-600 font-medium">Algorithm</p>
          <p className="text-gray-900">{analysis.algorithm}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Records</p>
          <p className="text-gray-900">{analysis.records}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Time</p>
          <p className="text-gray-900">{analysis.time}s</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Confidence</p>
          <p className="text-gray-900">{analysis.confidence}%</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Result:</span> {analysis.result}
        </p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm">
          View Full Report
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
          Re-run
        </button>
      </div>
    </div>
  )
}
