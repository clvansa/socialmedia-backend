import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import ChatMessenger from '../components/Chat/ChatMessenger';
import { AuthContext } from '../context/AuthContext';
import ChatMessagerConversation from '../components/Chat/ChatMessagerConversation';
import Topbar from '../components/Header/Topbar';
import { useLocation } from 'react-router-dom'

const Chat = () => {
    const { user } = useContext(AuthContext);
    const [currentChat, setCurrentChat] = useState(null);
    const location = useLocation().state

    useEffect(() => {
        setCurrentChat(location)
    }, [location])
    return (
        <>
            <Topbar />
            <ChatContainer>
                <ChatContainerLeft>
                    <ChatMessagerConversation
                        user={user}
                        setCurrentChat={setCurrentChat}
                    />
                </ChatContainerLeft>
                <ChatContainerCenter>
                    <ChatMessenger currentChat={currentChat} />
                </ChatContainerCenter>
                <ChatContainerRight>
                    Contact
                </ChatContainerRight>
            </ChatContainer>
        </>

    )
}

export default Chat;

const ChatContainer = styled.div`
    display: flex;
            `
const ChatContainerLeft = styled.div`
    flex: 3;
            `
const ChatContainerCenter = styled.div`
    flex: 6;
    height: calc(100vh - 70px);
            `
const ChatContainerRight = styled.div`
    flex: 3;
            `

