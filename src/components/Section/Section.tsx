import React from "react";
import { styled } from "styled-components";

const SectionContainer = styled.div<{ removeMarginTop?: boolean }>`
  margin-top: ${({ removeMarginTop }) => (removeMarginTop ? "10px" : "30px")};
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1a1a1a;
`;

const Section = ({
  text,
  removeMarginTop,
}: {
  text: string;
  removeMarginTop?: boolean;
}) => {
  return (
    <SectionContainer removeMarginTop={removeMarginTop}>
      {text}
    </SectionContainer>
  );
};

export default Section;
