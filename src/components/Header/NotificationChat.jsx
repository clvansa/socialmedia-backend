import { useState } from "react";
import styled from "styled-components";
import UnseenMessage from "./UnseenMessage";

const NotificationChat = ({ open, notifications }) => {
  const handleOpen = () => {};

  const handleClose = () => {};

  return (
    <>
      <NotificationContainer open={open}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} onClick={() => handleOpen()}>
              {!!notification.length && (
                <UnseenMessage
                  notification={notification}
                  messageLength={notification.length}
                />
              )}
            </div>
          ))
        ) : (
          <>
            <p>No recent message</p>
          </>
        )}
      </NotificationContainer>
    </>
  );
};

export default NotificationChat;

const NotificationContainer = styled.div`
  position: absolute;
  /* height: 200px; */
  background-color: #494646;
  width: 250px;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%);
  flex-direction: column;
  display: ${(props) => (props.open ? "flex" : "none")};
  overflow: hidden;
  padding: 10px;
`;
