const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "../", "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(
      __dirname,
      "../",
      "node_modules/.cache/webpack"
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../", "src"),
      "~": path.resolve(__dirname, "../", "node_modules"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        // @ts-ignore
        minimize: true,
        inject: true,
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /node_modules/,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: "styles",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
};
