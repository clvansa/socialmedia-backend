import { useState, useEffect, useContext, useRef, useCallback } from "react";
import Share from "./Share";
import styled from "styled-components";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress, Paper, Container } from "@material-ui/core";

const Feed = ({ username, video, bookmark }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
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

  const updatePost = () => {
    setUpdate(true);
  };

  //Fetch Posts
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const res = video
          ? await axios.get(`/posts/timeline/video?count=5&page=${page}`)
          : username
          ? await axios.get(`/posts/profile/${username}?count=5&page=${page}`)
          : bookmark
          ? await axios.get(`/posts/timeline/bookmark?count=5&page=${page}`)
          : await axios.get(`/posts/timeline/post?count=5&page=${page}`);
        if (res.data.length === 0) setLoadMore(false);

        setPosts((prevPost) => [...prevPost, ...res.data]);
        if (update) {
          setUpdate(false);
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [username, user?._id, update, page]);

  const items = posts.map((post, index) => {
    if (posts.length === index + 1) {
      return (
        <div key={post._id} ref={lastItem}>
          <Post post={post} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading && <CircularProgress />}
          </div>
        </div>
      );
    } else {
      return (
        <div key={post._id}>
          <Post post={post} update={updatePost} />
        </div>
      );
    }
  });

  console.log(items);
  return (
    <FeedConatiner>
      <FeedWrapper username={username}>
        {(!username || username === user?.username) && (
          <Share update={updatePost} />
        )}
        {items}
        {/* {!items.length && (
          <Container style={{ height: "50vh" }}>
            <Paper style={{ padding: "20px" }}>No post to show</Paper>
          </Container>
        )} */}
      </FeedWrapper>
    </FeedConatiner>
  );
};

export default Feed;

const FeedConatiner = styled.div`
  flex: 6;
  min-width: 680px;

  @media (max-width: 760px) {
    /* padding: 20px 20px; */
    flex: 1;
    min-width: 280px;
  }

`;

const FeedWrapper = styled.div`
  padding: 20px 100px;
  padding: ${(props) => props.username && "20px 0px"};
  margin-right: ${(props) => props.username && "20px "};

  @media (max-width: 760px) {
    padding: 20px 20px;
    /* padding: 20px 0 0 0px; */
    max-width: 480px;
  }
`;
