<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleSave" :edit-status="editStatus">
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
            <el-form-item label="年份：" prop="type">
<!--              <el-input v-model="postForm.year" style="width: 300px;"/>-->
              <el-select v-model="postForm.year" placeholder="请选择" style="width: 300px">
                <el-option v-for="(item) in 10" :key="item" :label="(fullYear+item-2)"
                           :value="(fullYear+item-2)"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="学期：">
              <el-select v-model="postForm.termId" placeholder="请选择" style="width: 300px">
                <el-option v-for="item in termOptions" :key="item.id" :label="item.name"
                           :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="考核周数：" prop="week">
              <el-input v-model="postForm.weeks" style="width: 300px"/>
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
        editStatus: true,
        type: 'detail',
        postForm: {
          year: '',
          weeks: '',
          termId: ''
        },
        rules: {
          year: [{
            required: true,
            message: '请输入学年',
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
        termOptions: [],
        dataId: this.$route.query.id,
        fullYear: new Date().getFullYear()
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
        this.editStatus = false
      } else {
        this.getDetail()
      }
      this.getTerm()
    },
    methods: {
      getDetail() {
        if (this.dataId) {
          this.$api.term.detail(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
      getTerm() {
        this.$api.term.simpleAll().then(res => {
          this.termOptions = res.data
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
              this.$api.dormitoryCheck.add(this.postForm).then(res => {
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
