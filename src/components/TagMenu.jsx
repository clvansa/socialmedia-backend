import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const TagMenu = ({ user, setTagValue }) => {
  const [following, setFollowing] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (!user._id) return;
    const getFollowings = async () => {
      try {
        const res = await axios.get(`/users/friends/${user._id}`);
        setFollowing(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, [user]);

  return (
    <TagMenuContainer>
      <TagMenuWrapper>
        {following.map((follow) => (
          <FollowingInfo key={follow._id} onClick={() => setTagValue(follow)}>
            <FollowingImg
              src={
                follow.profilePicture
                  ? `${PF}${follow.profilePicture}`
                  : `${PF}person/noAvatar.png`
              }
            />

            <FollowingName>{follow.username}</FollowingName>
          </FollowingInfo>
        ))}
      </TagMenuWrapper>
    </TagMenuContainer>
  );
};

export default TagMenu;

const TagMenuContainer = styled.div`
  position: absolute;
  width: 200px;
  max-height: 350px;
  top: 60px;
  left: 50px;
  background-color: #e4dede;
  transform: translate(-50%);
  border-radius: 10px;
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
const TagMenuWrapper = styled.div`
  padding: 10px;
`;

const FollowingInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 5px;

  &:hover {
    background-color: gray;
    border-radius: 10px;
  }
`;
const FollowingImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const FollowingName = styled.span`
  padding-left: 10px;
`;
