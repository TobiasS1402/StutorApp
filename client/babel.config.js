module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            '@': './src',
            '@components': './src/components',
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
