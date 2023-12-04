import { styled } from "styled-components";

export const SnackbarContainer = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: ${({ show }) => (show ? "20px" : "-100%")};
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  text-align: left;
  width: calc(100vw - 20px);
  background: #1a1a1a;
  color: white;
  border-radius: 8px;
  transition: bottom 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
