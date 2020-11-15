import axios from 'axios';

const api = axios.create({ baseURL: 'https://www.googleapis.com/books/v1/' });

export const searchBook = ({ search }) => {
  return api.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(search)}`,
  );
};

export const getCover = ({ id }) => {
  if (!Boolean(id)) {
    return;
  }

  return `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2&zoom=1`;
};
