import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  Headline,
  ScreenTitle,
  Text,
  theme,
  Card,
  SearchInput,
  Button,
} from 'ui';
import { Input } from 'ui/form';
import { useMutation } from '@apollo/client';
import { CREATE_SUBMISSION } from 'api/mutations';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'hooks';
import RefreshingScrollView from 'components/RefreshingScrollView';
import BookCard from 'components/Book/BookCard';
import { searchBook } from 'api/googleBooks';
import { t } from 'i18n-js';

const SearchResults = ({ search, onSetBook, onSwitchForm, onHideResults }) => {
  const [apiDatas, setApiDatas] = useState();

  const fetchApi = async () => {
    await searchBook({ search: search }).then(({ data }) => {
      setApiDatas(data);
    });
  };

  const books = (apiDatas?.items ?? []).map(({ id, volumeInfo }) => ({
    id,
    ...volumeInfo,
  }));

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <>
      {books.map(book => (
        <BookCard
          key={book.id}
          buttonText={t('screens.CreateSubmission.submitBookButton')}
          book={book}
          authorNames={book.authors}
          coverUrl={book?.imageLinks?.thumbnail}
          onPressButton={() => {
            onSetBook(book);
            onHideResults();
          }}
        />
      ))}
    </>
  );
};

const BookSelection = ({ onSetBook, onSwitchForm }) => {
  const [resultsDisplay, setResultsDisplay] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debouncedText = useDebounce(debouncedSearch, 300);

  useEffect(() => setSearch(debouncedText), [debouncedText]);

  const handleChange = value => {
    setDebouncedSearch(value);
    setResultsDisplay(true);
  };

  return (
    <>
      <Headline style={{ marginBottom: theme.spacing() }}>
        {t('screens.CreateSubmission.selectTitle')}
      </Headline>

      {/* Search input */}
      <SearchInput
        autoFocus={true}
        onChangeText={handleChange}
        placeholder={t('screens.CreateSubmission.searchPlaceholder')}
      />

      {/* We only render book list one the search begin. */}
      {/* We hide it when user press any item. */}
      {resultsDisplay && (
        <>
          <SearchResults
            search={search}
            onSetBook={value => onSetBook(value)}
            onHideResults={() => setResultsDisplay(false)}
          />
        </>
      )}
    </>
  );
};

const CreateSubmission = ({ route }) => {
  const sessionId = route?.params?.sessionId;
  const [book, setBook] = useState();
  const navigation = useNavigation();

  const [createSubmission] = useMutation(CREATE_SUBMISSION, {
    refetchQueries: ['session'],
  });

  const handleCreateSubmission = async () => {
    const { id: googleBookId, title, authors } = book;
    const variables = {
      input: {
        sessionId: sessionId,
        bookAttributes: { googleBookId, title, authors },
      },
    };

    try {
      const { data } = await createSubmission({ variables });
      console.log(data);
      if (Boolean(data?.createSubmission?.submission?.id)) {
        navigation.navigate('Session', { sessionId: sessionId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RefreshingScrollView>
      <ScreenTitle>{t('screens.CreateSubmission.title')}</ScreenTitle>
      {!Boolean(book) && (
        <BookSelection
          onSetBook={value => setBook(value)}
          onSwitchForm={() => setForm('new')}
        />
      )}
      {Boolean(book) && (
        <>
          <Headline style={{ marginBottom: theme.spacing() }}>
            {t('screens.CreateSubmission.confirmChoiceTitle')}
          </Headline>
          <BookCard
            book={book}
            authorNames={book?.authors}
            coverUrl={book?.imageLinks?.thumbnail}
          />
          <Button primary onPress={() => handleCreateSubmission()}>
            {t('screens.CreateSubmission.validateButton')}
          </Button>
          <Button onPress={() => setBook(null)}>
            {t('screens.CreateSubmission.editButton')}
          </Button>
        </>
      )}
    </RefreshingScrollView>
  );
};

export default CreateSubmission;
