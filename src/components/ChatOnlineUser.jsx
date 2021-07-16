import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

const ChatOnlineUser = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { setConversations } = useContext(SocketContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${currentUserId}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers?.includes(friend?._id))
    );
  }, [onlineUsers, friends]);

  const handleOpenNewConversation = async (fid) => {
    const newConversation = {
      senderId: currentUserId,
      receiverId: fid,
    };
    try {
      const newConv = await axios.post("/conversation/", newConversation);
      const res = await axios.get(`/conversation/${currentUserId}`);
      if (newConv.status === 200) {
        return setCurrentChat(newConv.data);
      } else if (newConv.status === 201) {
        setConversations(res.data);
        setCurrentChat(newConv.data);
      }
      console.log(res.status);
    } catch (err) {
      console.log(err);
      // getConversationIncludesTwoId(fid);
    }
  };

  const getConversationIncludesTwoId = async (userId) => {
    try {
      const res = await axios.get(
        `/conversation/find/${currentUserId}/${userId}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChatOnlineContainer>
      {friends.map((friend) => (
        <ChatOnlineFriend
          key={friend._id}
          onClick={() => handleOpenNewConversation(friend?._id)}
        >
          <ChatOnlineImgContainer>
            <ChatOnlineImg
              src={
                friend?.profilePicture
                  ? `${PF}${friend.profilePicture}`
                  : `${PF}person/noAvatar.png`
              }
              alt="picture"
            />
            {onlineUsers?.includes(friend._id) && <ChatOnlineBudge />}
          </ChatOnlineImgContainer>
          <ChatOnlineName>{friend?.username}</ChatOnlineName>
        </ChatOnlineFriend>
      ))}
    </ChatOnlineContainer>
  );
};

export default ChatOnlineUser;

const ChatOnlineContainer = styled.div``;
const ChatOnlineFriend = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;

const ChatOnlineImgContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

const ChatOnlineImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;

const ChatOnlineBudge = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  top: 0;
  right: 0;
  border: 2px solid white;
`;
const ChatOnlineName = styled.span``;
