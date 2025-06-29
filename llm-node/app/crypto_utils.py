# app/crypto_utils.py
import base64
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from nacl.public import PrivateKey, SealedBox



def decrypt_payload(encrypted_key: str, encrypted_payload: str, nonce: str) -> str:
    PRIVATE_KEY_BASE64 = "IF+alcQWuNRx5ZIEUspk0C4rDMuMJ4xxfRkS6xH56BI="
    private_key = PrivateKey(base64.b64decode(PRIVATE_KEY_BASE64))
    sealed_box = SealedBox(private_key)

    aes_key = sealed_box.decrypt(base64.b64decode(encrypted_key))

    nonce_bytes = base64.b64decode(nonce)
    ciphertext = base64.b64decode(encrypted_payload)

    cipher = AES.new(aes_key, AES.MODE_GCM, nonce=nonce_bytes)
    decrypted = cipher.decrypt_and_verify(ciphertext[:-16], ciphertext[-16:])

    return decrypted.decode("utf-8"), aes_key, nonce_bytes


def encrypt_response(response_text: str, key: bytes, nonce: bytes) -> str:
    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    encrypted, tag = cipher.encrypt_and_digest(response_text.encode("utf-8"))
    payload = encrypted + tag
    return base64.b64encode(payload).decode()
