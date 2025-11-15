import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Target, BarChart } from "lucide-react";

export default function Algorithms() {
  const [selectedSector, setSelectedSector] = useState("all");

  const algorithms = [
    {
      name: "Logistic Regression",
      subtitle: "Disease Risk Prediction",
      sector: "healthcare",
      useCases: [
        "Binary outcome prediction",
        "Patient risk assessment",
        "Treatment response prediction",
      ],
      speed: "Fast (2-5 sec)",
      accuracy: "85-92%",
      bestFor: "100-10K records",
      slug: "logistic-regression",
    },
    {
      name: "Random Forest",
      subtitle: "Multi-Disease Screening",
      sector: "healthcare",
      useCases: [
        "Multiple disease classification",
        "Feature importance analysis",
        "Robust to outliers",
      ],
      speed: "Moderate (5-15 sec)",
      accuracy: "88-94%",
      bestFor: "1K-100K records",
      slug: "random-forest",
    },
    {
      name: "XGBoost",
      subtitle: "Credit Scoring",
      sector: "finance",
      useCases: [
        "Credit risk assessment",
        "Default prediction",
        "Customer segmentation",
      ],
      speed: "Fast (3-7 sec)",
      accuracy: "87-93%",
      bestFor: "10K-1M records",
      slug: "xgboost",
    },
    {
      name: "Isolation Forest",
      subtitle: "Fraud Detection",
      sector: "finance",
      useCases: [
        "Anomaly detection",
        "Fraudulent transaction identification",
        "Outlier analysis",
      ],
      speed: "Fast (2-5 sec)",
      accuracy: "82-89%",
      bestFor: "10K-500K records",
      slug: "isolation-forest",
    },
    {
      name: "LSTM",
      subtitle: "Demand Forecasting",
      sector: "supply-chain",
      useCases: [
        "Time series prediction",
        "Seasonal demand patterns",
        "Inventory optimization",
      ],
      speed: "Moderate (8-15 sec)",
      accuracy: "84-91%",
      bestFor: "1K-50K records",
      slug: "lstm",
    },
    {
      name: "Linear Regression",
      subtitle: "Inventory Optimization",
      sector: "supply-chain",
      useCases: [
        "Continuous value prediction",
        "Trend analysis",
        "Resource allocation",
      ],
      speed: "Fast (1-3 sec)",
      accuracy: "79-86%",
      bestFor: "100-100K records",
      slug: "linear-regression",
    },
  ];

  const filteredAlgorithms = selectedSector === "all" 
    ? algorithms 
    : algorithms.filter(alg => alg.sector === selectedSector);

  const sectors = [
    { value: "all", label: "All" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "supply-chain", label: "Supply Chain" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Algorithm Library</h1>
          <p className="text-xl text-muted-foreground">
            Learn which algorithm to use for your data
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {sectors.map((sector) => (
            <Button
              key={sector.value}
              variant={selectedSector === sector.value ? "default" : "outline"}
              onClick={() => setSelectedSector(sector.value)}
            >
              {sector.label}
            </Button>
          ))}
        </div>

        {/* Algorithm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => (
            <Card key={algorithm.slug} className="glass-card card-glow p-6">
              <h3 className="text-2xl font-bold mb-2">{algorithm.name}</h3>
              <p className="text-sm text-primary mb-4">{algorithm.subtitle}</p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Use Cases:</h4>
                <ul className="space-y-1">
                  {algorithm.useCases.map((useCase, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Speed: {algorithm.speed}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Accuracy: {algorithm.accuracy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span>Best for: {algorithm.bestFor}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link to={`/algorithms/${algorithm.slug}`}>Learn More</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to={`/platform?algorithm=${algorithm.slug}`}>Try This</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
