import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const UserFollowings = ({ user, setValue }) => {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (!user?._id) return;
        const friendList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  return (
    <UserFollowingsContainer>
      <UserFollowingsWrapper>
        <RightbarTitle style={{ marginBottom: 10 }} onClick={() => setValue(2)}>
          Followings: {friends.length} friends
        </RightbarTitle>
        {/* //Follwings */}
        <RightbarFollowings>
          {friends.map((friend) => (
            <RightbarFollowing key={friend._id}>
              <Link
                to={`/profile/${friend.username}`}
                onClick={() =>
                  (window.location.href = `/profile/${friend.username}`)
                }
              >
                <RightbarFollowingContianer>
                  <RightbarFollowingImage
                    src={
                      friend?.profilePicture
                        ? PF + friend.profilePicture
                        : `${PF}person/noAvatar.png`
                    }
                    alt="follower"
                  />
                  <RightbarFollowingName>
                    {friend.username}
                  </RightbarFollowingName>
                </RightbarFollowingContianer>
              </Link>
            </RightbarFollowing>
          ))}
        </RightbarFollowings>
      </UserFollowingsWrapper>
    </UserFollowingsContainer>
  );
};

export default UserFollowings;

const UserFollowingsContainer = styled.div`
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  height: 450px;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;

`;

const UserFollowingsWrapper = styled.div`
  padding: 10px;
`;

const RightbarFollowings = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  cursor: pointer;

`;

const RightbarFollowing = styled.div``;

const RightbarFollowingContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  width: 80px;
  margin: 5px;
  overflow: hidden;
`;
const RightbarFollowingImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10%;
  object-fit: cover;
`;

const RightbarFollowingName = styled.span`
  /* width: fit-content; */
`;
