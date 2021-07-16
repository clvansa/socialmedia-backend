import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SmallChatMessanger from "../Chat/SmallChatMessanger";
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";
import { Search } from "@material-ui/icons";
import axios from "axios";
import Online from "./Online";

const Contact = () => {
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [friendName, setFriendName] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const { arrivalMessage } = useContext(SocketContext);

  const getFriends = async () => {
    try {
      if (!currentUser?._id) return;
      const friendList = await axios.get(`/users/friends/${currentUser?._id}`);
      setFriendsOnline(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, [currentUser]);
  

  useEffect(() => {
    arrivalMessage && getConversationIncludesTwoId(arrivalMessage.sender);
  }, [arrivalMessage]);

  const handleSearch = (e) => {
    const friend = friendsOnline.find((friend) =>
      friend.username.includes(e.target.value)
    );
    friend && setFriendsOnline([friend]);
    e.target.value === "" && getFriends();
  };

  //get Conversation between two Users
  const getConversationIncludesTwoId = async (userId, friendName) => {
    const newConversation = {
      senderId: userId,
      receiverId: currentUser?._id,
    };

    try {
      const newConv = await axios.post("/conversation", newConversation);
      const res = await axios.get(
        `/conversation/find/${currentUser?._id}/${userId}`
      );
      setCurrentChat(res.data);
      setShowChat(true);
      setMinimize(false);

      if (friendName) {
        setFriendName(friendName);
      } else {
        const getFriend = await axios.get(`/users/user?userId=${userId}`);
        setFriendName(getFriend.data.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContactContianer>
      <RightbarContact>
        <SearchInput
          type="text"
          placeholder="Search an Friend"
          onChange={handleSearch}
        />
        <Search />
      </RightbarContact>
      <RightbarFriendList>
        {friendsOnline.map((user) => (
          <div
            onClick={() =>
              getConversationIncludesTwoId(user?._id, user.username)
            }
            key={user._id}
          >
            <Online key={user._id} user={user} />
          </div>
        ))}
        <SmallChatMessanger
          currentChat={currentChat}
          showChat={showChat}
          setShowChat={setShowChat}
          minimize={minimize}
          setMinimize={setMinimize}
          friendName={friendName}
        />
      </RightbarFriendList>
    </ContactContianer>
  );
};

export default Contact;

const ContactContianer = styled.div`
  max-width: 250px;
  height: 100%;
`;
const RightbarContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const RightbarFriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
  height: 100%;
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

const SearchInput = styled.input`
  border: none;
  background-color: inherit;
  border-bottom: 1px solid #eee;

  &:focus {
    outline: none;
  }
`;
