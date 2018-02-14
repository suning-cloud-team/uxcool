module.exports = ({ options }) => {
  return {
    plugins: {
      autoprefixer: options.autoprefixer,
    },
  };
};
