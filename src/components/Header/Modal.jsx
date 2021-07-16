import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import styled from "styled-components";
import Post from "../Post";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "800px",
    height: "800px",
    // backgroundColor: "rgba(255,255,255,0.5)",
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    border: 0,
    outline: 0,
    margin: 0,
  },
}));

export default function SimpleModal({ postId, handleClose, handleOpen, open }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        await setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <CloseButton onClick={handleClose}>X</CloseButton>
      {post && <Post post={post} />}
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

const CloseButton = styled.span`
  position: absolute;
  left: 10px;
  top: 40px;
  background: #ffffff;
  border-radius: 50%;
  padding: 3px 6px;
  /* font-weight: bold; */
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #a19f9f;
  }
`;
