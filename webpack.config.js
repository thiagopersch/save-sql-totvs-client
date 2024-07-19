import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export const plugins = [
  new MonacoWebpackPlugin({
    languages: ['sql'], // ou outros idiomas necessários
  }),
];
