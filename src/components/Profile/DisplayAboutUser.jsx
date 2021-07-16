import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import axios from "axios";
import { GetOwnUser } from "../../context/AuthActions";
import { AuthContext } from "../../context/AuthContext";

const DisplayAboutUser = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [valueChecked, setValueChecked] = useState([]);
  const { dispatch } = useContext(AuthContext);

  const userInfo = [
    "City",
    "From",
    "Relationship",
    "Gender",
    "Birthday",
    "Work",
    "Study",
  ];

  useEffect(() => {
    setValueChecked(user.userInfo);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setValueChecked((prevValueChecked) => [
        ...prevValueChecked,
        e.target.name,
      ]);
    } else {
      const removeChecked = valueChecked.filter(
        (value) => value !== e.target.name
      );
      setValueChecked(removeChecked);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/users/userinfo/`, valueChecked);
      await setValueChecked(res.data);
      setOpen(false);
      await GetOwnUser(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        style={{ textTransform: "none" }}
      >
        <PlaylistAddCheckOutlinedIcon titleAccess="Set" /> <span> Display</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit your information to display in your profile .
          </DialogContentText>
          <div>
            {userInfo.map((u, index) => (
              <div key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={valueChecked.includes(u.toLowerCase())}
                      onChange={handleChange}
                      name={u.toLowerCase()}
                      color="primary"
                    />
                  }
                  label={u}
                />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DisplayAboutUser;
