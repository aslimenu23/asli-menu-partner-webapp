import { styled } from "styled-components";
import { APP_HEADER_HEIGHT } from "../../common/constants";

export const RestaurantsWrapper = styled.div`
  padding: 10px;
  height: calc(100vh - ${APP_HEADER_HEIGHT}px);
  display: flex;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  // Desktop
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`;

export const ListItem = styled.div`
  padding: 10px;
  width: 100%;
  border: 1px solid #f2f2f2;
  margin: 5px 0;
  border-radius: 10px;

  &:hover {
    background-color: #f2f2f2;
  }

  // Desktop
  @media (min-width: 768px) {
    width: 150px;
    height: 100px;
    margin: 5px;
  }
`;

export const AddCta = styled.div`
  margin: auto 0;
  width: 100%;
`;

export const LoadingWrapper = styled.div`
  margin: auto;
`;