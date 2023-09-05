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
        var scene = viewer.scene
        // 允许显示地下
        scene.screenSpaceCameraController.enableCollisionDetection = false
        // 加载数据集
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            // url: 'Scene/testm3DTiles.json',
            url: 'Scene/pipeline1/tileset.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000,
            // modelMatrix: mat4  //方法一，动态修改modelMatrix
        }));
        


        // 计算偏移量tileset.boundingSphere,在3dtile加载完毕才能访问
        function change(tileset){
          // 大地坐标
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
          // 边界球中心的坐标
          var center = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,cartographic.height)
          // console.log(center)
          // 目标位置
          var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,500)
          // 平移变换
          // var translation = Cesium.Cartesian3.subtract(offset,center,new Cesium.Cartesian3())
          var translation = new Cesium.Cartesian3(-center.x, -center.y, -center.z)
          var translationMatrix = Cesium.Matrix4.fromTranslation(translation)

          // 创建旋转矩阵
          var rotationMatrix = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(30)), // 30度的旋转
            Cesium.Cartesian3.ZERO
          )
          // 旋转变换
          var modelMatrix = Cesium.Matrix4.multiply(rotationMatrix, translationMatrix, new Cesium.Matrix4());

          // 应用变换
          tileset.modelMatrix = modelMatrix

                  // 获取Tileset的包围球
          // var boundingSphere = tileset.boundingSphere;

          // // 创建一个可视化的包围球
          // var boundingSphereEntity = viewer.entities.add({
          //     position: boundingSphere.center,
          //     ellipsoid: {
          //         radii: new Cesium.Cartesian3(boundingSphere.radius, boundingSphere.radius, boundingSphere.radius),
          //         material: Cesium.Color.RED.withAlpha(0.5),
          //         outline: true,
          //         outlineColor: Cesium.Color.RED
          //     }
          // });
        }

        // 旋转tileset
        function rotate(tileset){
          var boundingSphere = tileset.boundingSphere
          // 创建一个计算模型中心的矩阵
          var center = boundingSphere.center;
          var translation = new Cesium.Cartesian3(-center.x, -center.y, -center.z);
          var translationMatrix = Cesium.Matrix4.fromTranslation(translation);

          // 创建一个旋转矩阵，以绕Y轴旋转30度（可根据需要更改角度）
          var rotationMatrix = Cesium.Matrix4.fromRotationTranslation(
              Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(0)), // 30度的旋转
              Cesium.Cartesian3.ZERO
          );

          // 组合平移和旋转矩阵，以实现绕模型中心的旋转
          var modelMatrix = Cesium.Matrix4.multiply(rotationMatrix, translationMatrix, new Cesium.Matrix4());

          // 应用模型矩阵到Tileset
          tileset.modelMatrix = modelMatrix;
        }
        tileset.readyPromise.then(function(tileset){
          change(tileset)
          // rotate(tileset)
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