import Constants from 'expo-constants';

const ENV = {
  dev: {
    API_BASE: 'http://localhost:3000',
    CLIENT_ID: '8sluZTyLSdqtikAdBykm5mzTKe82PZ2kARYsVdxQxck',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (
    env === null ||
    env === undefined ||
    env === '' ||
    env.indexOf('dev') !== -1
  )
    return ENV.dev;
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('prod') !== -1) return ENV.prod;
};

const selectedENV = getEnvVars();

export default selectedENV;
