import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

const MenuListComment = ({ deleteComment, editComment }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{position:"absolute",bottom:"20px"}}>
      <IconButton style={{ padding: "3px" }} onClick={handleClick}>
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="comment-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            editComment();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={deleteComment}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuListComment;
