import { post } from './';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../constants';

export const signIn = (payload) =>
  post(`/oauth/token`, {
    ...payload,
    clientId: env.CLIENT_ID,
    grantType: 'password',
  });

export const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  return post(`/oauth/token`, {
    refreshToken,
    clientId: env.CLIENT_ID,
    grantType: 'refresh_token',
  });
};
