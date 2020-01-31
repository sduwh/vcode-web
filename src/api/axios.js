import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://easy-mock.com/mock/5ccbea110cfe960343d92eb3/api'
})

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

export default instance