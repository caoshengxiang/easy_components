<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" round style="margin-left: 0px;" type="primary"  @click="$utils.routerLink(`/views/baseinfo/major/edit`)">
          新增专业信息
        </el-button>
        <el-select
          v-model="listQuery.departmentId"
          placeholder="系部"
          clearable
          filterable
          style="margin-left: 10px;width: 100px"
          class="filter-item"
        >
       <el-option v-for="item in  departList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select
          v-model="listQuery.ifFullTime"
          placeholder="是否全日制"
          clearable
          filterable
          style="margin-left: 10px;width: 100px"
          class="filter-item"
        >
       <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-select
          v-model="listQuery.grade"
          placeholder="班级类型"
          clearable
          filterable
          style="margin-left: 10px;width: 100px"
          class="filter-item"
        >
       <el-option v-for="item in  AllEnum.班级类型" :key="item" :label="item" :value="item" />
        </el-select>
    <el-input
      v-model="listQuery.name"
      placeholder="请输入关键字搜索"
      prefix-icon="el-icon-search"
      style="margin-left: 10px;width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="searchList">
          搜索
        </el-button>
      </template>
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        slot="table"
      >
        <el-table-column label="专业代码" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="专业简称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.alias }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学制" align="center">
          <template slot-scope="{row}">
            <span>{{ row.academicYear }} </span>
          </template>
        </el-table-column>
        <el-table-column label="部系" align="center">
          <template slot-scope="{row}">
            <span>{{ row.departmentName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="是否全日制" align="center">
          <template slot-scope="{row}">
            <span>{{ row.ifFullTime ?'是':'否' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班级类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.classType }} </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
            <el-button type="primary" round size="mini" @click="detail(row.id)">
              编辑
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  export default {
    name: 'ComplexTable',
    components: {Breadcrumb,Pagination,YPageListLayout},
    data() {
      return {

        opt:[{
          key: true,
          label:'是'
        },{
          key: false,
          label:'否'
        }],
        pageData:{},
        pagePara:{
          current:0,
          size:10
        },
        listQuery: {
        },
        departList:[],
        AllEnum:[]
      }
    },
    created(){
      let that = this;
      that.getList();
      that.getdepartList()
      that.getAllEnum()
    },
    methods:{
      searchList(){
        let that = this;
        that.pagePara.current = 0
        that.getList()
      },
      getAllEnum(){
        let that = this
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
      getdepartList(){
        let that = this;
        that.$api.department.list({current:0,size:10000}).then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.departList = data.data.records
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      add(){
        let that =this;
        that.$router.push({
          path:"/views/baseinfo/major/edit",
          query: {
            type: "add"
          }
        })
      },
      detail(id){
        let that =this;
        that.$router.push({
          path:"/views/baseinfo/major/edit",
          query: {
            id:id,
            type: "add"
          }
        })
      },
      getList(){
        let that = this;
        that.$api.major.list({...that.listQuery,...that.pagePara}).then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.pageData = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .right {
    flex: 1;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
      margin-bottom: 8px;
    }

    .menu-2-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .menu-2-item {
      display: flex;
      align-items: center;
      color: #656565;
      font-size: 12px;
      width: 230px;
      height: 101px;
      background: rgb(255, 185, 129);
      border-radius: 3px;
      padding-left: 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .text {
        margin-left: 16px;
      }
    }
  }
</style>
