// 不同的box
const boxs = [
  {
    id: "document",
    name: "box",
    version: "1.0",
  },
  {
    id: "shape1",
    name: "Blue box",
    position: {
      cartographicDegrees: [-114.0, 40.0, 250000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      material: {
        solidColor: {
          color: {
            rgba: [0, 0, 255, 255],
          },
        },
      },
    },
  },
  {
    id: "shape2",
    name: "Red box with black outline",
    position: {
      cartographicDegrees: [-107.0, 40.0, 250000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 128],
          },
        },
      },
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
  },
  {
    id: "shape3",
    name: "Yellow box outline",
    position: {
      cartographicDegrees: [-100.0, 40.0, 250000.0],
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0],
      },
      fill: false,
      outline: true,
      outlineColor: {
        rgba: [255, 255, 0, 255],
      },
    },
  },
];

// 颜色
const colors = [
  {
    id: "document",
    name: "CZML Colors",
    version: "1.0",
  },
  {
    id: "rgba",
    name: "Rectangle with outline using RGBA Colors",
    rectangle: {
      coordinates: {
        wsenDegrees: [-120, 40, -110, 50],
      },
      fill: true,
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 100],
          },
        },
      },
      height: 0, // disables ground clamping, needed for outlines
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
  },
  {
    id: "rgbaf",
    name: "Rectangle using RGBAF Colors",
    rectangle: {
      coordinates: { wsenDegrees: [-100, 40, -90, 50] },
      fill: true,
      material: {
        solidColor: {
          color: {
            rgbaf: [1, 0, 0, 0.39],
          },
        },
      },
      height: 0, // disables ground clamping, needed for outlines
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
  },
];

// 走廊
const corridors = [
  {
    id: "document",
    name: "CZML Geometries: Polyline",
    version: "1.0",
  },
  {
    id: "redCorridor",
    name: "Red corridor on surface with rounded corners",
    corridor: {
      positions: {
        cartographicDegrees: [
          -100.0,
          40.0,
          0,
          -105.0,
          40.0,
          0,
          -105.0,
          35.0,
          0,
        ],
      },
      width: 200000.0,
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 127],
          },
        },
      },
    },
  },
  {
    id: "greenCorridor",
    name: "Green corridor at height with mitered corners and outline",
    corridor: {
      positions: {
        cartographicDegrees: [
          -90.0,
          40.0,
          0,
          -95.0,
          40.0,
          0,
          -95.0,
          35.0,
          0,
        ],
      },
      height: 100000.0,
      cornerType: "MITERED",
      width: 200000.0,
      material: {
        solidColor: {
          color: {
            rgba: [0, 255, 0, 255],
          },
        },
      },
      outline: true, // height must be set for outlines to display
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
  },
  {
    id: "blueCorridor",
    name: "Blue extruded corridor with beveled corners and outline",
    corridor: {
      positions: {
        cartographicDegrees: [
          -80.0,
          40.0,
          0,
          -85.0,
          40.0,
          0,
          -85.0,
          35.0,
          0,
        ],
      },
      height: 200000.0, // 底部高度
      extrudedHeight: 100000.0, // 拉伸高度
      width: 200000.0,
      cornerType: "BEVELED",
      material: {
        solidColor: {
          color: {
            rgba: [0, 0, 255, 255],
          },
        },
      },
      outline: true,
      outlineColor: {
        rgba: [255, 255, 255, 255],
      },
    },
  },
];

// 模型动画
const nodeTransform = [
  {
    id: "document", // 表示根节点
    name: "CZML Model",
    version: "1.0",
    clock: { // 时间定义在根节点可以保证场景的一致性
      interval: "2015-01-01T00:00:00Z/2015-01-01T00:00:20Z",
      currentTime: "2015-01-01T00:00:00Z",
      multiplier: 20,
    },
  },
  {
    id: "model",
    position: {
      cartographicDegrees: [-77, 37, 2],
    },
    viewFrom: {  // 相机位置，相对于模型位置
      cartesian: [4.3, 0.1, 2.6],
    },
    model: {
      gltf: "data/models/Cesium_Man.glb",
      runAnimations: false,
      nodeTransformations: {  // 定义节点的转换
        Skeleton_arm_joint_L__3_: {  // 模型节点
          rotation: {  // 旋转
            epoch: "2015-01-01T00:00:00Z",
            unitQuaternion: [  // 四元数表示旋转
              0,
              -0.23381920887303329,
              -0.6909886782144156,
              -0.0938384854833712,
              0.6775378681547408,
              10,
              -0.4924076887347565,
              -0.6304934596091216,
              0.20657864059632378,
              0.563327551886459,
              20,
              -0.23381920887303329,
              -0.6909886782144156,
              -0.0938384854833712,
              0.6775378681547408,
            ],
          },
        },
        Skeleton_arm_joint_R__2_: {
          rotation: {
            unitQuaternion: [
              -0.2840422631464792,
              -0.40211904424847345,
              // eslint-disable-next-line no-loss-of-precision
              0.25175867757399086,
              0.7063888981321548,
            ],
          },
        },
      },
    },
  },
];

// 整流罩分离
const modelSeparate = [
  {
    id: "document",
    name: "CZML Model",
    version: "1.0",
    clock: {
      interval: "2019-06-01T16:00:00Z/2019-06-01T16:10:00Z", // 时间间隔 起始时间/结束时间
      currentTime: "2019-06-01T16:00:00Z",// 当前时间
      multiplier: 60, // 时间的乘系数
      range: "LOOP_STOP", // 到达结束时间后停止循环
      step: "SYSTEM_CLOCK_MULTIPLIER",
    },
  },
  {
    id: "test model",
    name: "Cesium Air",
    position: {
      cartographicDegrees: [-77, 37, 10000],
    },
    model: {
      gltf:
        "https://cesium.com/public/SandcastleSampleData/launchvehicle.glb",
      scale: 2.0,
      minimumPixelSize: 128,
      runAnimations: false,
      articulations: { // 定义关节动画
        "Fairing Open": { // gltf节点名称
          epoch: "2019-06-01T16:00:00Z", // 起始时间
          number: [0, 0, 600, 120], // 2个一组，时间点和关节角度
        },
        "Fairing Separate": {
          epoch: "2019-06-01T16:00:00Z",
          number: [0, 0, 400, -50],
        },
        "Fairing Drop": {
          epoch: "2019-06-01T16:00:00Z",
          interpolationAlgorithm: "LAGRANGE", // 指定动画的插值算法为拉格朗日差值
          interpolationDegree: 2, // 2次差值
          number: [0, 0, 80, 0, 100, 0, 120, -1, 600, -120],
        },
      },
    },
  },
];

export {
  boxs,
  colors,
  corridors,
  nodeTransform,
  modelSeparate
}