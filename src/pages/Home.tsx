import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Plus, X, BarChart, Activity, Package, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
export default function Home() {
  const navigate = useNavigate();
  const [isWalletConnected] = useState(false);
  const handleSectorClick = (sector: string) => {
    if (!isWalletConnected) {
      toast.error("Connect wallet first to proceed.");
      return;
    }
    navigate(`/platform?sector=${sector.toLowerCase()}`);
  };
  const sectors = [{
    title: "Healthcare Analytics",
    subtitle: "Disease Prediction & Medical Analytics",
    description: "Analyze patient data while maintaining HIPAA compliance",
    icon: Activity,
    features: ["Disease risk prediction", "Medical imaging analysis", "Patient privacy protection"],
    sector: "Healthcare"
  }, {
    title: "Financial Analytics",
    subtitle: "Credit Scoring & Fraud Detection",
    description: "Process financial data without exposing transactions",
    icon: BarChart,
    features: ["Credit risk assessment", "Fraud detection", "Transaction privacy"],
    sector: "Finance"
  }, {
    title: "Supply Chain Analytics",
    subtitle: "Demand Forecasting & Optimization",
    description: "Optimize logistics while protecting trade secrets",
    icon: Package,
    features: ["Demand forecasting", "Route optimization", "Inventory management"],
    sector: "Supply Chain"
  }];
  const fheOperations = [{
    title: "Addition",
    example: "Encrypt(5) + Encrypt(3) = Decrypt(8)",
    icon: Plus
  }, {
    title: "Multiplication",
    example: "Encrypt(4) × Encrypt(2) = Decrypt(8)",
    icon: X
  }, {
    title: "Mean",
    example: "Average encrypted salaries without exposing values",
    icon: BarChart
  }, {
    title: "Comparison",
    example: "Find max/min in encrypted datasets",
    icon: Activity
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Unlock Insights from Encrypted Data
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:text-2xl font-normal">
            Experience the first ever privacy-first analytics on Algorand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/platform">
                Try Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is FHE Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            What is Fully Homomorphic Encryption?
          </h2>
          
          <Card className="glass-card card-glow p-8 mb-12 text-center">
            <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Fully Homomorphic Encryption lets you perform calculations on encrypted data without 
              decrypting it—like doing math on a locked safe without opening it.
            </p>
          </Card>

          {/* Interactive Demo */}
          <div className="bg-gradient-to-br from-card to-muted rounded-lg p-8 mb-12 border text-center">
            <div className="text-2xl font-mono mb-4">
              <span className="text-primary">Encrypt(5)</span>
              {" + "}
              <span className="text-primary">Encrypt(3)</span>
              {" = "}
              <span className="text-primary">Encrypt(8)</span>
            </div>
            <p className="text-muted-foreground">
              Computation happens on encrypted values, result stays encrypted
            </p>
          </div>

          {/* FHE Operations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fheOperations.map(op => <Card key={op.title} className="glass-card card-glow p-6 text-center">
                <op.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{op.title}</h3>
                <p className="text-sm text-muted-foreground">{op.example}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Industry Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map(sector => <Card key={sector.title} className="glass-card card-glow p-8 hover:scale-105 transition-transform cursor-pointer" onClick={() => handleSectorClick(sector.sector)}>
                <sector.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">{sector.title}</h3>
                <p className="text-sm mb-3 text-zinc-500">{sector.subtitle}</p>
                <p className="text-muted-foreground mb-4">{sector.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {sector.features.map(feature => <li key={feature} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>)}
                </ul>

                <Button className="w-full" variant="outline">
                  Explore {sector.sector} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Blockchain? Why Algorand?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-destructive">Traditional Problems</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-destructive mt-0.5" />
                  <span>Centralized servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-destructive mt-0.5" />
                  <span>No audit trails</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-destructive mt-0.5" />
                  <span>Trust required in providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-destructive mt-0.5" />
                  <span>Data breach risks</span>
                </li>
              </ul>
            </Card>

            <Card className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Blockchain Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                  <span>Decentralized processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                  <span>Immutable audit logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                  <span>Trustless architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                  <span>Transparent incentives</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="glass-card p-6 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <p className="text-lg">
              <span className="font-semibold">Powered by Algorand:</span> 5-second finality | &lt;$0.001 fees | Carbon-negative
            </p>
          </Card>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium">Built with Microsoft SEAL</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium">TenSEAL Integration</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium">Algorand Blockchain</p>
            </div>
          </div>
        </div>
      </section>
    </div>;
}