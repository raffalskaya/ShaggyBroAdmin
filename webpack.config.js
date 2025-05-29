const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
var pack = require("./package.json");

const isDevMode = !process.argv.includes("--mode=production");

module.exports = (env) => {
  const config = {
    mode: !isDevMode ? "production" : "development",
    stats: "minimal",
    entry: {
      app: "./sources/app.ts",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devServer: {
      static: "./dist",
      port: 8030,
      liveReload: true,
      compress: false,
      webSocketServer: "ws",
      devMiddleware: {
        writeToDisk: false,
      },
      allowedHosts: "all",
      client: {
        logging: "error",
        webSocketURL: "auto://0.0.0.0:0/ws",
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: [path.join(__dirname, "./sources"), "node_modules"],
      alias: {
        "jet-views": path.resolve(__dirname, "sources/views"),
        "jet-locales": path.resolve(__dirname, "sources/locales"),
      },
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./static/webix/", to: "webix/" },
          { from: "./static/MaterialDesign/", to: "MaterialDesign/" }
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./static/index/index.html",
        chunks: ["app"],
      }),
    ],
  };

  if (!isDevMode) {
    config.externals = ["webix"];
    const out = config.output;
    out.libraryTarget = "umd";
  } else {
    config.devtool = "source-map";
  }

  return config;
};
