import React from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { theme, Text } from 'ui';
import defaultCover from 'images/default-cover.jpg';
import styled from 'styled-components/native';
import Star from 'images/Star';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BookTitle = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0.8px;
  color: ${props => props.theme.colors.text};
`;

const BookAuthor = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.ternary};
`;

const Cover = ({ url }) => {
  const image = Boolean(url) ? { uri: url } : defaultCover;

  return (
    <Image
      source={image}
      style={{
        width: 100,
        height: 160,
        resizeMode: 'cover',
        borderRadius: 12,
      }}
    />
  );
};

const NoteWrapper = styled(View)`
  flex-direction: row;
  padding-vertical: ${props => `${props.theme.spacing(0.5)}px`};
`;

const BookNote = ({ note }) => {
  return (
    <NoteWrapper>
      <Star fill={note >= 2} />
      <Star fill={note >= 4} />
      <Star fill={note >= 6} />
      <Star fill={note >= 8} />
      <Star fill={note === 10} />
    </NoteWrapper>
  );
};

const BookButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: 12,
          flexGrow: 1,
          paddingVertical: theme.spacing(0.4),
          paddingHorizontal: theme.spacing(),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FontAwesome name="plus" style={{ marginRight: theme.spacing(0.5) }} />
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {children}
        </Text>
      </View>
      <View style={{ flexGrow: 2 }}></View>
    </TouchableOpacity>
  );
};

const BookCard = ({
  book,
  authorNames,
  coverUrl,
  buttonText,
  onPressButton,
  withNote = false,
}) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: theme.spacing() }}>
      <View style={{ width: 100, justifyContent: 'center' }}>
        <Cover url={coverUrl} />
      </View>
      <View
        style={{
          padding: theme.spacing(),
          justifyContent: 'center',
          width: Dimensions.get('screen').width - 100 - theme.spacing(2),
        }}
      >
        <BookTitle>{book?.title}</BookTitle>
        <BookAuthor>{authorNames?.join(', ')}</BookAuthor>
        {withNote && <BookNote note={book.averageNote} />}
        {Boolean(buttonText) && (
          <BookButton onPress={onPressButton}>{buttonText}</BookButton>
        )}
      </View>
    </View>
  );
};

export default BookCard;
