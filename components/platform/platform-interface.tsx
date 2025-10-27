"use client"

import { useState } from "react"
import { DataInputPanel } from "./data-input-panel"
import { ConfigurationPanel } from "./configuration-panel"
import { ResultsView } from "./results-view"

type ViewState = "input" | "results"

export function PlatformInterface() {
  const [viewState, setViewState] = useState<ViewState>("input")
  const [selectedSector, setSelectedSector] = useState("healthcare")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("logistic-regression")
  const [uploadedData, setUploadedData] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResults({
        sector: selectedSector,
        algorithm: selectedAlgorithm,
        recordsAnalyzed: uploadedData?.records || 15,
        processingTime: 8.3,
        encryptionTime: 2.3,
        computationTime: 6.0,
        decryptionTime: 0.8,
        riskScore: 0.87,
        confidence: 94.2,
        highRiskPercentage: 67,
        lowRiskPercentage: 20,
        mediumRiskPercentage: 13,
      })
      setViewState("results")
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {viewState === "input" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataInputPanel onDataUpload={setUploadedData} uploadedData={uploadedData} />
          <ConfigurationPanel
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            hasData={!!uploadedData}
          />
        </div>
      ) : (
        <ResultsView
          results={analysisResults}
          onNewAnalysis={() => {
            setViewState("input")
            setUploadedData(null)
            setAnalysisResults(null)
          }}
        />
      )}
    </div>
  )
}
