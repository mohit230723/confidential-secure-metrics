export function TrustIndicators() {
  const badges = ["Built with Microsoft SEAL", "TenSEAL Integration", "Algorand Blockchain"]

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          {badges.map((badge) => (
            <div
              key={badge}
              className="px-6 py-3 bg-white rounded-lg border border-gray-200 text-gray-700 font-semibold shadow-sm"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
