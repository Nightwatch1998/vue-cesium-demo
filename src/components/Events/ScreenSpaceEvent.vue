<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { tdtProvider } from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{
          imageryProvider: tdtProvider,
          baseLayerPicker: false,
          geocoder: true,
        });

        // 第一种添加事件的方式screenSpaceEventHandler
        // 屏幕空间位置
        viewer.screenSpaceEventHandler.setInputAction(function(e){
          console.log("屏幕位置坐标",e.position)
        },Cesium.ScreenSpaceEventType.LEFT_CLICK)
        
        // 显示位置的标签,显示在左下角
        let mousePositionLabel = viewer.entities.add({
          label:{
            show: false,
            showBackground: true,
            font: '14px monospace',
            // 标签相对于鼠标的位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(10,-10)
          }
        })
        
        function showPosition(e){
          // 将屏幕坐标转换为地球表面的笛卡尔坐标
          let cartesain = viewer.camera.pickEllipsoid(e.endPosition,viewer.scene.globe.ellipsoid)
          // console.log(cartesain)
          // 如果鼠标在地球上
          if(cartesain){
            // 笛卡尔坐标转换为大地坐标
            let cartographic = Cesium.Cartographic.fromCartesian(cartesain)
            let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
            let latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
            let height = cartographic.height.toFixed(2)
            let positionString = `经度: ${longitude},纬度: ${latitude},高度: ${height}m`
            mousePositionLabel.position = cartesain
            mousePositionLabel.label.text = positionString
            mousePositionLabel.label.show = true
          }else{
            mousePositionLabel.label.show = true
          }
        }
        viewer.screenSpaceEventHandler.setInputAction(showPosition,Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        // 第二种，使用EventHelper
        // const eventHelper = new Cesium.EventHelper()
        // const handler = eventHelper.add(window,'click',function(e){
        //   console.log("点击事件触发")
        // })
        // handler.removeAll()
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>