<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right">
      <div class="menu-2-box">
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <span class="text">建筑物总数100</span>
        </div>
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <span class="text">十年以上建筑物数量100</span>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" round type="primary" @click="detail()">
          新增建筑物
        </el-button>
        <el-select v-model="listQuery.orgId" placeholder="部门" clearable style="margin-left: 20px; width: 200px" class="filter-item">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-input v-model="listQuery.name" placeholder="建筑物名称" prefix-icon="el-icon-search"  style="margin-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="getList">
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
        <el-table-column label="校区" prop="id" sortable="custom" align="center" width="200">
          <template slot-scope="{row}">
          <span >
                                              {{ row.campus }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column label="建筑物名称" width="200" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name | parseTimeNew('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简写名称" min-width="200"  align="center">
          <template slot-scope="{row}">
            <span>{{ row.alias }}</span>
          </template>
        </el-table-column>
        <el-table-column label="建筑物地址" min-width="200" align="center">
          <template slot-scope="{row}">
            <span >
         {{ row.addr }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="建成年月"  width="150" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.buildDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用年限" width="150">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.yearLimit }}年</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="200">
          <template slot-scope="{row}">
            <el-button type="primary" round size="mini" @click="detail(row.id)">
              编辑
            </el-button>
            <el-button type="primary" round size="mini" @click="deleteInfo(row.id)">
              删除
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
        pageData:{},
        pagePara:{
          current:0,
          size:10
        },
        listQuery: {
          code: '',
          constructionId: ''
        },
        departmentList:[]
      }
    },
    created(){
      let that = this;
      that.getList()  ////查询列表

      that.getDepartmentList() ////查询建筑物列表
    },
    methods:{
      deleteInfo(id){
        const that = this;
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then(() => {
          that.$api.assetinfo.deleteConstruction({ id: id }).then(data => {
            that.loading = false;
            if(data.code === 200){
              that.getList()
            }
            else{
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })

        }).catch(() => {
        });
      },
      detail(id){
        let that =this;
        that.$router.push({
          path:"/baseinfo/buildingdetail",
          query: {
            id: id,
          }
        })
      },
      getDepartmentList(){
        let that = this;
        that.pagePara.size = 10000
        that.$api.baseInfo.getDepartmentList({...that.pagePara}).then(data => {
          that.loading = false;
          if(data.code === 200){

            //返回成功
            that.departmentList = data.data.records
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
      getList(){
        let that = this;
        that.$api.assetinfo.getConstructionPage({...that.listQuery,...that.pagePara}).then(data => {
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

