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
        // 第一种方式
        // setView1：Cartesian3方式
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(116.435314,39.960521, 15.0),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: Cesium.Math.toRadians(0)
          }
        })

        // setView2：Rectangle方式,矩形区域完全可见
        viewer.camera.setView({
          destination: Cesium.Rectangle.fromDegrees(110.0,30.0,120.0,40.0),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: Cesium.Math.toRadians(0)
          }
        })
        // 第二种方式flyTo
        viewer.camera.flyTo({
          destination : Cesium.Cartesian3.fromDegrees(116.435314,39.960521, 15000.0), // 设置位置
          orientation: {
            heading : Cesium.Math.toRadians(20.0), // 方向
            pitch : Cesium.Math.toRadians(-90.0),// 倾斜角度
            roll: 0
          },
          duration: 5,
          complete:function(){
            console.log("相机飞行至指定位置")
          }
        })

        // 第三种方式lookAt
        var center = Cesium.Cartesian3.fromDegrees(114.4445,33.0033)
        var heading = Cesium.Math.toRadians(50.0)
        var pitch = Cesium.Math.toRadians(50.0)
        var range = 5000.0 // 视距
        viewer.camera.lookAt(center,new Cesium.HeadingPitchRange(heading,pitch,range))
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>