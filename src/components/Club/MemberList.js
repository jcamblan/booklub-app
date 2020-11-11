import React from 'react';
import { View } from 'react-native';
import { Text, theme, Table, Row, Cell, HeadCell } from 'ui';

const MemberList = ({ userEdges }) => {
  return (
    <View>
      <Row>
        <HeadCell flexGrow={4}>Nom</HeadCell>
        <HeadCell flexGrow={1.5}>Sessions</HeadCell>
        <HeadCell flexGrow={1.2}>Tirages</HeadCell>
        <HeadCell flexGrow={1}>Bonus</HeadCell>
      </Row>
      {userEdges.map(({ node, sessionCount, selectionCount, bonusScore }) => (
        <Row key={node?.id}>
          <Cell justifyContent="flex-start" flexGrow={4}>
            {node?.username}
          </Cell>
          <Cell flexGrow={1.2}>{sessionCount}</Cell>
          <Cell flexGrow={1.2}>{selectionCount}</Cell>
          <Cell flexGrow={1}>{bonusScore}</Cell>
        </Row>
      ))}
    </View>
  );
};

export default MemberList;
