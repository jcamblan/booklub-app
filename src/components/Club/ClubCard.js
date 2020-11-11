import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, theme, Headline } from 'ui';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import defaultCover from 'images/default-cover.jpg';
import { upperCase } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const Card = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding-horizontal: ${props => `${props.theme.spacing()}px`};
  margin-bottom: ${props => `${props.theme.spacing(0.5)}px`};
  flex-direction: row;
  justify-content: space-between;
`;

const CardSubtitle = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #9b9b9b;
`;

const ClubCard = ({ club }) => {
  const navigation = useNavigation();
  return (
    <Card
      onPress={() =>
        navigation.navigate('ClubDetails', {
          clubId: club.id,
          title: club.name,
        })
      }
    >
      <View
        style={{
          width: '75%',
          justifyContent: 'center',
          paddingRight: theme.spacing(),
        }}
      >
        <Headline
          style={{
            paddingTop: theme.spacing(),
            paddingBottom: theme.spacing(0.5),
          }}
        >
          {club.name}
        </Headline>
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="clock" color={theme.colors.primary} />
          <CardSubtitle
            style={{ paddingBottom: theme.spacing(), paddingLeft: 4 }}
          >
            {club.currentSession?.state}
          </CardSubtitle>
        </View>
      </View>
      <View style={{ width: '25%', justifyContent: 'center' }}>
        <Image
          source={defaultCover}
          style={{
            width: 'auto',
            height: 112,
            resizeMode: 'cover',
          }}
        />
      </View>
    </Card>
  );
};

export default ClubCard;
