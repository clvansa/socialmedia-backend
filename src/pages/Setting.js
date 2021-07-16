import Topbar from "../components/Header/Topbar";
import Container from '@material-ui/core/Container';
import AccountSetting from '../components/Setting/AccontSetting';
import styled from 'styled-components'


const Setting = () => {
    return (
        <div>
            <Topbar />
            <Container maxWidth="sm">
                <Title>Account Setting</Title>
                <AccountSetting />
            </Container>
        </div>
    )
}

export default Setting

const Title = styled.h3`
    padding-left: 10px;
`