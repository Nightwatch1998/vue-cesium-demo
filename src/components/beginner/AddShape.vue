<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    name: 'AddShape',
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container');
        // 添加几何图形
        var redBox = viewer.entities.add({
          name: "Red box with black outline",
          position: Cesium.Cartesian3.fromDegrees(118, 38, 300.0),
          box:{
            dimensions: new Cesium.Cartesian3(400, 300, 500),
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK
          }
        })
        viewer.zoomTo(redBox)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>