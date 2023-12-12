import { styled } from "styled-components";

export const AddRestaurantWrapper = styled.div`
  padding: 10px;
`;

export const TimingsWrapper = styled.div`
  margin-bottom: 20px;

  > label {
    display: block;
    font-size: 18px;
  }

  .timingsDiv {
    display: flex;

    .timingInputs {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
`;

export const PhoneNumbersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  > div:first-child {
    flex: 1;
  }
`;