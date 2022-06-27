/**
 * 配置编译环境和线上环境之间的切换
 *
 * API_HOST: API请求
 * FULL_HOST: 节点的rpc地址
 */
let API_HOST = "";
let FULL_HOST = ""
// 环境判断
if (process.env.NODE_ENV === 'development') {
    // 测试
    API_HOST = "";
    FULL_HOST = "";
}
const WECHAT_APP_ID = "";
export {API_HOST, FULL_HOST, WECHAT_APP_ID};