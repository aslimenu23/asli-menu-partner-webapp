import { styled } from "styled-components";

export const UserProfileMenuWrapper = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;

export const UserProfileDetailsPopup = styled.div`
  position: absolute;
  top: 105%;
  right: 0;
  background: white;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  box-shadow: -1px 1px 1px 1px gray;
`;