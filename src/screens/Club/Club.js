import React, { useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { Headline, theme, Text, Button, Separator } from 'ui';
import { CLUB_FULL_DETAILS } from 'api/queries';
import { UPDATE_CLUB } from 'api/mutations';
import RefreshingScrollView from 'components/RefreshingScrollView';
import SessionCard from 'components/Club/SessionCard';
import SessionsBooks from 'components/Club/SessionsBooks';
import MemberList from 'components/Club/MemberList';
import { truncate } from 'lodash';
import ScreenTitle from 'components/ScreenTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { t } from 'i18n-js';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import UpdateForm from 'components/Club/UpdateForm';

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
  const modalizeRef = useRef(null);
  const { data, loading, refetch } = useQuery(CLUB_FULL_DETAILS, {
    variables: { id: route.params.clubId },
  });
  const club = data?.node;
  const oldSessions = (club?.sessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const userEdges = club?.users?.edges;

  const [updateClub] = useMutation(UPDATE_CLUB, {
    refetchQueries: ['myClubs'],
  });

  const onRefresh = async () => {
    await refetch();
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleUpdateClub = async values => {
    try {
      await updateClub({
        variables: {
          input: values,
        },
      });
      modalizeRef.current?.close();
    } catch (err) {}
  };

  console.log(data);

  return (
    <>
      <RefreshingScrollView onRefresh={onRefresh}>
        <ScreenTitle
          iconElement={
            Boolean(club?.canUpdate?.value) && (
              <FontAwesome
                name="edit"
                size={20}
                color={theme.colors.onSecondary}
                style={{ opacity: 0.8 }}
              />
            )
          }
          onPress={onOpen}
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
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalStyle={{
            padding: theme.spacing(),
            backgroundColor: theme.bottomSheet.backgroundColor,
          }}
          modalHeight={600}
        >
          <UpdateForm
            club={club}
            onUpdate={values => handleUpdateClub(values)}
          />
        </Modalize>
      </Portal>
    </>
  );
};

export default Club;
