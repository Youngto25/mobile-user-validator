import moment from "moment/moment";
import config from '../config/Config'
let isTimeOut = false

export default class  {
  static timeOut(callback){
    if(isTimeOut){ return }
    isTimeOut = true
    setTimeout(()=>{
      callback()
      isTimeOut = false
    },config.timeSpace)
  }
  static  GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  static compress(file,callback){
    if(undefined == file) { //如果未找到文件，结束函数，跳出
      return;
    }
    console.log("fileSize" + file.size);
    console.log(file.type);
    var r = new FileReader();
    r.readAsDataURL(file);
    r.onload = function(e) {
      var base64 = e.target.result;
      var bili = 1.5;
      console.log("压缩前：" + base64.length);
      suofang(base64, bili);
    }
    var suofang = function(base64, bili) {
      console.log("执行缩放程序,bili=" + bili);
      //处理缩放，转格式
      var _img = new Image();
      _img.src = base64;
      _img.onload = function() {
        var _canvas = document.createElement("canvas");
        var w = this.width / bili;
        var h = this.height / bili;
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(function(blob) {
          console.log(blob.size);
          if(blob.size > 512*512){
            suofang(base64, bili);
          }else{
            callback(blob, base64);
          }
        }, "image/jpeg");
      }
    }
  }
  static getTime(createdAt){
    let m = moment(createdAt).add(1,'d').unix() - moment().unix()
    let hh = parseInt(m/60/60)
    let mm = parseInt(m/60%60)
    let ss = parseInt(m%60)
    return this.getNum(hh)+':'+this.getNum(mm)+':'+this.getNum(ss)
    console.log(this.getNum(hh),this.getNum(mm),this.getNum(ss))
  }
  static getNum(num){
    num += ''
    switch (num.length){
      case 1:
        num = '0'+num
        break
    }
    return num
  }
}