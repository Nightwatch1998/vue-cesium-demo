<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'
  import { tdtProvider } from '@/utils/imageryProviders.js'
  import { nodeTransform, modelSeparate } from '@/components/DataSource/CZML/js/sampleData.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{
          shouldAnimate: true,
          imageryProvider: tdtProvider,
          baseLayerPicker: false
        });

        function addCZMLModel(model){
          const czmlData = Cesium.CzmlDataSource.load(model)
          viewer.dataSources.add(czmlData)
          viewer.zoomTo(czmlData)
        }

        addCZMLModel(modelSeparate)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>