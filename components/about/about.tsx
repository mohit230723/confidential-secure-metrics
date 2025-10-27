import { Mail } from "lucide-react"

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About FHE Analytics</h1>
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            To democratize privacy-preserving analytics and empower organizations to unlock insights from sensitive data
            without compromising security or compliance.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Team CSM</h2>
          <p className="text-gray-600 mb-4">Crypto Squad Movement</p>
          <p className="text-gray-700">
            Our team brings together expertise in cryptography, blockchain technology, and artificial intelligence.
            We're passionate about building tools that protect privacy while enabling innovation.
          </p>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Microsoft SEAL", description: "Homomorphic Encryption Library" },
            { name: "TenSEAL", description: "Privacy-Preserving ML" },
            { name: "Algorand", description: "Blockchain Infrastructure" },
          ].map((partner) => (
            <div key={partner.name} className="bg-white rounded-lg shadow p-6 border border-gray-200 text-center">
              <h3 className="font-bold text-gray-900 mb-2">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built With */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "React/Next.js",
            "TailwindCSS",
            "Python/FastAPI",
            "Fully Homomorphic Encryption",
            "Algorand Blockchain",
          ].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-semibold text-sm">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 border-2 border-teal-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-600" />
              <a href="mailto:contact@fheanalytics.com" className="text-teal-600 hover:text-teal-700 font-semibold">
                contact@fheanalytics.com
              </a>
            </div>
            <form className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 font-semibold transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
