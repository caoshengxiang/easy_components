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
          <i class="easy-icon easy-icon-avatar" /> <span class="text">占地面积100 平方米</span>
        </div>
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <span class="text">独立产权面积100 平方米</span>
        </div>
      </div>

    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" round type="primary"  @click="handleAdd">
          新增用地
        </el-button>
        <el-input v-model="listQuery.keyword" placeholder="用地编号或名称" prefix-icon="el-icon-search"  style="margin-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
        <el-table-column label="土地产权" prop="id" sortable="custom" align="center" width="150">
          <template slot-scope="{row}">
          <span >
                                              {{ row.property }}
                  </span>
          </template>
        </el-table-column>
        <el-table-column label="使用状况" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="校区" width="150px"  align="center">
          <template slot-scope="{row}">
            <span>{{ row.campus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用途" width="110px" align="center">
          <template slot-scope="{row}">
            <span >
         {{ row.user }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="面积(平方米)"  width="110px" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column label="土地证号" align="center" width="95">
          <template slot-scope="{row}">
            <span >{{ row.certificateNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" min-width="300px">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="200">
          <template slot-scope="{row}">
            <el-button type="primary" round size="mini" @click="detail(row.id)">
              编辑
            </el-button>
            <el-button type="primary" round size="mini"  @click="deleteInfo(row.id)">
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
          dormitoryId:0
        },
      }
    },
    created(){
      let that = this;
      that.getList();
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
          that.$api.assetinfo.deleteLand({ id: id }).then(data => {
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
          path:"/baseinfo/assetdetail",
          query: {
            id:id,
            type: "detail"
          }
        })
      },
      getList(){
        let that = this;
        that.$api.assetinfo.getLandPage({...that.listQuery,...that.pagePara}).then(data => {
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
<style>
  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right
  }
  .qcode-wrap {
    display: flex;

    .qcode-item {
      width: 200px;
      height: 200px;

    }
  }
</style>
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
