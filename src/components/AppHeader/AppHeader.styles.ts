import { styled } from "styled-components";
import { APP_HEADER_HEIGHT } from "../../common/constants";

export const AppHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background: white;
  padding: 20px 10px;
  box-shadow: 0 1px 3px grey;
  font-size: 20px;
  font-weight: 600;
  height: ${APP_HEADER_HEIGHT}px;
`;
