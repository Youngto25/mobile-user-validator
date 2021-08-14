const Config = {
  // SERVER_HOME: 'http://192.168.31.31:10103/client/v1/',//测试地址
  SERVER_HOME: window.SERVER_HOME || "http://s.stgame.cn/k1/client/v1/", //正式地址
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJjcHdSTWUwbCIsImlhdCI6MTU3MTY0MDY1NH0.le0XfQTDJK0YiDnkcgj0006JwgnSEUOqJ1gqqnkOCM0",
  IS_DEBUG: window.IS_DEBUG
}

module.exports = Config
