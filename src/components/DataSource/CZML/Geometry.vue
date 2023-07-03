<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { boxs, colors, corridors } from '@/components/DataSource/CZML/js/sampleData.js'
  import { tdtProvider } from '@/utils/imageryProviders.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        // Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{
          imageryProvider: tdtProvider,
          baseLayerPicker: false
        });

        function addCZMLData(model){
          const czmlData = Cesium.CzmlDataSource.load(model)
          viewer.dataSources.add(czmlData)
          viewer.zoomTo(czmlData)
        }

        addCZMLData(corridors)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>