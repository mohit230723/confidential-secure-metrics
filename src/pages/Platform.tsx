// Platform.tsx  (fixed: robust API helper + all fetch calls use apiFetch)
// Drop-in replacement: parsing + OCR via server; no client-side Tesseract.

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Papa from "papaparse";

/* -----------------------
   API helper (robust)
   -----------------------
   - Forces backend to http://localhost:3000 in local dev (avoids hitting frontend index.html)
   - Throws descriptive errors if server returns HTML or non-2xx
*/
const API_BASE = (() => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:3000";
  }
  return "";
})();

async function apiFetch(path: string, opts?: RequestInit) {
  const url = path.startsWith("http") ? path : API_BASE + path;
  const res = await fetch(url, opts);

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const txt = await res.text().catch(() => "<unreadable body>");
    throw new Error(`API error ${res.status} ${res.statusText}: ${txt}`);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  if (contentType.includes("text/html")) {
    const txt = await res.text().catch(() => "<unreadable html>");
    throw new Error(`Expected JSON but got HTML from ${url}. Response starts: ${txt.slice(0,200)}`);
  }

  return res.text();
}

/* -----------------------
   Component
   ----------------------- */
export default function Platform() {
  const [algorithm, setAlgorithm] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const [encrypting, setEncrypting] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);
  const [aggregateCid, setAggregateCid] = useState<string | null>(null);
  const [decryptedAggregate, setDecryptedAggregate] = useState<number | null>(null);

  const algorithms = [
    { value: "paillier", label: "Paillier — Secure Sum (MVP)", desc: "Implemented: additive HE for sums." },
    { value: "ckks", label: "CKKS — Full Arithmetic (coming soon)", desc: "Coming soon." },
    { value: "threshold", label: "Threshold HE — (coming soon)", desc: "Coming soon." },
  ];

  // helpers
  function maybeNumber(v: any) {
    if (v === null || v === undefined) return null;
    const s = String(v).replace(/[$,]/g, "").trim();
    if (s === "") return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  function normalizeColumns(obj: any) {
    const keys = Object.keys(obj || {});
    const normalized: any = {};
    for (const k of keys) {
      const low = k.toLowerCase().trim();
      const val = obj[k];
      if (low.includes("item") || low.includes("name") || low.includes("desc")) {
        normalized.item = val;
      } else if (low.includes("qty") || low.includes("quantity") || low.includes("count")) {
        normalized.quantity = maybeNumber(val);
      } else if (low.includes("price") || low.includes("amount") || low.includes("cost")) {
        normalized.price = maybeNumber(val);
      } else {
        const maybe = maybeNumber(val);
        if (maybe !== null && !normalized.price) normalized.price = maybe;
      }
    }
    return normalized;
  }

  function parseCsvText(text: string) {
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true, dynamicTyping: false });
    if (parsed.errors && parsed.errors.length > 0) {
      throw new Error("CSV parse error: " + parsed.errors[0].message);
    }
    const out: any[] = [];
    for (const r of parsed.data as any[]) {
      const n = normalizeColumns(r);
      if (n.quantity == null && n.price == null && !n.item) continue;
      out.push({ item: n.item || "(unknown)", quantity: n.quantity ?? 1, price: n.price ?? 0 });
    }
    return out;
  }

  function parsePlainText(text: string) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const out: any[] = [];
    for (const line of lines) {
      if (line.includes(",")) {
        const parts = line.split(",").map(p => p.trim());
        if (parts.length >= 3) {
          const [item, qtyRaw, priceRaw] = parts;
          const q = maybeNumber(qtyRaw) ?? 1;
          const p = maybeNumber(priceRaw) ?? 0;
          out.push({ item: item || "(unknown)", quantity: q, price: p });
          continue;
        }
      }
      const parts = line.split(/\s+/);
      if (parts.length >= 3) {
        const maybeNums = parts.filter(p => /[0-9]/.test(p)).map(p => maybeNumber(p));
        if (maybeNums.length >= 1) {
          const price = maybeNums.pop();
          const qty = maybeNums.length > 0 ? maybeNums.pop() : 1;
          const item = parts.slice(0, parts.length - (price != null ? 1 : 0)).join(" ");
          out.push({ item: item || "(unknown)", quantity: qty ?? 1, price: price ?? 0 });
          continue;
        }
      }
    }
    return out;
  }

  // ===== file upload handler =====
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null);
    setExtractedData(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setIsProcessing(true);

    try {
      const name = file.name.toLowerCase();
      if (name.endsWith(".csv")) {
        const text = await file.text();
        const rows = parseCsvText(text);
        if (!rows || rows.length === 0) throw new Error("No usable rows found in CSV");
        setExtractedData({ rows: rows.length, preview: rows.slice(0, 200) });
        toast.success(`Parsed ${rows.length} rows from CSV`);
      } else if (name.endsWith(".json")) {
        const text = await file.text();
        let json;
        try { json = JSON.parse(text); } catch { throw new Error("Invalid JSON"); }
        const arr = Array.isArray(json) ? json : [json];
        const rows: any[] = [];
        for (const obj of arr) {
          if (typeof obj !== "object") continue;
          const n = normalizeColumns(obj);
          if (n.item == null && n.quantity == null && n.price == null) continue;
          rows.push({ item: n.item || "(unknown)", quantity: n.quantity ?? 1, price: n.price ?? 0 });
        }
        if (rows.length === 0) throw new Error("No usable items in JSON");
        setExtractedData({ rows: rows.length, preview: rows.slice(0, 200) });
        toast.success(`Parsed ${rows.length} items from JSON`);
      } else if (name.endsWith(".txt")) {
        const text = await file.text();
        const rows = parsePlainText(text);
        if (!rows || rows.length === 0) throw new Error("No usable rows found in TXT");
        setExtractedData({ rows: rows.length, preview: rows.slice(0, 200) });
        toast.success(`Parsed ${rows.length} rows from text file`);
      } else if (file.type.startsWith("image/")) {
        // send to server OCR endpoint using apiFetch (FormData)
        const fd = new FormData();
        fd.append("file", file);
        // apiFetch wrapper expects JSON for most endpoints, but it can handle form POSTs too
        const resp = await apiFetch("/api/ocr", { method: "POST", body: fd });
        // resp is parsed JSON (server returns { rows, text } or { rows: [], text: ... })
        const j = resp as any;
        if (!j) throw new Error("No response from OCR endpoint");
        if (j.rows && j.rows.length > 0) {
          setExtractedData({ rows: j.rows.length, preview: j.rows.slice(0, 200) });
          toast.success(`OCR parsed ${j.rows.length} rows from image`);
        } else {
          setParseError("OCR succeeded but no tabular rows were detected. Server text preview below.");
          setExtractedData({ rows: 0, preview: [], ocrText: j.text });
        }
      } else {
        // fallback: try to read as text
        const text = await file.text();
        const rows = parsePlainText(text);
        if (!rows || rows.length === 0) throw new Error("Unsupported file format or no usable rows");
        setExtractedData({ rows: rows.length, preview: rows.slice(0, 200) });
        toast.success(`Parsed ${rows.length} rows from file`);
      }
    } catch (err: any) {
      console.error("parse error:", err);
      setParseError(err?.message || String(err));
      toast.error("Failed to parse file: " + (err?.message || String(err)));
    } finally {
      setIsProcessing(false);
    }
  };

  function computeDemoMetric(data: any) {
    if (!data?.preview) return 0;
    let sum = 0;
    for (const r of data.preview) {
      const q = Number(r.quantity || 0);
      const p = Number(r.price || 0);
      sum += q * p;
    }
    return sum;
  }

  function bigintToBase64(bn: bigint) {
    let hex = bn.toString(16);
    if (hex.length % 2) hex = "0" + hex;
    const bytes = hex.match(/../g)!.map((h) => parseInt(h, 16));
    const str = String.fromCharCode(...bytes);
    return btoa(str);
  }

  const handleEncryptAndSubmit = async () => {
    if (!algorithm || !uploadedFile || !extractedData) {
      toast.error("Please select algorithm and upload a parsable file first");
      return;
    }
    if (algorithm !== "paillier") {
      toast.error("Only Paillier is implemented in this demo. CKKS coming soon.");
      return;
    }
    setEncrypting(true);
    try {
      const metric = computeDemoMetric(extractedData);
      const fixedScale = 100;
      const metricInt = BigInt(Math.round(metric * fixedScale));

      // use apiFetch for public key
      const pub = await apiFetch("/api/paillier/pub") as any;
      const n = BigInt(pub.n);
      const g = BigInt(pub.g);

      const paillier = await import("paillier-bigint");
      const publicKey = new paillier.PublicKey(n, g);
      const ciphertext = publicKey.encrypt(metricInt);
      const ciphertextB64 = bigintToBase64(ciphertext);

      // submit ciphertext
      const submitJson = await apiFetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          algorithm: "paillier",
          dataPreview: extractedData.preview,
          ciphertext: ciphertextB64,
          meta: {
            filename: uploadedFile.name,
            scale: fixedScale,
            metricInt: metricInt.toString(),
          },
        }),
      }) as any;

      setLastSubmissionId(submitJson.id);
      toast.success("Encrypted metric submitted (demo)");
    } catch (err: any) {
      console.error(err);
      toast.error("Encryption/submission failed: " + (err.message || err));
    } finally {
      setEncrypting(false);
    }
  };

  const handleFetchAggregate = async () => {
    try {
      const j = await apiFetch("/api/aggregate") as any;
      setAggregateCid(j.aggregateCid || null);
      toast.success("Fetched aggregated ciphertext");
    } catch (err: any) {
      toast.error("Failed to fetch aggregate: " + (err.message || err));
    }
  };

  const handleDecryptAggregate = async () => {
    try {
      const j = await apiFetch("/api/decrypt") as any;
      setDecryptedAggregate(Number(j.plaintext) / (j.scale || 100));
      toast.success("Decrypted aggregate (auditor)");
    } catch (err: any) {
      toast.error("Decrypt failed: " + (err.message || err));
    }
  };

  const handleAnalyze = () => {
    if (!algorithm || !uploadedFile) {
      toast.error("Please pick algorithm and upload file");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 400);
    toast.success("File parsed — review preview and Confirm & Encrypt to submit");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Try Platform</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Data Input</h2>
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg mb-2">Drag & Drop Your Data or Click to Browse</p>
                  <p className="text-sm text-muted-foreground">CSV, JSON, TXT, Images (receipts)</p>
                </label>
              </div>

              {isProcessing && (
                <div className="mt-6 p-4 bg-muted rounded-lg flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing file...</span>
                </div>
              )}

              {parseError && (
                <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">
                  <strong>Parse error:</strong> {parseError}
                </div>
              )}

              {extractedData && !isProcessing && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Extracted {extractedData.rows} data points</span>
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
                            <td className="px-4 py-2 text-sm">${Number(row.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <strong>Metric (auto):</strong>{" "}
                      <span className="font-medium">${computeDemoMetric(extractedData).toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleEncryptAndSubmit} disabled={encrypting}>
                        {encrypting ? "Encrypting..." : "Confirm & Encrypt This Data"}
                      </Button>
                      <Button variant="ghost" onClick={handleFetchAggregate}>
                        Fetch Aggregate (server)
                      </Button>
                    </div>

                    {lastSubmissionId && <div className="text-xs text-muted-foreground">Last submission id: {lastSubmissionId}</div>}
                    {aggregateCid && <div className="text-xs text-muted-foreground">Aggregate CID: {aggregateCid}</div>}
                    {decryptedAggregate !== null && (
                      <div className="mt-2 p-3 bg-green-50 text-green-800 rounded">
                        Decrypted aggregate (auditor): ${decryptedAggregate.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {uploadedFile && (
                <div className="mt-4 p-4 bg-muted rounded-lg flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Configuration</h2>

              <div className="mb-6">
                <Label className="text-lg mb-4 block">Select Algorithm</Label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose algorithm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map((alg) => (
                      <SelectItem key={alg.value} value={alg.value}>
                        <div className="py-1">
                          <div className="font-medium">{alg.label}</div>
                          <div className="text-xs text-muted-foreground">{alg.desc}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {algorithm && (
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Algorithm Details</h4>
                  <p className="text-sm text-muted-foreground">
                    {algorithm === "paillier"
                      ? "Paillier (additive HE) is implemented. It supports encrypted sums and scalar multiplications."
                      : algorithm === "ckks"
                      ? "CKKS support is coming soon — it will enable approximate arithmetic and multiplication of encrypted values."
                      : "Threshold HE support is coming soon — it will enable distributed decryption to avoid single-key trust."}
                  </p>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="flex-1">Back</Button>
                <Button className="flex-1" onClick={handleAnalyze} disabled={!algorithm || !uploadedFile}>Encrypt & Analyze</Button>
              </div>

              <div className="mt-6 p-4 rounded-lg border-dashed border border-muted">
                <div className="text-sm"><strong>CKKS integration:</strong> Coming soon — full homomorphic arithmetic for floats and multiplications.</div>
              </div>

              <div className="mt-4">
                <Button onClick={handleDecryptAggregate} variant="secondary" className="w-full">Auditor: Decrypt Aggregate (demo)</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
