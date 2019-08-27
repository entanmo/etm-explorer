export {
  formatDate, //ETM转换交易时间
  preciseDate, //ETM转换精确交易时间
  divisionTime, //秒转化具体时分
  weight,  //数组权重排序
  unit,  //ETM精度10的8次方
}

/*ETM转换交易时间为(年-月-日)此格式*/
function formatDate(value) {
  let valueTime = value*1000 + 1539316800000 + 8*60*60*1000
  let date = new Date(valueTime);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d
}

/*ETM转换交易时间为(年-月-日)此格式*/
function preciseDate(value) {
  let valueTime = value*1000 + 1539316800000 + 8*60*60*1000
  let date = new Date(valueTime);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function divisionTime(value){
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    var dayTime = 0;// 天数
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
        if(hourTime > 24) {
            //获取天数，获取小时除以24，得到整数天数
            dayTime = parseInt(hourTime / 24);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            hourTime = parseInt(hourTime % 24);
        }
    }
    var result = "" + parseInt(secondTime) + i18n.t('time.s');

    if(minuteTime > 0) {
      result = "" + parseInt(minuteTime) + i18n.t('time.min') + result;
    }
    if(hourTime > 0) {
      result = "" + parseInt(hourTime) + i18n.t('time.h') + parseInt(minuteTime) + i18n.t('time.min');
    }
    if(dayTime > 0) {
      result = "" + parseInt(dayTime) + i18n.t('time.d') + parseInt(hourTime) + i18n.t('time.h');
    }
    return result;
}

//数组权重排序
function weight(property) {
  return function(a,b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2
  }
}

//ETM精度10的8次方
const unit = (pay) => {
  return pay / Math.pow(10, 8)   //相当于除以100000000
}
