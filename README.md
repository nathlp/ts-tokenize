# Token Creator Frontend (Web3, IPFS, MetaMask)

This is a simple frontend application that allows users to:

1. Connect their MetaMask wallet
2. Upload an image file
3. Send the image to a backend API (written in Go) which uploads it to IPFS via Pinata
4. Call a smart contract function to create a token using the returned IPFS URL
---

## Technologies Used

- React (Vite)
- ethers.js
- MetaMask
- FormData API (for file upload)
- Go backend with Pinata integration

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nathlp/ts-tokenize.git
cd ts-tokenize
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Local Development


### Related Projects

- [Backend Repository - Go API with IPFS integration](https://github.com/nathlp/go-tokenize)

- To test this project locally, you can run the Go backend server on your machine, and the frontend will connect to it automatically. Make sure the backend is running at `http://localhost:8080`.

---

## How It Works

### 1. Wallet Connection

The user clicks "Connect Wallet" to connect to MetaMask. The application uses `ethers.js` to request access to the user's Ethereum account, which is then used to sign transactions on the blockchain.

### 2. Image Upload

- The user selects an image using the upload form.
- On form submission, the frontend sends a `POST` request to the backend:

```
POST http://localhost:8080/upload
```

- The Go backend uploads the image to IPFS via Pinata and returns the IPFS URL in the response.

### 3. Smart Contract Interaction

- After receiving the IPFS URL, the frontend calls a smart contract function (e.g., `tokenizeAsset(tokenURI)`) using `ethers.js`.
- The contract mints a new token associated with the uploaded image via its token URI.

---

## Configuration

### Requirements

- MetaMask installed and configured
- The user must be connected to the correct network (e.g., local testnet)
- The contract ABI must be available in `ts-tokenize/abi.json`
- The contract address must be correctly set in the frontend code

---

## Project Structure

```
ts-tokenize/
├── public/
│   └── app.js
├── views/
│   └── index.ejs
├── .gitignore
├── abi.json
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## Notes

- This project assumes the backend server is running locally on `http://localhost:8080`
- Make sure the smart contract is deployed and accessible on the network selected in MetaMask
- For production, ensure proper CORS and security configurations are applied to the backend
