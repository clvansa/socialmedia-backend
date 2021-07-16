import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/SocketContext";
import { Call, CallEnd } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";

const VideoOptions = ({ currentFriend }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    setVideoUsersId,
    videoUsersId,
  } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [idToCall, setIdToCall] = useState("");

  // console.log(videoUsersId);

  const getUserSocketId = () => {
    const socketId = videoUsersId.find(
      (user) => user.userId === currentFriend?._id
    );
    if (socketId) {
      return socketId.socketId;
    } else {
      return null;
    }
  };

  const handleClick = () => {
    setName(user?.username);
    console.log(user.username);
    callUser(getUserSocketId());
  };
  return (
    <VideoOptionsContainer>
      {callAccepted && !callEnded ? (
        <CallEnd onClick={leaveCall} color="secondary" />
      ) : (
        <Call onClick={handleClick} color="primary" />
      )}
    </VideoOptionsContainer>
  );
};

export default VideoOptions;

const VideoOptionsContainer = styled.div``;
