<template>
    <div id="container"></div>
    <button id="toggle-building">Toggle new building</button>
</template>

<script>
    import * as Cesium from "cesium";
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'ProposedBuilding',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs'
                const viewer = new Cesium.Viewer('container', {
                    terrainProvider: Cesium.createWorldTerrain()
                });
                // 加载OSMbuildings
                const buildingsTileset  = viewer.scene.primitives.add(Cesium.createOsmBuildings());

                // viewer.camera.flyTo({
                //     destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
                // });
                // 异步加载资源
                async function addBuildingGeoJSON() {
                    // 从 Cesium ion加载geojson文件
                    const geoJSONURL = await Cesium.IonResource.fromAssetId(995261);
                    // 设置为贴地
                    const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
                    // 添加到场景
                    const dataSource = await viewer.dataSources.add(geoJSON);
                    // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
                    // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
                    // 将多边形设置为地形
                    for (const entity of dataSource.entities.values) {
                        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
                    }
                    // Move the camera so that the polygon is in view.
                    // viewer.flyTo(dataSource);
                }
                addBuildingGeoJSON();

                // 隐藏掉区域上方的小型建筑
                buildingsTileset.style = new Cesium.Cesium3DTileStyle({
                    // 根据elementId隐藏建筑
                    show: {
                        conditions : [
                            // Any building that has this elementId will have `show = false`.
                            ['${elementId} === 532245203', false],
                            ['${elementId} === 332469316', false],
                            ['${elementId} === 332469317', false],
                            ['${elementId} === 235368665', false],
                            ['${elementId} === 530288180', false],
                            ['${elementId} === 530288179', false],
                            // If a building does not have one of these elementIds, set `show = true`.
                            [true, true]
                        ]
                    },
                    // Set the default color style for this particular 3D Tileset.
                    // For any building that has a `cesium#color` property, use that color, otherwise make it white.
                    color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
                    }
                );

                // 添加建筑物精细模型
                const newBuildingTileset = viewer.scene.primitives.add(
                    new Cesium.Cesium3DTileset({
                        url: Cesium.IonResource.fromAssetId(995402),
                    })
                );
                // Move the camera to the new building.
                viewer.flyTo(newBuildingTileset);

                console.log("newBuildingTileset",newBuildingTileset)
                document.querySelector('#toggle-building').onclick = function() {
                    console.log("点击模型")
                    newBuildingTileset.show = !newBuildingTileset.show;
                };
            })
        }
    }
</script>

<style lang='scss' scoped>
#toggle-building { 
  z-index: 1; 
  position: fixed; 
  top: 5px; 
  left: 5px; 
}
</style>