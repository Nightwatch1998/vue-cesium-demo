const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const cesiumSource = "./node_modules/cesium/Source";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      //配置代理服务器来解决跨域问题
      "/api": {
        target: "http://localhost:80/api/", //配置要替换的后台接口地址
        changOrigin: true, //配置允许改变Origin
        pathRewrite: {
          "^/api/": "/",
        },
      },
    },
  },
  lintOnSave: false,
  configureWebpack: {
    output: {
      sourcePrefix: " ", // 修改输出bundle中每行的前缀
    },
    amd: {
      // 支持amd模块
      toUrlUndefined: true, // webpack在cesium中能友好的使用require
    },
    resolve: {
      extensions: [".js", ".vue", ".json"], //文件同名时解析顺序
      alias: {
        //'vue$': 'vue/dist/vue.esm.js',
        "@": path.resolve("src"),
        components: path.resolve("src/components"),
        assets: path.resolve("src/assets"),
        views: path.resolve("src/views"),
        'cesium': path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      // 4
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Workers"), to: "Workers" },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "ThirdParty/Workers"),
          to: "ThirdParty/Workers",
        },
      ]),
      new webpack.DefinePlugin({
        // 5
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "@open-wc/webpack-import-meta-loader",
          },
        },
        {
          test: /\.(glb|gltf)?$/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
  },
};
