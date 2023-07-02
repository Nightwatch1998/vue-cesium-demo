<template>
  <div id="cesium-container">
    <compare></compare>
  </div>
</template>
<script>

  import Compare from "@/components/DataSource/3dtiles/Compare.vue"

  export default {
    components:{
      Compare
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
