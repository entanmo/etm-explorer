import axios from 'axios'
import qs from 'qs'       //axios自带qs工具（序列化字符串，处理发送请求的参数）
import middleWare from './middleWare'

//创建axios实例
const http = axios.create({
  baseURL: 'https://api.entanmo.com',
  timeout: 30000
})

// request 请求拦截器 ==> 对请求参数做处理
http.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.resolve(error)
})

// response 响应拦截器 ==> 对响应做处理
http.interceptors.response.use(
  middleWare.list.bind(middleWare),
  error => {
    console.log(error)
    return Promise.resolve(error)
  }
)
export default http
