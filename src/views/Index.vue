<template>
  <div id="cesium-container">
    <pipeline-demo></pipeline-demo>
  </div>
</template>
<script>
  import AirlineTest from '@/components/AirlineTest'
  import ProposedBuilding from '@/components/ProposedBuilding'
  import OnlyBuilding from '@/components/OnlyBuilding'
  import CreateEntity from '@/components/CreateEntity'
  import PipelineDemo from '@/components/PipelineDemo'

  export default {
    name: 'Home',
    components:{
      AirlineTest,
      ProposedBuilding,
      OnlyBuilding,
      CreateEntity,
      PipelineDemo
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
