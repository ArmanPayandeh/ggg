'use client'

export default function WalletConnector({ onConnect }: { onConnect: (address: string) => void }) {
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const userAddress = accounts[0]
        onConnect(userAddress)
      } catch (err) {
        alert('Wallet connection failed')
      }
    } else {
      alert('MetaMask is not installed!')
    }
  }

  return (
    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 font-semibold"
    >
      Connect Wallet
    </button>
  )
}