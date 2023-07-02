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
      watch: {async () => data, () => {} }
      onMounted(async () => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container');
        try {
          // const left = await Cesium.IonResource.fromAssetId(69380)
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>