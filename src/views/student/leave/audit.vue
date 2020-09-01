<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true" :showBtn="false">
      <el-tabs value="first">
        <el-tab-pane label="请假信息录入" name="first">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="width: 800px;margin: auto"
            border='true'
          >
            <div class="createPost-main-container">
              <table class="viewTable">
                <tr>
                  <td colspan="2" class="tdclass"> <lable style="color: red">2020</lable> 学年  <lable style="color: red">春季</lable> </td>
                </tr>
                <tr>
                  <td class="tdclass" style="width: 25%"> 学生</td>
                  <td  class="tdclass"  style="color: grey"> {{postForm.studentSampleInfoDTO.name}} </td>
                </tr>
                <tr>
                  <td class="tdclass"> 请假时间</td>
                  <td class="tdclass" style="color: grey"> {{postForm.startTime}}至{{postForm.endTime}} </td>
                </tr>
                <tr>
                  <td class="tdclass"> 请假总计</td>
                  <td class="tdclass" style="color: grey">
                    <el-lable style="color: red">{{postForm.days}}</el-lable> 天  <el-lable  style="color: red">{{postForm.hours}}</el-lable> 小时 </td>
                </tr>
                <tr>
                  <td class="tdclass"> 请假事由</td>
                  <td  class="tdclass" style="color: grey"> {{postForm.reason}} </td>
                </tr>

                <tr>
                  <td class="tdclass"> 审核结果</td>
                  <td class="tdclass" style="color: grey"> {{showState}}</td>
                </tr>
                <tr>
                  <td rowspan="3" class="tdclass"> 审核</td>
                  <td  class="tdclass">
                    <el-select v-model="postForm.state" class="filter-item" style="float: left; width: 100%" placeholder="请选择">
                      <el-option  v-for="item in AllEnum.审核状态" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </td>
                </tr>
                <tr>
                <td  class="tdclass" >
                  <el-input type="textarea" :rows="3" maxlength="500" v-model="postForm.remark" show-word-limit />
                </td>
              </tr>
                <tr>
                <td  class="tdclass">
                  <el-button type="primary" size="mini" round @click="handleCreate()" >提交 </el-button>
                </td>
              </tr>
              </table>
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
  import YDetailPageLayout from '@/components/YDetailPageLayout/index_detail'

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
        postForm: {},
        dataId: this.$route.query.id,
        showState:'',
        AllEnum:[]
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
      that.getAllEnum()
    },
    methods: {

      getAllEnum() {
        const that = this
        that.$api.globalConfig.getAllEnum().then(data => {
          if (data.code === 200) {
            that.AllEnum = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleCreate(){
          // console.log(data)
          const that = this
          that.$confirm('确认审核当前记录吗?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              this.$api.leave.audit({...this.postForm}).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '审核成功'
                  })
                  this.getList()
                  this.getStatistics()
                }
              })
            })
            .catch(err => { console.error(err) })
      },
      getDetail() {
        if (this.dataId) {
          this.$api.leave.detail(this.dataId).then(res => {
            this.postForm = res.data
            this.days = this.postForm.days
            this.hours =  this.postForm.hours
            this.showState = this.postForm.state == 1?'审核中':( this.postForm.state == 2?'审核通过':('审核拒绝'))
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  /*@import "~@/styles/mixin.scss";*/
</style>
