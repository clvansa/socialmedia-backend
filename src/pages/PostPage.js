import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReactPlayer from "react-player";
import ShowMoreText from "react-show-more-text";
import PostMenuItems from "../components/PostMenuItems";
import Topbar from "../components/Header/Topbar";

const PostPage = () => {
    const post = useLocation().state.post

    const [like, setLike] = useState(post.likes.length);
    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser, socketRef } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users/user?userId=${post.userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [post?.userId]);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    const likeHandler = async () => {
        try {
            const res = await axios.put(`/posts/${post._id}/like`);
            if (res.data.like) {
                //Check
                const data = {
                    receiverId: user._id,
                    postId: post._id,
                    notifyType: "like",
                    createdAt: Date.now(),
                };
                socketRef.current.emit("sendNotifiction", data); //edit for socket 
            }
            setLike(res.data.like ? like + 1 : like - 1); //Check
        } catch (err) {
            console.log(err);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div>
            <Topbar />
            <Container>

                <ContainerLeft></ContainerLeft>
                <ContainerCenter>
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
                                            <Link to={`/profile/${user.username}`}>
                                                <PostUsername>{user?.username}</PostUsername>
                                            </Link>
                                            <Link
                                                style={{ display: "inline-block" }}
                                                to={{
                                                    pathname: `/post/${post._id}`,
                                                    state: { tag: post?.location },
                                                }}
                                            >
                                                <PostLocation>{post?.location}</PostLocation>
                                            </Link>
                                        </div>

                                        <PostDate>{format(post.createdAt)}</PostDate>
                                    </PostInfo>
                                </PostTopLeft>
                                <PostTopRight>
                                    <PostMenuItems />
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
                                        playing={true}
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
                                    <PostCommentText>{post.comment} comments</PostCommentText>
                                </PostBottomRight>
                            </PostBottom>
                        </PostWrapper>
                    </PostConatiner>
                </ContainerCenter>
                <ContainerRight></ContainerRight>
            </Container>
        </div>
    )
}

export default PostPage;
const Container = styled.div`
    display:flex;
`
const ContainerLeft = styled.div`
    flex: 3.5;
`
const ContainerCenter = styled.div`
    flex: 5;
    min-width: 500px;
`
const ContainerRight = styled.div`
flex: 3.5;
`
const PostConatiner = styled.div`
  width: 100%;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
  border-radius: 10px;
  background-color: white;
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
  /* margin: 0 5px; */
`;
const PostDate = styled.span`
  font-size: 10px;
  color: gray;
`;

const PostLocation = styled.span`
  font-size: 13px;
  color: darkgray;
  padding-left: 10px;
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
