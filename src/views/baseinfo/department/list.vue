<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <!-- <div class="statisticsInfo">
       <div class="menu-2-box">
         <div
           class="menu-2-item hvr-underline-from-center"
         >
           <i class="easy-icon easy-icon-avatar" /> <span class="text">占地面积100 平方米</span>
         </div>
         <div
           class="menu-2-item hvr-underline-from-center"
         >
           <i class="easy-icon easy-icon-avatar" /> <span class="text">独立产权面积100 平方米</span>
         </div>
       </div>

     </div>-->
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button-->
        <!--          class="filter-item"-->
        <!--          round-->
        <!--          type="primary"-->
        <!--          @click="$utils.routerLink(`/views/baseinfo/department/edit`)"-->
        <!--        >-->
        <!--          新增系部-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_department_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-input
          v-model="listQuery.name"
          placeholder="请输入关键字搜索"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList"
        >
          搜索
        </el-button>

        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="系部编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="系部名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="系部负责人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.leaderName }} </span>
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
              menu-no="_views_baseinfo_department_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsBaseinfoDepartmentList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
    },
    data() {
      return {
        listLoading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          dormitoryId: 0,
          descs: 'id'
        },
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {

      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      add() {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/department/edit',
          query: {
            type: 'add'
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/department/edit',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.department.list({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          }
        }).catch(() => { that.listLoading = false })
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
