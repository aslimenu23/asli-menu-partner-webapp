import React from "react";
import { AppHeaderWrapper } from "./AppHeader.styles";
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "./Appheader.constants";

const AppHeader = () => {
  const location = useLocation();

  return (
    <AppHeaderWrapper>
      {PAGE_TITLES[location.pathname as keyof typeof PAGE_TITLES]}
    </AppHeaderWrapper>
  );
};

export default AppHeader;
