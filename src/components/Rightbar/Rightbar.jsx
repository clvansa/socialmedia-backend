import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Online from "./Online";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Close, Search } from "@material-ui/icons";
import SmallChatMessanger from "../Chat/SmallChatMessanger";
import { SocketContext } from "../../context/SocketContext";
import CardCarousel from "./advertisement/CardCarousel";
import Contact from "./Contact";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [birthdayFriend, setBirthdayFriend] = useState(false);
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [showSearchbar, setShowSearchBar] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [friendName, setFriendName] = useState("");

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const { arrivalMessage } = useContext(SocketContext);

  const getFriends = async () => {
    try {
      if (!currentUser?._id) return;
      // console.log(user._id)
      const friendList = await axios.get(`/users/friends/${currentUser?._id}`);
      setFriendsOnline(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFriends();
  }, [currentUser]);

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

  const HomeRightbar = () => {
    return (
      <>
        <BirthdayContainer
          style={{ display: birthdayFriend ? "none" : "flex" }}
        >
          <BirthdayImage src={`${PF}gift.png`} alt="Birthday" />
          <BirthdayText>
            <b>Pola Foster</b> and <b>3 other friend</b> hava a birthday today
          </BirthdayText>
          <CloseIcon onClick={() => setBirthdayFriend(true)} />
        </BirthdayContainer>
        <RightbarAd>
          <CardCarousel />
        </RightbarAd>
        {/* <RightbarContact>
          <RightbarTitle>Contacts </RightbarTitle>
          <input
            type="text"
            placeholder="Search an Friend"
            onChange={handleSearch}
            style={{ display: showSearchbar ? "block" : "none" }}
          />
          <Search onClick={() => setShowSearchBar((prvState) => !prvState)} />
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
        </RightbarFriendList> */}
        {/* <Contact /> */}
      </>
    );
  };

  return (
    <RightbarContainer>
      <RightbarWrapper>{HomeRightbar()}</RightbarWrapper>
    </RightbarContainer>
  );
};

export default Rightbar;

const RightbarContainer = styled.div`
  flex: 2.5;
  position: sticky;
  top: 50px;
  height: calc(100vh - 50px);

  @media (max-width: 1000px) {
    display: none;
  }
`;
const RightbarWrapper = styled.div`
  padding: 20px 20px 0 0;
`;

const BirthdayContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 300px;
  @media (max-width: 1900px) {
    display: none;

  }
`;
const CloseIcon = styled(Close)`
  position: absolute;
  top: 0px;
  right: 0;
  font-size: 16px !important;
  color: whitesmoke;
  background-color: gray;
  border-radius: 50%;
  padding: 1px;
`;
const BirthdayImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const BirthdayText = styled.span`
  font-weight: 300;
  font-size: 15px;
`;

const RightbarAd = styled.div`
  /* width: 200px; */
  border-radius: 10px;
  /* margin: 30px 0px; */
  height: 300px;
  /* object-fit: cover; */

  @media (max-width: 1700px) {
    width: 150px !important;
  }

  @media (max-width: 1200px) {
    width: 150px;
    height: 250px;
  }
  @media (max-width: 910px) {
    display: none;
  }
`;
const RightbarContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;
const RightbarFriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
