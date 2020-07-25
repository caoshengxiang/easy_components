<!--文件上传组件封装 2018.3.25 杨再林创建
====================调用说明================
<fileUpload
          :limit="10" //最大上传数量 默认1
          :fileList="form.videos" //初始化文件列表 默认为空
          ref="uploadVideosControl" //组件声明别名
          flag="routineWork" //文件标识
          :multiple="true" //是否支持多选文件 默认为false
          :styleType="2" //样式类型(1:图片类型 2.附件类型) 默认1
          v-if="!loading"></fileUpload>
===================回调方法（获取上传文件列表）==========
             var listStr = ref[声明别名].getFileListStr();//多张图片逗号分隔
-->
<template>
  <div style="">
    <el-upload
      v-loading="uploadConfig.loading"
      element-loading-text="正在上传..."
      :action="uploadConfig.uploadFileApiUrl+flag"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :before-upload="beforeImageUpload"
      :limit="limit"
      :headers="myHeaders"
      :title="title"
      ref="uploadCtl"
    >
      <el-button type="primary" round><slot>{{this.title}}</slot></el-button>
    </el-upload>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import { getToken } from '@/utils/auth'
  export default {
    data () {
      return {
        allowFileTypes:'.xls|.xlsx',
        //上传文件配置属性
        uploadConfig:{
          loading:false,
          uploadFileApiUrl: process.env.VUE_APP_BASE_API,
          dialogVisible:false,
        },
        myHeaders: {
          'token': getToken()
        }
      }
    },
    //接收参数
    props:{
      //最大上传数量 默认1
      limit:{
        type:Number,
        required:false,
        default:1
      },
      //初始化文件列表 默认为空
      fileList:{
        type:String,
        required:false,
        default:""
      },
      //按钮名字
      title:{
        type:String,
        required:true
      },
      //文件标识
      flag:{
        type:String,
        required:true
      },
      //是否支持多选文件 默认为false
      multiple:{
        type:Boolean,
        required:false,
        default:false
      },
      //样式类型(1:图片类型 2.附件类型) 默认1
      styleType:{
        type:Number,
        required:false,
        default:1
      },
      //tip备注提示
      tipMessage:{
        type:String,
        required:false
      },

      //缩略图大小（宽高 例如：100x100）
      thumbnailSize:{
        type:String,
        required:false,
        default:"146x146"
      }
    },
    created(){
      var that = this;
    },
    methods:{
      handleImageSuccess(res, file) {
        var that = this;
        that.$message.success('导入成功!');
        alert(123)
        setTimeout(() => {
          loading.close();
        }, 3000);
      //  window.location.reload();
      },
      handleImagefail(res, file)
      {
        var that = this;
        that.$message.success('导入失败!');
      },
      beforeImageUpload(file) {
        var that= this;
        var checkFile = false;
        const fileNameSuffix = file.name.substring(file.name.lastIndexOf("."));
        const allowFileTypes = that.allowFileTypes.split("|");
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(allowFileTypes && allowFileTypes.length>0){
          for(var i =0; i<allowFileTypes.length;i++){
            if(allowFileTypes[i].toUpperCase() == fileNameSuffix.toUpperCase()){
              checkFile = true;
              break;
            }
          }
        }
        if(!checkFile){
          that.$message.error('上传文件格式错误!');
          return false;
        }
        if (that.styleType == 1 && !isLt2M) {
          that.$message.error('上传图片大小不能超过 2MB!');
          return false;
        }
        that.uploadConfig.loading = true;
        const loading = this.$loading({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)'
        });

        return true;
      }
    }
  }
</script>
<style>

</style>
