// 请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net'// 基础地址
})
export default request
