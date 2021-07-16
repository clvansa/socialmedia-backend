import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Conversations from "./Conversations";
import { SocketContext } from "../../context/SocketContext";

const ChatMessagerConversation = ({ setCurrentChat, user }) => {
  const { setConversations, conversations } = useContext(SocketContext);
  const [active, setActive] = useState("");

  //Get Conversation
  useEffect(() => {
    const getCovnersation = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`/conversation/`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCovnersation();
  }, [user]);

  const handleClick = async (conversation) => {
    setCurrentChat(conversation);
    setActive(conversation._id);
    try {
      await axios.put(`/message/${conversation?._id}`, { userId: user?._id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder="Search for friends" />
          {conversations?.map((conversation) => (
            <div
              key={conversation?._id}
              onClick={() => handleClick(conversation)}
            >
              <Conversations
                conversation={conversation}
                currentUser={user}
                active={active}
              />
            </div>
          ))}
          <Conversations />
        </ChatMenuWrapper>
      </ChatMenu>
    </>
  );
};

export default ChatMessagerConversation;

const ChatMenu = styled.div`
  flex: 3.5;
  height: calc(100vh - 50px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
  }
`;
const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;
const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #e1e1e1;
  &:focus {
    outline: none;
  }
`;
