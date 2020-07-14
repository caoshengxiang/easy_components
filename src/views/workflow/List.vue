<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <el-button class="filter-item"   type="primary">
          新增
        </el-button>
      </template>
      <template slot="right">
        <el-button class="filter-item"   type="primary">
          新增
        </el-button>
      </template>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
        slot="table"
      >
        <el-table-column label="学号" prop="id" sortable="custom" align="center" width="150">
          <template slot-scope="{row}">
          <span >
                                              {{ row.studyCode }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" min-width="150px"  align="center">
          <template slot-scope="{row}">
            <span>{{ row.sex }}</span>
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
    name: 'ComplexTable',
    components: {Breadcrumb,YPageListLayout},
    data() {
      return {
        list:[],
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
        let that = this;
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.classInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      }
    }
  }
</script>
