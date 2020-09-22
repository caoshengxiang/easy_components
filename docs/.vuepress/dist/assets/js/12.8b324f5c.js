(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{917:function(e,r,t){t(1)({target:"Number",stat:!0},{isInteger:t(960)})},960:function(e,r,t){var l=t(5),a=Math.floor;e.exports=function(e){return!l(e)&&isFinite(e)&&a(e)===e}},967:function(e,r,t){"use strict";t.r(r);t(292),t(917),t(298);function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"blur",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",l="blur"===e?"请输入":"请选择";return t&&(l=t),{required:!0,message:"".concat(l).concat(r),trigger:e}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return{min:e,max:r,message:"长度在 ".concat(e," 到 ").concat(r," 个字符"),trigger:"blur"}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"number",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t="";return t="number"===e?"数字":"date"===e?"日期":"array"===e?"数组":"有效类型",{type:e,message:"".concat(r,"必须为").concat(t)}}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blur";return{validator:e,trigger:r}}var i={filedRequired:l,filedLength:a,filedType:o,validatePhone:n((function(e,r,t){""===r?t(new Error("请输入手机号")):/^1[0-9]{10}$/.test(r)?t():t(new Error("请输入有效手机号!"))})),validateBeforeTime:n((function(e,r,t){var l=new Date;Date.parse(r)<Date.parse(l)?t(new Error("请正确选择时间")):t()})),validateInteger:n((function(e,r,t){Number.isInteger(Number(r))&&Number(r)>0?t():t(new Error("请输入有效的数字"))})),validateChinese:n((function(e,r,t){/^[\u0391-\uFFE5]+$/.test(r)?t():t(new Error("请输入中文"))})),validateZm:n((function(e,r,t){/^[a-zA-Z]*$/.test(r)?t():t(new Error("请输入英文字母"))})),validateEmail:n((function(e,r,t){/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(r)?t():t(new Error("请输入正确的邮箱"))})),validateIdCard:n((function(e,r,t){/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(r)?t():t(new Error("请输入有效身份证"))})),validateMoney:n((function(e,r,t){/^[0-9]+(.[0-9]{2})?$/.test(r)?t():t(new Error("请输入有效金额"))}))},u={name:"elFormFieldValidation",data:function(){return{ruleForm:{name:"",region:"",type:[],resource:"",date1:"",date2:"",age:"",phone:"",test:""},rules:{name:[l(),a(3,20)],region:[l("change")],type:[i.filedType("array"),i.filedRequired("change","活动性质","请至少选择一个")],resource:[i.filedRequired("change","活动资源")],date1:[o("date"),i.filedRequired("change","日期")],date2:[o("date"),i.filedRequired("change","时间")],age:[n((function(e,r,t){Number.isInteger(Number(r))&&Number(r)>0&&Number(r)<10?t():t(new Error("请输入1-10的整数"))})),i.filedRequired()],phone:[i.validatePhone],test:[i.validateIdCard]}}},methods:{submitForm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(e){this.$refs[e].resetFields()}}},s=t(38),c=Object(s.a)(u,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"com-pages"},[t("div",{staticClass:"com-page-con"},[t("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"170px"}},[t("el-form-item",{attrs:{label:"活动名称",prop:"name"}},[t("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"活动区域",prop:"region"}},[t("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.ruleForm.region,callback:function(r){e.$set(e.ruleForm,"region",r)},expression:"ruleForm.region"}},[t("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),t("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"活动性质",prop:"type"}},[t("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(r){e.$set(e.ruleForm,"type",r)},expression:"ruleForm.type"}},[t("el-checkbox",{attrs:{label:"美食/餐厅线上活动",name:"type"}}),e._v(" "),t("el-checkbox",{attrs:{label:"地推活动",name:"type"}}),e._v(" "),t("el-checkbox",{attrs:{label:"线下主题活动",name:"type"}}),e._v(" "),t("el-checkbox",{attrs:{label:"单纯品牌曝光",name:"type"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"特殊资源",prop:"resource"}},[t("el-radio-group",{model:{value:e.ruleForm.resource,callback:function(r){e.$set(e.ruleForm,"resource",r)},expression:"ruleForm.resource"}},[t("el-radio",{attrs:{label:"线上品牌商赞助"}}),e._v(" "),t("el-radio",{attrs:{label:"线下场地免费"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"活动时间",required:""}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{prop:"date1"}},[t("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.ruleForm.date1,callback:function(r){e.$set(e.ruleForm,"date1",r)},expression:"ruleForm.date1"}})],1)],1),e._v(" "),t("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),e._v(" "),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{prop:"date2"}},[t("el-time-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"选择时间"},model:{value:e.ruleForm.date2,callback:function(r){e.$set(e.ruleForm,"date2",r)},expression:"ruleForm.date2"}})],1)],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"年龄",prop:"age"}},[t("el-input",{attrs:{type:"age",autocomplete:"off"},model:{value:e.ruleForm.age,callback:function(r){e.$set(e.ruleForm,"age",e._n(r))},expression:"ruleForm.age"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"电话",prop:"phone"}},[t("el-input",{model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"test",prop:"test"}},[t("el-input",{model:{value:e.ruleForm.test,callback:function(r){e.$set(e.ruleForm,"test",r)},expression:"ruleForm.test"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("保 存")]),e._v(" "),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])}),[],!1,null,"3ab9a367",null);r.default=c.exports}}]);