<template>
  <div class="app-container teaching-index">
<!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>-->
    <el-button
      v-if="type=='detail'"
      class="filter-item download-button"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="type='add'"
    >
      编辑
    </el-button>
    <el-button
      v-if="type=='add'"
      class="filter-item download-button"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="type='detail'"
    >
      取消
    </el-button>
    <el-button
      v-if="type=='add'"
      class="filter-item download-button"
      style="margin-left: 10px;margin-right: 0px"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >
      保存
    </el-button>
    <div class="createPost-container">
      <el-form
        label-width="200px"
        ref="postForm"
        :model="postForm"
        :rules="rules"
        class="form-container">

        <div class="createPost-main-container">
          <div class="postInfo-container">

            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(54,163,247)">地</div>
                <div class="icon-info">占地面积</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="占地面积总数：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="占地面积其中：绿化用地面积：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title">建</div>
                <div class="icon-info">校舍总建筑面积</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="校舍总建筑面积：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中学校产权校舍建筑面积：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中非学校产权校舍建筑面积：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">房</div>
                <div class="icon-info">教学及辅助用房</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="教学及辅助用房：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中教室：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中图书馆：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="其中实验室、实习场所：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中体育馆：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中会堂：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">房</div>
                <div class="icon-info">行政办公用房</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="行政办公用房：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(105,135,176)">房</div>
                <div class="icon-info">生活用房</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="生活用房：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中学生宿舍（公寓）：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中学生食堂：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="其中教工宿舍（公寓）：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中教工食堂：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中生活福利及附属用房：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="教工住宅：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他用房：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(103,194,58)">房</div>
                <div class="icon-info">纸质图书</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="纸质图书（万册）总册数：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纸质图书（万册）本学年新增数：" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">刊</div>
                <div class="icon-info">专业期刊</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="专业期刊（种）中文纸质专业期刊" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="专业期刊（种）外文纸质专业期刊" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="专业期刊（种）电子专业期刊" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(54,163,247)">计</div>
                <div class="icon-info">计算机数</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="计算机数（台）总数" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计算机数（台）其中：教学用计算机" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计算机数（台）其中：机房用计算机公共机房" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="计算机数（台）其中：机房用计算机专业机房" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">室</div>
                <div class="icon-info">教室</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="教室（间）总数" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="教室（间）其中：网络多媒体教室数" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(246,114,32)">室</div>
                <div class="icon-info">信息化建设</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="接入互联网出口带宽（Mbps）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="校园网主干最大带宽（Mbps）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="网络信息点数（个）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">信</div>
                <div class="icon-info">现有管理信息系统总量（软件系统）</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="现有管理信息系统总量（软件系统）总个数" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现有管理信息系统总量（软件系统）名称" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(95,107,114)">网</div>
                <div class="icon-info">上网课程数</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上网课程数" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(105,135,176)">网</div>
                <div class="icon-info">数字资源量</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="数字资源量数据库（个）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数字资源量电子图书（册）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数字资源量音视频（小时）" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(154,152,161)">网</div>
                <div class="icon-info">固定资产</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="全校固定资产总值" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中：教学、实习仪器设备资产值资产总值" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其中：教学、实习仪器设备资产值当年新增资产值" prop="type" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'

  const defaultForm = {
    id: '',
  }

  export default {
    name: 'SetInfo',
    components: { Breadcrumb },
    data() {
      return {
        type: 'add',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.type = 'detail'
    },
    methods: {
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;

  }
</style>
<style lang="scss" scoped>
  .teaching-index {
    .el-form-item--small .el-form-item__label {
      line-height: 18px !important;
    }
  }
</style>
