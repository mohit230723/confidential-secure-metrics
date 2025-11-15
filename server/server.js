// server/server.js  (ESM) - full server with OCR endpoint
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import cors from "cors";
import * as paillierBigint from "paillier-bigint";
import { fileURLToPath } from "url";
import multer from "multer";
import { createWorker } from "tesseract.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// multer setup for file uploads (in-memory or disk)
const upload = multer({
  dest: path.join(DATA_DIR, "uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ========== Paillier key + storage =============
let publicKey = null;
let privateKey = null;
let n = null;
let n2 = null;
let ciphertexts = []; // { id, ciphertext, meta }

// helpers for bigint/base64 conversion
function bigintToBase64(bn) {
  let hex = bn.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  const bytes = hex.match(/../g).map((h) => parseInt(h, 16));
  const buf = Buffer.from(bytes);
  return buf.toString("base64");
}
function base64ToBigint(b64) {
  const buf = Buffer.from(b64, "base64");
  const hex = Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
  return BigInt("0x" + hex);
}

// init Paillier keys at startup
async function initKeys() {
  console.log("Generating Paillier keypair (2048 bits) — this may take a few seconds...");
  const { publicKey: pk, privateKey: sk } = await paillierBigint.generateRandomKeys(2048);
  publicKey = pk;
  privateKey = sk;
  n = publicKey.n;
  n2 = n * n;
  console.log("Paillier keys ready.");
}

// ========== Simple parsers (same logic used server-side) =============
function maybeNumber(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).replace(/[$,]/g, "").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
function normalizeColumns(obj) {
  const keys = Object.keys(obj);
  const normalized = {};
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
function parsePlainText(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out = [];
  for (const line of lines) {
    if (line.includes(",")) {
      // try comma-separated very simply
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

// OCR route: receives image file, runs Tesseract in Node, tries to parse tabular rows and returns structured rows
app.post("/api/ocr", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "no file uploaded" });
    const filePath = req.file.path;
    const worker = createWorker({
      logger: (m) => { /* optional logging */ },
    });

    try {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const { data } = await worker.recognize(filePath);
      const rawText = data?.text || "";
      await worker.terminate();
      // remove temp file
      try { fs.unlinkSync(filePath); } catch(e){}

      if (!rawText || rawText.trim().length === 0) {
        return res.status(500).json({ error: "OCR produced empty text" });
      }

      // parse recognized text into rows
      const rows = parsePlainText(rawText);
      if (!rows || rows.length === 0) {
        // still return text so client has visibility
        return res.status(200).json({ rows: [], text: rawText, message: "OCR succeeded but no tabular rows detected" });
      }
      return res.status(200).json({ rows, text: rawText });
    } catch (innerErr) {
      try { fs.unlinkSync(filePath); } catch(e){}
      console.error("OCR inner error:", innerErr);
      return res.status(500).json({ error: "OCR failed: " + (innerErr && innerErr.message ? innerErr.message : "unknown") });
    }
  } catch (err) {
    console.error("OCR route error:", err);
    return res.status(500).json({ error: "server OCR error: " + (err?.message || String(err)) });
  }
});

// ========== Paillier endpoints =============
app.get("/api/paillier/pub", (req, res) => {
  if (!publicKey) return res.status(500).json({ error: "keys not ready" });
  res.json({ n: publicKey.n.toString(), g: publicKey.g.toString() });
});

app.post("/api/submit", (req, res) => {
  try {
    const { ciphertext, meta } = req.body;
    if (!ciphertext) return res.status(400).json({ error: "missing ciphertext" });
    const id = "sub_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    ciphertexts.push({ id, ciphertext, meta: meta || {} });
    try {
      fs.writeFileSync(path.join(DATA_DIR, "ciphertexts.json"), JSON.stringify(ciphertexts, null, 2));
    } catch (e) { /* ignore */ }
    return res.json({ ok: true, id });
  } catch (err) {
    console.error("submit error:", err);
    return res.status(500).json({ error: "internal" });
  }
});

app.get("/api/aggregate", (req, res) => {
  try {
    if (!publicKey) return res.status(500).json({ error: "keys not ready" });
    if (ciphertexts.length === 0) return res.json({ aggregate: null, count: 0 });
    let prod = 1n;
    for (const item of ciphertexts) {
      const bi = base64ToBigint(item.ciphertext);
      prod = (prod * bi) % n2;
    }
    const aggregateB64 = bigintToBase64(prod);
    const aggregateCid = "agg_demo_" + Date.now();
    try { fs.writeFileSync(path.join(DATA_DIR, aggregateCid + ".b64"), aggregateB64); } catch(e){}
    return res.json({ aggregate: aggregateB64, aggregateCid, count: ciphertexts.length });
  } catch (err) {
    console.error("aggregate error:", err);
    return res.status(500).json({ error: "internal" });
  }
});

app.get("/api/decrypt", (req, res) => {
  try {
    if (!privateKey) return res.status(500).json({ error: "keys not ready" });
    if (ciphertexts.length === 0) return res.status(400).json({ error: "no ciphertexts" });
    let prod = 1n;
    for (const item of ciphertexts) {
      const bi = base64ToBigint(item.ciphertext);
      prod = (prod * bi) % n2;
    }
    const plainBn = privateKey.decrypt(prod);
    const scale = 100;
    return res.json({ plaintext: plainBn.toString(), scale, count: ciphertexts.length });
  } catch (err) {
    console.error("decrypt error:", err);
    return res.status(500).json({ error: "internal" });
  }
});

// debug clear
app.post("/api/clear", (req, res) => {
  ciphertexts = [];
  try { fs.unlinkSync(path.join(DATA_DIR, "ciphertexts.json")); } catch(e){}
  return res.json({ ok: true });
});

// start
const PORT = process.env.PORT || 3000;
initKeys().then(() => {
  app.listen(PORT, () => {
    console.log(`Server (with OCR) listening at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("init keys failed:", err);
  process.exit(1);
});
