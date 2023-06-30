<template>
  <div id="cesium-container">
    <!-- <add-layer></add-layer> -->
    <add-terrain-layer></add-terrain-layer>
  </div>
</template>
<script>

  import AddTerrainLayer from '@/components/beginner/AddTerrainLayer'

  export default {
    name: 'Home',
    components:{
      AddTerrainLayer
    },
    mounted () {}
  }
</script>
<style scoped lang="scss">
#cesium-container {
  width: 100%;
  height: 100%;
}
</style>
