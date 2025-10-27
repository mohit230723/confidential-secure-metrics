import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { WhatIsFHESection } from "@/components/home/what-is-fhe"
import { IndustrySolutions } from "@/components/home/industry-solutions"
import { WhyBlockchain } from "@/components/home/why-blockchain"
import { TrustIndicators } from "@/components/home/trust-indicators"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WhatIsFHESection />
        <IndustrySolutions />
        <WhyBlockchain />
        <TrustIndicators />
      </main>
      <Footer />
    </>
  )
}
