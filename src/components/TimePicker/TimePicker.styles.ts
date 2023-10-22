import { styled } from "styled-components";

export const TimePickerContainer = styled.div`
  font-size: 18px;
  position: relative;

  .rcTimePicker {
    width: 100%;
    height: 30px;

    .rcTimePickerPopup {
      position: absolute;
    }

    > input {
      font-size: 18px;
      outline: none !important;
      border: none !important;
      border-bottom: 1px solid lightgrey !important;

      &:focus {
        border-bottom: 1px solid black !important;
      }
    }
  }
`;
