import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Text, theme, Title, Separator } from 'ui';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { findNoteColor } from 'utils';
import { Input } from 'ui/form';

const BOOKS = gql`
  query books(
    $orderBy: BookOrderBy!
    $orderDirection: OrderDirection
    $search: String
    $after: String
  ) {
    books(
      order: { by: $orderBy, direction: $orderDirection }
      search: $search
      first: 10
      after: $after
    ) {
      edges {
        node {
          id
          title
          author
          averageNote
          submissionCount
          noteCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const SearchBook = ({ onSearch }) => {
  return (
    <Input
      label="Titre, auteur..."
      onChangeText={(value) => onSearch(value)}
      textContentType="emailAddress"
      style={{ marginBottom: 16 }}
    />
  );
};

const ListItem = ({
  book: { id, title, author, submissionCount, averageNote },
}) => (
  <View
    style={{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: 3,
    }}
    key={id}
  >
    <View
      style={{
        backgroundColor: theme.colors.secondary,
        flexGrow: 2,
        marginRight: 2,
        borderRadius: 5,
        padding: 10,
        flexShrink: 2,
      }}
    >
      <Text
        style={{
          fontWeight: '600',
          color: findNoteColor(averageNote),
        }}
      >
        {title},
      </Text>
      <Text
        style={{
          fontStyle: 'italic',
          color: findNoteColor(averageNote),
        }}
      >
        {author}
      </Text>
    </View>
    <View
      style={{
        backgroundColor: theme.colors.secondary,
        width: 50,
        marginRight: 2,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          color: findNoteColor(averageNote),
        }}
      >
        {submissionCount}
      </Text>
    </View>
    <View
      style={{
        backgroundColor: theme.colors.secondary,
        width: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          color: findNoteColor(averageNote),
        }}
      >
        {averageNote}
      </Text>
    </View>
  </View>
);

const List = ({ books, onReorder }) => {
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <TouchableOpacity
          style={{
            flexGrow: 2,
            marginRight: 2,
          }}
          onPress={() => onReorder('title')}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Livre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 50,
            marginRight: 2,
          }}
          onPress={() => onReorder('submission_count')}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Proposé
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 50,
          }}
          onPress={() => onReorder('average_note')}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}
          >
            Note
          </Text>
        </TouchableOpacity>
      </View>
      {books.map((book) => (
        <ListItem key={book.id} book={book} />
      ))}
    </View>
  );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = -40;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const BookList = () => {
  const [orderBy, setOrderBy] = useState('average_note');
  const [direction, setDirection] = useState('desc');
  const [lastReorder, setLastReorder] = useState('title');
  const [search, setSearch] = useState('');
  const [fetching, setFetching] = useState(false);

  const { data, loading, fetchMore } = useQuery(BOOKS, {
    variables: {
      orderBy: orderBy,
      orderDirection: direction,
      search: search,
    },
  });

  const books = (data?.books?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const handleReorder = (value) => {
    if (lastReorder === value) {
      setDirection(direction === 'desc' ? 'asc' : 'desc');
    } else {
      setOrderBy(value);
      setLastReorder(value);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleFetchMore = async () => {
    if (data?.books?.pageInfo?.hasNextPage == false) {
      return;
    }
    setFetching(true);
    await fetchMore({
      variables: {
        orderBy: orderBy,
        orderDirection: direction,
        search: search,
        after: data?.books?.pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.books.edges;
        const pageInfo = fetchMoreResult.books.pageInfo;

        return newEdges.length
          ? {
              books: {
                __typename: previousResult.books.__typename,
                edges: [...previousResult.books.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
    setFetching(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{ padding: 20 }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleFetchMore();
          }
        }}
        scrollEventThrottle={500}
      >
        <Title>Livres proposés</Title>
        <SearchBook onSearch={handleSearch} />
        <List books={books} onReorder={handleReorder} />
        {(loading || fetching) && <ActivityIndicator margin={10} />}
        <Separator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookList;
