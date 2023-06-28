# vue-cesium-pipeline

vue+cesium 实现管线数据可视化的 demo

### 问题

1. 加载不出球是因为使用的默认的 access_token,在组件使用时配置 Cesium.Ion.defaultAccessToken = 'xxx',有时候 Cesium.Ion 信号不好，需要 vpn
2. node-sass@4.14.1依赖 node14 版本

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
