import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Avatar, Button, Tooltip } from "@material-ui/core";
import { format } from "timeago.js";
import MenuListComment from "./MenuListComment";

const Comment = ({ comment, userId, delComment, upComment }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [style, setStyle] = useState({ display: "none" });
  const [tag, setTag] = useState("span");
  const [text, setText] = useState("span");

  const deleteComment = async () => {
    try {
      const deleteOne = await axios.delete(`/comments/comment/${comment._id}`);
      delComment(comment._id);
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = () => {
    setTag("textarea");
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/comments/comment/${comment._id}`, {
        text,
      });
      setTag("span");
      upComment(comment._id, text);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommentContainer
      onMouseEnter={() => setStyle({ display: "flex" })}
      onMouseLeave={() => setStyle({ display: "none" })}
    >
      <CommentWrapper>
        <CommentTop>
          <CommentLeft>
            {/* <CommentImg /> */}
            <Avatar
              src={
                comment.userId.profilePicture
                  ? PF + comment.userId?.profilePicture
                  : `${PF}person/noAvatar.png`
              }
            />
          </CommentLeft>
          <CommentRight>
            <CommentBox>
              <CommentName>{comment.userId.username}</CommentName>
              <CommentText
                as={tag}
                defaultValue={comment.text || null}
                onChange={(e) => setText(e.target.value)}
              >
                {tag === "span" ? comment.text : null}
              </CommentText>
              {tag === "textarea" && (
                <div style={{ padding: "10px" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setTag("span")}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CommentBox>
            <CommentRightBottom>
              <CommentLike>Like</CommentLike>
              <CommentTime>{format(comment.createdAt)}</CommentTime>
            </CommentRightBottom>
          </CommentRight>
          {userId === comment.userId._id && (
            <CommentOptions style={style}>
              <MenuListComment
                deleteComment={deleteComment}
                editComment={editComment}
              />
            </CommentOptions>
          )}
        </CommentTop>
      </CommentWrapper>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  width: 100%;
  max-width: 620px;
  background-color: white;
  margin-bottom: 10px;
  position: relative;
`;
const CommentWrapper = styled.div`
  padding: 5px 5px;
`;

const CommentTop = styled.div`
  display: flex;
  align-items: flex-start;
`;
const CommentLeft = styled.div`
  margin-right: 5px;
`;

const CommentImg = styled.img``;
const CommentRight = styled.div`
  max-width: 400px;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b9b8b8;
  border-radius: 20px;
  padding: 8px 12px;
`;
const CommentName = styled.span`
  font-size: 13px;
  color: white;
  font-weight: 500;
`;
const CommentText = styled.span`
  font-size: 14px;
`;

const CommentRightBottom = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin: 0 8px;
`;
const CommentLike = styled.div`
  font-size: 12px;
  cursor: pointer;
`;
const CommentTime = styled.div`
  font-size: 10px;
  margin: 0 5px;
`;

const CommentOptions = styled.div`
  align-self: center;
  margin-bottom: 20px;
  margin-left: 5px;
  border-radius: 50%;
  cursor: pointer;
`;
