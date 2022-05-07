<template>
  <div id="cesium-container">
    <air-line></air-line>
  </div>
</template>
<script>
import AirLine from '@/components/AirLine'

export default {
  name: '',
  components:{
    AirLine
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
