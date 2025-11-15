# Confidential Secure Metrics for Algorand

## Overview

The **Confidential Secure Metrics for Algorand** project enables secure, privacy-preserving analytics on sensitive financial and supply chain data. It uses **Homomorphic Encryption (HE)** and **OCR** technologies to analyze confidential documents without exposing raw data, ensuring that sensitive information remains private throughout the process.

## Features
- **Homomorphic Encryption (HE)**: Performs computations on encrypted data, allowing analysis without exposing sensitive information.
- **OCR for Document Analysis**: Extracts relevant data from uploaded documents (CSV, JSON, Images) for analysis.
- **Confidential Analytics**: Provides encrypted analysis results, ensuring complete privacy of data.

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohit230723/confidential-secure-metrics.git
2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
3. **Run the backend development server**:
   ```bash
   npm run dev

## Architecture
**Frontend**
- **Data Upload**: Users upload documents in various formats (CSV, JSON, Images).
- **Client-Side Encryption**: Data is encrypted locally in the browser using Paillier encryption. The public key is retrieved from the backend for encryption.
- **Submit Encrypted Data**: Encrypted metrics are submitted to the backend for aggregation and further processing.
- **Auditor Decryption**: The backend decrypts the aggregated data for authorized auditors to view the result.

**Backend**
- **Paillier Key Management**: Generates and stores Paillier public and private keys.
- **Ciphertext Storage**: Encrypted data (ciphertexts) and aggregated results are stored securely on algorand.
- **Homomorphic Aggregation**: The backend performs encrypted aggregation (sum, average, etc.) without ever decrypting the data.
- **Auditor Decryption**: Allows authorized users to decrypt the final aggregated result.

## Deployed Links
**Frontend Link**:
