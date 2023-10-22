import { styled } from "styled-components";

export const ImageInputWrapper = styled.div<{ noMargin?: boolean }>`
  height: 50px;
  margin: ${({ noMargin }) => (noMargin ? "" : "20px 0")};
  display: flex;
  flex-direction: column;

  > * {
    flex: 1;
  }
`;
