import React from 'react';
import { Box } from '@material-ui/core';

interface Props {
    focus?: boolean;
    id: any;
    name: any;
    icon: any;
    setId: any;
}

const ConnectRow: React.FC<Props> = ({ focus, id, name, icon, setId }: any) => {
    return (
        <Box width='calc(100% - 42px)' height='26px'
            className='cursor-pointer'
            bgcolor={!focus ? 'connectmodal.main' : 'transparent'}
            borderRadius='40px'
            display='flex' justifyContent='space-between' alignItems='center'
            padding='19.75px 20px'
            onClick={() => {
                setId(id)
            }}
        >
            <Box display='flex' alignItems='center'>
                <Box width='26px' height='26px'
                    borderRadius='50%'
                    border={focus ? '1px solid' : '2px solid'}
                    borderColor={focus ? 'cardtxt.main' : '#BABBD3'}
                    position='relative'
                >
                    {focus &&
                        <Box
                            style={{ transform: 'translate(-50%, -50%)'}}
                            width='13px' height='13px' borderRadius='50%' bgcolor='yellow' position='absolute' left='50%' top='50%'
                        />
                    }
                </Box>
                <Box color='cardtxt.contrastText' ml='15px'>{name}</Box>
            </Box>
            <Box width='40px' height='40px' borderRadius='50%' bgcolor='#EEEEEE' display='flex' justifyContent='center' alignItems='center'>
                <img src={icon} alt='connection-icon' />
            </Box>
        </Box>
    );
}

export default ConnectRow;