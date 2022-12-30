import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from '../util/web3_config'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = (conectorID:any) => {
    const connector = connectorsByName[conectorID]
    if (connector) {
      activate(connector, (error: Error) => alert(error.name+' '+error.message))
    } else {
      alert('The connector config is wriong')
    }
  }

  return { login, logout: deactivate }
}

export default useAuth