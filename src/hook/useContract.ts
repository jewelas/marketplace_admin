import { useMemo } from "react"
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import ABC_ABI from 'contract/ABC_ABI.json'

declare enum ChainId {
    MAINNET = 56,
    BSCTESTNET = 97
}

export const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } => {
    const context = useWeb3ReactCore<Web3Provider>()
    const contextNetwork = useWeb3ReactCore<Web3Provider>('SIMPLE_NET')
    return context.active ? context : contextNetwork
}

export const useContract = (address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null => {
    const { library } = useActiveWeb3React()
    return useMemo(() => {
        if (!address || !ABI || !library) {
            return null
        }
        try {
            return new (window as any).web3.eth.Contract(ABI, address).methods
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library])
}

export const useTokenContract = (): Contract | null => {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && '0xf6F588e8F40a1169556D9640274868c008214474', ABC_ABI, false)
}