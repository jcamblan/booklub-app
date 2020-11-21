import React from 'react';
import { View, Image } from 'react-native';
import { Text, theme, Table, Row, Cell, HeadCell, Separator } from 'ui';
import defaultCover from 'images/default-cover.jpg';
import { pluralize } from 'utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Avatar = ({ url }) => {
  const image = Boolean(url) ? { uri: url } : defaultCover;

  return (
    <Image
      source={image}
      style={{
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: 50,
        borderColor: theme.colors.secondaryVariant,
        borderWidth: 2,
      }}
    />
  );
};

const MemberChunk = ({ edge: { node: user, sessionCount } }) => (
  <View style={{ flexDirection: 'row', flex: 1 }}>
    <View style={{ justifyContent: 'center', marginRight: theme.spacing() }}>
      <Avatar url={user?.avatarUrl} />
    </View>
    <View style={{ flex: 2, justifyContent: 'center' }}>
      <Text style={{ fontWeight: '500' }}>{user?.username}</Text>
      <Text style={{ color: theme.colors.secondaryVariant }}>
        {sessionCount} {pluralize('session', sessionCount)}
      </Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
      <FontAwesome5
        name="chevron-right"
        style={{
          marginRight: theme.spacing(0.5),
          color: theme.colors.secondaryVariant,
        }}
      />
    </View>
  </View>
);

const MemberList = ({ userEdges }) => {
  return (
    <View>
      {userEdges.map(edge => (
        <View key={edge?.node?.id}>
          <MemberChunk edge={edge} />
          <Separator spacing={theme.spacing(0.5)} />
        </View>
      ))}
    </View>
  );
};

export default MemberList;
