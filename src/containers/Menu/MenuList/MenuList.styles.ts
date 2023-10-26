import { styled } from "styled-components";

export const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuListCard = styled.div`
  width: 100%;
  border: 1px solid #8e8e8e;
  margin: 5px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const MenuItemContent = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .price {
    display: flex;
    align-items: center;
  }
`;

export const MenuItemFooter = styled.div`
  width: 100%;
  border-top: 1px solid #8e8e8e;
  display: flex;
  justify-content: space-around;
  padding: 10px;

  > * {
    flex: 1;
  }
`;

export const ListItem = styled.div<{ isLarge?: boolean }>`
  font-size: ${({ isLarge }) => (isLarge ? "20px" : "16px")};
`;
