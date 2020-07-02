<template>
  <div class="app-container staff-detail">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
    <el-button
      v-if="type==='detail'"
      class="filter-item download-button"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="type='add'"
    >
      编辑
    </el-button>
    <el-button
      v-if="type==='add'"
      class="filter-item download-button"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="type='detail'"
    >
      取消
    </el-button>
    <el-button
      v-if="type==='add'"
      class="filter-item download-button"
      style="margin-left: 10px;margin-right: 0px"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >
      保存
    </el-button>
    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="width: 600px;margin: auto;">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="24">
              <el-form-item label="学期名称：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                <el-input v-else v-model="postForm.type" disabled class="filter-item" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学年：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                <el-input v-else v-model="postForm.type" disabled class="filter-item" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学期码：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item" />
                <el-input v-else v-model="postForm.type" disabled class="filter-item" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学期开始日期：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-date-picker
                  v-model="postForm.type"
                  :disabled="type!=='add'"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学期上课日期：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-date-picker
                  v-model="postForm.type"
                  :disabled="type!=='add'"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学期结束日期：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-date-picker
                  v-model="postForm.type"
                  :disabled="type!=='add'"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'

  const defaultForm = {
    type: '',
  }

  export default {
    name: 'ComplexTable',
    components: { Breadcrumb },
    data() {
      return {
        type: 'detail',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请填写年份',
            trigger: 'change'
          }],
        },
      }
    },
    created() {
    },
    methods: {
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .staff-detail {
  }

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
