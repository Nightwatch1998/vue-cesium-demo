<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { tdtProvider }  from '@/utils/imageryProviders.js'
  import { 
    geoserverWMSProvider, 
    geoserverWMTSProvider
  }  from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted( () => {
        // Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        // 离线地图
        
        var viewer = new Cesium.Viewer('container',{
          imageryProvider: tdtProvider,
          baseLayerPicker: false, // 同时要禁用图层选择器
        })

        // 添加电子航道图
        viewer.imageryLayers.addImageryProvider(geoserverWMSProvider)

        // 创建图层并添加到picker中
        // addProviderViewModel({
        //   name: 'Bing Map',
        //   iconUrl: 'data/mapIcon/bingAerial.png',
        //   tooltip: 'Bing影像地图',
        //   provider: bingMapProvider
        // })
        function addProviderViewModel(options){
          // 自定义图层选择器
          viewer.baseLayerPicker.viewModel.imageryProviderViewModels.push(new Cesium.ProviderViewModel({
            name: options.name,
            iconUrl: options.iconUrl,
            tooltip: options.tooltip,
            creationFunction: function(){
              return options.provider
            }
          }))
        }
        // viewer.baseLayerPicker.viewModel.imageryProviderViewModels.removeAll()
        viewer.camera.flyTo({
          destination : Cesium.Cartesian3.fromDegrees(117.63,39.01, 15000.0), // 设置位置
          orientation: {
            heading : Cesium.Math.toRadians(0.0), // 方向
            pitch : Cesium.Math.toRadians(-90.0),// 倾斜角度
            roll: 0
          },
          duration: 5,
          complete:function(){
            console.log("相机飞行至指定位置")
          }
        })
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>