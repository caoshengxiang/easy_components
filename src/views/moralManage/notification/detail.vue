<template>

  <div class="notification-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="成绩设置编辑" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="平时成绩（%）：" prop="usualRate" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.usualRate" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="期中考试成绩（%）："
                      prop="midtermRate"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.midtermRate" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="期末考试成绩（%）：" prop="finalRate" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.finalRate" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实作成绩（%）：" prop="praticalRate" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.praticalRate" class="filter-item"/>
                    </el-form-item>
                  </el-col>
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
        loading: false,
        editStatus: true,
        postForm: {},
        rules: {

          usualRate: [{
            required: true,
            message: '请填写平时成绩比例',
            trigger: 'change'
          }],
          midtermRate: [{
            required: true,
            message: '请填写期中考试成绩比例',
            trigger: 'change'
          }],
          finalRate: [{
            required: true,
            message: '请填写期末考试成绩比例',
            trigger: 'change'
          }],
          praticalRate: [{
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
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        that.editStatus = false
      } else {
        this.getData();
      }

    },
    methods: {
      getData() {
        this.loading = true;
        this.$api.globalConfig.getValuesByKey({ key: 'ADVICE_ACHIEVEMENT_SETTING' }).then(res => {
          const { fieldValues } = res.data;
          this.postForm = {
            usualRate: Number(fieldValues.USUAL_RATE.value).toString(),
            midtermRate: Number(fieldValues.MIDTERM_RATE.value).toString(),
            finalRate: Number(fieldValues.FINAL_RATE.value).toString(),
            praticalRate: Number(fieldValues.PRATICAL_RATE.value).toString()
          };
          this.loading = false;
        })
      },
      save() {
        const that = this;
        that.$refs.postForm.validate(valid => {
          if (valid) {
            that.$api.notification.setRule({...that.postForm}).then(data => {
              that.loading = false;
              if (data.code === 250) {
                const back = this.$route.query.back;
                if (back) {
                  this.$router.push(back)
                }
              } else if (data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '规则设置成功',
                  type: 'success',
                  duration: 2000
                });
                const back = this.$route.query.back;
                if (back) {
                  this.$router.push(back)
                }
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            }).catch(_ => this.loading = false);
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
