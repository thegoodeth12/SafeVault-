// hooks/useWallet.ts
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return {
    address,
    isConnected,
    connect,
    disconnect,
  }
}
