<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">

      <el-table
        v-loading="loading"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
        slot="table"
      >
        <el-table-column label="标题" prop="taskName" align="center">
        </el-table-column>
        <el-table-column label="申请人" prop="startName" width="350px" align="center">
        </el-table-column>
        <el-table-column label="申请时间" prop="startTime" align="center" width="350">
        </el-table-column>
        <el-table-column label="申请详情" prop="created" align="center" width="350">
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="{row}">
            <el-button type="primary" round @click="$utils.routerLink(`/workflow/detail?id=${row.id}`)">审核</el-button>
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
    name: 'WorkflowList',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
        detailinfo:{code:11111},
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
      getList(){
        const that = this;
        that.loading = true;
        that.$api.task.getList(that.pagePara).then(res => {
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
