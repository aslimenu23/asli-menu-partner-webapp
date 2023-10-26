import { styled } from "styled-components";

export const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContent = styled.div`
  padding: 12px;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  // Desktop
  @media (min-width: 768px) {
    border: 2px solid grey;
    border-radius: 8px;
    width: 400px;
    height: 250px;
  }
`;
