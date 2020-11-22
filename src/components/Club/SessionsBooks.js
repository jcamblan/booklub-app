import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { theme, Text } from 'ui';
import { getCover } from 'api/googleBooks';
import { BookNote } from 'components/Book/BookCard';
import { useNavigation } from '@react-navigation/native';

const SelectedBook = ({ book, session }) => {
  const url = getCover({ id: book?.googleBookId });
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Session', {
          sessionId: session?.id,
          title: session?.name,
        })
      }
    >
      <Image
        source={{ uri: url }}
        style={{
          width: 130,
          height: 208,
          resizeMode: 'cover',
          borderRadius: 12,
          marginBottom: theme.spacing(0.5),
        }}
      />
      <Text style={{ fontWeight: 'bold' }}>{book?.title}</Text>
      <BookNote note={book?.averageNote} />
    </TouchableOpacity>
  );
};

const SessionsBooks = ({ sessions }) => {
  return (
    <Carousel
      keyExtractor={item => item?.id}
      data={sessions}
      renderItem={({ item, index, separators }) => (
        <SelectedBook book={item?.selectedBook} session={item} />
      )}
      itemWidth={130}
      sliderWidth={theme.screenWidth}
      slideStyle={{ marginRight: theme.spacing(0.5) }}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      activeSlideAlignment={'start'}
      contentContainerCustomStyle={{ marginBottom: theme.spacing() }}
    />
  );
};

export default SessionsBooks;
