export default function ({ app, redirect, route }) {
  const axios = app.$axios

  // 基本配置
  axios.setHeader('Content-Type', 'application/json;charset=UTF-8', 'post')

  function token () {
    let result = ''
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 32; i > 0; --i) { result += chars[Math.floor(Math.random() * chars.length)] }
    return result
  }

  function expire () {
    redirect('/login')
  }

  // 请求回调
  axios.onRequest((config) => {
    config.headers.Token = token()
  })

  // 返回回调
  axios.onResponse((res) => {
    if (res.status === 401) {
      expire()
    }
  })

  // 错误回调
  axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      expire()
    }
    return Promise.reject(error.response.data)
  })
}
