import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Code, Database, Lock } from "lucide-react";
import { toast } from "sonner";

export default function About() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  const technologies = [
    { name: "React/Next.js", icon: Code },
    { name: "TailwindCSS", icon: Code },
    { name: "Python/FastAPI", icon: Database },
    { name: "Fully Homomorphic Encryption", icon: Lock },
    { name: "Algorand Blockchain", icon: Shield },
  ];

  const partners = [
    "Microsoft SEAL",
    "TenSEAL",
    "Algorand",
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Mission */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FHE Analytics</h1>
          <Card className="glass-card p-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To democratize privacy-preserving analytics and empower organizations to unlock insights 
              from sensitive data without compromising security or compliance.
            </p>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Team CSM</h2>
            <p className="text-xl text-primary">Confidential Secure Metrics</p>
          </div>
          <Card className="glass-card p-8 text-center">
            <p className="text-muted-foreground">
              We are a dedicated team of cryptography experts, data scientists, and blockchain engineers 
              passionate about bringing privacy-first analytics to organizations worldwide.
            </p>
          </Card>
        </section>

        {/* Technology Partners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technology Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <Card key={partner} className="glass-card card-glow p-8 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg">{partner}</h3>
              </Card>
            ))}
          </div>
        </section>

        {/* Built With */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Built With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <Card key={tech.name} className="glass-card p-6 flex items-center gap-4">
                <tech.icon className="w-8 h-8 text-primary" />
                <span className="font-medium">{tech.name}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <Card className="glass-card p-8">
            <div className="mb-6 text-center">
              <p className="text-muted-foreground">
                Email: <a href="mailto:contact@fheanalytics.com" className="text-primary hover:underline">
                  contact@fheanalytics.com
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} required />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </div>
  );
}
