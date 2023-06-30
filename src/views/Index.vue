<template>
  <div id="cesium-container">
    <add-layer></add-layer>
  </div>
</template>
<script>

  import AddLayer from '@/components/beginner/AddLayer'

  export default {
    name: 'Home',
    components:{
      AddLayer
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
