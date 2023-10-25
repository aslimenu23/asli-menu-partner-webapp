import React from "react";
import { AppHeaderWrapper } from "./AppHeader.styles";
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "./Appheader.constants";
import UserProfileMenu from "./UserProfileMenu/UserProfileMenu";

const AppHeader = ({ loggedInUser }: { loggedInUser: any }) => {
  const location = useLocation();

  return (
    <AppHeaderWrapper>
      {PAGE_TITLES[location.pathname as keyof typeof PAGE_TITLES]}
      {loggedInUser ? <UserProfileMenu loggedInUser={loggedInUser} /> : <></>}
    </AppHeaderWrapper>
  );
};

export default AppHeader;
