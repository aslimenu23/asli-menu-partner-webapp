import React from "react";
import { StyledLoader, LoadingWrapper } from "./Loader.styles";

const Loader = ({
  isFullScreen,
  isSmall,
}: {
  isFullScreen?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <LoadingWrapper isFullScreen={isFullScreen}>
      <StyledLoader isSmall={isSmall} className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoader>
    </LoadingWrapper>
  );
};

export default Loader;
