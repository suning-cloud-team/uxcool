const autoprefixer = require('autoprefixer');

module.exports = () => ({
  plugins: [
    autoprefixer({
      browsers: ['>= 5%', 'last 2 versions', 'ie >=9']
    })
  ]
});
