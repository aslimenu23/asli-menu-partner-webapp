import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useUserStates } from "../../store/userStore";

const AppRoot = () => {
  const loggedInUser = useUserStates().loggedInUser;

  return (
    <>
      <AppHeader loggedInUser={loggedInUser} />
      <Outlet />
    </>
  );
};

export default AppRoot;
