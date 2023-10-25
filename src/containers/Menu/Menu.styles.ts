import { styled } from "styled-components";

export const AddMenuWrapper = styled.div`
  padding: 10px;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuListCard = styled.div`
  padding: 10px;
  width: 100%;
  border: 1px solid #f2f2f2;
  margin: 5px 0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ListItem = styled.div<{ isLarge?: boolean }>`
  font-size: ${({ isLarge }) => (isLarge ? "20px" : "14px")};
`;

export const Separater = styled.div`
  width: 100vw;
  margin: 5px 0 10px -10px;
  height: 2px;
  background-color: lightgray;
`;
