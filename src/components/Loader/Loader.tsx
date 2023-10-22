import React from "react";
import { StyledLoader } from "./Loader.styles";

const Loader = () => {
  return (
    <StyledLoader className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  );
};

export default Loader;
