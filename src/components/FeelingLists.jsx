import React from "react";
import styled from "styled-components";
import { IconButton, Tooltip } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const FeelingLists = ({ setOpen, setFeeling }) => {
  const feelingListIcon = [
    {
      0: { name: "happy", char: "😀" },
      1: { name: "ok", char: "🙂" },
      2: { name: "ready", char: "😉" },
      3: { name: "shy", char: "😊" },
      4: { name: "blessed", char: "😇" },
      5: { name: "love", char: "😍" },
      6: { name: "kiss", char: "😘" },
      7: { name: "crazy", char: "🤪" },
      9: { name: "silly", char: "😝" },
      10: { name: "rich", char: "🤑" },
      11: { name: "sarcastic", char: "😏" },
      12: { name: "bored", char: "🙄" },
      13: { name: "sad", char: "😔" },
      14: { name: "sleepy", char: "😴" },
      15: { name: "sick", char: "🤕" },
      16: { name: "ill", char: "🤮" },
      17: { name: "angry", char: "🥵" },
      18: { name: "cool", char: "😎" },
      19: { name: "worried", char: "😟" },
      20: { name: "confused", char: "😕" },
    },
  ];

  const handleClick = (icon) => {
    setFeeling(icon);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFeeling({});
  };
  return (
    <FeelingListsContainer>
      <FeelingTop>
        <Tooltip title="Cancel feeling" placement="left">
          <IconButton onClick={handleClose}>
            <FeelingArrowBack />
          </IconButton>
        </Tooltip>
        <FeelingTopTitle>How are you feeling?</FeelingTopTitle>
      </FeelingTop>
      <FeelingBottom>
        {feelingListIcon.map((icons) =>
          Object.values(icons).map((icon, i) => (
            <IconInfo key={icon + i} onClick={() => handleClick(icon)}>
              <IconEmoji>{icon.char}</IconEmoji>
              <IconName>{icon.name}</IconName>
            </IconInfo>
          ))
        )}
      </FeelingBottom>
    </FeelingListsContainer>
  );
};

export default FeelingLists;

const FeelingListsContainer = styled.div`
  position: absolute;
  width: 30vw;
  height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #383737;
  z-index: 1000;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  overflow-y: scroll;
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
const FeelingListsWrapper = styled.div`
  padding: 10px;
`;

const Hline = styled.hr`
  border: none;
  border-bottom: 0.2px solid #7a7979;
  margin: 0;
`;

const FeelingTop = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: #4e4c4c;
  padding: 10px 0;
  border-bottom: 0.4px solid gray;
`;
const FeelingTopTitle = styled.span`
  font-size: 20px;
  color: white;
  justify-items: center;
  margin: auto;
  padding-right: 40px;
`;

const FeelingArrowBack = styled(ArrowBack)`
  color: #ffffff;
`;

const FeelingBottom = styled.div`
  height: 100%;
  display: grid;
  padding-top: 10px;
  padding-left: 10px;
  grid-template-columns: 1fr 1fr;
`;
const IconInfo = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 10px;
  padding: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #555353;
  }
`;
const IconEmoji = styled.span`
  background-color: #6b6969;
  padding: 3px;
  border-radius: 50%;
  font-size: 20px;
  -webkit-box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.68);
  box-shadow: 2px 5px 12px -5px rgba(0, 0, 0, 0.68);
`;
const IconName = styled.span`
  padding-left: 5px;
  color: #ffffff;
`;
