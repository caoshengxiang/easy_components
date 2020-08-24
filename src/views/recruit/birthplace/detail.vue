<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true">
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
                  <el-form-item label="学校名称：" prop="schoolName" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="学校名称" v-model="postForm.schoolName" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学校地址：" prop="schoolAddress" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="学校地址" v-model="postForm.schoolAddress" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学校负责人：" prop="schoolLeader" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="学校负责人" v-model="postForm.schoolLeader" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="预计招生人数：" prop="personCount" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="预计招生人数" v-model="postForm.personCount" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="排序：" prop="weight" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="排序" v-model="postForm.weight" class="filter-item"/>
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
  data() {
    return {
      areaInfo:[],
      specialty: [],
      gradeInfo: [],
      type: 'detail',
      postForm: {},
      rules: {
        schoolName: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }]
      },
      departmentList: [],
      staff: [],
      dataId: this.$route.query.id,
    }
  },
  watch: {
    detailInfo: function (value) {
      this.postForm = value
    },
  },
  created() {
    let that = this
    if (this.detailInfo) {
      this.postForm = this.detailInfo
    } else {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      if (this.dataId) {
        this.$api.admissionSource.detail(this.dataId).then(res => {
          this.postForm = res.data
          this.postForm.deadTime = []
          this.postForm.deadTime.push(this.postForm.startTime)
          this.postForm.deadTime.push(this.postForm.endTime)
        })
      }
    },
    handleCreate() {
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.admissionSource.edit(this.postForm).then(res => {
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
            this.$api.admissionSource.add(this.postForm).then(res => {
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
