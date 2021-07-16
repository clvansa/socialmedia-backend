import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Conversations = ({ conversation, currentUser, active }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation?.members.find(
      (memberId) => memberId !== currentUser?._id
    );
    const getUser = async () => {
      if (!friendId) return;
      try {
        const res = await axios.get(`/users/user?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    user && (
      <ConversationsContainer
        key={conversation?._id}
        active={conversation._id === active}
      >
        <ConversationsImg
          src={
            user?.profilePicture
              ? `${PF}${user?.profilePicture}`
              : `${PF}person/noAvatar.png`
          }
          alt=""
        />
        <ConversationsName>{user?.username} </ConversationsName>
      </ConversationsContainer>
    )
  );
};

export default Conversations;

const ConversationsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-radius:10px;

  &:hover {
    background-color: rgba(245, 243, 243);
    color: black;
  }
  background-color: ${(props) => (props.active ? "#383535" : "none")};
  color: ${(props) => (props.active ? "#ffffff" : "black")};
`;
const ConversationsImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const ConversationsName = styled.span`
  font-weight: 500;
`;
