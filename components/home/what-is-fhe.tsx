"use client"

import { Lock, Zap, Rocket } from "lucide-react"
import { useState } from "react"

export function WhatIsFHESection() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const problemColumn = {
    icon: Lock,
    title: "🔐 Traditional Computing Dilemma",
    content: `When you send data to a server for processing, it must be decrypted first. This creates a fundamental vulnerability: your sensitive information—medical records, financial data, or business secrets—is exposed during computation.

Even with secure connections, the server must see your plaintext data to analyze it. This means trusting third parties with your most private information, risking breaches, unauthorized access, and regulatory compliance issues.

Every data breach you hear about happens during this vulnerable decryption phase.`,
  }

  const breakthroughColumn = {
    icon: Zap,
    title: "⚡ The FHE Innovation",
    content: `Fully Homomorphic Encryption is a revolutionary cryptographic breakthrough that solves this problem completely. It allows mathematical operations to be performed directly on encrypted data—without ever decrypting it.

Think of it like a magical lockbox: you can perform calculations on the locked contents without opening the box, and when you finally unlock it with your private key, the results are correct.

Here's how it works technically:
1. Your data is encrypted using advanced lattice-based cryptography
2. The encrypted data (ciphertext) goes to our servers
3. AI models perform computations on the ciphertext using special homomorphic operations
4. Results stay encrypted throughout the entire process
5. Only you, with your private decryption key, can unlock the final insights

The server never sees your raw data—not even for a microsecond.`,
  }

  const impactColumn = {
    icon: Rocket,
    title: "🚀 Real-World Benefits",
    content: `This isn't just theoretical—it's practical and deployable today:

✓ Healthcare: Hospitals can analyze patient data collaboratively without HIPAA violations
✓ Finance: Banks can detect fraud across institutions without exposing customer transactions
✓ Supply Chain: Competitors can share market data without revealing strategies

Performance has advanced dramatically: what took hours now takes seconds with modern FHE libraries like Microsoft SEAL and hardware acceleration.

Your data stays encrypted from upload to analysis to download—providing mathematical proof of privacy, not just promises.`,
  }

  const operations = [
    {
      title: "Addition",
      visual: `[5] --Encrypt--> [🔒 cipher1]
                     +
[3] --Encrypt--> [🔒 cipher2]
                     ↓
              [🔒 cipher_sum]
                     ↓
              --Decrypt-->
                     ↓
                    [8] ✓`,
      description:
        "Addition on Encrypted Data: The server adds two encrypted numbers without knowing what they are. When you decrypt the result, you get the correct sum. This enables encrypted salary averaging, medical metric aggregation, and financial calculations.",
    },
    {
      title: "Multiplication",
      visual: `[4] --Encrypt--> [🔒 cipher1]
                     ×
[2] --Encrypt--> [🔒 cipher2]
                     ↓
              [🔒 cipher_product]
                     ↓
              --Decrypt-->
                     ↓
                    [8] ✓`,
      description:
        "Multiplication on Encrypted Data: Complex calculations like risk scoring and predictive modeling require multiplication. FHE makes this possible without exposing input values. This is the foundation for encrypted machine learning.",
    },
    {
      title: "Statistical Operations",
      visual: `[Encrypted Salaries] → [🔒🔒🔒🔒🔒]
                          ↓
                    [Mean Calculation]
                          ↓
                   [🔒 Encrypted Mean]
                          ↓
                    Your Key Only
                          ↓
                      [$75,000]`,
      description:
        "Statistical Analysis Without Exposure: Calculate averages, medians, standard deviations on encrypted datasets. Perfect for privacy-preserving surveys, salary benchmarking, and collaborative research where individual data points must stay private.",
    },
    {
      title: "Comparisons",
      visual: `[Encrypted Values] → [🔒 A, 🔒 B, 🔒 C, 🔒 D]
                          ↓
                    [Find Maximum]
                          ↓
                   [🔒 Encrypted Result]
                          ↓
                      [Value: C] ✓`,
      description:
        "Encrypted Comparisons: Find minimums, maximums, and rankings without revealing individual values. Essential for encrypted auctions, private leaderboards, and confidential competitive analysis.",
    },
  ]

  const technicalDetails = `How FHE Actually Works Under the Hood:

FHE relies on lattice-based cryptography—a type of encryption that remains secure even against quantum computers. Here's the mathematical foundation:

1. ENCRYPTION SCHEME:
   We use the CKKS scheme (Cheon-Kim-Kim-Song) which supports approximate arithmetic on real numbers. Your data is encoded into a polynomial ring:
   
   plaintext → polynomial → add noise → ciphertext
   
   The noise is carefully calibrated to hide information while allowing computation.

2. HOMOMORPHIC OPERATIONS:
   Special algorithms let us add and multiply ciphertexts:
   
   Enc(a) + Enc(b) = Enc(a + b)
   Enc(a) × Enc(b) = Enc(a × b)
   
   These operations preserve the mathematical relationships without decryption.

3. NOISE MANAGEMENT:
   Each operation adds computational noise. Our system includes 'bootstrapping'—a process that refreshes ciphertexts to prevent noise overflow, enabling unlimited operations.

4. PERFORMANCE:
   Modern implementations use:
   • Polynomial degree: 8192-32768
   • Security level: 128-bit (post-quantum secure)
   • Hardware acceleration: GPU & FPGA support
   • Execution time: 2-10 seconds for typical operations

5. BLOCKCHAIN INTEGRATION:
   Algorand smart contracts orchestrate the computation:
   • Store encrypted data hashes (not the data itself)
   • Manage access control and payments
   • Record computation proofs for auditability
   • Ensure decentralized, trustless processing`

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Understanding Fully Homomorphic Encryption
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">The Technology That Powers Private Analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[problemColumn, breakthroughColumn, impactColumn].map((column, idx) => {
            const Icon = column.icon
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{column.title.split(" ")[0]}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{column.title.substring(2)}</h3>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{column.content}</p>
              </div>
            )
          })}
        </div>

        <div className="mb-20">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">See FHE Operations in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {operations.map((op) => (
              <div
                key={op.title}
                className="bg-gray-50 rounded-2xl p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-2xl font-bold text-gray-900 mb-6">{op.title}</h4>
                <div className="bg-white rounded-lg p-6 mb-6 font-mono text-sm text-gray-700 overflow-x-auto border border-gray-200">
                  <pre>{op.visual}</pre>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{op.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-10 border border-blue-200">
          <button
            onClick={() => setExpandedAccordion(expandedAccordion === "tech" ? null : "tech")}
            className="w-full flex items-center justify-between cursor-pointer group"
          >
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
              🔬 Technical Details (For the Curious)
            </h3>
            <div className={`text-2xl transition-transform ${expandedAccordion === "tech" ? "rotate-180" : ""}`}>▼</div>
          </button>
          {expandedAccordion === "tech" && (
            <div className="mt-8 pt-8 border-t border-blue-200">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line font-mono text-sm">
                {technicalDetails}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
