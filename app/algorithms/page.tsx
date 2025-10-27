import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlgorithmsLibrary } from "@/components/algorithms/algorithms-library"

export default function AlgorithmsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <AlgorithmsLibrary />
      </main>
      <Footer />
    </>
  )
}
