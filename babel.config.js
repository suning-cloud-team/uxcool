module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@vue/babel-preset-jsx',
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            // modules: 'commonjs',
            targets: {
              node: 'current',
            },
          },
        ],
        '@vue/babel-preset-jsx',
      ],
    },
  },
};
