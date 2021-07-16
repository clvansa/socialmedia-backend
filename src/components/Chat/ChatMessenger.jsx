import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import axios from "axios";
import ChatMessagerInput from "./ChatMessagerInput";
import { CircularProgress, IconButton } from "@material-ui/core";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import VideoOptions from "./VideoOptions";
import { SocketContext } from "../../context/SocketContext";

const ChatMessenger = ({ currentChat, smallChat }) => {
  const { user } = useContext(AuthContext);

  const { arrivalMessage, tempMessages, sendMessageToSocket, seenMsg } =
    useContext(SocketContext);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [count, setCount] = useState(50);
  const [showEmoji, setShowEmoji] = useState(false);

  const observer = useRef();
  const inputRef = useRef();
  const scrollRef = useRef();

  //Last Messages
  const lastItem = useCallback(
    (element) => {
      if (isLoading) return;
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
    [isLoading, loadMore]
  );

  //Focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  //Get Messages from database
  useEffect(() => {
    if (page == 1) return;
    setIsLoading(true);
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(
          `/message/msg/${currentChat._id}?count=${count}&page=${page}`
        );

        if (res.data.messages.length === 0) setLoadMore(false);
        setMessages((prvMsg) => [...prvMsg, ...res.data.messages]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    currentChat?._id && getMessages();
  }, [page]);

  //Get first time Message
  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(
          `/message/msg/${currentChat?._id}?count=50&page=1`
        );

        setMessages(res.data.messages);
        console.log("worket");
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  // Send a Message
  const handleSendMsg = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const dataToSocket = {
      senderId: user?._id,
      receiverId: currentFriend?._id,
      text: newMessage,
      isRead: false,
    };
    sendMessageToSocket(dataToSocket);
    try {
      const res = await axios.post("/message/", message);
      setMessages((prevMsg) => [res.data, ...prevMsg]);
      setCount((prvCount) => prvCount + 1);
      setNewMessage("");
      setShowEmoji(false);
    } catch (err) {
      console.log(err);
    }
  };

  //get Message from Socket
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prvState) => [arrivalMessage, ...prvState]);
  }, [arrivalMessage]); // currentChat

  //get Current Friend Information
  useEffect(() => {
    const friendId = currentChat?.members.find(
      (memberId) => memberId !== user?._id
    );
    const getUser = async () => {
      if (!friendId) return;

      try {
        const res = await axios.get(`/users/user?userId=${friendId}`);
        setCurrentFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, currentChat]);

  //Get Read Message
  const getReadMsg = async () => {
    const data = {
      receiverId: currentFriend?._id,
      messages,
      userId: user._id,
      conversationId: currentChat?._id,
    };
    seenMsg(data);
    try {
      await axios.put(`/message/${currentChat?._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    currentChat?.members.includes(tempMessages.userId) &&
      currentChat?.members.includes(tempMessages.receiverId) &&
      setMessages(() =>
        tempMessages.messages.map((message) => {
          if (message.isRead === false) {
            const isRead = (message.isRead = true);
            return { ...message, isRead };
          } else {
            return message;
          }
        })
      );
  }, [tempMessages, currentChat]);

  //Emoji
  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prvMsg) => prvMsg + emojiObject.emoji);
  };

  const items = messages.map((message, index) => {
    if (messages.length === index + 1) {
      return (
        <div key={message?._id} ref={lastItem}>
          <Message
            message={message}
            own={message.sender === user._id}
            currentFriend={currentFriend}
            currentUser={user}
          />
        </div>
      );
    } else {
      return (
        <div key={message?._id}>
          <Message
            message={message}
            own={message.sender === user._id}
            currentFriend={currentFriend}
            currentUser={user}
          />
        </div>
      );
    }
  });

  return (
    <>
      <ChatBox>
        <ChatBoxWrapper>
          {currentChat ? (
            <>
              <ChatBoxTop onClick={() => setShowEmoji(false)}>
                {items}
                {isLoading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <CircularProgress size="14px" />
                  </div>
                )}
              </ChatBoxTop>
              <ChatBoxBottom>
                {!smallChat ? (
                  <ChatMessagerInput
                    setNewMessage={setNewMessage}
                    handleSendMsg={handleSendMsg}
                    newMessage={newMessage}
                    inputRef={inputRef}
                    onFocus={getReadMsg}
                  />
                ) : (
                  <>
                    <ChatMessageSmallInput
                      type="text"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      inputRef={inputRef}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMsg(e)}
                      tabIndex="0"
                      onFocus={getReadMsg}
                    />
                    <VideoOptions currentFriend={currentFriend} />

                    {/* <IconButton
                      onClick={() => setShowEmoji((prvState) => !prvState)}
                      style={{ position: "absolute", right: 5 }}
                    >
                      <InsertEmoticonIcon style={{ color: "goldenrod" }} />
                    </IconButton> */}
                    {showEmoji && (
                      <div>
                        <Picker
                          onEmojiClick={onEmojiClick}
                          // pickerStyle={{ width: "80%" }}
                          skinTone={SKIN_TONE_MEDIUM_DARK}
                          disableSkinTonePicker={false}
                          pickerStyle={{
                            position: "absolute",
                            top: -330,
                            left: 0,
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </ChatBoxBottom>
            </>
          ) : (
            <NoConversation>
              Open a conversation to start a chat.
            </NoConversation>
          )}
        </ChatBoxWrapper>
      </ChatBox>
    </>
  );
};

export default ChatMessenger;

const ChatBox = styled.div`
  flex: 5;
  height: 100%;
`;
const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
  display: flex;
  flex-direction: column-reverse;
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
const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ChatBoxWrapper = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;
const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const NoConversation = styled.div`
  position: absolute;
  font-size: 3rem;
  top: 10%;
  color: #ccc8c8;
  cursor: default;
`;

const ChatMessageSmallInput = styled.input`
  height: 30px;
  width: 80%;

  &:focus {
    outline: none;
  }
`;
