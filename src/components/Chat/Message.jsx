import React from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { Done, DoneAll } from "@material-ui/icons";

const Message = ({ message, own, currentFriend, currentUser }) => {
  const photo = own
    ? currentUser?.profilePicture
    : currentFriend?.profilePicture;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <MessageContainer own={own}>
      <MessageTop>
        <MessageImg
          src={photo ? `${PF}${photo}` : `${PF}person/noAvatar.png`}
          alt=""
          own={own}
        />
        <MessageText own={own}>
          {message?.text && message.text.includes("www.") ? (
            <a
              href={`https://${message.text}`}
              target="_blank"
              style={{ textDecoration: "underline ", color: "blue" }}
            >
              {message.text}
            </a>
          ) : (
            message.text
          )}
          {own && (
            <span
              style={{
                position: "absolute",
                bottom: "12px",
                right: own && "3px",
              }}
            >
              {message.isRead ? (
                <DoneAll style={{ fontSize: "12px", color: "#758655" }} />
              ) : (
                <Done style={{ fontSize: "12px", color: "#758655" }} />
              )}
            </span>
          )}
        </MessageText>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 20px; */
  align-items: ${(props) => props.own && "flex-end"};
`;
const MessageTop = styled.div`
  display: flex;
  position: relative;
`;
const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const MessageText = styled.p`
  padding: 10px;
  /* padding-bottom: 20px; */
  border-radius: 10px;
  color: ${(props) => (props.own ? "black" : "white")};
  max-width: 300px;
  background-color: ${(props) => (props.own ? "lightgray" : "#1877f2")};
`;
const MessageBottom = styled.div`
  font-size: 12px;
  position: relative;
  color: gray;
  bottom: 15px;
`;
