import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import Moment from "moment";

const UserInfoRightbar = ({ user, setValue }) => {
  const { user: currentUser } = useContext(AuthContext);
  const Relationship =
    user?.relationship === 1
      ? "Single"
      : user?.relationship === 2
      ? "Married"
      : user?.relationship === 3
      ? "Complicated"
      : "";

  const Gender =
    user?.gender === 1
      ? "Male"
      : user?.gender === 2
      ? "Female"
      : user?.gender === 3
      ? "Non-binary"
      : "";

  const getValue = (value) => {
    if (value === "relationship") {
      return Relationship;
    } else if (value === "gender") {
      return Gender;
    } else if (value === "birthday") {
      return Moment(user.birthday).format("DD/MM/YY");
    } else {
      return user?.[value];
    }
  };
  return (
    <UserInfoContainer>
      <UserInfoWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RightbarTitle onClick={() => setValue(1)}>About </RightbarTitle>
        </div>
        <RightbarInfo>
          {user?.userInfo?.map((info, index) => {
            return (
              <RightbarInfoItem key={index}>
                <RightbarInfoKey>{info}:</RightbarInfoKey>

                <RightbarInfoValue>{getValue(info)}</RightbarInfoValue>
              </RightbarInfoItem>
            );
          })}
        </RightbarInfo>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
};

export default UserInfoRightbar;

const UserInfoContainer = styled.div`
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  min-height: 250px;
  width: 100%;
  /* margin-top: 20px; */
  border-radius: 10px;
  background-color: white;
`;
const UserInfoWrapper = styled.div`
  padding: 20px;
`;

const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
  cursor: pointer;

`;

const RightbarInfo = styled.div`
  margin-bottom: 30px;
`;
const RightbarInfoItem = styled.div`
  margin-bottom: 10px;
`;
const RightbarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 10px;
  color: #555;
  text-transform: capitalize;
`;
const RightbarInfoValue = styled.span`
  font-weight: 300;
  font-size: 14px;
`;
