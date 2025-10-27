import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HistoryDashboard } from "@/components/history/history-dashboard"

export default function HistoryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <HistoryDashboard />
      </main>
      <Footer />
    </>
  )
}
