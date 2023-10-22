import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";

const AppRoot = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default AppRoot;
