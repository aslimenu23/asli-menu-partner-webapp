import { styled } from "styled-components";
import { APP_HEADER_HEIGHT } from "../../common/constants";

export const AppRootWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const AppRootHeaderWrapper = styled.div`
  width: 100%;
  height: ${APP_HEADER_HEIGHT}px;
`;

export const AppRootContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${APP_HEADER_HEIGHT}px);
`;
