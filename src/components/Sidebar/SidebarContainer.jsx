import { useState, useEffect } from "react";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { IconButton } from "@material-ui/core";
import useWindowsSize from "../../util/useWindowsSize";


const SidebarContainer = () => {
  const [view, setView] = useState(true);
  const [position, setPosition] = useState("sticky");
  const size = useWindowsSize();

  const handleToggle = () => {
    setView(!view);
  };

  useEffect(() => {
    if (size.width <= 1400) {
      setView(false);
      setPosition("fixed");
    } else {
      setPosition("sticky");
      setView(true);
    }
  }, [size]);

  return (
    <Contianer style={{ position }}>
      <SidebarWrapper>
        <CustomIconButton onClick={handleToggle}>
          {view ? <ArrowBack /> : <ArrowForward />}
        </CustomIconButton>
        <SidebarContent style={{ width: view ? "300px" : 0 }}>
          <Sidebar />
        </SidebarContent>
      </SidebarWrapper>
    </Contianer>
  );
};

export default SidebarContainer;

const Contianer = styled.div`
  min-width: 50px;
  background-color: white;
  z-index: 100;
  height: calc(100vh - 50px);
  top: 50px;
`;
const SidebarWrapper = styled.div`
  position: relative;
`;

const CustomIconButton = styled(IconButton)`
  position: absolute !important;
  right: 0px;
  top: 0px;
  z-index: 2000;
`;

const SidebarContent = styled.div`
  padding-top: 20px;
  transition: 0.5s;
`;
