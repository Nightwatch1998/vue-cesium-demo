import * as Cesium from "cesium"
import {
  DEFAULT_ACCESS_TOKEN,
  BING_MAP_KEY,
  ESRI_URL,
  MAP_BOX_STYLE,
  MAP_BOX_TOKEN,
  AMAP_URL,
  TDT_ACCESS_KEY
} from "@/utils/const.js"

const bingMapProvider = new Cesium.BingMapsImageryProvider({
  url : 'https://dev.virtualearth.net', // 固定的请求URL
  key: BING_MAP_KEY,
  mapStyle: Cesium.BingMapsStyle.AERIAL
})

// ArcGIS地图 1.104之前版本的调用方法,需要墙
const esriProvider = new Cesium.ArcGisMapServerImageryProvider({
  url: ESRI_URL,
})
// mapbox地图,还需扩展自定义的地图样式,需要墙
const mapboxProvider = new Cesium.MapboxStyleImageryProvider({
  styleId: MAP_BOX_STYLE[1], // navigation-night-v1,satellite-streets-v11
  accessToken:  MAP_BOX_TOKEN,

});

// 高德地图影像图
const amapImageryProvider = new Cesium.UrlTemplateImageryProvider({
  url: AMAP_URL,
  maximumLevel: 18,
  minimumLevel: 1,
  credit: 'Amap'
})

// 天地图WMTS服务
// 矢量底图或者影像图
const tdtProvider = new Cesium.WebMapTileServiceImageryProvider({
  url:`http://{s}.tianditu.gov.cn/img_w/wmts?tk=${TDT_ACCESS_KEY}`,
  layer:'img', // 图层名称,wec矢量底图，img为影像底图
  tileMatrixSetID:'w', // 瓦片矩阵集标识，w标识球面墨卡托投影
  format:'tiles', // 瓦片格式
  style:'default', // 默认样式
  maximumLevel:18, //最大显示级别
  subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  credit: "天地图" // 来源标识
})

// 注记图层
const tdtLabelProvider = new Cesium.WebMapTileServiceImageryProvider({
  url:`http://{s}.tianditu.gov.cn/cva_w/wmts?tk=${TDT_ACCESS_KEY}`,
  layer:'cva', // 图层名称,wec矢量底图，img为影像底图
  tileMatrixSetID:'w', // 瓦片矩阵集标识，w标识球面墨卡托投影
  format:'tiles', // 瓦片格式
  style:'default', // 默认样式
  maximumLevel:18, //最大显示级别
  subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  credit: "天地图" // 来源标识
})

// 本地发布的WMS服务,layers可选countries、SR_50M、basemap
const geoserverWMSProvider = new Cesium.WebMapServiceImageryProvider({
  url: 'http://localhost:8080/geoserver/HHIENC/wms',
  layers: 'HHIENC:HHIENC',
  parameters: {
    service: 'WMS',
    // 这里要看geoserver发布服务支持的格式,png、gif、jpeg
    format: 'image/png', 
    // 这里1.1.1和1.1.0均可
    version: '1.1.1', 
    transparent: true
  }
})

// 本地发布的WMTS服务
const geoserverWMTSProvider = new Cesium.WebMapTileServiceImageryProvider({
  url: 'http://localhost:8080/geoserver/gwc/service/wmts/rest/huyadish:basemap/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png',
  layer: 'huyadish:basemap',
  style: '',
  format: 'image/png',
  tileMatrixSetID: 'EPSG:900913', //EPSG需要修改为谷歌墨卡托投影EPSG:900913
  maximumLevel: 10,
})

export {
  bingMapProvider,
  esriProvider,
  mapboxProvider,
  amapImageryProvider,
  tdtProvider,
  tdtLabelProvider,
  geoserverWMSProvider,
  geoserverWMTSProvider
}