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
    name: 'TileSet',
    components: {},
    props: {},
    setup(props) {
      watch: { () => data, () => {} }
      onMounted(() => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        var viewer = new Cesium.Viewer('container',{});
        var x = 360.0;
        var y = -920.0;
        var z = -820.0;
        // var x = 0;
        // var y = 0;
        // var z = 0;
        //方法一，直接定义平移矩阵,这是参心坐标系
        var m = Cesium.Matrix4.fromArray([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            x, y, z, 1.0
        ]);

        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: 'Scene/testm3DTiles.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000,
            modelMatrix: m  //方法一，动态修改modelMatrix
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
          // 目标位置
          var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,-1300)
          // 偏移量
          var translation = Cesium.Cartesian3.subtract(offset,center,new Cesium.Cartesian3())
          console.log(translation)
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
        }
        tileset.readyPromise.then(function(tileset){
          change(tileset)
        })
        // viewer.zoomTo(tileset)

        // 使用材质
        var entity = viewer.entities.add({
          position:Cesium.Cartesian3.fromDegrees(-103.0,40.0),
          ellipse:{
            semiMajorAxis: 40000,
            semiMinorAxis: 25000,
            material: Cesium.Color.RED.withAlpha(0.5) // 定义时指定
          }
        })
        var ellipse = entity.ellipse
        // 颜色纹理
        ellipse.material = Cesium.Color.LIGHTYELLOW  // 重新赋值
        // 棋盘纹理
        ellipse.material = new Cesium.CheckerboardMaterialProperty({
          evenColor: Cesium.Color.WHITE,
          oddColor: Cesium.Color.BLACK,
          repeat: new Cesium.Cartesian2(4,4)
        })
        // 条纹纹理
        ellipse.material = new Cesium.StripeMaterialProperty({
          evenColor: Cesium.Color.WHITE,
          oddColor: Cesium.Color.BLACK,
          repeat: 32,
          offset: 20,
          orientation: Cesium.StripeOrientation.VERTICAL
        })
        //
        viewer.zoomTo(entity)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>