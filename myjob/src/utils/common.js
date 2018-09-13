import axios from 'axios'
import qs from 'qs'

// function checkStatus (response) {
//   // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
//   if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
//     console.log(response.data)
//       if(response.data.errCode == 0) {
//         return response.data.data
//       }else if(response.data.errCode == 10000) {
//         //授权过期
//         return response.data.errMsg
//       }else if(response.data.errCode == 10001) {
//         //签名失败
//         return response.data.errMsg
//       }else if(response.data.errCode == 10002) {
//         //参数缺失
//         return response.data.errMsg
//       }else if(response.data.errCode == 10003) {
//         //好像出了一点小问题
//         return response.data.errMsg
//       }else if(response.data.errCode == 10004) {
//         //参数异常
//         return response.data.errMsg
//       }
    
//   }
//   return { // 自定义网络异常对象
//     code: '404',
//     message: '网络异常'
//   }
// }

export default {
 
  add(point_code) {
    return axios.post(process.env.SET_DOT, qs.stringify({
      "platform": 2,
      "point_code":point_code,
      "created_time": (new Date()).getTime()
      }),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then( (response) => {
        return response
      })
      .catch( (error) => {
        return error
      });
  }

}