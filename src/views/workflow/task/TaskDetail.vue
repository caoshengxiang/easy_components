<template>
  <div class="app-container task-detail">
    <div class="title-container task-title">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <el-card style="height: 100%">
      <div slot="header" class="clearfix">
        <span>任务详情</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" style="padding-left: 50px;margin-top: 50px">
        <el-row style="text-align: left">
          <el-col :span="6">
            <el-form-item label="模块：" prop="status" label-width="100px">
              {{form.moduleName}}
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="操作类型：" prop="status" label-width="100px">
              {{form.operationName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人：" prop="status" label-width="100px">
              {{form.startName}}
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="申请时间：" prop="status" label-width="100px">
              {{form.startTime}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="执行结果：" prop="status" label-width="100px">
              {{form.processResult}}
            </el-form-item>
          </el-col>

          <el-col :span="18">
            <el-form-item label="查看详情：" prop="status" label-width="100px">
             <span class="link-type" @click="detail(form.taskId)">申请详情
                  </span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="审批记录：" prop="status" label-width="100px">
              <el-table
                :data="form.records"
                fit
                highlight-current-row
                style="width: 70%;padding-bottom: 50px"
                :header-cell-style="{backgroundColor:'#EFF1F6'}"
              >
                <el-table-column
                  prop="name"
                  label="审核人"
                >
                </el-table-column>
                <el-table-column
                  prop="result"
                  label="审核结果"
                >
                  <template slot-scope="{row}">
                    <span v-if="row.result == '通过'" style="color: #00a0e9">{{row.result}}</span>
                    <span v-else style="color: red">{{row.result}}</span>

                  </template>
                </el-table-column>

                <el-table-column
                  prop="approvalTime"
                  label="审核时间"
                >
                </el-table-column>
                <el-table-column
                  prop="msg"
                  width="500px"
                  label="审核意见">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type==1 && show ==1">
            <el-form-item label="审核结果：" prop="type" label-width="100px">
              <el-select v-model="form.type" class="filter-item" style="float: left;" placeholder="请选择">
                <el-option key="1" label="通过" value="1"/>
                <el-option key="2" label="拒绝" value="2"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type==1 && show ==1">
            <el-form-item label="审核意见：" prop="msg" label-width="100px">
              <el-input type="textarea" v-model="form.msg" class="filter-item" style="width: 500px"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type==1 && show ==1">
            <el-form-item prop="status" label-width="100px" style="padding-left: 20%">
              <el-button type="primary" @click="auditData()" style="border-radius:15px;">
                确定
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  //功能详情列表
  //姚备注，需要用的列表加到list里面，components里面注意声明，参考
  const detailList = {
    baseInfoAssetInfo: () => import('@/views/baseinfo/assetinfo/detail')
  }

  export default {
    name: 'WorkflowDetail',
    components: {
      Breadcrumb,
      YDetailPageLayout,
      'base-info-asset-info': detailList.baseInfoAssetInfo
    },
    props: {
      //保存方法
      detailInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        show: 0,
        type: 0,
        temp: {},
        form: {},
        formData: {},
        originData: {},
        show: false,
        rules: {
          type: [{
            required: true,
            message: '请选择是否通过',
            trigger: 'change'
          }],
          msg: [{
            required: true,
            message: '请输入审核意见',
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      let that = this
      that.type = that.$route.query.type
      that.show = that.$route.query.show
      that.getDetail()
    },
    methods: {
      detail(id) {
        let that = this
        let detailPath = this.$route.query.detailPath || '/views/workflow/task/Detail'
        let routeData = that.$router.resolve({
          path: detailPath,
          query: { id: id }
        })
        window.open(routeData.href, '_blank')

      },
      auditData() {
        let that = this
        that.$refs.form.validate(valid => {
          if (valid) {
            if (that.form.type == 1) {
              that.$api.task.agree({
                id: that.form.taskId,
                msg: that.form.msg
              }).then(res => {
                that.loading = false
                if (res.code === 200) {
                  that.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  that.$router.push({
                    path: '/views/workflow/task/List',
                    query: {
                      type: 'add'
                    }
                  })
                } else {
                  that.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              that.$api.task.refuse({
                id: that.form.taskId,
                msg: that.form.msg
              }).then(res => {
                that.loading = false
                if (res.code === 200) {
                  that.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  that.$router.push({
                    path: '/views/workflow/task/List',
                    query: {
                      type: 'add'
                    }
                  })
                } else {
                  that.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            }
          }
        })
      },
      getDetail() {
        const that = this
        that.$utils.loading.show()
        if (that.type == 1) {
          that.$api.task.getDetail(that.$route.query.id).then(res => {
            that.$utils.loading.hide()
            if (res.code === 200) {
              //返回成功
              that.form = res.data
            } else {
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        } else {
          that.$api.task.getProcessNew(that.$route.query.id).then(res => {
            that.$utils.loading.hide()
            if (res.code === 200) {
              //返回成功
              that.form = res.data
            } else {
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 20px;
  }
</style>
<style scoped>
  .task-detail >>> .title-container:not(.task-title) {
    display: none !important;
  }

  .task-detail >>> .y-options {
    display: none !important;
  }

  .task-detail >>> .el-card__body, .task-detail >>> .el-card__body .app-container {
    padding: 0;
  }
</style>
