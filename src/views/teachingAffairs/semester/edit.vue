<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
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
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
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
      if (this.detailInfo) {
        this.postForm = this.detailInfo
      } else {
        this.getDetail()
      }
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
  /*@import "~@/styles/mixin.scss";*/
</style>
