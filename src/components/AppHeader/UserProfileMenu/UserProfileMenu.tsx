import React from "react";
import { UserProfileMenuWrapper } from "./UserProfileMenu.styles";

const UserProfileMenu = ({ loggedInUser }: { loggedInUser: any }) => {
  return <UserProfileMenuWrapper>{loggedInUser.name}</UserProfileMenuWrapper>;
};

export default UserProfileMenu;
