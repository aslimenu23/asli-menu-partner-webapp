import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useUserActions, useUserStates } from "../../store/userStore";
import firebase, { getAuth, onAuthStateChanged } from "../../services/firebase";
import Loader from "../../components/Loader/Loader";
import { AppRootContentWrapper, AppRootWrapper } from "./AppRoot.styles";
import { removeItemInLocalStorageWithAsliMenuPrefix } from "../../common/utils";
import { getUser } from "../../actions/actions";
import { ROUTES } from "../../common/constants";

const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useUserStates().loggedInUser;
  const setLoggedInUser = useUserActions().setLoggedInUser;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, async (user: any) => {
      // If user is logged in and lands on login page, redirect to home page
      if (user) {
        const userDetails = await getUser(user.uid);
        setLoggedInUser(userDetails);
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
      removeItemInLocalStorageWithAsliMenuPrefix();
    };
    // To be run only once when we land on the APP
  }, []);

  useEffect(() => {
    if (loggedInUser && location.pathname === "/login") {
      navigate(ROUTES.RESTAURANTS, { replace: true });
    }
    // To be run when we land on a new page
  }, [location.pathname, loggedInUser, navigate]);

  return (
    <AppRootWrapper>
      <AppHeader loggedInUser={loggedInUser} />
      <AppRootContentWrapper>
        {loading ? <Loader isFullScreen /> : <Outlet />}
      </AppRootContentWrapper>
    </AppRootWrapper>
  );
};

export default AppRoot;
