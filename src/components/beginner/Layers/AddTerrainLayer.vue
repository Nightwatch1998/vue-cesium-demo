<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN, TDT_ACCESS_KEY} from '@/utils/const.js'
  import { bingMapProvider }  from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(async () => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN

        // 加载地形数据
        // cesiumIon 默认地形
        const ionTerrainProvider = Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true
        })
        // 这个方式目前访问不了,有可能是ion的数组组织方式改了
        // const ionTerrainProvider1 = new Cesium.CesiumTerrainProvider({
        //   url: Cesium.IonResource.fromAssetId(3956),
        //   requestVertexNormals: true
        // })

        // ArcGIS地形图层
        const arcgisTerrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
          url:"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
          token:"KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg.."
        })
        
        // 天地图地形, 需要搭配天地图扩展插件目前支持1.52、1.58、1.63.1
        const tdtTerrainProvider = new Cesium.CesiumTerrainProvider({
          url: `https://t0.tianditu.gov.cn/mapservice/swdx?tk=${TDT_ACCESS_KEY}`
        })

        // 函数模拟地形
        const mathTerrainProvider = new Cesium.CustomHeightmapTerrainProvider({
          width: 32,
          height: 32,
          callback: function(x,y,level){
            return new Float32Array(32*32)
          }
        })

        var viewer = new Cesium.Viewer('container',{
          terrainProvider: ionTerrainProvider,
          imageryProvider: bingMapProvider,
          baseLayerPicker: false,
        });


      })
    }
  }
</script>

<style lang='scss' scoped>

</style>