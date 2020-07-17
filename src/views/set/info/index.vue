<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="handleCreate" :editStatus="false" menu-no="_views_set_info_edit">
      <el-tabs value ="first">
        <el-tab-pane label="基础信息" name="first">
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
                    <div class="avatar-wrapper icon-title">基</div>
                    <div class="icon-info">学校基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学校标识码：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在地区：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="所在城市：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="当前校名启用日期：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建校日期：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="建校基础：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校举办者：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="上级主管：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="教学主管部门：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校性质类别：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <div>&nbsp;</div>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">法</div>
                    <div class="icon-info">法人信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="通信地址：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校网址：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息教工号：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息姓名：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息性别：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息职务：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息区号-电话号码：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息手机号：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="法定代表人信息电子邮箱：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"></el-col>
                  <el-col :span="8"></el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">联</div>
                    <div class="icon-info">联系人信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人信息教工号：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人信息姓名：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人信息性别：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人信息职务：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人信息区号-电话号码：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人信息手机号：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人信息电子邮箱：" prop="type" class="postInfo-container-item">
                      <el-input v-if="type=='add'" v-model="postForm.type" class="filter-item"/>
                      <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"></el-col>
                  <el-col :span="8"></el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    id: '',
  }

  export default {
    name: 'SetInfo',
    components: { Breadcrumb, YDetailPageLayout },
    data() {
      return {
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
