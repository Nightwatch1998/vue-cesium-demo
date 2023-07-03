<template>
  <div id="container">
    <div id="slider"></div>
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
      watch: {async () => data, () => {} }
      onMounted(async () => {
        Cesium.Ion.defaultAccessToken = DEFAULT_ACCESS_TOKEN
        // 实现左右分屏遮罩层的功能
        var viewer = new Cesium.Viewer('container');
        // 屏幕左边
        const left = new Cesium.Cesium3DTileset({
          url: 'https://assets.ion.cesium.com/asset_depot/69380/MelbournePhotogrammetry/v1/tileset.json?v=2'
        })

        viewer.scene.primitives.add(left)
        left.splitDirection = Cesium.SplitDirection.LEFT

        // 屏幕右边
        const right = Cesium.createOsmBuildings()
        viewer.scene.primitives.add(right);
        right.splitDirection = Cesium.SplitDirection.RIGHT

        const slider = document.getElementById("slider");

        viewer.scene.splitPosition =
          slider.offsetLeft / slider.parentElement.offsetWidth;

        const handler = new Cesium.ScreenSpaceEventHandler(slider);

        let moveActive = false;

        // 鼠标拖动更新分隔条
        function move(movement) {
          if (!moveActive) {
            return;
          }

          const relativeOffset = movement.endPosition.x;
          const splitPosition =
            (slider.offsetLeft + relativeOffset) /
            slider.parentElement.offsetWidth;
          slider.style.left = `${100.0 * splitPosition}%`;
          viewer.scene.splitPosition = splitPosition;
        }

        // 这里是适配了PC端和移动端
        handler.setInputAction(function () {
          moveActive = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        handler.setInputAction(function () {
          moveActive = true;
        }, Cesium.ScreenSpaceEventType.PINCH_START);

        handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

        handler.setInputAction(function () {
          moveActive = false;
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
        handler.setInputAction(function () {
          moveActive = false;
        }, Cesium.ScreenSpaceEventType.PINCH_END);
      })
    }
  }
</script>

<style lang='scss' scoped>
      #slider {
        position: absolute;
        left: 50%;
        top: 0px;
        background-color: #d3d3d3;
        width: 5px;
        height: 100%;
        z-index: 9999;
      }

      #slider:hover {
        cursor: ew-resize;
      }
</style>