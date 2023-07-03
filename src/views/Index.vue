<template>
  <div id="cesium-container">
    <!-- <ion-resource></ion-resource> -->
    <vector-data></vector-data>
  </div>
</template>
<script>

  import IonResource from "@/components/DataSource/3dtiles/IonResource.vue"
  import VectorData from "@/components/DataSource/VectorData.vue"

  export default {
    components:{
      IonResource,
      VectorData
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
