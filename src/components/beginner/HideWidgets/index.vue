<template>
  <div id="container"></div>
</template>

<script>
  import * as Cesium from 'cesium' //无语法提示,可以构建
  import {ref, watch, onMounted} from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    components: {},
    props: {},
    setup(props){
      watch: {()=>data,()=>{}}
      onMounted(()=>{
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{
          geocoder: false, // 查找位置
          homeButton: true, // Home键
          sceneModePicker: false,  // 选择视角的模式
          baseLayerPicker: false, // 图层选择器
          navigationHelpButton: false, // 导航帮助按钮
          animation: false, // 动画速度仪表盘
          timeline: false, // 时间线
          // creditContainer: true, // 版权信息不能更改
          fullscreenButton: false, // 全屏按钮
        });
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>