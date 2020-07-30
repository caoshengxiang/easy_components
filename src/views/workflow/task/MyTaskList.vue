<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">

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
            <el-button v-if="row.stateCode == 1" type="primary" round @click="cancle(row.processId)">撤销</el-button>
            <el-button type="primary" round @click="taskdetail(row.processId)">申请详情</el-button>
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
    name: 'mytasklist',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
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
        let routeData = that.$router.resolve({ path: '/task/taskdetail', query: {  id: id,type:2 } });
        window.open(routeData.href, '_blank');
      },
      getList(){
        const that = this;
        that.loading = true;
        that.$api.task.myTask(that.pagePara).then(res => {
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
