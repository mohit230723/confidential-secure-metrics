import Link from "next/link"
import { Heart, DollarSign, Package, ArrowRight } from "lucide-react"

export function IndustrySolutions() {
  const sectors = [
    {
      icon: Heart,
      title: "Healthcare Analytics",
      subtitle: "Disease Prediction & Medical Analytics",
      description: "Analyze patient data while maintaining HIPAA compliance",
      features: ["Disease risk prediction", "Medical imaging analysis", "Patient privacy protection"],
      href: "/platform?sector=healthcare",
    },
    {
      icon: DollarSign,
      title: "Financial Analytics",
      subtitle: "Credit Scoring & Fraud Detection",
      description: "Process financial data without exposing transactions",
      features: ["Credit risk assessment", "Fraud detection", "Transaction privacy"],
      href: "/platform?sector=finance",
    },
    {
      icon: Package,
      title: "Supply Chain Analytics",
      subtitle: "Demand Forecasting & Optimization",
      description: "Optimize logistics while protecting trade secrets",
      features: ["Demand forecasting", "Route optimization", "Inventory management"],
      href: "/platform?sector=supply-chain",
    },
  ]

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Industry Solutions</h2>
          <p className="text-2xl text-gray-600">Privacy-first analytics for your sector</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sectors.map((sector) => {
            const Icon = sector.icon
            return (
              <div
                key={sector.title}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all p-12 border border-gray-200"
              >
                <Icon className="w-20 h-20 text-teal-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{sector.title}</h3>
                <p className="text-lg text-teal-600 font-semibold mb-4">{sector.subtitle}</p>
                <p className="text-lg text-gray-600 mb-6">{sector.description}</p>

                <ul className="space-y-3 mb-8">
                  {sector.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-lg text-gray-700">
                      <span className="text-teal-600 font-bold mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={sector.href}
                  className="inline-flex items-center gap-2 text-lg text-teal-600 hover:text-teal-700 font-semibold group"
                >
                  Explore {sector.title.split(" ")[0]}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
