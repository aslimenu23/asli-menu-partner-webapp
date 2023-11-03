import { styled } from "styled-components";

export const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuListCard = styled.div`
  width: 100%;
  border: 1px solid #1a1a1a;
  margin: 5px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  border-top: 1px solid #1a1a1a;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #1a1a1a;

  > * {
    flex: 1;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    border-right: 1px solid #fff;
    color: white;
  }

  > *:last-child {
    border-right: none;
  }
`;

export const ListItem = styled.div<{ isLarge?: boolean }>`
  font-size: ${({ isLarge }) => (isLarge ? "20px" : "16px")};
`;
