import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { CircularProgress } from "@material-ui/core";

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const observer = useRef();

  const lastItem = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && loadMore) {
            setPage((prevPage) => prevPage + 1);
            setSeeMore(false);
          }
        },
        { threshold: 1 }
      );

      if (element) {
        observer.current.observe(element);
      }
    },
    [loadMore]
  );

  useEffect(() => {
    setIsLoading(true);
    const getComments = async () => {
      try {
        const res = await axios.get(
          `/comments/post/${postId}?count=2&page=${page}`
        );
        if (res.data.length === 0) setLoadMore(false);
        setComments((prevComments) => [...prevComments, ...res.data]);
      } catch (err) {
        console.log(err);
      }
    };

    setIsLoading(false);
    getComments();
  }, [postId, page]);

  const handleClick = () => {
    setSeeMore(true);
  };

  const deleteComment = (id) => {
    const commentFilter = comments.filter((comment) => comment._id !== id);
    setComments([...commentFilter]);
  };

  const updateComment = (id, text) => {
    const index = comments.findIndex((comment) => comment._id === id);
    comments[index].text = text;
  };

  const items = comments.map((comment, index) => {
    if (seeMore) {
      return (
        <div key={comment._id} ref={lastItem}>
          <Comment
            comment={comment}
            userId={user._id}
            delComment={deleteComment}
            upComment={updateComment}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading && <CircularProgress />}
          </div>
        </div>
      );
    } else {
      return (
        <div key={comment._id}>
          <Comment
            comment={comment}
            userId={user._id}
            delComment={deleteComment}
            upComment={updateComment}
          />
        </div>
      );
    }
  });

  return (
    <CommentsContainer>
      <CommentsWrapper>
        <CommentInput postId={postId} user={user} setComments={setComments} />
        {items}

        {loadMore && (
          <p
            onClick={handleClick}
            style={{ cursor: "pointer", color: "blue", margin: "0px" }}
          >
            See more
          </p>
        )}
      </CommentsWrapper>
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = styled.div`
  width: 100%;
  max-width: 660px;
  background-color: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 10px 10px;
  padding-bottom: 20px;
`;
const CommentsWrapper = styled.div`
  padding: 0 10px;
`;
