import { styled } from "styled-components";

export const AddRestaurantWrapper = styled.div`
  padding: 10px;
`;

export const TimingsWrapper = styled.div`
  margin: 20px 0;

  > label {
    display: block;
    font-size: 18px;
  }

  > div {
    display: flex;
  }
`;

export const PhoneNumbersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  > div:first-child {
    flex: 1;
  }
`;