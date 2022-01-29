const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // Creates a unique css bundle file, add to html. <link rel="stylesheet" href="./dist/styles.css">
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // Cleans old version files from dist
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    app: "./src/app.js",
  },
  output: {
    filename: "[name].[contenthash].js", // contenthash for version support in cache
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_",
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"], // supports all js versions
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // contenthash for version support in cache
    }),
    // new CleanWebpackPlugin({
    //     cleanOnceBeforeBuildPatterns: [
    //         '**/*', path.join(process.cwd(), 'folderName/**/*') // Clean other folders, cleans output file by default.
    //     ]
    // })
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["subscriptionmanager"], // Specified in entry point
      title: "Subscription Manager",
      description: "Subscription Manager",
    }),
  ],
}
