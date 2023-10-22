import { styled } from "styled-components";

export const ButtonContainer = styled.div<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled
      ? `
  pointer-events: none;
  opacity: 0.5;`
      : ""}
`;

export const StyledButton = styled.button`
  outline: none;
  border: none;

  width: 100%;
  height: 40px;
  margin: 10px 0;
  background-color: lightblue;
  opacity: 1;
`;
