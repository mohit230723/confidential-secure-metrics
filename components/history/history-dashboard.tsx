"use client"

import { useState } from "react"
import { AnalysisCard } from "./analysis-card"
import { Plus } from "lucide-react"

const mockAnalyses = [
  {
    id: "A47F3",
    icon: "🏥",
    title: "Healthcare Analysis",
    date: "Oct 25, 2025 11:42 AM",
    algorithm: "Logistic Regression - Disease Risk Prediction",
    records: 15,
    time: 8.3,
    result: "High Risk (Score: 0.87)",
    confidence: 94,
  },
  {
    id: "B23K9",
    icon: "💰",
    title: "Finance Analysis",
    date: "Oct 24, 2025 3:15 PM",
    algorithm: "XGBoost - Credit Scoring",
    records: 42,
    time: 12.1,
    result: "23 High Risk, 19 Low Risk",
    confidence: 91,
  },
  {
    id: "S82H1",
    icon: "📦",
    title: "Supply Chain Analysis",
    date: "Oct 24, 2025 9:20 AM",
    algorithm: "LSTM - Demand Forecasting",
    records: 156,
    time: 45.2,
    result: "+23% demand increase predicted",
    confidence: 88,
  },
]

export function HistoryDashboard() {
  const [timePeriod, setTimePeriod] = useState("24h")
  const [sector, setSector] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Analytics History</h1>
          <p className="text-gray-600">View and manage your past analyses</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 font-medium">
          <Plus className="w-5 h-5" />
          New Analysis
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="3m">Last 3 Months</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Sectors</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="supply-chain">Supply Chain</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">
              Apply Filters
            </button>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === "grid" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === "timeline" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Timeline
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Analyses</p>
          <p className="text-3xl font-bold text-gray-900">47</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">This Week</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">Avg Process Time</p>
          <p className="text-3xl font-bold text-gray-900">8.3s</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">Most Used</p>
          <p className="text-lg font-bold text-gray-900">Logistic Reg</p>
        </div>
      </div>

      {/* Analysis Cards */}
      {viewMode === "grid" ? (
        <div className="space-y-4">
          {mockAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="border-l-4 border-teal-600 pl-6 pb-6">
              <p className="font-bold text-gray-900">Oct 25, 2025</p>
              <p className="text-sm text-gray-600 mb-2">11:42 AM - 🏥 Healthcare #A47F3 (High Risk)</p>
            </div>
            <div className="border-l-4 border-teal-600 pl-6 pb-6">
              <p className="font-bold text-gray-900">Oct 24, 2025</p>
              <p className="text-sm text-gray-600 mb-2">3:15 PM - 💰 Finance #B23K9 (23 high risk)</p>
            </div>
            <div className="border-l-4 border-teal-600 pl-6">
              <p className="font-bold text-gray-900">Oct 24, 2025</p>
              <p className="text-sm text-gray-600 mb-2">9:20 AM - 📦 Supply Chain #S82H1 (Optimized)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
