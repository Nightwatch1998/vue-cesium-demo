<template>
  <div id="cesium-container">
    <!-- <ion-resource></ion-resource> -->
    <!-- <vector-data></vector-data> -->
    <!-- <geometry></geometry> -->
    <model></model>
  </div>
</template>
<script>

  import IonResource from "@/components/DataSource/3dtiles/IonResource.vue"
  import VectorData from "@/components/DataSource/VectorData.vue"
  import Geometry from "@/components/DataSource/CZML/Geometry.vue"
  import Model from "@/components/DataSource/CZML/Model.vue"

  export default {
    components:{
      IonResource,
      VectorData,
      Geometry,
      Model
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
