import { styled } from "styled-components";

export const RestaurantsWrapper = styled.div`
  padding: 10px;
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
  width: 100%;
  border: 1px solid #8e8e8e;
  margin: 5px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  > * {
    padding: 10px;
  }

  .footer {
    width: 100%;
    border-top: 1px solid #8e8e8e;
    display: flex;
    justify-content: space-around;
    padding: 10px;

    > * {
      flex: 1;
    }
  }

  // Desktop
  @media (min-width: 768px) {
    width: 150px;
    height: 100px;
    margin: 5px;
  }
`;

export const AddCta = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;
