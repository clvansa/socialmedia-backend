import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReactPlayer from "react-player";
import ShowMoreText from "react-show-more-text";
import PostMenuItems from "./PostMenuItems";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { IconButton, Tooltip } from "@material-ui/core";
import Comments from "./Comment/Comments";
import { SocketContext } from "../context/SocketContext";

const Post = ({ post, update }) => {
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const { sendNotificationToSocket } = useContext(SocketContext);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [playing, setPlaying] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/user?userId=${post?.userId}`);
        setUser(res.data);
        setBookmark(post.bookmark.includes(currentUser?._id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [post]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/like`);
      console.log(res.data);
      if (res.data.like) {
        //Check
        const data = {
          receiverId: user._id,
          postId: post._id,
          notifyType: "like",
          createdAt: Date.now(),
        };
        sendNotificationToSocket(data);
      }
      setLike(res.data.like ? like + 1 : like - 1); //Check
    } catch (err) {
      console.log(err);
    }
    setIsLiked(!isLiked);
  };

  const handleSavePost = async () => {
    try {
      await axios.put(`/posts/bookmark/post/${post._id}`);
      setBookmark((prevBookMark) => !prevBookMark);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PostConatiner>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${user.username}`}>
              <PostProfileImage
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    : PF + "person/noAvatar.png"
                }
              />
            </Link>
            <PostInfo>
              <div>
                <Link to={`/profile/${user?.username}`}>
                  <PostUsername>{user?.username}</PostUsername>
                </Link>
                {post.feeling && (
                  <PostFeeling>
                    is
                    <span style={{ fontSize: "14px", padding: "1px" }}>
                      {post.feeling.char}
                    </span>
                    feeling {post.feeling.name}.
                  </PostFeeling>
                )}

                <Link to="/">
                  <PostLocation>{post?.location}</PostLocation>
                </Link>
              </div>
              <Link
                to={{
                  pathname: `/post/${post._id}`,
                  state: { post: post },
                }}
                style={{ marginTop: "-7px" }}
              >
                <PostDate>{format(post.createdAt)}</PostDate>
                <PostDate title={post?.lastEdit && format(post?.lastEdit)}>
                  {post?.lastEdit && " Edited"}
                </PostDate>
              </Link>
            </PostInfo>
          </PostTopLeft>
          <PostTopRight>
            {currentUser?._id === post.userId ? (
              <PostMenuItems
                post={post}
                userId={currentUser?._id}
                update={update}
              />
            ) : (
              <Tooltip
                title={
                  bookmark
                    ? "Delete post from bookmark"
                    : "Save post to bookmark"
                }
              >
                <IconButton onClick={() => handleSavePost()}>
                  {bookmark ? (
                    <BookmarkIcon style={{ color: "orange" }} />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PostTopRight>
        </PostTop>
        <PostCenter>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="my-anchor-css-class"
            expanded={false}
          >
            <PostText>{post?.desc}</PostText>
          </ShowMoreText>
          <PostImage src={post.img && PF + post.img} alt="" />
          {post?.video && (
            <ReactPlayer
              url={post.video && PF + post.video}
              controls={true}
              width={"100%"}
              onMouseOver={() => setPlaying(true)}
              onMouseLeave={(e) => setPlaying(false)}
              playing={playing}
              volume={0.5}
              muted={true}
            />
          )}
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            <PostBottomLikeIcon src={`${PF}like.png`} onClick={likeHandler} />
            <PostBottomLikeIcon src={`${PF}heart.png`} />
            <PostLikeCounter>
              {isLiked && "You and"} {isLiked ? like - 1 : like} people like it
            </PostLikeCounter>
          </PostBottomLeft>
          <PostBottomRight>
            <PostCommentText onClick={() => setShowComments(true)}>
              {post.comment} comments
            </PostCommentText>
          </PostBottomRight>
        </PostBottom>
      </PostWrapper>
      {showComments && <Comments postId={post._id} user={currentUser} />}
    </PostConatiner>
  );
};

export default Post;

const PostConatiner = styled.div`
  width: 100%;
  max-width: 660px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: auto;
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: white;

  @media (max-width: 910px) {
    width: 90%;
    margin: 30px auto;
  }
`;
const PostWrapper = styled.div`
  padding: 20px;
`;
const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostTopRight = styled.div``;
const PostProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  margin-top: 5px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const PostUsername = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const PostFeeling = styled.span`
  padding-left: 5px;
  font-size: 13px;
`;

const PostDate = styled.span`
  font-size: 10px;
  color: gray;
`;

const PostLocation = styled.span`
  font-size: 13px;
  color: darkgray;
  padding-left: 5px;
`;
const PostCenter = styled.div`
  margin: 20px 0;
`;
const PostText = styled.span``;
const PostImage = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostBottomLeft = styled.div`
  display: flex;
`;
const PostBottomLikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;
const PostLikeCounter = styled.span`
  font-size: 15px;
`;
const PostBottomRight = styled.div``;
const PostCommentText = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
`;
