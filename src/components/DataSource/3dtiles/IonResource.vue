<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container');
        // 添加Inspector
        // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)
        const Ion3DtileURLS = {
          // 精细BIM模型
          "BIM":'https://assets.ion.cesium.com/1240402/tileset.json?v=1',
          // 大场景建筑物白模型
          "WhiteModel": 'https://assets.ion.cesium.com/asset_depot/75343/NYCDoITT/v1/tileset.json?v=2',
          // 倾斜摄影建筑物模型
          "Slope": 'https://assets.ion.cesium.com/40866/tileset.json?v=2',
          // 旧金山建筑物模型
          "SanFrancisco":'https://assets.ion.cesium.com/asset_depot/1415196/Aerometrex/SanFrancisco/v1/tileset.json?v=2',
          // 点云数据
          "PointCloud": 'https://assets.ion.cesium.com/16421/tileset.json?v=1'
        }
        // primitives方式加载
        const tileset = new Cesium.Cesium3DTileset({
          url: Ion3DtileURLS.SanFrancisco
        })
        viewer.scene.primitives.add(tileset)
        viewer.zoomTo(tileset)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>