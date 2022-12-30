import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './util/web3_config'

const Web3ProviderNetwork = createWeb3ReactRoot('SIMPLE_NET')

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        {children}
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
