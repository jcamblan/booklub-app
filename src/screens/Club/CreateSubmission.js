import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  H2,
  H3,
  Text,
  theme,
  TextLink,
  Separator,
  Card,
  SearchInput,
} from 'ui';
import { Input } from 'ui/form';
import { useQuery, useMutation } from '@apollo/client';
import { BOOKS } from 'api/queries';
import { CREATE_SUBMISSION } from 'api/mutations';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'hooks';

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
    <FlatList
      data={books}
      ListFooterComponent={() => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TextLink
            title="Ajouter un livre"
            onPress={() => {
              onSetBook(null);
              onHideResults();
              onSwitchForm();
            }}
          />
        </View>
      )}
      style={{ maxHeight: 200, borderRadius: 5 }}
      renderItem={({ item, index }) => {
        const result = (
          <Text>
            {item?.title},{' '}
            <Text style={{ fontStyle: 'italic' }}>{item.author}</Text>
          </Text>
        );
        return (
          <TouchableOpacity
            style={{
              flexGrow: 2,
              marginRight: 2,
            }}
            onPress={() => {
              onSetBook(item);
              onHideResults();
            }}
          >
            <View
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? theme.colors.secondary
                    : theme.colors.ternary,
                width: '100%',
                marginRight: 2,
                padding: 10,
                justifyContent: 'center',
              }}
            >
              {result}
            </View>
          </TouchableOpacity>
        );
      }}
    />
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
      <H2 style={{ marginBottom: theme.spacing() }}>Sélection du livre</H2>
      {/* Search input */}

      <SearchInput onChangeText={handleChange} placeholder="Titre, auteur..." />

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
      <H3>Ajouter un nouveau livre :</H3>
      <Input
        label="Titre"
        onChangeText={value => setTitle(value)}
        style={{ marginBottom: 10 }}
      />
      <Input label="Auteur" onChangeText={value => setAuthor(value)} />
      <Separator />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TextLink
          title="Revenir à la recherche"
          onPress={() => onSwitchForm()}
        />
        <TextLink title="Valider" onPress={() => onSubmit({ title, author })} />
      </View>
      <Separator />
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
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
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
              <H3>Livre proposé :</H3>
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

        <Separator />

        <Text style={{ color: theme.colors.ternary }}>
          Vous vous apprêtez à rejoindre une nouvelle session de lecture. Vous
          pouvez rechercher un livre à proposer avec le formulaire ci-dessus. Si
          vous ne trouvez pas le livre que vous cherchez, vous pouvez l'ajouter
          dans notre base de données.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSubmission;
