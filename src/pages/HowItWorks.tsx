import { Card } from "@/components/ui/card";
import { Lock, Upload, Cpu, BarChart, Shield, Blocks } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Data",
      description: "Securely upload sensitive data (medical records, financial transactions, etc.) through our encrypted interface.",
    },
    {
      icon: Lock,
      title: "Automatic Encryption",
      description: "Your data is encrypted using Fully Homomorphic Encryption (FHE) before any processing begins.",
    },
    {
      icon: Cpu,
      title: "Encrypted Processing",
      description: "Machine learning algorithms run directly on encrypted data without ever decrypting it.",
    },
    {
      icon: BarChart,
      title: "Get Insights",
      description: "Receive accurate analytics and predictions while your raw data remains completely private.",
    },
    {
      icon: Blocks,
      title: "Blockchain Logging",
      description: "All computations are logged on Algorand blockchain for transparency and auditability.",
    },
    {
      icon: Shield,
      title: "Privacy Guaranteed",
      description: "Your original data is never exposed, ensuring complete privacy and compliance.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Privacy-preserving analytics in six simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="glass-card card-glow p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                {index + 1}
              </div>
              <step.icon className="w-12 h-12 text-primary mb-4 mt-4" />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>

        <Card className="glass-card p-12 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">The Magic of FHE</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Fully Homomorphic Encryption allows computations on encrypted data, producing encrypted results that, 
            when decrypted, match the results of operations performed on the plaintext. This means your sensitive 
            data never needs to be exposed during analysis.
          </p>
          <div className="inline-block bg-muted px-8 py-4 rounded-lg">
            <code className="text-primary font-mono text-lg">
              f(Encrypt(x)) = Encrypt(f(x))
            </code>
          </div>
        </Card>
      </div>
    </div>
  );
}
