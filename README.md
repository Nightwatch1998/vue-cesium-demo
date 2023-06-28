# vue-cesium-pipeline
vue+cesium实现管线数据可视化的demo

### 问题
1. 加载不出球是因为使用的默认的access_token,在组件使用时配置Cesium.Ion.defaultAccessToken = 'xxx'
2. 也有可能是使用的地图需要vpn

## 用IDEA打开

## 项目文档目录结构
```
vue-cesium-pipeline
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── data
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── router
│   ├── store
│   └── views
└── vue.config.js
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
