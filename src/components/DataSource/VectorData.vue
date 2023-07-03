<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { tdtProvider }  from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{
          // imageryProvider: tdtProvider
        });

        // 加载geojson
        async function addGeoJson(){
          const geojson = await Cesium.GeoJsonDataSource.load("data/ne_10m_us_states.topojson")
          // console.log(geojson)
          viewer.dataSources.add(geojson)
        }

        // 加载kml数据
        async function addKml(){
          const kml = await Cesium.KmlDataSource.load("data/kml/facilities/facilities.kml")
          await viewer.dataSources.add(kml)
          viewer.zoomTo(kml)
          // const tour = kml.kmlTours[0]
          // tour.play(viewer.cesiumWidget)
        }

        // 加载GPX数据
        async function addGPX(){
          const gpx = await Cesium.GpxDataSource.load("data/gpx/lamina.gpx")
          await viewer.dataSources.add(gpx)
          viewer.zoomTo(gpx)
        }
        // addGeoJson()
        // addKml()
        addGPX()
      })
    }
  }
</script>

<style lang='scss' scoped>
// #container{
//   width: 100%;
//   height: 100%;
// }
</style>