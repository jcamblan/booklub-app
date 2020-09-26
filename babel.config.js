const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.android.js', '.ios.js', '.web.js'],
          root: ['./src'],
          alias: {
            src: path.resolve(__dirname, 'src'),
          },
        },
      ],
    ],
  };
};
