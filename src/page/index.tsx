import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import ConnectModal from 'component/ConnectModal'

interface Props {
    children?: any;
    open: boolean;
    setOpen: any;
}

const Layout: React.FC<Props> = ({ children, open, setOpen }: any) => {
    return (
        <Container>
            <Body component='main'>
                {children}
            </Body>
            <ConnectModal open={open} setOpen={setOpen} />
        </Container>
    );
}

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    min-height: 100%;
`

const Body = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
`

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;