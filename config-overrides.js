const { override, useEslintRc } = require('customize-cra');
const path = require('path');

module.exports = {
    paths: function (paths, env) {    
      override(useEslintRc());    
      return paths;
    },
  };
