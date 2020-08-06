<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input v-model="listQuery.title" placeholder="标题" prefix-icon="el-icon-search"  style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.startUserName" placeholder="申请人姓名" prefix-icon="el-icon-search"  style="margin-left: 10px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 10px;padding-top: 2px"
          class="filter-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button class="filter-item" style="margin-left: 20px" size="mini"  round type="primary" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" :disabled="this.multipleSelection.length == 0"  style="margin-left: 20px" size="mini"  round type="success" @click="batchAuditVi">
          批量审核
        </el-button>

        <el-button class="filter-item" round type="warning" @click="reset()" size="mini">
          重置
        </el-button>
      </template>
      <template slot="right">

      </template>
      <el-table
        v-loading="loading"
        :data="pageData.records"
        fit
        ref="multipleTable"
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
        :header-row-style ="{backgroundColor:'#42b983'}"
        @selection-change="handleSelectionChange"
        slot="table"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="标题" prop="processName" align="center">
        </el-table-column>
        <el-table-column label="节点名" prop="taskName" align="center">
        </el-table-column>
        <el-table-column label="申请人" prop="startName"  align="center">
        </el-table-column>
        <el-table-column label="申请时间" prop="startTime" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary"
                       size="mini" plain round @click="detail(row.taskId)">申请详情</el-button>
            <el-button type="success"
                       size="mini" round @click="taskdetail(row.taskId)">审核明细</el-button>
            <el-button type="primary"
                       size="mini" round @click="handleCreate(row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
    <el-dialog title="审核" :visible.sync="dialogFormVisible"
               v-loading="loading1">
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
        <el-button @click="dialogFormVisible = false"
                   size="mini" style="border-radius:15px;" >
          取消
        </el-button>
        <el-button type="primary" @click="auditData()"
                   size="mini" style="border-radius:15px;" >
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="batchAudit == 0?'审核':'批量审核'" :visible.sync="dialogFormVisible"
               v-loading="loading1">
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
        <el-button @click="cancleAudit"
                   size="mini" style="border-radius:15px;" >
          取消
        </el-button>
        <el-button type="primary" @click="auditData()"
                   size="mini" style="border-radius:15px;" >
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
    name: 'ViewsWorkflowTaskList',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
        listQuery:{

        },
        dialogFormVisible: false,
        detailinfo: {},
        loading1:false,
        loading:false,
        pageData:{},
        pagePara:{
          current:0,
          size:10
        },
        dateTime:[],
        temp:{},
        rules: {
          type: [{required: true, message: '请选择是否通过', trigger: 'change'}],
          msg: [{required: true, message: '请输入审核意见', trigger: 'change'}],
        },
        multipleSelection:[],
        batchAudit: 0
      }
    },
    created(){
      let that = this;
      that.getList();//分页列表
    },
    methods:{
      batchAuditVi(){
        this.dialogFormVisible = true
        this.batchAudit  =1;
      },
      cancleAudit(){
        this.dialogFormVisible = false
        this.batchAudit  = 0;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },
      reset(){
        this.listQuery = {}
        this.dateTime = []
      },
      searchList(){
        let that = this;
        if(that.dateTime) {
          that.listQuery.applyStartDate = that.dateTime[0]
          that.listQuery.applyEndDate = that.dateTime[1]
        }else{
          that.listQuery.applyStartDate = ''
          that.listQuery.applyEndDate = ''
        }

        that.pagePara.current = 0
        that.getList()
      },
      taskdetail(id){
        let that =this;


        const routeData = that.$router.resolve({
          path: '/views/workflow/task/TaskDetail',
          query: {
            id: id,
            type:1,
            // menuLevel1: this.$route.query.menuLevel1,
            // menuId: this.$route.query.menuId,
            back: this.$route.fullPath
          }
        })
        window.open(routeData.href, '_blank')
      },
      detail(id){
        let that =this;
        const routeData = that.$router.resolve({
          path: '/views/workflow/task/Detail',
          query: {
            id: id,
            // menuLevel1: this.$route.query.menuLevel1,
            // menuId: this.$route.query.menuId,
            back: this.$route.fullPath
          }
        })
        window.open(routeData.href, '_blank');
      },
      auditData(){
        let that = this
        that.$refs.temp.validate(valid => {
          if (valid) {
            that.loading1 = true
            if(this.batchAudit  == 0){
              if (that.temp.type == 1) {
                that.$api.task.agree({id: that.temp.taskId, msg: that.temp.msg}).then(res => {
                  that.loading1 = false
                  if (res.code === 200) {
                    that.$message({
                      type: 'success',
                      message: "操作成功"
                    })
                    that.dialogFormVisible = false
                    this.batchAudit  = 0;
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
                  that.loading1 = false
                  if (res.code === 200) {
                    that.$message({
                      type: 'success',
                      message: "操作成功"
                    })
                    that.dialogFormVisible = false
                    this.batchAudit  = 0;
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
            else
            {
              let temp = []
              //批量审核或者拒绝
              this.multipleSelection.forEach(function (item) {

                temp.push({taskId:item.taskId,msg:that.temp.msg})
              })

              if (that.temp.type == 1) {
                that.$api.task.batchAgree(temp).then(res => {
                  that.loading1 = false
                  if (res.code === 200) {
                    that.$message({
                      type: 'success',
                      message: "操作成功"
                    })
                    that.dialogFormVisible = false
                    this.batchAudit  = 0;
                    that.getList()
                  } else {
                    that.$message({
                      type: 'error',
                      message: data.msg
                    })
                  }
                })
              } else {
                that.$api.task.batchRefuse(temp).then(res => {
                  that.loading1 = false
                  if (res.code === 200) {
                    that.$message({
                      type: 'success',
                      message: "操作成功"
                    })
                    that.dialogFormVisible = false
                    this.batchAudit  = 0;
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
          }
        })

      },
      handleCreate(row) {
        let that = this
        that.dialogFormVisible = true
        that.temp = Object.assign({}, row)
        that.$nextTick(() => {
          that.$refs['temp'].clearValidate()
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
