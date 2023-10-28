import React, { useState } from "react";
import {
  UserProfileDetailsPopup,
  UserProfileMenuWrapper,
} from "./UserProfileMenu.styles";
import { RxAvatar } from "react-icons/rx";

const UserProfileMenu = ({ loggedInUser }: { loggedInUser: any }) => {
  const [popup, setPopup] = useState(false);

  const togglePopup = () => setPopup((prevPopup) => !prevPopup);

  const renderUserDetailsPopup = () => {
    if (!popup) return <></>;
    return (
      <UserProfileDetailsPopup>
        <div>{loggedInUser.name}</div>
        <div>{loggedInUser.phoneNumber}</div>
      </UserProfileDetailsPopup>
    );
  };

  if (!loggedInUser) return <></>;
  return (
    <UserProfileMenuWrapper>
      <RxAvatar size={30} onClick={togglePopup} />
      {renderUserDetailsPopup()}
    </UserProfileMenuWrapper>
  );
};

export default UserProfileMenu;
