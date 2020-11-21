import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground as RnImageBackground,
} from 'react-native';
import { pluralize } from 'utils';
import { theme, Text, Title, Headline } from 'ui';
import { useNavigation } from '@react-navigation/native';
import { upperCase } from 'lodash';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = styled(TouchableOpacity)`
  flex: 1;
  height: 145px;
  border-radius: 15px;
`;

const DefaultWrapper = styled(View)`
  flex: 1;
  elevation: 19;
  border-radius: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const ImageBackground = styled(RnImageBackground)`
  flex: 1;
  resize-mode: cover;
  justify-content: center;
  height: 145px;
`;

const ImageBackgroundCardWrapper = styled(View)`
  elevation: 19;
  border-radius: 15px;
`;

const GradrientWrapper = styled(LinearGradient)`
  height: 145px;
  border-radius: 15px;
`;

const CardContentWrapper = styled(View)`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing()}px`};
  justify-content: flex-end;
  border-radius: 15px;
`;

const MembersChunk = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondaryVariant};
`;

const BackgroundedCard = ({ club, ...props }) => (
  <Card {...props}>
    <ImageBackground
      source={{ uri: club?.bannerUrl }}
      imageStyle={{ borderRadius: 15 }}
    >
      <GradrientWrapper colors={['transparent', 'rgba(0,0,0,0.8)']}>
        <CardContentWrapper>
          <MembersChunk style={{ color: 'white' }}>
            {upperCase(
              club?.users?.totalCount +
                ' ' +
                pluralize('member', club?.users?.totalCount),
            )}
          </MembersChunk>
          <Headline style={{ color: 'white' }}>{club.name}</Headline>
        </CardContentWrapper>
      </GradrientWrapper>
    </ImageBackground>
  </Card>
);

const DefaultCard = ({ club, ...props }) => (
  <Card {...props}>
    <DefaultWrapper>
      <CardContentWrapper>
        <MembersChunk>
          {upperCase(
            club?.users?.totalCount +
              ' ' +
              pluralize('member', club?.users?.totalCount),
          )}
        </MembersChunk>
        <Headline>{club.name}</Headline>
      </CardContentWrapper>
    </DefaultWrapper>
  </Card>
);

const ClubCard = ({ club }) => {
  const navigation = useNavigation();

  if (!Boolean(club?.bannerUrl)) {
    return (
      <DefaultCard
        club={club}
        style={{ marginBottom: theme.spacing() }}
        onPress={() =>
          navigation.navigate('Club', {
            clubId: club?.id,
            title: club?.name,
          })
        }
      />
    );
  }

  return (
    <BackgroundedCard
      club={club}
      style={{ marginBottom: theme.spacing() }}
      onPress={() =>
        navigation.navigate('Club', {
          clubId: club?.id,
          title: club?.name,
        })
      }
    />
  );
};

export default ClubCard;
