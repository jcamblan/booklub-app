import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { Headline, theme, Text, Button, Separator } from 'ui';
import { CLUB_FULL_DETAILS } from 'api/queries';
import RefreshingScrollView from 'components/RefreshingScrollView';
import SessionCard from 'components/Club/SessionCard';
import SessionsBooks from 'components/Club/SessionsBooks';
import MemberList from 'components/Club/MemberList';
import { truncate } from 'lodash';
import ScreenTitle from 'components/ScreenTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { t } from 'i18n-js';

const PreviousBook = ({ book }) => {
  const url = getCover({ id: book?.googleBookId });
  const image = Boolean(url) ? { uri: url } : defaultCover;

  return (
    <View>
      <Image
        source={image}
        style={{
          width: 130,
          height: 208,
          resizeMode: 'cover',
          borderRadius: 12,
        }}
      />
      <Text style={{ fontWeight: 'bold' }}>{book?.title}</Text>
      <Text style={{ color: theme.colors.secondaryVariant }}>
        By {user.username}
      </Text>
    </View>
  );
};

const Club = ({ route, navigation }) => {
  const { data, loading, refetch } = useQuery(CLUB_FULL_DETAILS, {
    variables: { id: route.params.clubId },
  });
  const club = data?.node;
  const oldSessions = (club?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const userEdges = club?.users?.edges;

  const onRefresh = async () => {
    await refetch();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle
        iconElement={
          <FontAwesome
            name="plus"
            size={20}
            color={theme.colors.onSecondary}
            style={{ opacity: 0.8 }}
          />
        }
      >
        {truncate(club?.name, { length: 18 })}
      </ScreenTitle>
      {Boolean(club?.currentSession) && (
        <>
          <SessionCard session={club?.currentSession} />
          <Separator />
        </>
      )}

      {club?.canCreateSession?.value && (
        <>
          <Button
            primary
            onPress={() =>
              navigation.navigate('CreateSession', {
                clubId: club?.id,
              })
            }
          >
            {t('screens.Club.newSessionButton')}
          </Button>
          <Separator />
        </>
      )}

      {oldSessions.length > 0 && (
        <>
          <Headline style={{ marginBottom: theme.spacing() }}>
            {t('screens.Club.lastSessionsTitle')}
          </Headline>
          <SessionsBooks sessions={oldSessions} />
          <Separator />
        </>
      )}

      {userEdges.length > 0 && (
        <>
          <Headline style={{ marginBottom: theme.spacing() }}>
            {t('screens.Club.memberListTitle')}
          </Headline>
          <MemberList userEdges={userEdges} />
        </>
      )}
    </RefreshingScrollView>
  );
};

export default Club;
