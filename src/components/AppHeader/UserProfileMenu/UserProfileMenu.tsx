import React, { useEffect, useRef, useState } from "react";
import {
  UserProfileDetailsPopup,
  UserProfileMenuWrapper,
} from "./UserProfileMenu.styles";
import { RxAvatar } from "react-icons/rx";
import Button from "../../Button/Button";
import firebase, { getAuth, signOut } from "../../../services/firebase";
import { ROUTES } from "../../../common/constants";

const UserProfileMenu = ({ loggedInUser }: { loggedInUser: any }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    if (popup) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [popup]);

  const togglePopup = () => setPopup((prevPopup) => !prevPopup);

  const renderUserDetailsPopup = () => {
    if (!popup) return <></>;
    return (
      <UserProfileDetailsPopup>
        <div>{loggedInUser.name}</div>
        <div>{loggedInUser.phoneNumber}</div>
        <Button
          onClick={async () => {
            try {
              togglePopup();
              const auth = getAuth(firebase);
              await signOut(auth);
              window.location.replace(
                `${window.location.origin}${ROUTES.LOGIN}`
              );
            } catch (err) {
              console.log("Error Signing Out!", err);
            }
          }}
        >
          LOG OUT
        </Button>
      </UserProfileDetailsPopup>
    );
  };

  if (!loggedInUser) return <></>;
  return (
    <UserProfileMenuWrapper ref={popupRef}>
      <RxAvatar size={30} onClick={togglePopup} />
      {renderUserDetailsPopup()}
    </UserProfileMenuWrapper>
  );
};

export default UserProfileMenu;
