<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <!--    <el-button-->
    <!--      v-if="type==='detail'"-->
    <!--      class="filter-item download-button"-->
    <!--      style="margin-left: 10px;"-->
    <!--      type="primary"-->
    <!--      icon="el-icon-edit"-->
    <!--      @click="type='add'"-->
    <!--    >-->
    <!--      编辑-->
    <!--    </el-button>-->
    <!--    <el-button-->
    <!--      v-if="type==='add'"-->
    <!--      class="filter-item download-button"-->
    <!--      style="margin-left: 10px;"-->
    <!--      type="primary"-->
    <!--      icon="el-icon-edit"-->
    <!--      @click="type='detail'"-->
    <!--    >-->
    <!--      取消-->
    <!--    </el-button>-->
    <!--    <el-button-->
    <!--      v-if="type==='add'"-->
    <!--      class="filter-item download-button"-->
    <!--      style="margin-left: 10px;margin-right: 0px"-->
    <!--      type="primary"-->
    <!--      icon="el-icon-edit"-->
    <!--      @click="handleCreate"-->
    <!--    >-->
    <!--      保存-->
    <!--    </el-button>-->
    <y-detail-page-layout :save="handleCreate" :edit-status="false">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="width: 600px;margin: auto;"
          >
            <div class="createPost-main-container">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="学期名称：" prop="name" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.name" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学年：" prop="year" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.year" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学期码：" prop="code" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.code" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学期开始日期：" prop="startDate" label-width="120px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.startDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学期上课日期：" prop="courseDate" label-width="120px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.courseDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学期结束日期：" prop="endDate" label-width="120px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.endDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
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
    name: '',
    code: '',
    year: '',
    startDate: '',
    courseDate: '',
    endDate: '',
  }

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
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
        dataId: this.$route.query.id,
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        if (this.dataId) {
          this.$api.term.detail(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
      handleCreate() {
        if (this.dataId) { // 编辑
          this.$refs.postForm.validate(valid => {
            if (valid) {
              this.$api.term.edit(this.postForm).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                }
              })
            }
          })
        } else { // 新增
          this.$refs.postForm.validate(valid => {
            if (valid) {
              this.$api.term.add(this.postForm).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                }
              })
            }
          })
        }
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
