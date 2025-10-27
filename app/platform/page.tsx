import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PlatformInterface } from "@/components/platform/platform-interface"

export default function PlatformPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <PlatformInterface />
      </main>
      <Footer />
    </>
  )
}
