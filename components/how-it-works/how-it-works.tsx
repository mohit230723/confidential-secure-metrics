import { Cloud, Lock, Cpu, Unlock } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Cloud,
      title: "YOU UPLOAD",
      description: "Upload your sensitive data (medical records, financial data, supply chain metrics)",
    },
    {
      icon: Lock,
      title: "WE ENCRYPT",
      description: "Data encrypted locally using Fully Homomorphic Encryption—never leaves your device in plaintext",
    },
    {
      icon: Cpu,
      title: "AI ANALYZES",
      description: "Our AI models run directly on encrypted data without ever seeing your raw information",
    },
    {
      icon: Unlock,
      title: "YOU DECRYPT",
      description: "Only you have the key to decrypt and view your personalized insights",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How Our Platform Works</h1>
        <p className="text-xl text-gray-600">A step-by-step journey through privacy-first analytics</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200 text-center">
                <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-teal-600 transform -translate-y-1/2" />
              )}
            </div>
          )
        })}
      </div>

      {/* Security Guarantees */}
      <div className="bg-white rounded-lg shadow p-12 border border-gray-200 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Security Guarantees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "Your data never leaves your device unencrypted",
            "Our servers never see your plaintext data",
            "Computations happen on ciphertext only",
            "Only you hold the decryption keys",
          ].map((guarantee, index) => (
            <div key={index} className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{guarantee}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Role */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-12 border-2 border-teal-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why We Use Algorand Blockchain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Benefits</h3>
            <ul className="space-y-3">
              {["5-second finality", "<$0.001 transaction fees", "Immutable audit trails", "Decentralized trust"].map(
                (benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-gray-700">
                    <span className="text-teal-600 font-bold">•</span>
                    {benefit}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">What Gets Stored</h3>
            <ul className="space-y-3">
              {["Data hashes (NOT your data)", "Computation proofs", "Smart contract code", "Transaction records"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <span className="text-teal-600 font-bold">•</span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
