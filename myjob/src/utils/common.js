import axios from 'axios'

function checkStatus (response) {
  // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
  if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
    console.log(response.data)
      if(response.data.errCode == 0) {
        return response.data.data
      }else if(response.data.errCode == 10000) {
        //授权过期
        return response.data.errMsg
      }else if(response.data.errCode == 10001) {
        //签名失败
        return response.data.errMsg
      }else if(response.data.errCode == 10002) {
        //参数缺失
        return response.data.errMsg
      }else if(response.data.errCode == 10003) {
        //好像出了一点小问题
        return response.data.errMsg
      }else if(response.data.errCode == 10004) {
        //参数异常
        return response.data.errMsg
      }
    
  }
  return { // 自定义网络异常对象
    code: '404',
    message: '网络异常'
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.HOST_API,
      url,
      data,
      timeout: 10000
    }).then((res) => {
      return checkStatus(res)
    })
  },
  get (url, data) {
    return axios({
      method: 'get',
      baseURL: process.env.HOST_API,
      url,
      data,
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  }

}