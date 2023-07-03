# vue-cesium-demo

vue+cesium  demo

## 问题总结

1. 加载不出球是因为使用的默认的 access_token,在组件使用时配置 Cesium.Ion.defaultAccessToken = 'xxx',有时候 Cesium.Ion 信号不好，需要 vpn
2. node-sass@4.14.1依赖 node14 版本
3. TerrainProvider 中的 url 参数在 1.104 版本被弃用，之后代替的是 fromUrl 并搭配 await
4.  加载Cesium Ion资源要使用最新的API  Cesium.Cesium3DTileset.fromIonAssetId 异步方式加载

```js
// 2023年7月3日为止最新的版本是1.106
const left = await Cesium.Cesium3DTileset.fromIonAssetId(69380);

// 在1.92版本要先获取在Chrome开发者工具查看资源URL，再使用URL加载
const left = new Cesium.Cesium3DTileset({ 	    url:'https://assets.ion.cesium.com/asset_depot/69380/MelbournePhotogrammetry/v1/tileset.json?v=2'
})
```

