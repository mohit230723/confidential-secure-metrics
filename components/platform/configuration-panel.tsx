"use client"

import { useState } from "react"
import { ChevronDown, Loader } from "lucide-react"

const algorithmsBySetor = {
  healthcare: [
    {
      id: "logistic-regression",
      name: "Logistic Regression",
      useCase: "Disease Risk Prediction",
      speed: "Fast (2-5 sec)",
      accuracy: "85-92%",
      description: "Predicts whether a patient will develop a disease based on health metrics.",
    },
    {
      id: "random-forest",
      name: "Random Forest",
      useCase: "Multi-Disease Screening",
      speed: "Moderate (5-15 sec)",
      accuracy: "88-94%",
      description: "Multiple classifications with robust predictions.",
    },
    {
      id: "cnn",
      name: "CNN",
      useCase: "Medical Image Analysis",
      speed: "Slow (15-30 sec)",
      accuracy: "90-96%",
      description: "Analyzes X-rays, MRI scans, and pathology images.",
    },
  ],
  finance: [
    {
      id: "xgboost",
      name: "XGBoost",
      useCase: "Credit Scoring",
      speed: "Fast (2-5 sec)",
      accuracy: "89-95%",
      description: "Loan approval and credit risk assessment.",
    },
    {
      id: "isolation-forest",
      name: "Isolation Forest",
      useCase: "Fraud Detection",
      speed: "Very Fast (1-3 sec)",
      accuracy: "86-92%",
      description: "Anomaly detection and suspicious transaction identification.",
    },
  ],
  "supply-chain": [
    {
      id: "lstm",
      name: "LSTM Networks",
      useCase: "Demand Forecasting",
      speed: "Moderate (5-15 sec)",
      accuracy: "83-90%",
      description: "Sales prediction and inventory planning.",
    },
    {
      id: "genetic-algorithms",
      name: "Genetic Algorithms",
      useCase: "Route Optimization",
      speed: "Slow (15-30 sec)",
      accuracy: "85-93%",
      description: "Delivery routing and logistics optimization.",
    },
  ],
}

export function ConfigurationPanel({
  selectedSector,
  onSectorChange,
  selectedAlgorithm,
  onAlgorithmChange,
  onAnalyze,
  isAnalyzing,
  hasData,
}: any) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const algorithms = algorithmsBySetor[selectedSector as keyof typeof algorithmsBySetor] || []
  const selectedAlgoData = algorithms.find((a) => a.id === selectedAlgorithm)

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration</h2>

      {/* Step 1: Sector Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Select Sector</h3>
        <div className="space-y-3">
          {["healthcare", "finance", "supply-chain"].map((sector) => (
            <label key={sector} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sector"
                value={sector}
                checked={selectedSector === sector}
                onChange={(e) => onSectorChange(e.target.value)}
                className="w-4 h-4 text-teal-600"
              />
              <span className="text-gray-700 font-medium capitalize">
                {sector.replace("-", " ")} -{" "}
                {sector === "healthcare"
                  ? "Medical analytics & patient insights"
                  : sector === "finance"
                    ? "Credit scoring & fraud detection"
                    : "Demand forecasting & optimization"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Step 2: Algorithm Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Select Algorithm</h3>
        <div className="relative">
          <select
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {algorithms.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name} - {algo.useCase}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Algorithm Info */}
        {selectedAlgoData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">What it does:</span> {selectedAlgoData.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Speed:</span>
                <p className="text-gray-600">{selectedAlgoData.speed}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Accuracy:</span>
                <p className="text-gray-600">{selectedAlgoData.accuracy}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      <div className="mb-8 border-t border-gray-200 pt-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          Encryption Parameters (Advanced)
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Polynomial Degree</label>
              <input
                type="number"
                defaultValue="8192"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Level</label>
              <input
                type="text"
                defaultValue="128-bit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                disabled
              />
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Use Recommended Settings</span>
            </label>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onAnalyze}
          disabled={!hasData || isAnalyzing}
          className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {isAnalyzing && <Loader className="w-5 h-5 animate-spin" />}
          {isAnalyzing ? "Analyzing..." : "Encrypt & Analyze"}
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
          Use Sample Data
        </button>
      </div>
    </div>
  )
}
