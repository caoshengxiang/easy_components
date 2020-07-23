/*
通用工具类扩展方法
2019.2.11 姚政伟 创建
*/
import router from '@/router'
import {Loading,MessageBox} from 'element-ui'
import { getToken } from '@/utils/auth'

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
  },
  transformTree(list, options = {}){
    const {
      keyField = 'id',
      childField = 'children',
      parentField = 'parent'
    } = options

    const tree = []
    const record = {}

    for (let i = 0, len = list.length; i < len; i++) {
      const item = list[i]
      const id = item[keyField]

      if (!id) {
        continue
      }

      if (record[id]) {
        item[childField] = record[id]
      } else {
        item[childField] = record[id] = []
      }

      if (item[parentField]) {
        const parentId = item[parentField]

        if (!record[parentId]) {
          record[parentId] = []
        }

        record[parentId].push(item)
      } else {
        tree.push(item)
      }
    }

    return tree
  },
  EncodeGetUrl(url) {
    let urlArr = url.split('?');
    let encodeUrl = urlArr[0];

    if (urlArr.length > 1) {
      encodeUrl += '?';
      let paramArr = urlArr[1].split('&');
      let encodeparamArr = [];
      paramArr.forEach((item, index) => {
        let key = item.split('=')[0];
        let value = item.split('=')[1];
        encodeparamArr.push(key + '=' + encodeURIComponent(value));
      })

      encodeUrl += encodeparamArr.join('&');
    }

    return encodeUrl;
  },
  objToString(obj) {
    var str = '';
    if (obj) {
      Object.keys(obj).forEach((key, index) => {
        if (index == 0) {
          str = str + `?${key}=${obj[key]}`;
        } else {
          str = str + `&${key}=${obj[key]}`;
        }
      })
    }
    return str;
  },
  exportUtil(url, data, message) {
    let that = this
    MessageBox.confirm('确认导出' + message + '吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      confirmButtonClass: 'confirmButtonClass',
      cancelButtonClass: 'confirmButtonClass',
      center: true
    }).then(() => {

      if(!data) {
        data = {}
      }
      if(!data.token) {
        data.token = getToken();
      }
      let downUrl = process.env.VUE_APP_BASE_API + url + this.objToString(data);
      downUrl = this.EncodeGetUrl(downUrl);
      var a = document.createElement('a');
      a.href = downUrl;
      a.target = '_blank';
      a.click();

    }).catch(() => {

    });

  }
}

export default utils
