const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css插件

module.exports = {
  entry: "./src/index.tsx", //设置入口文件
  output: {
    path: path.join(__dirname,"../", "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "../", "node_modules/.cache/webpack"),
  },
  resolve: {
    //配置如何解析
    alias: {
      //别名
      "@": path.resolve(__dirname,"../", "src"), // @指向src
      "~": path.resolve(__dirname,"../", "node_modules"), //~指向node_modules
    },
    //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        minimize: true,
        inject: true,
        // 是否对大小写敏感，默认false
        caseSensitive: true,
        // 是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
        collapseBooleanAttributes: true,
        // 是否去除空格，默认false
        collapseWhitespace: true,
        // 是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        // 是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        // Prevents the escaping of the values of attributes
        preventAttributesEscaping: true,
        // 是否移除属性的引号 默认false
        removeAttributeQuotes: true,
        // 是否移除注释 默认false
        removeComments: true,
        // 从脚本和样式删除的注释 默认false
        removeCommentsFromCDATA: true,
        // 是否删除空属性，默认false
        removeEmptyAttributes: true,
        // 若开启此项，生成的html中没有 body 和 head，html也未闭合
        removeOptionalTags: false,
        // 删除多余的属性
        removeRedundantAttributes: true,
        // 删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
        removeScriptTypeAttributes: true,
        // 删除style的类型属性， type="text/css" 同上
        removeStyleLinkTypeAttributes: true,
        // 使用短的文档类型，默认false
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
        parallel: true, // 使用多进程并行运行来提高构建速度。默认并发运行次数:os.cpus().length- 1。
      }),
    ],
    splitChunks: {
      chunks: "all", // async（默认）分割异步打包的代码， 'all'同时分割同步和异步代码,推荐。 'initial'也会同时打包同步和异步，但是异步内部的引入不再考虑，直接打包在一起
      minSize: 30000, // 按需加载时候最大的并行请求数
      minChunks: 1, // 最小公用模块次数，默认为1
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 一个入口最大的并行请求数
      // name: false,
      cacheGroups: {
        // 缓存策略，默认设置了分割node_modules和公用模块。内部的参数可以和覆盖外部的参数。
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10, // 优先级
          reuseExistingChunk: false, // 是否复用存在的chunk
          test: /node_modules\/(.*)\.js/, //  正则匹配文件
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
