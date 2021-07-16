import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import ChatMessenger from "./ChatMessenger";
import VideoPlayer from "./VideoPlayer";
import { SocketContext } from "../../context/SocketContext";

const SmallChatMessanger = ({
  currentChat,
  showChat,
  setShowChat,
  minimize,
  setMinimize,
  friendName,
}) => {
  // const { arrivalMessage } = useContext(AuthContext);
  const { arrivalMessage } = useContext(SocketContext);

  useEffect(() => {
    arrivalMessage && !showChat && setShowChat(true);
  }, [arrivalMessage]);

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <ChatContianer showChat={showChat} minimize={minimize}>
      <ChatContianerTop
        onClick={() => setMinimize((prevMinimize) => !prevMinimize)}
      >
        <ChatContianerTopLeft>
          <ChatUserImg />
          <ChatUsername>{friendName}</ChatUsername>
        </ChatContianerTopLeft>
        <ChatContianerTopRight>
          <IconButton onClick={closeChat}>
            <Close />
          </IconButton>
        </ChatContianerTopRight>
      </ChatContianerTop>
      <ChatContianerCenter>
        <ChatMessenger currentChat={currentChat} smallChat={true} />
      </ChatContianerCenter>
      <ChatContianerBottom></ChatContianerBottom>
      <VideoPlayer />
    </ChatContianer>
  );
};

export default SmallChatMessanger;

const ChatContianer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 100px;
  width: 320px;
  height: 400px;
  background-color: whitesmoke;
  border: 1px solid #eee;
  height: ${(props) => (props.minimize ? "40px" : "450px")};
  box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.showChat ? "block" : "none")};
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  z-index: 10;
`;

const ChatContianerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #4e9af1;
  cursor: pointer;
  border-bottom: 1px solid #eee;
`;
const ChatContianerCenter = styled.div`
  object-fit: cover;
  height: calc(100% - 60px);
`;
const ChatContianerBottom = styled.div``;

const ChatContianerTopLeft = styled.div``;
const ChatContianerTopRight = styled.div`
  padding-right: 10px;
`;

const ChatUserImg = styled.img``;
const ChatUsername = styled.span`
  color: #ffffff;
  padding-left: 10px;
`;
