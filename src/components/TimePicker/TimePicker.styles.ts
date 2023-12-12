import { styled } from "styled-components";

export const TimePickerContainer = styled.div`
  .timings {
    display: flex;
    align-items: center;

    select {
      flex: 1;
      outline: none;
      border: 1px solid #1a1a1a;
      margin: 0 5px;
      text-align: right;
      padding: 5px;
      border-radius: 4px;
    }
  }
`;
