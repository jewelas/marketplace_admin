import React, { useState } from 'react';
import { Modal, Box, Button } from '@material-ui/core';

import ConnectRow from './ConnectRow';
import Web3 from 'web3';
import { connections, connectorLocalStorageKey } from "./entry";
import useAuth from 'hook/useAuth';

declare let window: any;

interface Props {
    open: any;
    setOpen: any;
}

const ConnectModal: React.FC<Props> = ({ open, setOpen }: any) => {
    const [id, setId] = useState(-1);
    const { login } = useAuth()
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
    }
    const connectWallet = async () => {
        login(connections[id].connectorId);
        window.localStorage.setItem(connectorLocalStorageKey, connections[id].connectorId);
        await loadWeb3()
        setId(id)
        setOpen(false)
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box style={{ transform: 'translate(-50%, -50%)' }} position='absolute' left='50%' top='50%' borderRadius='16px' bgcolor='rgba(13,16,45,1)' color='white' border='2px solid white'>
                <Box borderRadius='16px' padding='40px 26px 40px 25px' display='flex' flexDirection='column' justifyContent='center' alignItems='center' bgcolor='topbarbg.main'>
                    <Box color='cardtxt.contrastText' fontSize='24px' fontWeight='700' lineHeight='120%'>Connect to Wallet</Box>
                    <Box style={{gap: 16}} mt='30px' width='359px' display='flex' flexDirection='column'>
                        {connections.map((each: any, i: number) =>
                            <ConnectRow
                                key={i}
                                focus={id === each.id}
                                id={each.id}
                                name={each.name}
                                icon={each.icon}
                                setId={setId}
                            />
                        )}
                    </Box>
                    <Box mt='50px' width='100%' textAlign='center'>
                        <Button onClick={connectWallet} variant='contained' color='primary'>
                            Connect
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default ConnectModal;