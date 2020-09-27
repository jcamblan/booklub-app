import React from 'react';
import styled from 'styled-components/native';
import { View, Image } from 'react-native';

const BoxShadow = styled(View)`
  width: 32px;
  height: 32px;
  border-radius: 32px;

  ${({ boxShadowColor }) =>
    Boolean(boxShadowColor) &&
    `
      box-shadow: 0 2px 4px ${boxShadowColor};
    `}
`;

const IconWrapper = styled(Image)`
  width: 32px;
  height: 32px;
`;

const Icon = ({ children, boxShadowColor }) => (
  <BoxShadow boxShadowColor={boxShadowColor}>
    <IconWrapper>{children}</IconWrapper>
  </BoxShadow>
);

export default Icon;
