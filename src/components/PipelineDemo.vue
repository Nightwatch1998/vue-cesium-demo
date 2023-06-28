<template>
    <div id="container"></div>
</template>

<script>
    import * as Cesium from 'cesium' 
    import power_line from '@/assets/pipeline_data/power_line.json'
    import power_point from '@/assets/pipeline_data/power_point.json'
    import drain_line from '@/assets/pipeline_data/drain_line.json'
    import drain_point from '@/assets/pipeline_data/drain_point.json'
    import water_supply_line from '@/assets/pipeline_data/water_supply_line.json'
    import water_supply_point from '@/assets/pipeline_data/water_supply_point.json'
    import { getCircleTubeModel,getSquareTubeModel} from '@/utils/getPolylineVolume.js'
    import { dms2degree } from '@/utils/transform.js'
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'PipelineDemo',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                // console.log(power_line)
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTRlZjRjMy04ZjExLTQ3ZjUtOThkZi1mOTgwMWNiNzgzNmIiLCJpZCI6NzEzMTQsImlhdCI6MTY1MTcwOTUzNn0.OehKrLuHoBGfaYIhVX_e4fCiVJucjaB6NUsgNQRgJDs';
                const viewer = new Cesium.Viewer("container");
                
                // 定义管线材质及其他属性
                const pipematerial = {
                    "power":{
                        "name":"电力管线",
                        "material":Cesium.Color.GOLD.withAlpha(0.5)
                    },
                    "water_supply":{
                        "name":"给水管线",
                        "material":Cesium.Color.AQUA.withAlpha(0.5)
                    },
                    "drain":{
                        "name":"排水管线",
                        "material":Cesium.Color.SADDLEBROWN.withAlpha(0.5)
                    }
                }
                // 对管点数据重新加工,使其可以通过点号访问
                const reshapePoint = (pointList)=>{
                    let pointJson = {}
                    pointList.forEach(item=>{
                        let pointID = item["物探点号"]
                        pointJson[pointID] = item
                    })
                    return pointJson
                }
                // 根据json数据创建格式化管线数据
                const getAllPipeline = (pipeOption,pointList,lineList)=>{
                    let {name,material} = pipeOption
                    let pipes = []
                    lineList.forEach(item => {
                        let routes = []
                        let startID = item["起始点号"]
                        let endID = item["终止点号"]
                        let size = {}
                        if(item["管径"].indexOf("X")!==-1){
                            let _size = item["管径"].split("X")
                            size = {
                                width:_size[0]/1000,
                                height:_size[1]/1000
                            }
                        }else{
                            size = {
                                width:500/1000,
                                height:500/1000
                            }
                        }
                        
                        routes.push(parseFloat(pointList[startID]["LON"]))
                        routes.push(parseFloat(pointList[startID]["LAT"]))
                        routes.push(parseFloat(pointList[startID]["H"]))
                        routes.push(parseFloat(pointList[endID]["LON"]))
                        routes.push(parseFloat(pointList[endID]["LAT"]))
                        routes.push(parseFloat(pointList[endID]["H"]))
                        pipes.push({
                            name,
                            routes,
                            radius:parseFloat(item["管径"])/1000,
                            material,
                            size
                        })
                    });
                    return pipes
                }
                // 电力管线
                const powerPoint = reshapePoint(power_point["RECORDS"])
                const powerPipelines = getAllPipeline(pipematerial["power"],powerPoint,power_line["RECORDS"])
                // console.log(powerPipelines)
                // 给水管线
                const waterSupplyPoint = reshapePoint(water_supply_point["RECORDS"])
                const waterSupplyPipelines = getAllPipeline(pipematerial["water_supply"],waterSupplyPoint,water_supply_line["RECORDS"])
                // console.log(waterSupplyPipelines)
                // 排水管线
                const drainPoint = reshapePoint(drain_point["RECORDS"])
                const drainPipelines = getAllPipeline(pipematerial["drain"],drainPoint,drain_line["RECORDS"])
                // console.log(drainPipelines)
                // 管线模型测试用例
                const singleTube = {
                    routes:[
                        -85.0,
                        32.0,
                        0,
                        -85.0,
                        36.0,
                        0,
                        -89.0,
                        36.0,
                        0,
                    ],
                    radius:5000,
                    material:''
                }

                // 创建管线模型
                // 给排水管线圆形截面
                waterSupplyPipelines.forEach(item=>{
                    let tube = getCircleTubeModel(item)
                    viewer.entities.add(tube)
                })

                drainPipelines.forEach(item=>{
                    let tube = getCircleTubeModel(item)
                    viewer.entities.add(tube)
                })

                // 电力管线方形截面
                powerPipelines.forEach(item=>{
                    let tube = getSquareTubeModel(item)
                    viewer.entities.add(tube)
                })



                // let redTube = getTubeModel(singleTube)
                // // console.log(redTube)
                // viewer.entities.add(redTube)

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
                //         heading: Cesium.Math.toRadians(CP.heading),
                //         pitch: Cesium.Math.toRadians(CP.pitch),
                //         roll: Cesium.Math.toRadians(CP.roll),
                //     },
                // });
            })
        }
    }
</script>

<style lang='scss' scoped>

</style>