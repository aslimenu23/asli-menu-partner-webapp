import React, { useState } from "react";
import {
  UserProfileDetailsPopup,
  UserProfileMenuWrapper,
} from "./UserProfileMenu.styles";
import { RxAvatar } from "react-icons/rx";
import Button from "../../Button/Button";
import firebase, { getAuth, signOut } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";

const UserProfileMenu = ({ loggedInUser }: { loggedInUser: any }) => {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);

  const togglePopup = () => setPopup((prevPopup) => !prevPopup);

  const renderUserDetailsPopup = () => {
    if (!popup) return <></>;
    return (
      <UserProfileDetailsPopup>
        <div>{loggedInUser.name}</div>
        <div>{loggedInUser.phoneNumber}</div>
        <Button
          onClick={async () => {
            const auth = getAuth(firebase);
            await signOut(auth);
            navigate(ROUTES.LOGIN, { replace: true });
          }}
        >
          LOG OUT
        </Button>
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
