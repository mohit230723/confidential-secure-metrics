"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText } from "lucide-react"

export function DataInputPanel({ onDataUpload, uploadedData }: any) {
  const [isManual, setIsManual] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate file processing
      onDataUpload({
        fileName: file.name,
        records: 15,
        columns: ["Age", "Blood Pressure", "Glucose", "BMI"],
        data: [
          { Age: 45, BP: 130, Glucose: 120, BMI: 28 },
          { Age: 52, BP: 140, Glucose: 135, BMI: 31 },
          { Age: 38, BP: 120, Glucose: 100, BMI: 25 },
        ],
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Data</h2>

      {/* Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIsManual(false)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !isManual ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setIsManual(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isManual ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Enter Manually
        </button>
      </div>

      {!isManual ? (
        <>
          {/* Upload Zone */}
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-colors mb-6">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-2">Drag & Drop Your Data or Click to Browse</p>
            <p className="text-sm text-gray-500">Supported formats: CSV, JSON, TXT, Images (bills/receipts)</p>
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".csv,.json,.txt,.jpg,.png" />
          </label>

          {/* Data Preview */}
          {uploadedData && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-gray-900">{uploadedData.fileName}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">✓ {uploadedData.records} records detected</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      {uploadedData.columns.map((col: string) => (
                        <th key={col} className="text-left py-2 px-3 font-semibold text-gray-700">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedData.data.slice(0, 3).map((row: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-200">
                        {uploadedData.columns.map((col: string) => (
                          <td key={col} className="py-2 px-3 text-gray-700">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter blood pressure"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Glucose Level</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter glucose level"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter BMI"
            />
          </div>
        </div>
      )}
    </div>
  )
}
