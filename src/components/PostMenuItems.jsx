import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import EditPostModal from "./EditPostModal";
import useOutside from "../util/useOutside";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  MenuItem: {
    fontsize: "12px !important",
  },
}));

const PostMenuItems = ({ post, userId, update }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  
  useOutside(anchorRef, setOpen);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post?._id}`);
      update();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };


  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVert />
        </Button>
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
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleOpen}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {openModal && (
        <EditPostModal
          currentPost={post}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default PostMenuItems;
