decentramind-mvp/
├── llm-node/                  # Secure LLM inference node (FastAPI + Docker)
│   ├── app/
│   │   ├── main.py            # Entry point (FastAPI server)
│   │   ├── model_runner.py    # Code to run model inference
│   │   ├── crypto_utils.py    # RSA / AES encryption/decryption
│   │   └── config.py          # Config vars & model settings
│   ├── Dockerfile             # Docker build for LLM node
│   ├── requirements.txt       # Python deps (FastAPI, cryptography, etc.)
│   └── README.md

├── client-dapp/               # Frontend app (Next.js or React + Tailwind)
│   ├── pages/                 # Main dApp UI
│   ├── components/            # ChatInput, WalletConnect, etc.
│   ├── lib/crypto.ts          # AES + Curve25519 utils for encryption
│   ├── public/
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md

├── .gitignore
└── README.md                  # Main README with instructions
