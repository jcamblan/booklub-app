import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SESSION_FULL_DETAILS } from 'api/queries';
import { View, Image } from 'react-native';
import {
  Text,
  ScreenTitle,
  Headline,
  Title,
  Card,
  theme,
  Button,
  Separator,
} from 'ui';
import { formatDistanceDate } from 'utils';
import RefreshingScrollView from 'components/RefreshingScrollView';
import Carousel from 'react-native-snap-carousel';
import { getCover } from 'api/googleBooks';
import defaultCover from 'images/default-cover.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookCard from 'components/Book/BookCard';

const states = {
  submission: 'Inscription',
  draw: 'Tirage',
  reading: 'Lecture',
  conclusion: 'Vote',
  archived: 'Archivé',
};

const StateCard = ({ style, iconName, text, title }) => {
  return (
    <Card style={{ flex: 1, height: 143, ...style }}>
      <View style={{ flex: 0, padding: theme.spacing(0.5) }}>
        <FontAwesome5
          name={iconName}
          size={26}
          color={theme.colors.onSecondary}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: theme.spacing(0.5),
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{ fontWeight: 'bold', color: theme.colors.secondaryVariant }}
        >
          {text}
        </Text>
        <Title>{title}</Title>
      </View>
    </Card>
  );
};

const BookProposal = ({ book, user }) => {
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
      <Text style={{ fontWeight: 'bold' }}>{book.title}</Text>
      <Text style={{ color: theme.colors.secondaryVariant }}>
        By {user.username}
      </Text>
    </View>
  );
};

const Session = ({ route, navigation }) => {
  const sessionId = route?.params?.sessionId;
  const { data, loading, refetch } = useQuery(SESSION_FULL_DETAILS, {
    variables: { id: sessionId },
  });
  const session = data?.node;
  const submissions = (session?.submissions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const notes = (session?.notes?.edges ?? []).map(({ node }) => ({
    ...node,
  }));
  const averageClubNote =
    (session?.notes?.edges ?? [])
      .map(({ node: { value } }) => value)
      .reduce((sum, note) => sum + note, 0) / session?.notes?.edges?.length;

  const onRefresh = async () => await refetch();

  const selectedBookAuthors = (session?.selectedBook?.authors?.edges ?? []).map(
    ({ node: { name } }) => name,
  );

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>{session?.name}</ScreenTitle>

      <View style={{ flexDirection: 'row' }}>
        {session?.state === 'submission' && (
          <StateCard
            iconName="clock"
            text="Starts in"
            title={formatDistanceDate({
              date: session?.submissionDueDate,
              addSuffix: false,
            })}
            style={{ marginRight: theme.spacing() }}
          />
        )}
        {session?.state !== 'submission' && (
          <StateCard
            iconName="clock"
            text="Ends in"
            title={formatDistanceDate({
              date: session?.readDueDate,
              addSuffix: false,
            })}
            style={{ marginRight: theme.spacing() }}
          />
        )}
        <StateCard
          iconName="users"
          text="Participants"
          title={submissions?.length}
        />
      </View>

      <Separator />

      {Boolean(session?.selectedBook) && (
        <>
          <Headline style={{ marginBottom: theme.spacing() }}>
            Selected book
          </Headline>
          <BookCard
            coverUrl={getCover({ id: session?.selectedBook?.googleBookId })}
            book={session?.selectedBook}
            authorNames={selectedBookAuthors}
            withNote
          />
          <View style={{ marginTop: theme.spacing() }}>
            <Button
              primary
              onPress={() =>
                navigation.navigate('ReviewBook', { session: session })
              }
            >
              {Boolean(session?.userNote) ? 'Edit' : 'Submit'} your review
            </Button>
          </View>
          <Separator />
        </>
      )}

      {submissions.length > 0 && (
        <>
          <Headline style={{ marginBottom: theme.spacing() }}>
            Book proposals
          </Headline>
          <Carousel
            keyExtractor={item => item?.id}
            data={submissions}
            renderItem={({ item: { user, book }, index, separators }) => (
              <BookProposal user={user} book={book} />
            )}
            itemWidth={130}
            sliderWidth={theme.screenWidth}
            slideStyle={{ marginRight: theme.spacing(0.5) }}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
            contentContainerCustomStyle={{ marginBottom: theme.spacing() }}
          />
        </>
      )}

      {session?.canParticipate?.value && (
        <Button
          primary
          onPress={() =>
            navigation.navigate('CreateSubmission', { sessionId: session?.id })
          }
        >
          Submit a book
        </Button>
      )}
    </RefreshingScrollView>
  );
};

export default Session;
