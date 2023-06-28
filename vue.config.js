const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
// 使用构建压缩后的版本
const cesiumSource = "node_modules/cesium/Build/Cesium";

module.exports = {
  publicPath: './',
  assetsDir: './static',
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
  configureWebpack: (config)=>{
    let plugins = []
    if(process.env.NODE_ENV === 'production'){
      plugins = [
        // 由于cesium的npm包的问题,这里要复制静态资源到输出目录
        new CopyWebpackPlugin([
          { from: path.join(cesiumSource, "Workers"), to: "static/Workers" },
        ]),
        new CopyWebpackPlugin([
          { from: path.join(cesiumSource, "Assets"), to: "static/Assets" },
        ]),
        new CopyWebpackPlugin([
          { from: path.join(cesiumSource, "Widgets"), to: "static/Widgets" },
        ]),
        new CopyWebpackPlugin([
          { from: path.join(cesiumSource, "ThirdParty"), to: "static/ThirdParty" },
        ]),
        // 构建过程中将"CESIUM_BASE_URL"替换
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify("static"),
        }),
      ]
    }else{
      plugins = [
        // 由于cesium的npm包的问题,这里要复制静态资源到输出目录
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
          { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
        ]),
        // 开发环境中将"CESIUM_BASE_URL"替换为空字符串
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify(""),
        }),
      ]
    }
    return {
      output: {
        sourcePrefix: " ", // 修改输出bundle中每行的前缀
      },
      amd: {
        // 支持amd模块
        toUrlUndefined: true, // webpack在cesium中能友好的使用require
      },
      resolve: {
        // extensions: [".js", ".vue", ".json"], //文件同名时解析顺序
        alias: { // 路径别名
          "@": path.resolve("src"),
          // cesium: path.resolve(__dirname, cesiumSource),
        }
      },
      plugins: plugins,
      module: {
        // 遇到未知上下文不会抛出错误
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            sideEffects: false,
            use: [
              {
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false
                  }
                }
              }
            ]
          },
          // cesium1.75或者更高版本中使用import.meta语法获取包的元数据
          {
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            use: {
              loader: "@open-wc/webpack-import-meta-loader",
            },
          },
          // 为gltf模型指定加载器
          {
            test: /\.(glb|gltf)?$/,
            use: {
              loader: "url-loader",
            },
          },
        ],
      },
      // 性能优化
      optimization: {
        usedExports: true,
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name (module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            },
            commons: {
              name: 'Cesium',
              test: /[\\/]node_modules[\\/]cesium/,
              priority: 10,
              chunks: 'all'
            }
          }
        }
      },
    }
  }
};
