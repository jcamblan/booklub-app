import Constants from 'expo-constants';

const ENV = {
  dev: {
    API_BASE: 'https://booklub-api.herokuapp.com',
    CLIENT_ID: '8sluZTyLSdqtikAdBykm5mzTKe82PZ2kARYsVdxQxck',
  },
  staging: {
    API_BASE: 'https://booklub-api.herokuapp.com',
    CLIENT_ID: '8sluZTyLSdqtikAdBykm5mzTKe82PZ2kARYsVdxQxck',
  },
  prod: {
    API_BASE: 'https://booklub-api.herokuapp.com',
    CLIENT_ID: '8sluZTyLSdqtikAdBykm5mzTKe82PZ2kARYsVdxQxck',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (env?.indexOf('staging') !== -1) {
    return ENV.staging;
  }

  if (env?.indexOf('prod') !== -1) {
    return ENV.prod;
  }

  return ENV.dev;
};

const selectedENV = getEnvVars();

export default selectedENV;
