<template>
  <div class="app-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />

    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

        <div class="createPost-main-container">
          <div class="postInfo-container">
            <el-row style="margin-left: 150px">
              <el-col :span="8">
                <el-form-item label="教室：" prop="type" label-width="200px" class="postInfo-container-item ">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实训室名称："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row style="margin-left: 150px">
              <el-col :span="8">
                <el-form-item label=" 建成日期："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实训室类别："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-select v-if="type=='add'" v-model="postForm.type" placeholder="教室类型" clearable class="filter-item" style="width: 100%">
                    <el-option key="1" label="男" value="1" />
                    <el-option key="2" label="女" value="2" />
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row style="margin-left: 150px">
              <el-col :span="8">
                <el-form-item label="使用结构（部门）："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产员："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>



            </el-row>
            <el-row style="margin-left: 150px">
              <el-col :span="8">
                <el-form-item label="工位数："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="适用专业："  prop="type" label-width="200px" class="postInfo-container-item">
                  <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                  <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-left: 150px">
            <el-col :span="12">
              <el-form-item label="实训室介绍："  prop="type" label-width="200px" class="postInfo-container-item">
                <el-input v-if="type=='add'" v-model="postForm.type"  type="textarea"  class="filter-item" />
                <el-input v-else v-model="postForm.type" disabled  type="textarea"   class="filter-item" />
              </el-form-item>
            </el-col>

          </el-row>
            <el-row style="margin-left: 150px">
              <el-col :span="18" style="padding-top: 30px">
                <el-button class="filter-item " v-if="type=='detail'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='add'">
                  编辑
                </el-button>
                <el-button class="filter-item " v-if="type=='add'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='detail'">
                  取消
                </el-button>
                <el-button class="filter-item " v-if="type=='add'" style="margin-left: 10px;margin-right: 0px"  type="primary" icon="el-icon-edit" @click="handleCreate">
                  保存
                </el-button>
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
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0,
    type:''
  }

  export default {
    name: 'ComplexTable',
    components: {Breadcrumb},
    data() {
      return {
        gradeInfo: [{label:"一年级",value:1}, {label:"二年级",value:2}, {label:"三年级",value:3}],
        classInfo:[{label:"一班",value:1}, {label:"二班",value:2}, {label:"三班",value:3}],
        majorInfo:[{label:"数学",value:1}, {label:"软件",value:2}, {label:"英语",value:3}],
        type:'add',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{ required: true, message: '请填写年份', trigger: 'change' }],
        },
      }
    },
    created(){
      this.type = this.$route.query.type
    },
    methods:{
      handleCreate(){
        this.$refs.postForm.validate(valid => {
          if (valid) {
          }
        })
      }
    }
  }
</script>
<style lang="scss" >
  @import "~@/styles/mixin.scss";

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      float: left;
      width: 1500px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label{

            width:21px;
            height:9px;
            font-size:9px;
            font-weight:500;
            color:rgba(102,102,102,1);
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
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
    .viewTable .title{
      text-align: left
    }
    .icon-title{
      font-size:10px;float: left;color:rgba(255,255,255,1);
    }

    .icon-info{
      text-align:left;
      padding-top:5px;
      margin-left:30px;
      height:10px;
      font-size:10px;
      font-weight:bold;color:rgba(51,51,51,1);
    }

  }

  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right;margin-right: 50px;
  }
</style>
