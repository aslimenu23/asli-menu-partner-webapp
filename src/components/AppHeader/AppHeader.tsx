import React from "react";
import { AppHeaderWrapper } from "./AppHeader.styles";
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "./Appheader.constants";
import UserProfileMenu from "./UserProfileMenu/UserProfileMenu";
import { BiArrowBack } from "react-icons/bi";

const AppHeader = ({ loggedInUser }: { loggedInUser: any }) => {
  const location = useLocation();

  return (
    <AppHeaderWrapper>
      <div className="app-header__title">
        <BiArrowBack
          className="backIcon"
          onClick={() => {
            window.history.back();
          }}
        />
        {PAGE_TITLES[location.pathname as keyof typeof PAGE_TITLES]}
      </div>
      {loggedInUser ? <UserProfileMenu loggedInUser={loggedInUser} /> : <></>}
    </AppHeaderWrapper>
  );
};

export default AppHeader;
