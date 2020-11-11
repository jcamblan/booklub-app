import React from 'react';
import { View } from 'react-native';
import { theme } from './theme';
import { Text } from './typography';
import styled from 'styled-components/native';

export const Table = styled(View)`
  flex-flow: column nowrap;
  flex: 1 1 auto;
`;

export const Row = styled(View)`
  width: 100%;
  flex-flow: row nowrap;
  margin-bottom: 4px;
`;

const StyledCell = styled(View)`
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
  overflow: hidden;
  min-width: 0px;
  border-radius: 5px;
  margin-horizontal: 1px;
  align-items: center;
`;

const StyledHeadCell = styled(View)`
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding-horizontal: 10px;
  overflow: hidden;
  min-width: 0px;
  border-radius: 5px;
  margin-horizontal: 1px;
  align-items: center;
  justify-content: center;
`;

const StyledHeadCellText = styled(Text)`
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  overflow: visible;
`;

export const HeadCell = ({ children, variant, flexGrow, justifyContent }) => (
  <StyledHeadCell
    style={{
      flexGrow: flexGrow || 1,
      justifyContent: justifyContent || 'center',
    }}
  >
    <StyledHeadCellText>{children}</StyledHeadCellText>
  </StyledHeadCell>
);

export const Cell = ({ children, variant, flexGrow, justifyContent }) => {
  const color = () => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'success':
        return 'white';
      case 'warning':
        return 'white';
      default:
        return theme.colors.text;
    }
  };

  const backgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.secondary;
    }
  };

  return (
    <StyledCell
      style={{
        backgroundColor: backgroundColor(),
        flexGrow: flexGrow || 1,
        justifyContent: justifyContent || 'center',
      }}
    >
      <Text
        style={{
          color: color(),
        }}
      >
        {children}
      </Text>
    </StyledCell>
  );
};
