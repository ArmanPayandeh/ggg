import sodium from 'libsodium-wrappers-sumo'

export async function encryptMessage(message: string, receiverPublicKeyBase64: string) {
  await sodium.ready
  const encoder = new TextEncoder()

  const aesKey = crypto.getRandomValues(new Uint8Array(32))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const messageBytes = encoder.encode(message)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    aesKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    messageBytes
  )

  const encryptedAESKey = sodium.crypto_box_seal(
    aesKey,
    sodium.from_base64(receiverPublicKeyBase64, sodium.base64_variants.ORIGINAL)
  )

  return {
    encrypted_payload: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
    encrypted_key: btoa(String.fromCharCode(...encryptedAESKey)),
    k_session: aesKey,
    nonce: btoa(String.fromCharCode(...iv))
  }
}
