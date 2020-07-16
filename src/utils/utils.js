/*
通用工具类扩展方法
2019.2.11 姚政伟 创建
*/
import router from '@/router'
import {Loading} from 'element-ui'

const utils = {
  getUrlParam: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (decodeURIComponent(r[2])); return null;
  },
  getEnumName(arrayObj,value){
    if (arrayObj && value) {
      let m = arrayObj.find(m =>m.value==value);
      if (m){
        return m.name;
      }
    }

    return '未知';
  },
  routerLink:function (path) {
    router.push(path);
  },
  getArrayListByGroup(n,list){
    var R = [],F;
    for (F = 0;F < list.length;) {
      R.push(list.slice(F,F += n))
    }
    return R
  },
  formatNum(number, decimals, dec_point, thousands_sep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数，默认2位
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
      };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },
  loading:{
    loadingObj:null,
    show(){
      this.loadingObj = Loading.service();
    },
    hide(){
      if (this.loadingObj){
        this.loadingObj.close();
      }
    }
  }
}

export default utils