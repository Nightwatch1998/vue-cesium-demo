<template>
    <div id="container"></div>
</template>

<script>
    // import * as Cesium from 'cesium' //有语法提示,不能构建
    import * as Cesium from "cesium";
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'WarShip',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs'
                const viewer = new Cesium.Viewer('container', {
                    terrainProvider: Cesium.createWorldTerrain()
                });
                var modelResource = new Cesium.Resource({
                    url: '../assets/models/ship.glb',
                });
                console.log(modelResource)
                modelResource.fetch().then(function(arrayBuffer) {
                    var model = Cesium.Model.fromGltf({
                        url: modelResource.getUrlComponent(),
                        buffer: arrayBuffer,
                        modelMatrix: Cesium.Matrix4.IDENTITY
                    });

                    var clonedResource = modelResource.clone();
                    var clonedModel = model.clone(clonedResource);

                    viewer.scene.primitives.add(clonedModel);
                    viewer.zoomTo(clonedModel);
                });
                // let model = Cesium.Model.fromGltf({
                //     url: Cesium.IonResource.fromAssetId(1616672),
                // })
                // let ship = viewer.scene.primitives.add(model);
                // console.log("entity",ship)
                // viewer.zoomTo(ship);
            })
        }
    }
</script>

<style lang='scss' scoped>

</style>