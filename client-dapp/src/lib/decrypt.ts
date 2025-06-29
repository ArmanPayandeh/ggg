// lib/decrypt.ts
export async function decryptAESResponse(
  encryptedBase64: string,
  keyBytes: Uint8Array,
  nonceBase64: string
): Promise<string> {
  const encrypted = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0))
  const iv = Uint8Array.from(atob(nonceBase64), c => c.charCodeAt(0))

  // Import AES key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    'AES-GCM',
    false,
    ['decrypt']
  )

  // Decrypt
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encrypted
  )

  const decoder = new TextDecoder()
  return decoder.decode(decryptedBuffer)
}
