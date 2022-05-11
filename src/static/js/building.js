import * as Cesium from "cesium";
import * as widgets from "cesium/Widgets/widgets.css";
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs'
const viewer = new Cesium.Viewer('container', {
    terrainProvider: Cesium.createWorldTerrain()
});
const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings());
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
});