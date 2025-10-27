"use client"

import { useState } from "react"
import { AlgorithmCard } from "./algorithm-card"
import { AlgorithmDetail } from "./algorithm-detail"

const algorithms = {
  healthcare: [
    {
      id: "logistic-regression",
      name: "Logistic Regression",
      useCase: "Disease Risk Prediction",
      useCases: ["Diabetes", "Heart disease", "Binary outcomes"],
      speed: "Fast",
      speedTime: "2-5 sec",
      accuracy: "85-92%",
      bestFor: "100-10K records",
      description:
        "Predicts whether something will happen or not—like whether a patient will develop diabetes based on their health metrics.",
      whenToUse: {
        good: ["Binary outcomes", "Interpretable results", "Small-to-medium datasets", "Fast processing needed"],
        notGood: ["Complex patterns", "Image data", "Very large datasets", "Non-linear relationships"],
      },
    },
    {
      id: "random-forest",
      name: "Random Forest",
      useCase: "Multi-Disease Screening",
      useCases: ["Multiple classifications", "Robust predictions"],
      speed: "Moderate",
      speedTime: "5-15 sec",
      accuracy: "88-94%",
      bestFor: "1K-100K records",
      description: "Ensemble method that combines multiple decision trees for robust predictions.",
      whenToUse: {
        good: ["Multiple classifications", "Non-linear patterns", "Feature importance needed"],
        notGood: ["Real-time predictions", "Very large datasets", "Interpretability critical"],
      },
    },
    {
      id: "cnn",
      name: "CNN",
      useCase: "Medical Image Analysis",
      useCases: ["X-rays", "MRI scans", "Pathology"],
      speed: "Slow",
      speedTime: "15-30 sec",
      accuracy: "90-96%",
      bestFor: "Image data",
      description: "Convolutional Neural Networks excel at analyzing visual patterns in medical images.",
      whenToUse: {
        good: ["Image analysis", "Complex patterns", "High accuracy needed"],
        notGood: ["Small datasets", "Real-time processing", "Limited compute"],
      },
    },
  ],
  finance: [
    {
      id: "xgboost",
      name: "XGBoost",
      useCase: "Credit Scoring",
      useCases: ["Loan approval", "Credit risk"],
      speed: "Fast",
      speedTime: "2-5 sec",
      accuracy: "89-95%",
      bestFor: "1K-1M records",
      description: "Gradient boosting algorithm optimized for speed and performance.",
      whenToUse: {
        good: ["Tabular data", "High accuracy", "Feature importance"],
        notGood: ["Image data", "Text data", "Interpretability critical"],
      },
    },
    {
      id: "isolation-forest",
      name: "Isolation Forest",
      useCase: "Fraud Detection",
      useCases: ["Anomaly detection", "Suspicious transactions"],
      speed: "Very Fast",
      speedTime: "1-3 sec",
      accuracy: "86-92%",
      bestFor: "Real-time detection",
      description: "Specialized algorithm for detecting anomalies and outliers.",
      whenToUse: {
        good: ["Anomaly detection", "Real-time processing", "Imbalanced data"],
        notGood: ["Classification tasks", "Interpretability needed"],
      },
    },
  ],
  supplyChain: [
    {
      id: "lstm",
      name: "LSTM Networks",
      useCase: "Demand Forecasting",
      useCases: ["Sales prediction", "Inventory planning"],
      speed: "Moderate",
      speedTime: "5-15 sec",
      accuracy: "83-90%",
      bestFor: "Time-series data",
      description: "Long Short-Term Memory networks for sequential data analysis.",
      whenToUse: {
        good: ["Time-series data", "Sequential patterns", "Long-term dependencies"],
        notGood: ["Small datasets", "Real-time predictions", "Limited compute"],
      },
    },
    {
      id: "genetic-algorithms",
      name: "Genetic Algorithms",
      useCase: "Route Optimization",
      useCases: ["Delivery routing", "Logistics"],
      speed: "Slow",
      speedTime: "15-30 sec",
      accuracy: "85-93%",
      bestFor: "Optimization problems",
      description: "Evolutionary algorithm for finding optimal solutions.",
      whenToUse: {
        good: ["Optimization problems", "Complex constraints", "Global search"],
        notGood: ["Real-time processing", "Continuous optimization"],
      },
    },
  ],
}

export function AlgorithmsLibrary() {
  const [selectedSector, setSelectedSector] = useState("healthcare")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popular")

  const sectors = [
    { id: "healthcare", label: "Healthcare" },
    { id: "finance", label: "Finance" },
    { id: "supplyChain", label: "Supply Chain" },
  ]

  const sectorAlgorithms = algorithms[selectedSector as keyof typeof algorithms] || []
  const selectedAlgoData = sectorAlgorithms.find((a) => a.id === selectedAlgorithm)

  if (selectedAlgoData) {
    return <AlgorithmDetail algorithm={selectedAlgoData} onBack={() => setSelectedAlgorithm(null)} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Algorithm Library</h1>
        <p className="text-xl text-gray-600">Learn which algorithm to use for your data</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex gap-2 flex-wrap">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSector === sector.id ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {sector.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="popular">Most Popular</option>
          <option value="fastest">Fastest</option>
          <option value="accurate">Most Accurate</option>
        </select>
      </div>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectorAlgorithms.map((algo) => (
          <AlgorithmCard key={algo.id} algorithm={algo} onLearnMore={() => setSelectedAlgorithm(algo.id)} />
        ))}
      </div>
    </div>
  )
}
