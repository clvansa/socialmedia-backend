import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/SocketContext";
import { Button, Avatar } from "@material-ui/core/";
import { Call, CallEnd } from "@material-ui/icons";
import axios from "axios";

const VideoNotifications = () => {
  const { answerCall, call, callAccepted, leaveCall, videoUsersId } =
    useContext(SocketContext);
  const [caller, setCaller] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(call);

  useEffect(() => {
    const findUser = videoUsersId.find((user) => user.socketId === call.from);

    if (!findUser) return;
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/user?userId=${findUser.userId}`);
        setCaller(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [call]);

  return call.isReceivingCall && !callAccepted ? (
    <NotificationCallContainer>
      <NotificationCallWrapper>
        <CallInfo>
          <Avatar
            src={
              caller.profilePicture
                ? `${PF}${caller.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
          />
          <CallName>{caller.username} is calling you...</CallName>
        </CallInfo>
        <CallButtonOptions>
          <ButtonOption>
            <Button onClick={answerCall} color="primary" variant="contained">
              <Call title="Answer call" /> Answer
            </Button>
          </ButtonOption>

          <ButtonOption>
            <Button onClick={leaveCall} color="secondary" variant="contained">
              <CallEnd title="Hang up" /> Hang up
            </Button>
          </ButtonOption>
        </CallButtonOptions>
      </NotificationCallWrapper>
    </NotificationCallContainer>
  ) : null;
};

export default VideoNotifications;

const NotificationCallContainer = styled.div`
  width: 300px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  z-index: 1000;
`;

const NotificationCallWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const CallInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const CallName = styled.span`
  padding-left: 5px;
  font-weight: 500;
  font-size: 16px;
`;

const CallButtonOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonOption = styled.div`
  margin: 5px;
`;
