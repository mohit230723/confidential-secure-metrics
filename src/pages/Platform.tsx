import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Platform() {
  const [sector, setSector] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const algorithmsBySector: Record<string, any[]> = {
    healthcare: [
      {
        value: "logistic-regression",
        label: "Logistic Regression - Disease Risk Prediction",
        useCase: "Best for: Binary outcomes",
        speed: "Fast (2-5 sec)",
        accuracy: "85-92%",
      },
      {
        value: "random-forest",
        label: "Random Forest - Multi-Disease Screening",
        useCase: "Best for: Multiple classifications",
        speed: "Moderate (5-15 sec)",
        accuracy: "88-94%",
      },
      {
        value: "cnn",
        label: "CNN - Medical Image Analysis",
        useCase: "Best for: Image-based diagnostics",
        speed: "Slow (15-30 sec)",
        accuracy: "90-96%",
      },
    ],
    finance: [
      {
        value: "xgboost",
        label: "XGBoost - Credit Scoring",
        useCase: "Best for: Credit risk assessment",
        speed: "Fast (3-7 sec)",
        accuracy: "87-93%",
      },
      {
        value: "isolation-forest",
        label: "Isolation Forest - Fraud Detection",
        useCase: "Best for: Anomaly detection",
        speed: "Fast (2-5 sec)",
        accuracy: "82-89%",
      },
    ],
    "supply-chain": [
      {
        value: "lstm",
        label: "LSTM - Demand Forecasting",
        useCase: "Best for: Time series prediction",
        speed: "Moderate (8-15 sec)",
        accuracy: "84-91%",
      },
      {
        value: "linear-regression",
        label: "Linear Regression - Inventory Optimization",
        useCase: "Best for: Continuous predictions",
        speed: "Fast (1-3 sec)",
        accuracy: "79-86%",
      },
    ],
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Simulate OCR processing for images
      if (file.type.startsWith("image/")) {
        setIsProcessing(true);
        setTimeout(() => {
          setExtractedData({
            rows: 15,
            preview: [
              { item: "Medical Supply A", quantity: 150, price: 45.99 },
              { item: "Equipment B", quantity: 5, price: 1200.00 },
              { item: "Medicine C", quantity: 200, price: 12.50 },
            ],
          });
          setIsProcessing(false);
          toast.success("Extracted 15 data points from your image");
        }, 2000);
      } else {
        toast.success("File uploaded successfully");
      }
    }
  };

  const handleAnalyze = () => {
    if (!sector || !algorithm || !uploadedFile) {
      toast.error("Please complete all fields");
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Try Platform</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Data Input */}
          <div className="space-y-6">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Data Input</h2>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv,.json,.txt,image/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg mb-2">Drag & Drop Your Data or Click to Browse</p>
                  <p className="text-sm text-muted-foreground">
                    CSV, JSON, TXT, Images (bills/receipts)
                  </p>
                </label>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <div className="mt-6 p-4 bg-muted rounded-lg flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span>Processing image with OCR...</span>
                </div>
              )}

              {/* Extracted Data Preview */}
              {extractedData && !isProcessing && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Extracted {extractedData.rows} data points from your image</span>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Item</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {extractedData.preview.map((row: any, i: number) => (
                          <tr key={i} className="border-t">
                            <td className="px-4 py-2 text-sm">{row.item}</td>
                            <td className="px-4 py-2 text-sm">{row.quantity}</td>
                            <td className="px-4 py-2 text-sm">${row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Button className="w-full">Confirm & Encrypt This Data</Button>
                </div>
              )}

              {/* File Info */}
              {uploadedFile && (
                <div className="mt-4 p-4 bg-muted rounded-lg flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Panel - Configuration */}
          <div className="space-y-6">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Configuration</h2>

              {/* Step 1: Sector Selection */}
              <div className="mb-8">
                <Label className="text-lg mb-4 block">Step 1: Select Sector</Label>
                <RadioGroup value={sector} onValueChange={setSector}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary transition-colors">
                      <RadioGroupItem value="healthcare" id="healthcare" />
                      <div>
                        <Label htmlFor="healthcare" className="font-medium cursor-pointer">
                          Healthcare
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Medical analytics & patient insights
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary transition-colors">
                      <RadioGroupItem value="finance" id="finance" />
                      <div>
                        <Label htmlFor="finance" className="font-medium cursor-pointer">
                          Finance
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Credit scoring & fraud detection
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary transition-colors">
                      <RadioGroupItem value="supply-chain" id="supply-chain" />
                      <div>
                        <Label htmlFor="supply-chain" className="font-medium cursor-pointer">
                          Supply Chain
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Demand forecasting & optimization
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Step 2: Algorithm Selection */}
              {sector && (
                <div className="mb-8">
                  <Label className="text-lg mb-4 block">Step 2: Select Algorithm</Label>
                  <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an algorithm..." />
                    </SelectTrigger>
                    <SelectContent>
                      {algorithmsBySector[sector]?.map((alg) => (
                        <SelectItem key={alg.value} value={alg.value}>
                          <div className="py-1">
                            <div className="font-medium">{alg.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {alg.useCase} • {alg.speed} • {alg.accuracy}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {algorithm && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Algorithm Details</h4>
                      <p className="text-sm text-muted-foreground">
                        This algorithm is optimized for the selected use case and will process
                        your encrypted data securely.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleAnalyze}
                  disabled={!sector || !algorithm || !uploadedFile}
                >
                  Encrypt & Analyze
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
