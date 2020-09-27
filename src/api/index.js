import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import env from 'constants';
const api = axios.create({ baseURL: env.API_BASE });

const formatConfig = ({ params, ...opts } = {}) => ({
  ...opts,
  params: decamelizeKeys(params),
});

api.interceptors.request.use(config => {
  config.headers['Accept'] = 'application/json';

  return config;
});

const formatResponse = response => {
  if (!Boolean(response)) {
    return response;
  }

  return camelizeKeys(response);
};

export const get = (uri, config = {}) =>
  api.get(uri, formatConfig(config)).then(formatResponse);

export const post = (uri, payload = {}, config) =>
  api
    .post(uri, decamelizeKeys(payload), formatConfig(config))
    .then(formatResponse);
