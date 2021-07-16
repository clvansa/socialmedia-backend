import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from "../../context/AuthActions";

const ProfileMenuList = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    Logout(history, dispatch);
  };

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <TopbarImage
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt="profile image"
        />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Link
                    to={`/profile/${user?.username}`}
                    onClick={() =>
                      (window.location.href = `/profile/${user.username}`)
                    }
                  >
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/setting">
                    <MenuItem >My account</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ProfileMenuList;

const TopbarImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;
