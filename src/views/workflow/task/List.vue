<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
     <!-- <template slot="left">
        <el-input v-model="listQuery.title" placeholder="标题" prefix-icon="el-icon-search"  style="margin-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-date-picker
          v-model="listQuery.dateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 20px;padding-top: 2px"
          class="filter-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期">
        </el-date-picker>
      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="searchList">
          搜索
        </el-button>
      </template>-->
      <el-table
        v-loading="loading"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
        slot="table"
      >
        <el-table-column label="数据模块名" prop="taskName" align="center">
        </el-table-column>
        <el-table-column label="对应操作" prop="processName" align="center">
        </el-table-column>
        <el-table-column label="申请人" prop="startName"  align="center">
        </el-table-column>
        <el-table-column label="申请时间" prop="startTime" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" round @click="detail(row.taskId)">申请详情</el-button>
            <el-button type="primary" round @click="taskdetail(row.taskId)">审核明细</el-button>
            <el-button type="primary" round @click="handleCreate(row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
    <el-dialog title="审核" :visible.sync="dialogFormVisible" >
      <el-form ref="temp" :model="temp" :rules="rules" label-position="right" label-width="110px" style="width: 600px; margin-left:50px;">
        <el-form-item label="审核结果："  prop="type" >
          <el-select v-model="temp.type" class="filter-item" style="float: left; width: 100%" placeholder="请选择">
            <el-option key="1" label="通过" value="1"  />
            <el-option key="2" label="拒绝" value="2"  />
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见：" prop="msg" >
          <el-input type="textarea"  v-model="temp.msg"  class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center" >
        <el-button @click="dialogFormVisible = false"  style="border-radius:15px;" >
          取消
        </el-button>
        <el-button type="primary" @click="auditData()"  style="border-radius:15px;" >
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'WorkflowList',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
        listQuery:{

        },
        dialogFormVisible: false,
        detailinfo: {},
        loading:false,
        pageData:{},
        pagePara:{
          current:0,
          size:10
        },
        temp:{},
        rules: {
          type: [{required: true, message: '请选择是否通过', trigger: 'change'}],
          msg: [{required: true, message: '请输入审核意见', trigger: 'change'}],
        }
      }
    },
    created(){
      let that = this;
      that.getList();//分页列表
    },
    methods:{
      searchList(){
        let that = this;
        that.pagePara.current = 0
        that.getList()
      },
      taskdetail(id){
        let that =this;
        let routeData = that.$router.resolve({ path: '/task/taskdetail', query: {  id: id,type:1 } });
        window.open(routeData.href, '_blank');
      },
      detail(id){
        let that =this;
        let routeData = that.$router.resolve({ path: '/task/detail', query: {  id: id } });
        window.open(routeData.href, '_blank');

      },
      auditData(){
        let that = this
        that.$refs.temp.validate(valid => {
          if (valid) {
            if (that.temp.type == 1) {
              that.$api.task.agree({id: that.temp.taskId, msg: that.temp.msg}).then(res => {
                that.loading = false;
                if (res.code === 200) {
                  that.$message({
                    type: 'success',
                    message: "操作成功"
                  })
                  that.dialogFormVisible = false
                  that.getList()
                } else {
                  that.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              that.$api.task.refuse({id: that.temp.taskId, msg: that.temp.msg}).then(res => {
                that.loading = false;
                if (res.code === 200) {
                  that.$message({
                    type: 'success',
                    message: "操作成功"
                  })
                  that.dialogFormVisible = false
                  that.getList()
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
      handleCreate(row) {
        let that = this
        that.temp = {}
        that.dialogFormVisible = true
        that.temp = Object.assign({}, row)
        that.$nextTick(() => {
          that.$refs['dataForm'].clearValidate()
        })
      },
      getList(){
        const that = this;
        that.loading = true;
        if(that.listQuery.dateTime){
          that.listQuery.applyStartDate =   that.listQuery.applyStartDate.split(',')[0]
          that.listQuery.applyEndDate =   that.listQuery.applyStartDate.split(',')[1]
        }
        that.$api.task.getList({...that.pagePara,...that.listQuery}).then(res => {
          that.loading = false;
          if(res.code === 200){
            //返回成功
            that.pageData = res.data;
          }
          else{
            that.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }
    }
  }
</script>
