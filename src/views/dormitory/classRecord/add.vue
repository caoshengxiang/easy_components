<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleSave" :edit-status="true">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="width: 600px;margin: auto;"
            label-width="140px"
          >
            <el-form-item label="考核次数：" prop="time">
              <el-input v-model.number="postForm.time" type="number" style="width: 300px;"/>
            </el-form-item>

            <el-form-item label="学期：">
              <el-select v-model="postForm.termId" placeholder="请选择" style="width: 300px" @change="getWeeks">
                <el-option v-for="item in termOptions" :key="item.id" :label="item.name"
                           :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年份：" prop="week">
              <el-select v-model="postForm.year" placeholder="请选择" style="width: 300px" @change="getWeeks">
                <el-option v-for="item in yearsOptions" :key="item" :label="item"
                           :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="考核周数：" prop="week">
              <el-select multiple v-model="postForm.weeks" placeholder="请选择" style="width: 300px">
                <el-option v-for="item in weeksOptions" :key="item" :label="item"
                           :value="item"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
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
        type: 'detail',
        yearsOptions: [],
        termOptions: [],
        weeksOptions: [],
        postForm: {
          year: '',
          time: '',
          weeks: [],
          termId: '',
        },
        rules: {
          year: [{
            required: true,
            message: '请输入年份',
            trigger: 'blur'
          }],
          time: [{
            required: true,
            message: '请输入次数',
            trigger: 'blur'
          }],
          weeks: [{
            required: true,
            message: '请输入周数',
            trigger: 'blur'
          }],
          termId: [{
            required: true,
            message: '请选择学期',
            trigger: 'change'
          }],
        },
        dataId: this.$route.query.id,
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      if (this.detailInfo) {
        this.postForm = this.detailInfo
      } else {
        this.getDetail()
      }
      this.getTerm()
    },
    methods: {
      getDetail() {
        if (this.dataId) {
          this.$api.dormitoryCheck.detail(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
      getTerm() {
        this.$api.dormitoryCheck.terms().then(res => {
          this.termOptions = res.data
        })
        this.$api.dormitoryCheck.years().then(res => {
          this.yearsOptions = res.data
        })
      },
      getWeeks() {
        this.postForm.weeks = ''
        this.$api.dormitoryCheck.weeks({
          year: this.postForm.year,
          termId: this.postForm.termId
        }).then(res => {
          this.weeksOptions = res.data
        })
      },
      handleSave() {
        if (this.dataId) { // 编辑
          this.$refs.postForm.validate(valid => {
            if (valid) {
              // this.$api.term.edit(this.postForm).then(res => {
              //   if (res.code === 200) {
              //     this.$notify({
              //       title: '成功',
              //       message: '编辑成功',
              //       type: 'success',
              //       duration: 2000
              //     })
              //     const back = this.$route.query.back
              //     if (back) {
              //       this.$router.push(back)
              //     }
              //   }
              // })
            }
          })
        } else { // 新增
          this.$refs.postForm.validate(valid => {
            if (valid) {
              this.postForm.weeks = this.postForm.weeks.join()
              this.$api.dormitoryCheck.dormitoryClbumTimeAssessmentListAdd(this.postForm).then(res => {
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
