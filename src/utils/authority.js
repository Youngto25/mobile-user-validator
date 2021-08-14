import _ from "lodash"

export function getCookieToken() {
  let token = ""
  // console.log('document.cookie', document.cookie)
  document.cookie.split(";").forEach((vo, index) => {
    // console.log('document.cookie.vo', vo)
    if (_.trim(vo.split("=")[0]) == "k1Token") {
      token = _.trim(vo.split("=")[1])
    }
  })
  return token
}
