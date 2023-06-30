<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { bingMapProvider }  from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(async () => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        // 加载地形数据

        var viewer = new Cesium.Viewer('container',{
          terrainProvider: Cesium.CesiumTerrainProvider.fromIonAssetId(3956),
          imageryProvider: bingMapProvider,
          baseLayerPicker: false,
        });

        // 地形数据需要异步加载
        async function loadTerrain(){
          const terrainProvider = await new Cesium.CesiumTerrainProvider({
            url: Cesium.IonResource.fromAssetId(3956),
            requestWaterMask: false, // 请求水体效果
            requestVertexNormals: false // 请求地形照明数据
          })
          viewer.terrainProvider = terrainProvider
        }
        async function loadTerrain1(){
          try {
            viewer.scene.terrainProvider = await Cesium.CesiumTerrainProvider.fromAssetId(3956)
          } catch (error) {
          }
        }
        // loadTerrain1()
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>