import React from 'react';
import { TouchableOpacity, Text as RnText } from 'react-native';
import styled from 'styled-components/native';
import { theme } from './theme';
import { omit } from 'lodash';

export const Text = styled(RnText)`
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ScreenTitle = styled(RnText)`
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 41px;
  /* identical to box height, or 121% */
  letter-spacing: 0.374px;
  margin-bottom: ${({ theme }) => `${theme.spacing()}px`};
`;

export const Headline = styled(RnText)`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;

export const Title = styled(RnText)`
  ${({ theme }) => omit(theme.material.title, ['lineHeight', 'fontWeight'])};
  line-height: ${({ theme }) => `${theme.material.title.lineHeight}px`};
  font-weight: bold;
  padding-vertical: 3px;
  color: ${({ theme }) => theme.colors.title};
`;

export const TextLink = ({
  title,
  textStyle = { color: theme.colors.textLink },
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={{ paddingVertical: 8 }}
  >
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);
