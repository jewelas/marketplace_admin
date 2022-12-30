import Icon1 from 'asset/images/connect/1.svg'
import Icon2 from 'asset/images/connect/2.svg'

export interface PopupProps {
    open: boolean
    setOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void
}

export enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    BSC = "bsc",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
    id: number;
    name: string;
    icon: any;
    connectorId: ConnectorNames;
}

export interface CheckboxProps {
    checked: boolean;
    setChecked: any;
}

export const connections: Config[] = [
    {
        id  : 0,
        name: 'Metamask',
        icon: Icon1,
        connectorId: ConnectorNames.Injected,
    },
    {
        id  : 1,
        name: 'Wallet Connect',
        icon: Icon2,
        connectorId: ConnectorNames.WalletConnect,
    },
];

export const connectorLocalStorageKey = "connectorId";