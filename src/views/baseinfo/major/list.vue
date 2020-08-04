<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
<!--        <el-button class="filter-item" round style="margin-left: 0px;" type="primary" @click="$utils.routerLink(`/views/baseinfo/major/edit`)">-->
<!--          新增专业信息-->
<!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_major_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />

        <el-input
          v-model="listQuery.name"
          placeholder="专业名称"
          prefix-icon="el-icon-search"
          style="margin-left: 10px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />    <el-input
        v-model="listQuery.alias"
        placeholder="专业简称"
        prefix-icon="el-icon-search"
        style="margin-left: 10px;width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />       </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="searchList">
          搜索
        </el-button>
      </template>
      <el-table
        :key="tableKey"
        slot="table"
        v-loading="listLoading"
        :data="pageData.records"
        fit
        highlight-current-row
        style="width: 100%;"
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
<!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
<!--              编辑-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_major_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  export default {
    name: '_views_baseinfo_major_list',
    components: {Breadcrumb, PermissionButton, YPageListLayout},
    data() {
      return {

        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          descs: 'id'
        },
        departList: [],
        AllEnum: []
      }
    },
    created(){
      const that = this;
      that.getList();
      that.getdepartList()
      that.getAllEnum()
    },
    methods: {
      searchList(){
        const that = this;
        that.pagePara.current = 0
        that.getList()
      },
      getAllEnum(){
        const that = this
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
        const that = this;
        that.$api.department.list({current: 0, size: 10000}).then(data => {
          that.loading = false;
          if (data.code === 200){
            // 返回成功
            that.departList = data.data.records
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      add(){
        const that =this;
        that.$router.push({
          path: '/views/baseinfo/major/edit',
          query: {
            type: 'add'
          }
        })
      },
      detail(id){
        const that =this;
        that.$router.push({
          path: '/views/baseinfo/major/edit',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList(){
        const that = this;
        that.$api.major.list({...that.listQuery, ...that.pagePara}).then(data => {
          that.loading = false;
          if (data.code === 200){
            // 返回成功
            that.pageData = data.data
          } else {
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
