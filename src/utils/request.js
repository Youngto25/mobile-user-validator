import { Config } from "../config"
import { getCookieToken } from "./authority"
import axios from "axios"
import { Toast } from "antd-mobile/lib/index"

if (false === Config.IS_DEBUG && !getCookieToken()) {
  window.location.href = Config.SERVER_HOME + "wechat/authByLink"
}

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    let { method, body } = options
    // 添加url前缀
    if (!url.indexOf("https://") > -1 || !url.indexOf("http://") > -1) {
      url = Config.SERVER_HOME + (url.indexOf("/") === 0 ? url.substr(1) : url)
    }

    // url= (body&&body.url)||url;
    let option = {
      method,
      url,
      headers: {
        Accept: "application/json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Expires: 0,
        "Content-Type": "application/json; charset=utf-8"
      }
    }
    // let token = Config.IS_DEBUG ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjksImlhdCI6MTU1NzMwOTgzOH0._Io4h2xuma5KURE2qEyMdDmhH0FE-Kj3QorwgmThwhk': getCookieToken()
    let token = Config.IS_DEBUG ? Config.token : getCookieToken()

    if (token) {
      option.headers = option.headers || {}
      option.headers.Authorization = `Bearer ${token}`
      // option.header.Authorization = `Bearer ${token}`;
    }

    // 参数赋值
    switch (method) {
      case "GET":
      case "DELETE":
        option.params = body || {}
        break
      case "POST":
      case "PATCH":
      case "PUT":
        option.data = body || {}
        break
    }
    console.log("option", option)
    axios(option)
      .then(response => {
        console.log(response)
        resolve(response.data)
      })
      .catch(error => {
        if (error.response) {
          let { status, data } = error.response
          if (status === 400) {
            let { error, message } = data
            Toast.info(message, 1.5)
          }
          if (status === 401 && false === Config.IS_DEBUG) {
            window.location.href = Config.SERVER_HOME + "wechat/authByLink"
            return
          }
          // environment should not be used
          if (status === 403) {
            //router.push('/exception/403');
            return
          }
          if (status <= 504 && status >= 500) {
            //router.push('/exception/500');
            return
          }
          if (status >= 404 && status < 422) {
            //router.push('/exception/404');
          }
        } else if (error.request) {
          throw error
        } else {
          throw error
        }
      })
  })
}

export function requestGet(url, body) {
  return request(url, { method: "GET", body })
}
export function requestDelete(url) {
  return request(url, { method: "DELETE" })
}
export function requestPost(url, body) {
  console.log("url-------------", url)
  return request(url, { method: "POST", body })
}
export function requestPatch(url, body) {
  return request(url, { method: "PATCH", body })
}
export function requestPut(url, body) {
  return request(url, { method: "PUT", body })
}
