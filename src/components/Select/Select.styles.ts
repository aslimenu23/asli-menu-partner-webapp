import { styled } from "styled-components";

export const StyledSelect = styled.select`
  outline: none;
  border: none;
  border-bottom: 1px solid lightgrey;
  width: 100%;
  height: 30px;
  font-size: 18px;
  margin: 10px 0;

  &:focus {
    border-bottom: 1px solid black;
  }
`;
