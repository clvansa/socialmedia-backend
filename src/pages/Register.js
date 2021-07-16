import axios from 'axios';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== rePassword.current.value) {
            rePassword.current.setCustomValidity("password dont match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                history.push('/login')

            } catch (err) {
                console.log(err)
            }
        }


    }
    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginLeft>
                    <LoginLogo>Social Media</LoginLogo>
                    <LoginDesc>Connect with freinds and the world arround you on Social Media</LoginDesc>
                </LoginLeft>
                <LoginRight>

                    <LoginBox onSubmit={handleClick}>
                        <LoginInput
                            placeholder="Username"
                            ref={username}
                            required />

                        <LoginInput
                            placeholder="Email"
                            type="email"
                            ref={email}
                            required />

                        <LoginInput
                            placeholder="Password"
                            type="password"
                            ref={password}
                            required
                            minLength="6" />

                        <LoginInput
                            placeholder="Repassword"
                            type="password"
                            ref={rePassword}
                            required
                            minLength="6" />

                        <LoginButton>Sign Up</LoginButton>
                        <RegisterLogin>If you have a account <b style={{ color: "#42b72a" }}>Login</b></RegisterLogin>
                    </LoginBox>
                </LoginRight>
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Register

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
    height: 400px;
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

    
`
const RegisterLogin = styled.span`
    align-self: center;
    >b{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
`
