import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Activity } from "lucide-react";

export default function History() {
  const analyses = [
    {
      id: 1,
      name: "Patient Risk Analysis",
      sector: "Healthcare",
      algorithm: "Logistic Regression",
      date: "2024-01-15",
      accuracy: "89%",
      status: "Completed",
    },
    {
      id: 2,
      name: "Credit Score Prediction",
      sector: "Finance",
      algorithm: "XGBoost",
      date: "2024-01-14",
      accuracy: "91%",
      status: "Completed",
    },
    {
      id: 3,
      name: "Demand Forecast Q1",
      sector: "Supply Chain",
      algorithm: "LSTM",
      date: "2024-01-13",
      accuracy: "87%",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics History</h1>
            <p className="text-muted-foreground">View your past analyses and results</p>
          </div>
          <Button asChild>
            <Link to="/platform">
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="glass-card card-glow p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{analysis.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>{analysis.sector}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(analysis.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Algorithm</p>
                    <p className="font-medium">{analysis.algorithm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="font-medium text-primary">{analysis.accuracy}</p>
                  </div>
                  <Button variant="outline">View Results</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {analyses.length === 0 && (
          <Card className="glass-card p-12 text-center">
            <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No analyses yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your first analysis to see results here
            </p>
            <Button asChild>
              <Link to="/platform">Create Analysis</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
