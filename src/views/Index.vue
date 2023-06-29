<template>
  <div id="cesium-container">
    <!-- <pipeline-demo></pipeline-demo> -->
    <!-- <only-building></only-building> -->
    <!-- <war-ship></war-ship> -->
    <!-- <button-hide></button-hide> -->
    <!-- <tile-set></tile-set> -->
    <camera-control></camera-control>
  </div>
</template>
<script>
  import AirlineTest from '@/components/AirlineTest'
  import ProposedBuilding from '@/components/ProposedBuilding'
  import OnlyBuilding from '@/components/OnlyBuilding'
  import CreateEntity from '@/components/CreateEntity'
  import PipelineDemo from '@/components/PipelineDemo'
  import WarShip from '@/components/WarShip.vue'
  import ButtonHide from '@/components/beginner/ButtonHide.vue'
  import CameraControl from '@/components/beginner/CameraControl.vue'

  export default {
    name: 'Home',
    components:{
      AirlineTest,
      ProposedBuilding,
      OnlyBuilding,
      CreateEntity,
      PipelineDemo,
      WarShip,
      ButtonHide,
      CameraControl
    },
    mounted () {
      
    }
  }
</script>
<style scoped lang="scss">
#cesium-container {
  width: 100%;
  height: 100%;
}
</style>
