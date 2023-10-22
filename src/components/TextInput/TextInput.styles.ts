import { styled } from "styled-components";

export const StyledInputWrapper = styled.div<{ noMargin?: boolean }>`
  height: 50px;
  margin: ${({ noMargin }) => (noMargin ? "0" : "20px 0")};
  display: flex;
  flex-direction: column;

  > * {
    flex: 1;
  }
`;

export const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  border: none;
  border-bottom: 1px solid lightgrey;
  width: 100%;
  height: 30px;
  font-size: 18px;
  ${({ error }) => error && "border-bottom: 1px solid red;"}

  &:focus {
    border-bottom: 1px solid black;
    ${({ error }) => error && "border-bottom: 1px solid red;"}
  }
`;
