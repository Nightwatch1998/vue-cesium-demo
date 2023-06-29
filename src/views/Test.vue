<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    name: 'Test',
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container');

        //方法二，直接调用函数，调整高度,height表示物体离地面的高度
        var translation = Cesium.Cartesian3.fromArray([x,y,z])
        var m = Cesium.Matrix4.fromTranslation(translation)

        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: '@/assets/Scene/testm3DTiles.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000,
            modelMatrix: m  //方法一，动态修改modelMatrix
        }));
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>