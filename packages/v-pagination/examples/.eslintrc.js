const path = require('path');
console.log('apth', path.resolve('./'));
module.exports = {
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "alias": {
              "@suning/v-pagination": path.resolve('./'),
              "a": path.resolve('./')
            }
          }
        }
      }
    }
  }
}
