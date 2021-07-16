import { useState } from "react";
import styled from "styled-components";
import NotificationMessage from "./NotificationMessage";
import Modal from "./Modal";

const Notification = ({ open, notifications }) => {
  const [openModal, setOpenModal] = useState(false);
  const [postId, setPostId] = useState("");

  const handleOpen = (postId) => {
    setPostId(postId);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <NotificationContainer open={open}>
        {notifications.map((notification) => (
          <div
            key={notification._id}
            onClick={() => handleOpen(notification.postId)}
          >
            <NotificationMessage notification={notification} />
          </div>
        ))}
      </NotificationContainer>
      {openModal && (
        <Modal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={openModal}
          postId={postId}
        />
      )}
    </>
  );
};

export default Notification;

const NotificationContainer = styled.div`
  position: absolute;
  /* height: 200px; */
  background-color: #494646;
  width: 250px;
  left: 50%;
  border-radius: 10px;
  /* padding: 10px; */
  transform: translate(-50%);
  flex-direction: column;
  display: ${(props) => (props.open ? "flex" : "none")};
  overflow: hidden;
  padding: 10px;
`;
