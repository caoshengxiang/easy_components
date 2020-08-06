<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input v-model="listQuery.title" placeholder="标题" prefix-icon="el-icon-search"  style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select
          v-model="listQuery.state"
          placeholder="审核状态"
          clearable
          class="filter-item"
          style="margin-left:10px;margin-bottom: 10px;width: 100px"
        >
          <el-option  key="全部" label="全部" value="" />
          <el-option  key="待审核" label="待审核" value="1" />
          <el-option  key="通过" label="通过" value="2" />
          <el-option  key="拒绝" label="拒绝" value="3" />
          <el-option  key="撤销" label="撤销" value="4" />
        </el-select>   <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 10px;padding-top: 2px"
          class="filter-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button class="filter-item" round style="margin-left: 20px"
                   size="mini" type="primary" @click="searchList">
          搜索
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
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
        slot="table"
      >
        <el-table-column label="标题" prop="processName" align="center">
        </el-table-column>
        <el-table-column label="申请时间" prop="startTime" align="center">
        </el-table-column>
        <el-table-column label="完成时间" prop="endTime" align="center">
        </el-table-column>
        <el-table-column label="审核状态" prop="state" align="center">
      </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary"
                       size="mini" round @click="taskdetail(row.processId)">查看</el-button>
            <el-button v-if="row.stateCode == 1" type="danger"
                       size="mini" round @click="cancle(row.processId)">撤销</el-button>
            <el-button v-else type="info" disabled
                       size="mini" round @click="cancle(row.processId)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsWorkflowTaskMyTaskList',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
        listQuery:{

        },
        dateTime:[],
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
      cancle(id){
        const that = this
        that.$confirm('确认撤销当前申请吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            that.$api.task.cancle({ id: id }).then(data => {
              that.loading = false;
              if(data.code === 200){

                this.$message({
                  type: 'success',
                  message: '撤销成功'
                })
                that.getList()
              }
              else{
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })

          })
          .catch(err => { console.error(err) })
      },
      taskdetail(id){
        let that =this;
        const routeData = that.$router.resolve({
          path: '/views/workflow/task/taskDetail',
          query: {
            id: id,
            type:2,
            menuLevel1: this.$route.query.menuLevel1,
            menuId: this.$route.query.menuId,
            back: this.$route.fullPath
          }
        })
        window.open(routeData.href, '_blank');
      },
      getList(){
        const that = this;
        that.loading = true;
        that.$api.task.myTask({...that.pagePara,...that.listQuery}).then(res => {
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
