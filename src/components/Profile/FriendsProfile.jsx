import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

const FriendsProfile = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // get followings
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

  //Get Followers
  useEffect(() => {
    if (!user?._id) return;
    const getFollowers = async () => {
      try {
        const res = await axios.get(`/users/followers/${user?._id}`);
        setFollowers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [user?._id]);

  return (
    <FriendsProfileContainer>
      <FriendsProfileWrapper>
        <div>
          <RightbarTitle style={{ marginBottom: 10 }}>
            Followings:{" "}
            <span style={{ color: "red", fontSize: "16px" }}>
              {friends.length} followings{" "}
            </span>
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
        </div>
        {/* Follower */}
        <div>
          <RightbarTitle>
            Followers:{" "}
            <span style={{ color: "red", fontSize: "16px" }}>
              {followers.length} followers
            </span>
          </RightbarTitle>
          <RightbarFollowings>
            {followers?.map((follower) => (
              <RightbarFollowing key={follower._id}>
                <Link
                  to={`/profile/${follower.username}`}
                  onClick={() =>
                    (window.location.href = `/profile/${follower.username}`)
                  }
                >
                  <RightbarFollowingContianer>
                    <RightbarFollowingImage
                      src={
                        follower?.profilePicture
                          ? PF + follower.profilePicture
                          : `${PF}person/noAvatar.png`
                      }
                      alt="follower"
                    />
                    <RightbarFollowingName>
                      {follower.username}
                    </RightbarFollowingName>
                  </RightbarFollowingContianer>
                </Link>
              </RightbarFollowing>
            ))}
          </RightbarFollowings>
        </div>
      </FriendsProfileWrapper>
    </FriendsProfileContainer>
  );
};

export default FriendsProfile;

const FriendsProfileContainer = styled.div``;
const FriendsProfileWrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const RightbarFollowings = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  min-height: 300px;
  min-width: 500px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin-right: 20px;
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
const RightbarFollowing = styled.div``;

const RightbarFollowingContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  /* width: 80px; */
  margin: 5px;
  overflow: hidden;
`;
const RightbarFollowingImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10%;
  object-fit: cover;
`;

const RightbarFollowingName = styled.span`
  /* width: fit-content; */
`;
