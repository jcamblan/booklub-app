import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { H1, H2, H3, Text, theme, TextLink, Separator, ShadowBox } from 'ui';
import { Input } from 'ui/form';
import { useQuery, useMutation } from '@apollo/client';
import { BOOKS } from 'api/queries';
import { CREATE_SUBMISSION } from 'api/mutations';

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
          <Text
            style={{
              color: 'white',
            }}
          >
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
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <H2>Sélection du livre</H2>

      {/* Search input */}

      <Input
        label={'Titre, auteur...'}
        value={inputValue}
        onChangeText={(value) => {
          setInputValue(value);
        }}
        onEndEditing={() => {
          setResultsDisplay(true);
          setSearch(inputValue);
        }}
      />

      {/* We only render book list one the search begin. */}
      {/* We hide it when user press any item. */}

      {resultsDisplay && (
        <>
          <SearchResults
            search={search}
            onSwitchForm={() => onSwitchForm()}
            onSetBook={(value) => onSetBook(value)}
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
        onChangeText={(value) => setTitle(value)}
        style={{ marginBottom: 10 }}
      />
      <Input label="Auteur" onChangeText={(value) => setAuthor(value)} />
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
  const sessionId =
    route?.params?.sessionId ||
    'U2Vzc2lvbi1mYjk0ODkyOC0zOWFkLTRiYjktYjY1ZC0yZjhkYmYxNzk2NzA=';
  const [book, setBook] = useState();
  const [newBook, setNewBook] = useState();
  const [form, setForm] = useState('search');
  const submittedBook = book ?? newBook;

  const [createSubmission] = useMutation(CREATE_SUBMISSION);

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
      navigation.navigate('ClubHome');
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <H1>Inscription</H1>
        <Separator />
        {!Boolean(submittedBook) && form === 'search' && (
          <BookSelection
            onSetBook={(value) => setBook(value)}
            onSwitchForm={() => setForm('new')}
          />
        )}
        {!Boolean(submittedBook) && form === 'new' && (
          <NewBookForm
            onSwitchForm={() => setForm('search')}
            onSubmit={(value) => setNewBook(value)}
          />
        )}
        {Boolean(submittedBook) && (
          <>
            <ShadowBox>
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
            </ShadowBox>
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
