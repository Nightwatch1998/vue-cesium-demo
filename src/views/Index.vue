<template>
  <div id="cesium-container">
    <create-entity></create-entity>
  </div>
</template>
<script>
  import AirlineTest from '@/components/AirlineTest'
  import ProposedBuilding from '@/components/ProposedBuilding'
  import OnlyBuilding from '@/components/OnlyBuilding'
  import CreateEntity from '@/components/CreateEntity'

  export default {
    name: 'Home',
    components:{
      AirlineTest,
      ProposedBuilding,
      OnlyBuilding,
      CreateEntity,
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
