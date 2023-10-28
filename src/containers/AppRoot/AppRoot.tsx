import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useUserStates } from "../../store/userStore";
import firebase, { getAuth, onAuthStateChanged } from "../../services/firebase";
import Loader from "../../components/Loader/Loader";
import {
  AppRootContentWrapper,
  AppRootHeaderWrapper,
  AppRootWrapper,
} from "./AppRoot.styles";
import { removeItemInLocalStorageWithAsliMenuPrefix } from "../../common/utils";

const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useUserStates().loggedInUser;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      // If user is logged in and lands on login page, redirect to home page
      if (user) {
        if (location.pathname === "/login") {
          navigate(`/`, {
            replace: true,
          });
        }
      } else {
        // If user is not logged in and lands on any page, redirect to login page
        if (location.pathname !== "/login") {
          navigate(`/login?redirect=${location.pathname}`, {
            replace: true,
          });
        }
      }
      setLoading(false);
    });

    return () => {
      // removeItemInLocalStorageWithAsliMenuPrefix();
    };
  }, []);

  return (
    <AppRootWrapper>
      <AppRootHeaderWrapper>
        <AppHeader loggedInUser={loggedInUser} />
      </AppRootHeaderWrapper>
      <AppRootContentWrapper>
        {loading ? <Loader isFullScreen /> : <Outlet />}
      </AppRootContentWrapper>
    </AppRootWrapper>
  );
};

export default AppRoot;
