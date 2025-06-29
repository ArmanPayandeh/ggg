# app/crypto_utils.py
from Crypto.Cipher import AES
import base64
from nacl.public import PrivateKey, SealedBox
from nacl.utils import random as random_bytes
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from nacl.public import SealedBox, PrivateKey



def decrypt_payload(encrypted_key: str, encrypted_payload: str, nonce: str) -> str:
    PRIVATE_KEY_BASE64 =  "B61hvTQQg0pZ1gUyrqSiZsHaahXnWtVdr7cA04Ot8JY="
    private_key = PrivateKey(base64.b64decode(PRIVATE_KEY_BASE64))
    sealed_box = SealedBox(private_key)

    aes_key = sealed_box.decrypt(base64.b64decode(encrypted_key))

    nonce_bytes = base64.b64decode(nonce)
    ciphertext = base64.b64decode(encrypted_payload)

    cipher = AES.new(aes_key, AES.MODE_GCM, nonce=nonce_bytes)
    decrypted = cipher.decrypt_and_verify(ciphertext[:-16], ciphertext[-16:]) 

    return decrypted.decode("utf-8")
def encrypt_response(response_text: str) -> dict:
    key = get_random_bytes(32)  # AES key
    nonce = get_random_bytes(12)

    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    encrypted = cipher.encrypt(response_text.encode('utf-8'))

    return {
        "payload": base64.b64encode(encrypted).decode(),
        "key": base64.b64encode(key).decode(),  # just for test now
        "nonce": base64.b64encode(nonce).decode()
    }
