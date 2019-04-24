import wepy from 'wepy'
// 封装用于发送请求的函数  wxRequest
// url 请求地址
// param 参数对象
const wxRequest = (url, params = {}) => {
  return wepy.request({
    url: wxRequest.baseUrl + url,
    data: params.data || {},
    method: params.method || 'GET',
    dataType: params.dataType || 'json', // 如果设为json，会尝试对返回的数据进行一次JSON.parse
    header: params.header || {'Content-type': 'application/json'}
  })
}
wxRequest.baseUrl = ''
export default wxRequest
