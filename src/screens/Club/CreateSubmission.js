import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import {
  Headline,
  ScreenTitle,
  Text,
  theme,
  TextLink,
  Separator,
  Card,
  SearchInput,
  Button,
} from 'ui';
import { Input } from 'ui/form';
import { useQuery, useMutation } from '@apollo/client';
import { BOOKS } from 'api/queries';
import { CREATE_SUBMISSION } from 'api/mutations';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'hooks';
import RefreshingScrollView from 'components/RefreshingScrollView';
import BookCard from 'components/Book/BookCard';

const SearchResults = ({ search, onSetBook, onSwitchForm, onHideResults }) => {
  const { data, loading, fetchMore } = useQuery(BOOKS, {
    variables: {
      orderBy: 'title',
      orderDirection: 'asc',
      search: search,
    },
  });

  const books = (data?.books?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  return (
    <>
      {books.map(book => (
        <BookCard
          key={book.id}
          buttonText="Proposer"
          book={book}
          onPressButton={() => {
            onSetBook(book);
            onHideResults();
          }}
        />
      ))}
      <Button
        onPress={() => {
          onSetBook(null);
          onHideResults();
          onSwitchForm();
        }}
      >
        Je ne trouve pas mon livre
      </Button>
    </>
  );
};

const BookSelection = ({ onSetBook, onSwitchForm }) => {
  const [resultsDisplay, setResultsDisplay] = useState(false);
  const [search, setSearch] = useState();
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
        Sélection du livre :
      </Headline>

      {/* Search input */}
      <SearchInput
        autoFocus={true}
        onChangeText={handleChange}
        placeholder="Titre, auteur..."
      />

      {/* We only render book list one the search begin. */}
      {/* We hide it when user press any item. */}
      {resultsDisplay && (
        <>
          <SearchResults
            search={search}
            onSwitchForm={() => onSwitchForm()}
            onSetBook={value => onSetBook(value)}
            onHideResults={() => setResultsDisplay(false)}
          />
          <Separator />
        </>
      )}
    </>
  );
};

const NewBookForm = ({ onSwitchForm, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  return (
    <View>
      <Headline style={{ marginBottom: theme.spacing() }}>
        Ajouter un nouveau livre :
      </Headline>
      <Input
        label="Titre"
        placeholder="Titre"
        onChangeText={value => setTitle(value)}
        autoFocus={true}
      />
      <Input
        label="Auteur"
        placeholder="Auteur"
        onChangeText={value => setAuthor(value)}
      />

      <View>
        <Button onPress={() => onSubmit({ title, author })} primary>
          Ajouter mon livre
        </Button>
        <Button onPress={() => onSwitchForm()}>Revenir à la recherche</Button>
      </View>
    </View>
  );
};

const CreateSubmission = ({ route }) => {
  const sessionId = route?.params?.sessionId;
  const [book, setBook] = useState();
  const [newBook, setNewBook] = useState();
  const [form, setForm] = useState('search');
  const submittedBook = book ?? newBook;
  const navigation = useNavigation();

  const [createSubmission] = useMutation(CREATE_SUBMISSION, {
    refetchQueries: ['session'],
  });

  const handleCreateSubmission = async () => {
    const bookInput = Boolean(book)
      ? { bookId: book.id }
      : { bookAttributes: newBook };

    try {
      await createSubmission({
        variables: {
          input: {
            sessionId: sessionId,
            ...bookInput,
          },
        },
      });
      navigation.navigate('SessionDetails', { sessionId: sessionId });
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <RefreshingScrollView>
      <ScreenTitle>Participate</ScreenTitle>
      {!Boolean(submittedBook) && form === 'search' && (
        <BookSelection
          onSetBook={value => setBook(value)}
          onSwitchForm={() => setForm('new')}
        />
      )}
      {!Boolean(submittedBook) && form === 'new' && (
        <NewBookForm
          onSwitchForm={() => setForm('search')}
          onSubmit={value => setNewBook(value)}
        />
      )}
      {Boolean(submittedBook) && (
        <>
          <Card>
            <Text style={{ fontSize: 15, color: theme.colors.success }}>
              {submittedBook.title}, {submittedBook.author}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TextLink
                title="Modifier"
                onPress={() => {
                  setBook(null);
                  setNewBook(null);
                }}
              />
            </View>
          </Card>
          <Separator />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextLink
              title="Valider mon inscription"
              onPress={() => handleCreateSubmission()}
            />
          </View>
        </>
      )}
    </RefreshingScrollView>
  );
};

export default CreateSubmission;
