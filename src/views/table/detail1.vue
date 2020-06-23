<template>
  <div class="app-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    <el-button class="filter-item download-button" v-if="type=='detail'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='add'">
      编辑
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="type='detail'">
      取消
    </el-button>
    <el-button class="filter-item download-button" v-if="type=='add'" style="margin-left: 10px;margin-right: 0px"  type="primary" icon="el-icon-edit" @click="handleCreate">
      保存
    </el-button>
    <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
            <div class="postInfo-container">
              <div style="margin-bottom: 30px">
              <h3 class="title">  <div   class="avatar-wrapper icon-title">基</div><div class="icon-info">单位信息</div></h3>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>

              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div><div class="icon-info">基本情况</div></h3>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>

              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
              <div style="margin-bottom: 30px">
                <h3 class="title">  <div   class="avatar-wrapper icon-title" style="background:#FF687B">行</div><div class="icon-info">行政班级</div></h3>
              </div>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年份："  prop="type" label-width="80px" class="postInfo-container-item">
                    <el-input v-if="type=='add'" v-model="postForm.type"   class="filter-item" />
                    <el-input v-else v-model="postForm.type" disabled  class="filter-item" />
                  </el-form-item>
                </el-col>
              </el-row>

              <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"></div>
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
      padding-top:5px;
      margin-left:30px;
      width:50px;
      height:10px;
      font-size:10px;
      font-weight:bold;color:rgba(51,51,51,1);
    }

  }

  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right;margin-right: 50px;
  }
</style>
