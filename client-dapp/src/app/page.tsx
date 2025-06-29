'use client'
import ChatBox from '@/components/ChatBox'
import WalletConnector from '@/components/WalletConnector'
import { useState } from 'react'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      {!walletAddress ? (
        <WalletConnector onConnect={(addr) => setWalletAddress(addr)} />
      ) : (
        <ChatBox walletAddress={walletAddress} />
      )}
    </main>
  )
}
