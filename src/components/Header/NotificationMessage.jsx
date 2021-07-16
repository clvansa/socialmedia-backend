import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";

const NotificationMessage = ({ notification }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <NotificationMessageContainer>
      <NotificationMessageWrapper>
        <NotificationMessageTop>
          <NotificationMessageImage
            src={
              notification?.sender?.profilePicture
                ? `${PF}${notification?.sender?.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
          />
          <NotificationMessageName>
            {notification?.sender?.username}{" "}
          </NotificationMessageName>
          <NotificationMessageNotify>
            hat {notification?.notifyType} your Post !
          </NotificationMessageNotify>
        </NotificationMessageTop>

        <NotificationMessageBottom>
          <NotificationMessageTime>
            {format(notification?.createdAt)}
          </NotificationMessageTime>
        </NotificationMessageBottom>
      </NotificationMessageWrapper>
      <NotificationMessageHr />
    </NotificationMessageContainer>
  );
};

export default NotificationMessage;

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
  align-items: center;
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
