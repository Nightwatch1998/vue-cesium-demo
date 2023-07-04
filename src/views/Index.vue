<template>
  <div id="cesium-container">
    <!-- <ion-resource></ion-resource> -->
    <!-- <vector-data></vector-data> -->
    <!-- <geometry></geometry> -->
    <!-- <model></model> -->
    <screen-space-event></screen-space-event>
  </div>
</template>
<script>

  import IonResource from "@/components/DataSource/3dtiles/IonResource.vue"
  import VectorData from "@/components/DataSource/VectorData.vue"
  import Geometry from "@/components/DataSource/CZML/Geometry.vue"
  import Model from "@/components/DataSource/CZML/Model.vue"
  import ScreenSpaceEvent from "@/components/Events/ScreenSpaceEvent.vue"

  export default {
    components:{
      IonResource,
      VectorData,
      Geometry,
      Model,
      ScreenSpaceEvent
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
