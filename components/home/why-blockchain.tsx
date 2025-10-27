import { Check, X } from "lucide-react"

export function WhyBlockchain() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Why Blockchain? Why Algorand?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Problems */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Traditional Approach</h3>
            <div className="space-y-4">
              {["Centralized servers", "No audit trails", "Trust required in providers", "Data breach risks"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Algorand Solution</h3>
            <div className="space-y-4">
              {[
                "Decentralized processing",
                "Immutable audit logs",
                "Trustless architecture",
                "Transparent incentives",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algorand Badge */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 border-2 border-teal-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Powered by Algorand</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-semibold text-gray-700">
            <div>5-second finality</div>
            <div className="hidden md:block text-gray-300">|</div>
            <div>&lt;$0.001 fees</div>
            <div className="hidden md:block text-gray-300">|</div>
            <div>Carbon-negative</div>
          </div>
        </div>
      </div>
    </section>
  )
}
