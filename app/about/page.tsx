import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { About } from "@/components/about/about"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <About />
      </main>
      <Footer />
    </>
  )
}
