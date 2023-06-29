<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    name: 'demo',
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted( () => {
        // Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        // bingmap
        const bingMapProvider = new Cesium.BingMapsImageryProvider({
            url : 'https://dev.virtualearth.net', // 固定的请求URL
            key: "AuhjqvgkoaLn1EyLhS3RlNjCdaipwUyY8L0MkxgjKD2a_jCb-VxqYYjGfYzuWyxX",
            mapStyle: Cesium.BingMapsStyle.AERIAL
        })

        // 高德地图

        // 天地图WMTS服务
        const accessKey = '7b7fbb3f7001c08bc310cf7c33b753ff'
        // 矢量底图或者影像图
        const tdtProvider = new Cesium.WebMapTileServiceImageryProvider({
          url:`http://{s}.tianditu.gov.cn/img_w/wmts?tk=${accessKey}`,
          layer:'img', // 图层名称,wec矢量底图，img为影像底图
          tileMatrixSetID:'w', // 瓦片矩阵集标识，w标识球面墨卡托投影
          format:'tiles', // 瓦片格式
          style:'default', // 默认样式
          maximumLevel:18, //最大显示级别
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          credit: "天地图" // 来源标识
        })
        // 注记图层
        const tdtLabelProvider = new Cesium.WebMapTileServiceImageryProvider({
          url:`http://{s}.tianditu.gov.cn/cva_w/wmts?tk=${accessKey}`,
          layer:'cva', // 图层名称,wec矢量底图，img为影像底图
          tileMatrixSetID:'w', // 瓦片矩阵集标识，w标识球面墨卡托投影
          format:'tiles', // 瓦片格式
          style:'default', // 默认样式
          maximumLevel:18, //最大显示级别
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          credit: "天地图" // 来源标识
        })
        const baseLayer1 = new Cesium.ImageryLayer(tdtProvider)
        const baseLayer2 = new Cesium.ImageryLayer(tdtLabelProvider)
        // 离线地图
        
        var viewer = new Cesium.Viewer('container',{
          imageryProvider: tdtProvider,
          baseLayerPicker: false, // 同时要禁用图层选择器
        })
        viewer.scene.imageryLayers.add(baseLayer1)
        viewer.scene.imageryLayers.add(baseLayer2)
        // 如何自定义图层选择器
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>