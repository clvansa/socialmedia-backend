import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LoginUser } from '../context/AuthActions';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleclick = (e) => {
        e.preventDefault();
        LoginUser({
            email: email.current.value,
            password: password.current.value
        }, dispatch)
        console.log(user)
        history.push('/home')
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push("/home");
        }
    }, [history]);


    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginLeft>
                    <LoginLogo>Social Media</LoginLogo>
                    <LoginDesc>Connect with freinds and the world arround you on Social Media</LoginDesc>
                </LoginLeft>
                <LoginRight>

                    <LoginBox onSubmit={handleclick}>
                        <LoginInput placeholder="Email" type="email" ref={email} required />
                        <LoginInput placeholder="Password" type="password" minLength="6" ref={password} required />
                        <LoginButton disabled={isFetching}>{isFetching ? <CircularProgress size="20px" color="secondary" /> : "Log in"}</LoginButton>
                        <LoginForgot>Forgot Password? </LoginForgot>
                        <Link to="/register" style={{ display: "block" }}>
                            <LoginButton disabled={isFetching} style={{ backgroundColor: "#42b72a", alignSelf: "center", width: "60%" }}>{isFetching ? <CircularProgress size="20px" color="secondary" /> : "Create a new Account"}</LoginButton>
                        </Link>
                    </LoginBox>
                </LoginRight>
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginWrapper = styled.div`
    width: 70%;
    height:70%;
    display: flex;

`
const LoginLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    justify-content:center ;

`
const LoginLogo = styled.h3`
    font-size:50px;
    font-weight: 800;
    color:#1775ee;
    margin-bottom:10px ;
`
const LoginDesc = styled.span`
    font-size: 24px;
    padding-right: 20px;
`

const LoginRight = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    justify-content:center;
`
const LoginBox = styled.form`
    height: 300px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
`
const LoginInput = styled.input`
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
    &:focus{
        outline: none;
    }
`
const LoginButton = styled.button`
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:disabled{
    cursor: not-allowed;
}
`


const LoginForgot = styled.span`
    text-align: center;
    color: #1775ee;
`
