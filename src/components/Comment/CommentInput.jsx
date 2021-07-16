import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { EmojiEmotionsOutlined } from "@material-ui/icons";

const CommentInput = ({ user, postId, setComments }) => {
  const [comment, setComment] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      const newComment = {
        userId: user._id,
        postId,
        text: comment,
      };
      try {
        const res = await axios.post("/comments/", newComment);
        setComments((prevState) => [res.data, ...prevState]);
        setComment("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <CommentInputContainer>
      <CommentInputWarpper>
        <CommentInputBox>
          <CommentImg
            src={
              user.profilePicture
                ? `${PF}${user.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
          />
          <InputContainer>
            <InputComment
              placeholder="Write a comment..."
              onChange={handleChange}
              onKeyDown={handleSubmit}
              value={comment}
            />
            <EmojiEmotionsOutlined style={{ color: "white" }} />
          </InputContainer>
        </CommentInputBox>
      </CommentInputWarpper>
    </CommentInputContainer>
  );
};

export default CommentInput;

const CommentInputContainer = styled.div``;
const CommentInputWarpper = styled.div`
  padding: 10px 10px 0 10px;
`;
const CommentInputBox = styled.div`
  display: flex;
  align-items: center;
`;
const CommentImg = styled.img`
  width: 36px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

const InputContainer = styled.div`
  border-radius: 20px;
  background-color: #b9b8b8;
  width: 100%;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 10px;
  margin: 0 5px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;
const InputComment = styled.input`
  background-color: inherit;
  border: none;

  width: 100%;
  &::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
