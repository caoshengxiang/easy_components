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
        <el-button class="filter-item" size="mini"  style="margin-left: 20px" round type="primary" @click="searchList">
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
         <el-table-column label="申请人" prop="startName" align="center">
         </el-table-column>
         <el-table-column label="申请时间" prop="startTime" align="center">
         </el-table-column>
         <el-table-column label="审核时间" prop="endTime" align="center" >
       </el-table-column>
         <el-table-column label="审核状态" prop="state" align="center">
       </el-table-column>
         <el-table-column label="审核意见" prop="msg" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center" >
           <template slot-scope="{row}">
             <el-button type="primary"
                        size="mini" round @click="goto(row.taskId)">申请详情</el-button>
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
     name: 'ViewsWorkflowTaskAttendList',
     components: {Breadcrumb,YPageListLayout},
     data() {
       return {
         dateTime:[],
         listQuery:{

         },
         loading:false,
         pageData:{},
         pagePara:{
           current:0,
           size:10
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
       goto(id){
         let that =this;
         const routeData = that.$router.resolve({
           path: '/views/workflow/task/Detail',
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
       getList(){
         const that = this;
         that.loading = true;
         if(that.listQuery.dateTime){
           that.listQuery.applyStartDate =   that.listQuery.applyStartDate.split(',')[0]
           that.listQuery.applyEndDate =   that.listQuery.applyStartDate.split(',')[1]
         }
         that.$api.task.getAttendList({...that.pagePara,...that.listQuery}).then(res => {
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
