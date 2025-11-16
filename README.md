# 🔐 Confidential Secure Metrics (CSM)

> Privacy-first analytics platform powered by Homomorphic Encryption and Algorand blockchain

## 📄 Project Overview

**Confidential Secure Metrics (CSM)** is a privacy-preserving analytics platform that enables organizations to compute metrics on sensitive data without ever exposing the raw information. Built for the Algorand ecosystem, CSM leverages **Paillier Homomorphic Encryption** to ensure complete data confidentiality while maintaining analytical capabilities.

### Key Innovation
- **Zero Raw Data Exposure**: All computations happen on encrypted data client-side
- **Blockchain Verifiability**: Encrypted metrics are published to Algorand TestNet for immutable proof
- **Multi-Format Support**: CSV, JSON, TXT, and OCR for images/receipts
- **Wallet Integration**: Seamless Pera Wallet connection for blockchain transactions

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+ and npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/mohit230723/confidential-secure-metrics.git
cd confidential-secure-metrics
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run node server for Paillier and OCR
```bash
node server/server.js
```

### 4. Run Backend Development Server
```bash
npm run dev
```
Backend will run on `http://localhost:3000`

---

## 🔗 Deployed Links

### 🌐 Live Demo
**Frontend (Vercel)**: [confidential-secure-metrics.vercel.app](confidential-secure-metrics.vercel.app)
(This is an old version newer version will be updated soon after fixing issues with some server problems)

### 📍 Algorand TestNet Transactions
View published encrypted metrics on Algorand TestNet Explorer:

**Example Transaction**:
- [https://lora.algokit.io/testnet/transaction/VURJMRHP74E6VGQJZTTEUIXHCYEFG6HW2A6KFPMLT67XLP76RXDA](https://lora.algokit.io/testnet/transaction/VURJMRHP74E6VGQJZTTEUIXHCYEFG6HW2A6KFPMLT67XLP76RXDA)

*Note: Transaction IDs are generated dynamically when users publish encrypted metrics via Pera Wallet*

**Verification Steps:**
1. Upload data on the platform
2. Click "Publish Encrypted Metric (Pera Wallet)"
3. Sign transaction with Pera Wallet
4. Copy the returned transaction ID
5. View on [lora.algokit.io/testnet](https://lora.algokit.io/testnet) to verify the encrypted ciphertext in the transaction note field

---

## 🧠 Architecture & Components

### System Flow
```
[User Upload] → [Parse Data] → [Compute Metric] → [Encrypt (Paillier)] → [Store Backend] → [Publish Algorand]
```

### Frontend Architecture
**Tech Stack**: React + Vite, TailwindCSS, TypeScript

**Components:**
1. **Data Upload & Parsing**
   - Multi-format support: CSV, JSON, TXT, PNG/JPG (OCR via Tesseract.js)
   - Extracts structured data: `{name, price, quantity}`
   - Client-side normalization

2. **Metric Computation Engine**
   - Computes: `metricValue = Σ(price × quantity)`
   - 100% client-side calculation (privacy-first)

3. **Paillier Encryption Module**
   - Fetches public key from backend: `GET /public-key`
   - Encrypts metric: `POST /encrypt`
   - Returns ciphertext string

4. **Blockchain Publishing (Pera Wallet)**
   - Connects to Pera Wallet via `@perawallet/connect`
   - Signs 0 ALGO self-transaction
   - Stores ciphertext in transaction **note field**
   - Broadcasts to Algorand TestNet
   - Returns transaction ID + explorer link

5. **Wallet Integration**
   - Custom connect modal
   - Full signing flow
   - Global polyfills for `algosdk` + Vite compatibility

### Backend Architecture
**Tech Stack**: Node.js, Express, node-paillier

**API Endpoints:**
- `GET /public-key` - Serve Paillier public key for client-side encryption
- `POST /encrypt` - Encrypt metric using public key
- `POST /submit` - Store encrypted ciphertext for aggregation

**Key Management:**
- Generates Paillier keypair on startup
- Public key distributed to clients
- Private key secured for auditor-only decryption

### Privacy Guarantees
✅ Raw data **never** leaves the client  
✅ Only encrypted ciphertexts sent to backend  
✅ Encryption key is public; decryption requires private key (auditor-only)  
✅ On-chain publishing ensures tamper-proof integrity  
✅ No smart contracts required (note field storage)  

---

## 🚀 How It Works (User Flow)

1. **Upload Sensitive Data**
   - User uploads CSV/JSON/TXT/Image file
   - System parses and extracts `{name, price, quantity}` rows

2. **Local Computation**
   - Metric calculated client-side: `Σ(price × quantity)`
   - No data sent to server yet

3. **Client-Side Encryption**
   - Fetch Paillier public key from backend
   - Encrypt computed metric locally in browser
   - Get encrypted ciphertext string

4. **Store Encrypted Metric**
   - Send ciphertext to backend via `POST /submit`
   - Backend stores for future aggregation

5. **Publish to Blockchain (Optional)**
   - Click "Publish Encrypted Metric"
   - Connect Pera Wallet
   - Sign 0 ALGO transaction with ciphertext in note
   - Get transaction ID for verification

6. **Verification**
   - View transaction on [lora.algokit.io](https://lora.algokit.io/testnet)
   - Confirm encrypted metric is immutably stored on-chain

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **OCR**: Tesseract.js
- **CSV Parsing**: PapaParse
- **Wallet**: @perawallet/connect
- **Blockchain**: algosdk

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Encryption**: node-paillier
- **Storage**: In-memory (extensible to PostgreSQL/MongoDB)

### Blockchain
- **Network**: Algorand TestNet
- **Wallet**: Pera Wallet
- **Transaction Type**: Payment (0 ALGO) with note field
- **Explorer**: lora.algokit.io

---

## 🎯 What We Built (MVP Features)

### ✅ Implemented
- [x] Multi-format data upload (CSV, JSON, TXT, OCR)
- [x] Client-side metric computation
- [x] Paillier Homomorphic Encryption integration
- [x] Public key distribution system
- [x] Encrypted ciphertext storage
- [x] Algorand TestNet publishing via Pera Wallet
- [x] Transaction note field storage (no smart contracts)
- [x] Explorer link generation
- [x] Full wallet connection flow
- [x] Privacy-preserving architecture

### 🔮 Future Enhancements
- [ ] CKKS encryption for approximate arithmetic (floats, multiplication)
- [ ] Aggregator service for combining multiple ciphertexts
- [ ] Auditor dashboard for authorized decryption
- [ ] IPFS storage for large ciphertexts
- [ ] Smart contracts for DAO governance
- [ ] Support for additional ML algorithms

---

## 🙏 Acknowledgments

- **Algorand Foundation** for the blockchain infrastructure
- **Pera Wallet** for seamless wallet integration
- **Microsoft SEAL / TenSEAL** for homomorphic encryption research
- **Lora AlgoKit** for the excellent TestNet explorer

---

**⭐ If you find this project useful, please star the repository!**
