module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['module:react-native-dotenv'],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            '@': './src',
            '@api/*': ['./src/api/*'],
            '@types': './src/types',
            '@hooks': './src/hooks',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@assets': './assets',
          },
          extensions: ['.ts', '.tsx'],
        },
      ],
    ],
  }
}
