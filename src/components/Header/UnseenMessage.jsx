import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UnseenMessage = ({ notification, messageLength }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const lastMessage = notification[messageLength - 1];
  const history = useHistory();


  const handleClick = async (recipient) => {
    try {
      const res = await axios.get(
        `/conversation/find/${user._id}/${recipient.sender}`
      );

      await history.push({
        pathname: "/chat",
        state: res.data,
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NotificationMessageContainer onClick={() => handleClick(lastMessage)}>
      <NotificationMessageWrapper>
        <NotificationMessageTop>
          <NotificationMessageImage
            src={
              notification?.sender?.profilePicture
                ? `${PF}${notification?.sender?.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NotificationMessageName>
              {notification && notification[0]?.sender}
            </NotificationMessageName>
            <NotificationMessageNotify>
              {/* hat {notification?.notifyType} your Post ! */}

              {notification && notification[messageLength - 1]?.text}
            </NotificationMessageNotify>
          </div>
        </NotificationMessageTop>

        <NotificationMessageBottom>
          <NotificationMessageTime>
            {format(notification && notification[messageLength - 1]?.createdAt)}{" "}
            hat send {messageLength} messages
          </NotificationMessageTime>
        </NotificationMessageBottom>
      </NotificationMessageWrapper>
      <NotificationMessageHr />
    </NotificationMessageContainer>
  );
};

export default UnseenMessage;

const NotificationMessageContainer = styled.div``;

const NotificationMessageWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    background-color: gray;
  }
`;
const NotificationMessageTop = styled.div`
  display: flex;
  align-items: flex-start;
`;
const NotificationMessageBottom = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const NotificationMessageImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  border: 1.5px solid #ffffff;
`;
const NotificationMessageName = styled.span`
  padding: 0 5px;
  font-size: 13px;
`;
const NotificationMessageNotify = styled.span`
  font-size: 13px;
  font-weight: 300;
`;
const NotificationMessageTime = styled.time`
  font-size: 9px;
  font-weight: 300;
`;
const NotificationMessageHr = styled.hr`
  margin: 0;
  border: none;
  border-top: 0.1px solid #e2c9c9;
`;
