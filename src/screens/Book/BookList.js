import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { Text, theme, ScreenTitle, Separator } from 'ui';
import { SearchInput as SearchBook } from 'ui/form';
import { useQuery } from '@apollo/client';
import { Input } from 'ui/form';
import { BOOKS } from 'api/queries';
import { round } from 'lodash';
import BookCard from 'components/Book/BookCard';
import RefreshingScrollView from 'components/RefreshingScrollView';
import { getCover } from 'api/googleBooks';

const List = ({ books, onReorder }) => {
  return (
    <View>
      {books.map(book => {
        const authorNames = (book?.authors?.edges ?? []).map(
          ({ node }) => node?.name,
        );

        const coverUrl = getCover({ id: book.googleBookId });

        return (
          <BookCard
            coverUrl={coverUrl}
            key={book.id}
            book={book}
            authorNames={authorNames}
            withNote
          />
        );
      })}
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

  const { data, loading, fetchMore, refetch } = useQuery(BOOKS, {
    variables: {
      orderBy: orderBy,
      orderDirection: direction,
      search: search,
    },
  });

  const books = (data?.books?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const handleReorder = value => {
    if (lastReorder === value) {
      setDirection(direction === 'desc' ? 'asc' : 'desc');
    } else {
      setOrderBy(value);
      setLastReorder(value);
    }
  };

  const handleSearch = value => {
    setSearch(value);
  };

  const handleFetchMore = async () => {
    if (data?.books?.pageInfo?.hasNextPage === false) {
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <RefreshingScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          handleFetchMore();
        }
      }}
      scrollEventThrottle={300}
      onRefresh={onRefresh}
    >
      <ScreenTitle>Explore</ScreenTitle>

      <SearchBook onChangeText={handleSearch} placeholder="Titre, auteur..." />

      <List books={books} onReorder={handleReorder} />

      {(loading || fetching) && <ActivityIndicator margin={10} />}

      <Separator />
    </RefreshingScrollView>
  );
};

export default BookList;
