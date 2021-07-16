import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const AccontSetting = () => {
  const { user } = useContext(AuthContext);
  const [mobile, setMobile] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirm, setConfirm] = useState(false);


  const handleClick = () => {
    setConfirm(true);
  };

  const handleSave = () => {
    console.log({ mobile, firstname, lastname });
  };

  return (
    <AccontSettingContainer>
      <AccontSettingWrapper>
        <Paper>
          <SettingItems>
            <SettingItem style={{ display: "flex", alignItems: "center" }}>
              <SettingItemLabel htmlFor="username">Username:</SettingItemLabel>
              <SettingItemInput id="username" value={user.username} disabled />
            </SettingItem>
            <SettingItem>
              <SettingItemLabel htmlFor="email">Email:</SettingItemLabel>
              <SettingItemInput disabled id="email" value={user.email} />
            </SettingItem>
            <SettingItem>
              <SettingItemLabel htmlFor="fname">First name:</SettingItemLabel>
              <SettingItemInput
                id="fname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </SettingItem>
            <SettingItem>
              <SettingItemLabel htmlFor="lname">Last name:</SettingItemLabel>
              <SettingItemInput
                id="lname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </SettingItem>
            <SettingItem>
              <SettingItemLabel htmlFor="mobile">Mobile:</SettingItemLabel>
              <SettingItemInput
                type="number"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </SettingItem>

            <SettingItem>
              <Button variant="outlined" color="primary" onClick={handleSave}>
                Save
              </Button>
            </SettingItem>
            <SettingItem>
              <CustomButton>Change Password</CustomButton>
              <CustomButton onClick={handleClick}>
                Delete my account
              </CustomButton>
            </SettingItem>
          </SettingItems>
        </Paper>
        {confirm && (
          <ConfirmBox>
            <ConfirmBoxPaper>
              <p>Are you sure want to delete your account? </p>
              <ConfirmOptions>
                <Button variant="contained" color="secondary">
                  delete
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setConfirm(false)}
                >
                  cancel
                </Button>
              </ConfirmOptions>
            </ConfirmBoxPaper>
          </ConfirmBox>
        )}
      </AccontSettingWrapper>
    </AccontSettingContainer>
  );
};

export default AccontSetting;

const AccontSettingContainer = styled.div``;
const AccontSettingWrapper = styled.div`
  padding: 10px;
`;

const SettingItems = styled.form`
  width: 70%;
  padding: 10px;
`;
const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
`;
const SettingItemLabel = styled.label`
  min-width: 100px;
`;
const SettingItemInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: white;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const ConfirmBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

const ConfirmBoxPaper = styled(Paper)`
  padding: 10px;
`;
const ConfirmOptions = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CustomButton = styled(Button)`
  text-transform: capitalize !important;
`;
