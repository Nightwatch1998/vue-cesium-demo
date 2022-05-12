<template>
    <div id="container"></div>
</template>

<script>
    // import * as Cesium from 'cesium' //有语法提示,不能构建
    import * as Cesium from 'cesium/Cesium' //无语法提示,可以构建
    import * as widgets from "cesium/Widgets/widgets.css"
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'PipelineDemo',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                const viewer = new Cesium.Viewer("container");

                function computeCircle(radius) {
                    const positions = [];
                    for (let i = 0; i < 360; i++) {
                        const radians = Cesium.Math.toRadians(i);
                        positions.push(
                        new Cesium.Cartesian2(
                            radius * Math.cos(radians),
                            radius * Math.sin(radians)
                        )
                        );
                    }
                    // console.log(positions)
                    return positions;
                }

                function computeStar(arms, rOuter, rInner) {
                    const angle = Math.PI / arms;
                    const length = 2 * arms;
                    const positions = new Array(length);
                    for (let i = 0; i < length; i++) {
                        const r = i % 2 === 0 ? rOuter : rInner;
                        positions[i] = new Cesium.Cartesian2(
                        Math.cos(i * angle) * r,
                        Math.sin(i * angle) * r
                        );
                    }
                    return positions;
                }
                const getRedTube = ()=>{
                    const redTube = viewer.entities.add({
                        name: "Red tube with rounded corners",
                        polylineVolume: {
                            // 传入经纬度,高度默认为0
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -85.0,
                                32.0,
                                -85.0,
                                36.0,
                                -89.0,
                                36.0,
                            ]),
                            shape: computeCircle(5000.0),
                            material: Cesium.Color.BLUE.withAlpha(0.5),
                        },
                    });
                    return redTube
                }
                
                const getGreenBox = ()=>{
                    const greenBox = viewer.entities.add({
                        name: "Green box with beveled corners and outline",
                        polylineVolume: {
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                                -90.0,
                                32.0,
                                0.0,
                                -90.0,
                                36.0,
                                100000.0,
                                -94.0,
                                36.0,
                                0.0,
                            ]),
                            shape: [
                                new Cesium.Cartesian2(-50000, -50000),
                                new Cesium.Cartesian2(50000, -50000),
                                new Cesium.Cartesian2(50000, 50000),
                                new Cesium.Cartesian2(-50000, 50000),
                            ],
                            cornerType: Cesium.CornerType.ROUNDED,
                            material: Cesium.Color.GREEN.withAlpha(0.5),
                            outline: true,
                            outlineColor: Cesium.Color.BLACK,
                        },
                    });
                    return greenBox
                }
                
                const getBlueStar = ()=>{
                    const blueStar = viewer.entities.add({
                        name: "Blue star with mitered corners and outline",
                        polylineVolume: {
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                            -95.0,
                            32.0,
                            0.0,
                            -95.0,
                            36.0,
                            100000.0,
                            -99.0,
                            36.0,
                            200000.0,
                            ]),
                            shape: computeStar(7, 70000, 50000),
                            cornerType: Cesium.CornerType.MITERED,
                            material: Cesium.Color.BLUE,
                        },
                    });
                }
                const redTube = getRedTube()

                // 点击显示XYZ坐标
                var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
                handler.setInputAction(function (event) {
                    var pickedPosition = viewer.scene.pickPosition(event.position);
                    if (Cesium.defined(pickedPosition)) {
                        console.log(pickedPosition);
                    }

                    const heading = Cesium.Math.toDegrees(viewer.camera.heading)
                    const pitch = Cesium.Math.toDegrees(viewer.camera.pitch)
                    const roll = Cesium.Math.toDegrees(viewer.camera.roll)
                    const cartographic = viewer.camera.positionCartographic
                    let { height, longitude, latitude } = cartographic
                    longitude = Cesium.Math.toDegrees(longitude)
                    latitude = Cesium.Math.toDegrees(latitude)
                    // 相机位置朝向 6参数
                    let campos = {
                        lon:parseFloat(longitude.toFixed(6)),
                        lat:parseFloat(latitude.toFixed(6)),
                        height:parseFloat(height.toFixed(2)),
                        heading:parseFloat(heading.toFixed(2)),
                        pitch:parseFloat(pitch.toFixed(2)),
                        roll:parseFloat(roll.toFixed(2)),
                    }
                    console.log(campos)


                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                // 相机位置测试
                let CP = {
                    heading: 330.59,
                    height: 296251.95,
                    lat: 28.755374,
                    lon: -81.909634,
                    pitch: -32.13,
                    roll: 0.01,
                }
                viewer.zoomTo(viewer.entities);
                // viewer.camera.flyTo({
                //     destination: Cesium.Cartesian3.fromDegrees(CP.lon, CP.lat, CP.height),
                //     orientation: {
                //         heading: CP.heading,
                //         pitch: CP.pitch,
                //         roll: CP.roll,
                //     },
                // });
            })
        }
    }
</script>

<style lang='scss' scoped>

</style>