/**
 * 
 * @param {*} str // 形如"39.021559"的度分秒格式的坐标
 * @returns  //以度为单位
 */
const dms2degree = (str)=>{
    let degree = 0
    str = ''+str
    let ls = str.split('.')
    let deg = parseInt(ls[0])
    let min = parseInt(ls[1][0,2])
    let sec = parseInt(ls[1][2,6])/100
    degree = deg+min/60+sec/3600
    degree = parseFloat(degree.toFixed(6))
    return degree
}

export {
    dms2degree
}