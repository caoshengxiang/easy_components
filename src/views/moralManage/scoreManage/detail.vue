<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="评语设置" name="first">
          <el-form ref="postForm" class="form-container" :model="postForm" label-width="70px" :rules="rules" >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="年份："  class="postInfo-container-item " prop="area">
                      <el-date-picker
                        v-model="postForm.id"
                        align="right"
                        type="year"
                        style="width: 320px"
                        placeholder="选择年">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学期："  class="postInfo-container-item " prop="area" >
                      <service-select
                        style="width: 320px"
                        v-model="postForm.termId"
                        name="name"
                        field="id"
                        :data-service="$api.baseInfo.getTermList"
                        placeholder="学期"
                        clearable
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'ComplexTable',
    components: {
      ServiceSelect,
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
        postForm: {},
        rules: {
          area: [{
            required: true,
            message: '请填写平时成绩比例',
            trigger: 'change'
          }],
          certificateNum: [{
            required: true,
            message: '请填写期中考试成绩比例',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请填写期末考试成绩比例',
            trigger: 'change'
          }],
          addr: [{
            required: true,
            message: '请填写实作成绩比例',
            trigger: 'change'
          }],
        },
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = true
      }

    },
    methods: {
      getDetail() {
        const that = this
        that.$api.assetinfo.getLandDetail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save() {
        const that = this
        const back = this.$route.query.back
        if (back) {
          this.$router.push(back)
        }
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.assetinfo.editLand({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 250) {
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }

                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              that.$api.assetinfo.addLand({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 250) {
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

.form-container {
  max-width: 600px;
  margin: auto;
}
</style>
