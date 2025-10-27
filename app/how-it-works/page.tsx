import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works/how-it-works"

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
