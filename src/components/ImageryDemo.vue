<template>
    <div id="container"></div>
</template>

<script>
    // import * as Cesium from 'cesium'
    import * as Cesium from 'cesium/Cesium'
    import * as widgets from "cesium/Widgets/widgets.css"
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'ImageryDemo',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs"
                let viewer = new Cesium.Viewer("container",{
                    imageryProvider :Cesium.createWorldImagery({
                        style:Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
                    }),
                    baseLayerPicker:false
                })
            })
        }
    }
</script>

<style lang='scss' scoped>

</style>