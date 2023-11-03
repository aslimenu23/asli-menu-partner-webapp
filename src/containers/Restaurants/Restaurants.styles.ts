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
  border: 1px solid #1a1a1a;
  margin: 5px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    padding: 10px;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;

    > * {
      flex: 1;
      text-align: center;
      font-weight: bold;
      background: #1a1a1a;
      color: white;
      padding: 10px;
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
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  color: #1a1a1a;
  font-weight: bold;
`;
