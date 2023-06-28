import * as Cesium from 'cesium' 

const computeCircle = (radius)=>{
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

const computeStar = (arms, rOuter, rInner)=>{
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

const computeSquare = (width,height)=>{
    let positions = [
        new Cesium.Cartesian2(-width, -height),
        new Cesium.Cartesian2(width, -height),
        new Cesium.Cartesian2(width, height),
        new Cesium.Cartesian2(-width, height),
    ]
    return positions
}
const getGreenBox = ()=>{
    const greenBox = new Cesium.Entity({
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

    })
    return greenBox
}

const getBlueStar = ()=>{
    const blueStar = new Cesium.Entity({
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
    })
    return blueStar
}
/**
 * 
 * @param {Object} tube //管线数据
 * @returns  //polylineVolume对象
 */
const getCircleTubeModel = (tube)=>{
    const {name,routes,radius,material} = tube
    const pipeline = new Cesium.Entity({
        name,
        polylineVolume: {
            // 传入经纬度,高度默认为0
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(routes),
            shape: computeCircle(radius),
            material,
        },

    })
    return pipeline
}

const getSquareTubeModel = (tube)=>{
    const {name,routes,size,material} = tube
    const pipeline = new Cesium.Entity({
        name,
        polylineVolume: {
            // 传入经纬度,高度默认为0
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(routes),
            shape: computeSquare(size.width,size.height),
            material,
        },

    })
    return pipeline
}

//  ES6模块导出方法
export  {
    getGreenBox,
    getBlueStar,
    getCircleTubeModel,
    getSquareTubeModel
}