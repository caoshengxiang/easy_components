<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增学期-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_teachingAffairs_semester_add"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
        <el-input
          v-model="listQuery.name"
          placeholder="请输入学期名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
          clearable
        />
        <el-input
          v-model="listQuery.code"
          placeholder="请输入学期码"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
          clearable
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="学期名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学年" align="center">
          <template slot-scope="{row}">
            <span>{{ row.year }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学期码" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学期开始日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.startDate }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学期上课日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.courseDate }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学期结束日期" align="center">
          <template slot-scope="{row}">
            <span>{{ row.endDate }} </span>
          </template>
        </el-table-column>
        <el-table-column label="上课时间设置" align="center">
          <template slot-scope="{row}">
            <!--            <el-button type="text" @click="handleSetClassTime(row)">设置</el-button>-->
            <PermissionButton
              menu-no="_views_teachingAffairs_semester_classTime"
              type="text"
              name=""
              :page-jump="true"
              :page-query="{id: row.id}"
            />
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
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
            <!--          <svg-icon icon-class="edit" style="color: #157ddd;transform: scale(1.5);cursor: pointer;" @click.native="handleWageInfo(row)"/>-->
            <!--            <el-button type="primary" @click="detail(row)">详情</el-button>-->
            <!--            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>-->
            <PermissionButton
              menu-no="_views_teachingAffairs_semester_edit"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.id}"
              round
            />
            <!--            <el-button type="danger">删除</el-button>-->
            <PermissionButton
              menu-no="_views_teachingAffairs_semester_remove"
              type="danger"
              name=""
              @click="removeHandle(row)"
              round
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import Breadcrumb from '@/components/Breadcrumb'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ViewsTeachingAffairsSemesterList',
    components: {
      Breadcrumb,
      YPageListLayout,
      PermissionButton,
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
        pageData: { records: [] },
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          size: 10,
          name: '',
          code: '',
          keyword: '',
          descs: 'id'
        },
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      resetSearch() {
        this.listQuery = {
          page: 1,
          size: 10,
          name: '',
          code: '',
          keyword: '',
          descs: 'id'
        }
      },
      removeHandle(row) {
        // console.log(data)
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            this.$api.term.delete(row.id).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getList()
              }
            })
          })
          .catch(err => { console.error(err) })
      },
      getList() {
        const that = this
        this.listLoading = true
        // console.log(that.listQuery)
        this.$api.term.list(that.listQuery).then(res => {
          that.pageData = res.data
          setTimeout(() => {
            that.listLoading = false
          }, 200)
        }).catch(() => {
          that.listLoading = false
        })
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
