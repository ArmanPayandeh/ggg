'use client'
import { useState } from 'react'
import { encryptMessage } from '@/lib/crypto'
import { decryptAESResponse } from '@/lib/decrypt'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBox({ walletAddress }: { walletAddress: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  // Public key that matches the server's private key
  const receiverPublicKey =
    'q1VQYOOSsLaJeF2Ln4t0NBwbdPMlWn58teEWtNgGRy0='

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const encrypted = await encryptMessage(input, receiverPublicKey)

      const payload = {
        encrypted_key: encrypted.encrypted_key,
        encrypted_payload: encrypted.encrypted_payload,
        nonce: encrypted.nonce,
        client_id: walletAddress,
        timestamp: Date.now()
      }

      const res = await fetch('http://localhost:9000/infer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
  
      if (data.encrypted_payload) {
        const decrypted = await decryptAESResponse(
          data.encrypted_payload,
          encrypted.k_session,
          encrypted.nonce
        )
      setMessages([...newMessages, { role: 'assistant', content: decrypted }])
      }else {
        setMessages([...newMessages, { role: 'assistant', content: '[Error receiving response]' }])
      }

    } catch (e) {
      console.error(e)
      setMessages([...newMessages, { role: 'assistant', content: '[Encryption or server error]' }])
    }
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="bg-white/5 rounded-lg p-4 h-[500px] overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-purple-700' : 'bg-gray-700'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export async function encryptAES_GCM(
  plaintext: string
): Promise<{
  ciphertext: string
  key: Uint8Array
  nonce: string
}> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plaintext)
  const key = crypto.getRandomValues(new Uint8Array(32))
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt'])

  const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, data)

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
    key,
    nonce: btoa(String.fromCharCode(...iv))
  }
}
