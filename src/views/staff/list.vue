<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
      <el-button
        class="filter-item download-button"
        style="margin-left: 10px;"
        icon="el-icon-download"
        @click="handleCreate"
      >
        导入模板下载
      </el-button>
      <el-button
        class="filter-item download-button"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-upload2"
        @click="handleCreate"
      >
        导入
      </el-button>
    </div>
    <div class="filter-container" style="margin-top: 10px;float: left">
      <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">
        新增教职工
      </el-button>
      <el-select
        v-model="listQuery.grade"
        placeholder="管理员类型"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
      <el-select
        v-model="listQuery.grade"
        placeholder="部门"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
      <el-select
        v-model="listQuery.grade"
        placeholder="岗位"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
      <el-select
        v-model="listQuery.grade"
        placeholder="性别"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
    </div>
    <div class="filter-container" style="margin-top: 10px;float: right">
      <el-input
        v-model="listQuery.description"
        placeholder="请输入关键字搜索"
        prefix-icon="el-icon-search"
        style="margin-left: 20px;width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="getList">
        搜索
      </el-button>

    </div>
    <div class="right">
      <div class="menu-2-box">
        <!--        <div-->
        <!--          :key="index"-->
        <!--          class="menu-2-item hvr-underline-from-center"-->
        <!--        >-->
        <!--          <i class="easy-icon easy-icon-avatar" /> <span class="text">占地面积100 平方米</span>-->
        <!--        </div>-->
        <!--        <div-->
        <!--          :key="index"-->
        <!--          class="menu-2-item hvr-underline-from-center"-->
        <!--        >-->
        <!--          <i class="easy-icon easy-icon-avatar" /> <span class="text">独立产权面积100 平方米</span>-->
        <!--        </div>-->
      </div>

    </div>
    <el-table

      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="职工编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="管理员类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="岗位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="基本信息" align="center">
        <template slot-scope="{row}">
          <!--          <i class="el-icon-edit"></i>-->
          <svg-icon
            icon-class="edit"
            style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
            @click.native="handleBaseInfo(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="学历证书" align="center">
        <template slot-scope="{row}">
          <!--          <i class="el-icon-edit"></i>-->
          <svg-icon icon-class="edit" style="color: #157ddd;transform: scale(1.5);cursor: pointer;" @click.native="handleEduInfo(row)"/>
        </template>
      </el-table-column>
      <el-table-column label="工资情况" align="center">
        <template slot-scope="{row}">
          <!--          <i class="el-icon-edit"></i>-->
          <svg-icon icon-class="edit" style="color: #157ddd;transform: scale(1.5);cursor: pointer;" @click.native="handleWageInfo(row)"/>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import QRCode from 'qrcode'

  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      Pagination
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          keyword: '',
        },
        temp: {},
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      detail(id) {
        const that = this
        that.$router.push({
          path: '/baseinfo/assetdetail',
          query: {
            id: id,
            type: 'detail'
          }
        })
      },
      handleFilter() {},
      resetTemp() {
        this.temp = {}
      },
      handleCreate() {
      },
      handleAdd() {
        this.$router.push({
          path: '/staff/detail',
          query: {
            menuLevel1: this.$route.query.menuLevel1,
          }
        })
      },
      getList() {
        const that = this
        console.log(that.listQuery)
        that.list = [{
          id: 1,
          num: 'JYXG00121',
          name: 'xxx'
        }, {
          id: 2,
          num: 'JYXG00121',
          name: 'xxx'
        }, {
          id: 3,
          num: 'JYXG00121',
          name: 'xxx'
        }, {
          id: 4,
          num: 'JYXG00121',
          name: 'xxx'
        }, {
          id: 5,
          num: 'JYXG00121',
          name: 'xxx'
        }, {
          id: 6,
          num: 'JYXG00121',
          name: 'xxx'
        }]

        that.listLoading = false
      },
      handleBaseInfo(row) {
        this.$router.push({
          path: '/staff/detail',
          query: {
            menuLevel1: this.$route.query.menuLevel1,
            id: row.id
          }
        })
      },
      handleEduInfo(row) {
        this.$router.push({
          path: '/staff/edu/detail',
          query: {
            menuLevel1: this.$route.query.menuLevel1,
            id: row.id
          }
        })
      },
      handleWageInfo(row) {
        this.$router.push({
          path: '/staff/wage/detail',
          query: {
            menuLevel1: this.$route.query.menuLevel1,
            id: row.id
          }
        })
      }
    }
  }
</script>
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
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
