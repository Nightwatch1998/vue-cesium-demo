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
        var globe = scene.globe
        // 允许查看地下视角
        scene.screenSpaceCameraController.enableCollisionDetection = false
        // 设置图层透明
        globe.translucency.enabled = true; // 允许透明
        globe.undergroundColor = Cesium.Color.LIGHTSLATEGRAY;  // 地下颜色
        // 根据目标与相机的距离设定透明度
        globe.undergroundColorAlphaByDistance.near = 1000;
        globe.undergroundColorAlphaByDistance.far = 1000000;
        globe.undergroundColorAlphaByDistance.nearValue = 0;
        globe.undergroundColorAlphaByDistance.farValue = 1;
        globe.translucency.rectangle = Cesium.Rectangle.fromDegrees(
          115.0,
          35.0,
          120.0,
          40.0
        );
        // 加载数据集  默认位置 117.52160102,38.56303501
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            // url: 'Scene/testm3DTiles.json',
            // url: 'Scene/GD/tileset.json',
            url: 'Scene/Pipeline/tileset.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000,
        }));
        

        // 计算偏移量tileset.boundingSphere,在3dtile加载完毕才能访问
        // 
        function translation(tileset){
          // 笛卡尔坐标转大地坐标
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
          // console.log(cartographic)
          // 模型在地表中心位置
          var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,0)
          // 第一次生成的模型ALL/tileset.json中心位置不对,目标位置坐标修正,117.87388205,38.94105403
          // var lon = Cesium.Math.toRadians(117.87388205)
          // var lat = Cesium.Math.toRadians(38.94105403)
          // var target = Cesium.Cartesian3.fromRadians(lon,lat,0)
          var target = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,-20)
          // 平移变换
          var offset = Cesium.Cartesian3.subtract(target,surface,new Cesium.Cartesian3())
          // 应用变换
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(offset)
        }

        // 旋转tileset,连续变换需要用左乘
        function rotate(tileset){
          // 获取模型中心位置的笛卡尔坐标
          var center = tileset.boundingSphere.center;
          console.log("平移前:",center)
          // 将模型平移到球心
          var backto_matrix = Cesium.Matrix4.fromTranslation(center)
          var moveto_vec = Cesium.Cartesian3.multiplyByScalar(center,-1,new Cesium.Cartesian3())
          var moveto_matrix = Cesium.Matrix4.fromTranslation(moveto_vec)

          // 定义旋转方向
          var angleX = Cesium.Math.toRadians(0)
          var angleY = Cesium.Math.toRadians(0)
          var angleZ = Cesium.Math.toRadians(0)

          // console.log(trans1)
          // 将模型旋转
          var m1 = Cesium.Matrix4.fromRotation(Cesium.Matrix3.fromRotationX(angleX))
          var m2 = Cesium.Matrix4.fromRotation(Cesium.Matrix3.fromRotationY(angleY))
          var m3 = Cesium.Matrix4.fromRotation(Cesium.Matrix3.fromRotationZ(angleZ))
          //  定义变换矩阵
          var m = moveto_matrix
          m = Cesium.Matrix4.multiply(m1,m,new Cesium.Matrix4())
          m = Cesium.Matrix4.multiply(m2,m,new Cesium.Matrix4())
          m = Cesium.Matrix4.multiply(m3,m,new Cesium.Matrix4())
          // 再将模型平移到原来位置
          // console.log(m)
          m = Cesium.Matrix4.multiply(backto_matrix,m,new Cesium.Matrix4()) // 应用平移
          tileset.modelMatrix = m
        }

        // 平移变换
        // 添加模型边界球
        function addBoundingSphere(tileset){
          var boundingSphere = tileset.boundingSphere
          var radius = boundingSphere.radius
          var boundingSphereEntity = viewer.entities.add({
            position: boundingSphere.center,
            ellipsoid:{
              radii: new Cesium.Cartesian3(radius,radius,radius),
              material: Cesium.Color.RED.withAlpha(0.5)
            }
          })
        }
        tileset.readyPromise.then(function(tileset){
          translation(tileset)
          // addBoundingSphere(tileset)
          // rotate(tileset)
        })
        viewer.zoomTo(tileset)
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>