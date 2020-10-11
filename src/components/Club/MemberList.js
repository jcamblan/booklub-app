import React from 'react';
import { View } from 'react-native';
import { Text, theme } from 'ui';

const MemberList = ({ userEdges }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
      >
        <View
          style={{
            flexGrow: 2,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Nom
          </Text>
        </View>
        <View
          style={{
            width: 50,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Sessions
          </Text>
        </View>
        <View
          style={{
            width: 50,
            marginRight: 2,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Tirages
          </Text>
        </View>
        <View
          style={{
            width: 50,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Bonus
          </Text>
        </View>
      </View>
      {userEdges.map(({ node, sessionCount, selectionCount, bonusScore }) => (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
          key={node?.id}
        >
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              flexGrow: 2,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text>{node?.username}</Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.warning,
              width: 50,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {sessionCount}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.success,
              width: 50,
              marginRight: 2,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {selectionCount}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              width: 50,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {bonusScore}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MemberList;
