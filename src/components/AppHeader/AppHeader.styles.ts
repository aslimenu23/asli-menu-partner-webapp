import { styled } from "styled-components";
import { APP_HEADER_HEIGHT } from "../../common/constants";

export const AppHeaderWrapper = styled.div`
  width: 100%;
  height: ${APP_HEADER_HEIGHT}px;

  position: sticky;
  top: 0;
  background: white;
  padding: 20px 10px;
  box-shadow: 0 1px 3px grey;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  .app-header__title {
    display: flex;
    align-items: center;

    .backIcon {
      margin-right: 10px;
    }
  }
`;
