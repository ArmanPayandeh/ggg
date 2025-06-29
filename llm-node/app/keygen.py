from nacl.public import PrivateKey
import base64

key = PrivateKey.generate()
print("PRIVATE_KEY_BASE64:", base64.b64encode(bytes(key)).decode())
print("PUBLIC_KEY_BASE64:", base64.b64encode(bytes(key.public_key)).decode())
