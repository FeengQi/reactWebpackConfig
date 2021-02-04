const commConfig = require("./config/webpack.comm");
const developmentConfig = require("./config/webpack.development");
const productionConfig = require("./config/webpack.production");
const { merge } = require("webpack-merge");

module.exports = (mode) => {
  if (mode.production) {
    return merge(commConfig, productionConfig);
  }
  return merge(commConfig, developmentConfig);
};
