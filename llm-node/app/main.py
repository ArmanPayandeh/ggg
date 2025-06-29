# app/main.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.crypto_utils import decrypt_payload, encrypt_response
from app.model_runner import run_model

app = FastAPI()

# for CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InferenceRequest(BaseModel):
    encrypted_key: str
    encrypted_payload: str
    nonce: str
    client_id: str
    timestamp: int

@app.post("/infer")
async def infer(request: InferenceRequest):
    try:
        plaintext, aes_key, nonce_bytes = decrypt_payload(
            encrypted_key=request.encrypted_key,
            encrypted_payload=request.encrypted_payload,
            nonce=request.nonce,
        )

        response_text = run_model(plaintext)

        encrypted_payload = encrypt_response(response_text, aes_key, nonce_bytes)

        return {
            "encrypted_payload": encrypted_payload,
            "proof": "dummy_hash_or_sig",
            "storage_ref": None
        }

    except Exception as e:
        return {"error": str(e)}
