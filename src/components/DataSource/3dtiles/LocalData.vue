<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as Cesium from 'cesium'
  import { ref, watch, onMounted } from 'vue'
  import { DEFAULT_ACCESS_TOKEN } from '@/utils/const.js'

  export default {
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{});
        // 加载数据集
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            // url: 'Scene/testm3DTiles.json',
            url: 'Scene/pipeline1/tileset.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000,
            // modelMatrix: mat4  //方法一，动态修改modelMatrix
        }));
        // 方法二、通过API
        // var translation = Cesium.Cartesian3.fromArray([x,y,z])
        // var m1 = Cesium.Matrix4.fromTranslation(translation)
        // tileset._modelMatrix = m1

        // 计算偏移量tileset.boundingSphere,在3dtile加载完毕才能访问
        function change(tileset){
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
          // 边界球中心的坐标
          var center = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,cartographic.height)
          console.log(center)
          // 目标位置
          var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,500)
          // 平移变换
          var translation = Cesium.Cartesian3.subtract(offset,center,new Cesium.Cartesian3())
          // 旋转变换
          var heading = Cesium.Math.toRadians(90)
          var pitch = Cesium.Math.toRadians(0)
          var roll = Cesium.Math.toRadians(0)
          var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
          var rotation = Cesium.Matrix3.fromHeadingPitchRoll(hpr)

          // 应用变换
          // tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
          tileset.modelMatrix = Cesium.Matrix4.fromRotationTranslation(rotation, translation)
        }
        tileset.readyPromise.then(function(tileset){
          change(tileset)
        })
        viewer.zoomTo(tileset)

        // // 使用材质
        // var entity = viewer.entities.add({
        //   position:Cesium.Cartesian3.fromDegrees(-103.0,40.0),
        //   ellipse:{
        //     semiMajorAxis: 40000,
        //     semiMinorAxis: 25000,
        //     material: Cesium.Color.RED.withAlpha(0.5) // 定义时指定
        //   }
        // })
        // var ellipse = entity.ellipse
        // // 颜色纹理
        // ellipse.material = Cesium.Color.LIGHTYELLOW  // 重新赋值
        // // 棋盘纹理
        // ellipse.material = new Cesium.CheckerboardMaterialProperty({
        //   evenColor: Cesium.Color.WHITE,
        //   oddColor: Cesium.Color.BLACK,
        //   repeat: new Cesium.Cartesian2(4,4)
        // })
        // // 条纹纹理
        // ellipse.material = new Cesium.StripeMaterialProperty({
        //   evenColor: Cesium.Color.WHITE,
        //   oddColor: Cesium.Color.BLACK,
        //   repeat: 32,
        //   offset: 20,
        //   orientation: Cesium.StripeOrientation.VERTICAL
        // })
        //
        // viewer.zoomTo(tileset)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>