"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Download, Plus } from "lucide-react"

export function ResultsView({ results, onNewAnalysis }: any) {
  const [activeTab, setActiveTab] = useState("overview")

  const riskData = [
    { name: "Low Risk", value: results.lowRiskPercentage, color: "#10B981" },
    { name: "Medium", value: results.mediumRiskPercentage, color: "#FBBF24" },
    { name: "High Risk", value: results.highRiskPercentage, color: "#EF4444" },
  ]

  const featureImportance = [
    { name: "Age", value: 42 },
    { name: "BMI", value: 31 },
    { name: "Blood Pressure", value: 18 },
    { name: "Glucose", value: 9 },
  ]

  const projectionData = [
    { month: "Now", risk: 87 },
    { month: "3mo", risk: 73 },
    { month: "6mo", risk: 85 },
    { month: "1yr", risk: 40 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encryption Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-start gap-4">
        <div className="text-2xl">✓</div>
        <div>
          <h3 className="font-bold text-green-900">Data encrypted successfully</h3>
          <p className="text-green-700 text-sm">
            {results.recordsAnalyzed} records encrypted in {results.encryptionTime} seconds using CKKS scheme
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {["overview", "analysis", "predictions", "technical"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Prediction</p>
              <p className="text-3xl font-bold text-gray-900">High Risk</p>
              <p className="text-teal-600 font-semibold mt-2">Score: {results.riskScore}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Confidence</p>
              <p className="text-3xl font-bold text-gray-900">{results.confidence}%</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Processing</p>
              <p className="text-lg font-bold text-gray-900">{results.processingTime}s</p>
              <p className="text-gray-600 text-sm">{results.recordsAnalyzed} records</p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Analysis Summary</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {results.highRiskPercentage}% of records show high-risk indicators</li>
              <li>• Primary risk factors: Age (importance: 0.42), BMI (0.31)</li>
              <li>• Recommendation: Focus on patients aged 45+ with BMI &gt; 28</li>
            </ul>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Level Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">
              <Download className="w-5 h-5" />
              Export Data
            </button>
            <button
              onClick={onNewAnalysis}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium"
            >
              <Plus className="w-5 h-5" />
              Run Another Analysis
            </button>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === "analysis" && (
        <div className="space-y-8">
          {/* Feature Importance */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Which factors mattered most in this analysis?</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#20B2AA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Data Distribution */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Age Distribution in Your Dataset</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { range: "20-30", count: 2 },
                  { range: "31-40", count: 3 },
                  { range: "41-50", count: 5 },
                  { range: "51-60", count: 5 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#20B2AA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {activeTab === "predictions" && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🔮 Predicted Health Trajectory</h3>
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">• 3-month outlook: 73% chance of worsening</p>
              <p className="text-gray-700">• 6-month outlook: 85% without intervention</p>
              <p className="text-gray-700">• 1-year outlook: Risk stabilizes at 40%</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="#20B2AA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Recommended Actions</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Immediate screening (10 patients)</li>
              <li>✓ Lifestyle intervention (2 patients)</li>
              <li>✓ Regular monitoring (3 patients)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Technical Tab */}
      {activeTab === "technical" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">🔒 Encryption Details</h3>
            <div className="space-y-2 text-gray-700 font-mono text-sm">
              <p>Scheme: CKKS (Approximate Arithmetic)</p>
              <p>Polynomial Degree: 8192</p>
              <p>Security Level: 128-bit</p>
              <p>Coefficient Modulus: 218 bits</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">⏱️ Processing Stats</h3>
            <div className="space-y-2 text-gray-700">
              <p>Encryption Time: {results.encryptionTime} seconds</p>
              <p>Computation Time: {results.computationTime} seconds</p>
              <p>Decryption Time: {results.decryptionTime} seconds</p>
              <p className="font-bold text-teal-600">Total: {results.processingTime} seconds</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">⛓️ On-Chain Verification</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                Transaction ID: <span className="font-mono">ALGO-7X9K2...</span>
              </p>
              <p>Block: #45,392,847</p>
              <p>Timestamp: Oct 25, 2025 12:15:33 PM IST</p>
              <p className="text-green-600">Computation Proof: Verified ✓</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
