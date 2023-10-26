import React from "react";
import { StyledLoader, LoadingWrapper } from "./Loader.styles";

const Loader = ({ isFullScreen }: { isFullScreen?: boolean }) => {
  return (
    <LoadingWrapper isFullScreen={isFullScreen}>
      <StyledLoader isFullScreen={isFullScreen} className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoader>
    </LoadingWrapper>
  );
};

export default Loader;
