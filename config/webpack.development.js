const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    hot: true, //热更新插件 构建的时候如果只有一个模块变化，那么只构建这一个模块，其他模块用缓存，极大提升构建速度，体验更
    contentBase: path.join(__dirname, "dist"), //静态文件根目录
    compress: true,
    // colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000",
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.js|jsx/,
        use: ["babel-loader"],
      },
      {
        test: /\.css/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.less$/, //处理less
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { importLoaders: 0 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: { importLoaders: 1, javascriptEnabled: true },
            },
          },
        ],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
    ],
  },
};
