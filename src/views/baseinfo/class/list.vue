<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
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
<!--      <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
<!--        新增-->
<!--      </el-button>-->
      <el-select
        v-model="listQuery.grade"
        placeholder="专业"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
      <el-select
        v-model="listQuery.grade"
        placeholder="年级"
        clearable
        filterable
        style="margin-left: 20px;width: 100px"
        class="filter-item"
      >
        <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
      </el-select>
      <el-select
        v-model="listQuery.grade"
        placeholder="校区"
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
        <!--          <i class="icon icon-avatar" /> <span class="text">占地面积100 平方米</span>-->
        <!--        </div>-->
        <!--        <div-->
        <!--          :key="index"-->
        <!--          class="menu-2-item hvr-underline-from-center"-->
        <!--        >-->
        <!--          <i class="icon icon-avatar" /> <span class="text">独立产权面积100 平方米</span>-->
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
      <el-table-column label="班级名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在校区" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="预分配人数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="所属专业" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="所属年级" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <!--          <svg-icon icon-class="edit" style="color: #157ddd;transform: scale(1.5);cursor: pointer;" @click.native="handleWageInfo(row)"/>-->
          <el-button type="primary" @click="edit(row)">编辑</el-button>
          <el-button type="primary" @click="detail(row)">查看</el-button>
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
      detail(row) {
        const that = this
        that.$router.push({
          path: '/baseinfo/class/detail',
          query: {
            id: row.id,
            parentMenuId: this.$route.query.parentMenuId
          }
        })
      },
      edit(row) {
        const that = this
        that.$router.push({
          path: '/baseinfo/class/edit',
          query: {
            id: row.id,
            parentMenuId: this.$route.query.parentMenuId
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
          path: '/baseinfo/class/edit',
          query: {
            parentMenuId: this.$route.query.parentMenuId
          }
        })
      },
      getList() {
        const that = this
        console.log(that.listQuery)
        that.list = [{
          id: 1,
          num: '2018级电商1班',
          name: 'xxx'
        }, {
          id: 2,
          num: '2018级电商1班',
          name: 'xxx'
        }, {
          id: 3,
          num: '2018级电商1班',
          name: 'xxx'
        }, {
          id: 4,
          num: '2018级电商1班',
          name: 'xxx'
        }, {
          id: 5,
          num: '2018级电商1班',
          name: 'xxx'
        }, {
          id: 6,
          num: '2018级电商1班',
          name: 'xxx'
        }]

        that.listLoading = false
      },
      handleBaseInfo(row) {
        this.$router.push({
          path: '/staff/detail',
          query: {
            parentMenuId: this.$route.query.parentMenuId,
            id: row.id
          }
        })
      },
      handleEduInfo(row) {
        this.$router.push({
          path: '/staff/edu/detail',
          query: {
            parentMenuId: this.$route.query.parentMenuId,
            id: row.id
          }
        })
      },
      handleWageInfo(row) {
        this.$router.push({
          path: '/staff/wage/detail',
          query: {
            parentMenuId: this.$route.query.parentMenuId,
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
