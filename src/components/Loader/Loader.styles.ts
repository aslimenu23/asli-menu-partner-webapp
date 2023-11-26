import { styled } from "styled-components";

export const LoadingWrapper = styled.div<{ isFullScreen?: boolean }>`
  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    width: 100vw;  
    height: 100vh;  
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    > div {
      margin: auto;
    }
  `})}
`;

export const StyledLoader = styled.div<{ isSmall?: boolean }>`
  display: inline-block;
  position: relative;
  width: ${({ isSmall }) => (isSmall ? "30px" : "80px")};
  height: ${({ isSmall }) => (isSmall ? "30px" : "80px")};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ isSmall }) => (isSmall ? "20px" : "64px")};
    height: ${({ isSmall }) => (isSmall ? "20px" : "64px")};
    margin: 8px;
    border: ${({ isSmall }) => (isSmall ? "4px" : "8px")} solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
