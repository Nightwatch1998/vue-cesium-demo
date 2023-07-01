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
        var viewer = new Cesium.Viewer('container',{
            shouldAnimate: true
        });
        // entity位置
        var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0514706, 2)

        // 相对于平面坐标系的姿态
        var heading = Cesium.Math.toRadians(0)  // 方位角
        var pitch = Cesium.Math.toRadians(15.0) // 点头
        var roll = Cesium.Math.toRadians(15.0) // 滚动
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        // 姿态四元数
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

        var entity = viewer.entities.add({
          description: "战舰模型测试",
          position: position,
          
          // 这里的heading、pitch、roll是模型相对一高斯投影平面的旋转参数
          orientation: orientation,
          model: {
            // uri: "data/models/Cesium_Air.glb"
            uri: "data/models/ship.glb"
          },
        })
        viewer.zoomTo(entity)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>