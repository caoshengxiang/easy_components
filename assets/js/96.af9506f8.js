(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{1061:function(s,t,c){"use strict";c.r(t);var i={name:"steps_1",data:function(){return{basics:0,basicsList:[{cuIcon:"usefullfill",name:"开始"},{cuIcon:"radioboxfill",name:"等待"},{cuIcon:"roundclosefill",name:"错误"},{cuIcon:"roundcheckfill",name:"完成"}]}},methods:{BasicsSteps:function(){this.basics=this.basics==this.basicsList.length-1?0:this.basics+1}}},a=c(25),n=Object(a.a)(i,(function(){var s=this,t=s.$createElement,c=s._self._c||t;return c("div",{staticStyle:{width:"100%"}},[c("div",{staticClass:"cu-bar bg-white solid-bottom"},[s._m(0),s._v(" "),c("div",{staticClass:"action"},[c("button",{staticClass:"cu-btn bg-green shadow",on:{click:s.BasicsSteps}},[s._v("下一步")])])]),s._v(" "),c("div",{staticClass:"bg-white padding"},[c("div",{staticClass:"cu-steps"},s._l(s.basicsList,(function(t,i){return c("div",{key:i,staticClass:"cu-item",class:i>s.basics?"":"text-red"},[c("span",{class:"cuIcon-"+t.cuIcon}),s._v(" "+s._s(t.name)+"\n      ")])})),0)]),s._v(" "),c("div",{staticClass:"bg-white padding margin-top-xs"},[c("div",{staticClass:"cu-steps"},s._l(s.basicsList,(function(t,i){return c("div",{key:i,staticClass:"cu-item",class:i>s.basics?"":"text-orange"},[c("span",{class:i>s.basics?"cuIcon-title":"cuIcon-"+t.cuIcon}),s._v(" "+s._s(t.name)+"\n      ")])})),0)]),s._v(" "),c("div",{staticClass:"bg-white padding  margin-top-xs"},[c("div",{staticClass:"cu-steps steps-arrow"},s._l(s.basicsList,(function(t,i){return c("div",{key:i,staticClass:"cu-item",class:i>s.basics?"":"text-blue"},[c("span",{class:"cuIcon-"+t.cuIcon}),s._v(" "+s._s(t.name)+"\n      ")])})),0)])])}),[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"action"},[t("span",{staticClass:"cuIcon-title text-orange"}),this._v(" 基本用法\n    ")])}],!1,null,"819e5bd6",null);t.default=n.exports}}]);