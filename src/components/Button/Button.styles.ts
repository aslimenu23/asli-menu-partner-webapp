import { styled } from "styled-components";

export const ButtonContainer = styled.div<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled
      ? `
  pointer-events: none;
  opacity: 0.2;`
      : ""}
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  text-transform: uppercase;
  background-color: #fff;
  font-weight: bold;
  opacity: 1;
  border-radius: 5px;
`;
