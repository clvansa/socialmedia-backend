import { useState, useEffect, useRef } from "react";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import styled from "styled-components";
import Contact from "./Contact";
import { IconButton } from "@material-ui/core";
import useWindowsSize from "../../util/useWindowsSize";
import useOutside from "../../util/useOutside";

const ContactContianer = () => {
  const [view, setView] = useState(true);
  const [position, setPosition] = useState("sticky");
  const size = useWindowsSize();
  const CloseRef = useRef();
  useOutside(CloseRef, setView);

  const handleToggle = () => {
    setView(!view);
  };

  useEffect(() => {
    if (size.width <= 2800) {
      setView(false);
      setPosition("fixed");
    } else {
      setPosition("sticky");
      setView(true);
    }
    console.log(view);
  }, [size]);

  return (
    <Contianer style={{ position }} ref={CloseRef}>
      <RightbarWrapper>
        <RightbarContent style={{ height: view ? "80vh" : 0 }}>
          <TitleBox>
            <TitleMenu onClick={handleToggle}>Contact</TitleMenu>
          </TitleBox>
          <Contact />
        </RightbarContent>
      </RightbarWrapper>
    </Contianer>
  );
};

export default ContactContianer;

const Contianer = styled.div`
  min-width: 270px;
  background-color: white;
  z-index: 100;
  bottom: 0px;
  right: 0;
  padding-bottom: 30px;
  border-radius: 10px 0 0 0;
  border: 1px solid #eee;
`;
const RightbarWrapper = styled.div`
  position: relative;
  padding: 0 10px 10px 10px;
`;

const CustomIconButton = styled(IconButton)`
  position: absolute !important;
  left: 0px;
  top: -50px;
  z-index: 2000;
  background-color: blue;
`;

const RightbarContent = styled.div`
  /* padding-top: 20px; */
  transition: 0.5s;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleMenu = styled.h3`
  margin: 0;
  padding: 10px 0;
  cursor: pointer;
  flex: 1;
  font-size: 16px;
`;
