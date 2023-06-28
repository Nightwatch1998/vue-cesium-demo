<template>
    <div id="container"></div>
</template>

<script>
    import * as Cesium from "cesium";
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'OnlyBuilding',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs'
                const viewer = new Cesium.Viewer('container', {
                    terrainProvider: Cesium.createWorldTerrain()
                });
                // 添加建筑物精细模型
                const newBuildingTileset = viewer.scene.primitives.add(
                    new Cesium.Cesium3DTileset({
                        url: Cesium.IonResource.fromAssetId(995402),
                    })
                );
                // Move the camera to the new building.
                viewer.flyTo(newBuildingTileset);
            })
        }
    }
</script>

<style lang='scss' scoped>

</style>