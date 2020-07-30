<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <!-- <div class="right">
       <div class="menu-2-box">
         <div
           :key="index"
           class="menu-2-item hvr-underline-from-center"
         >
           <i class="easy-icon easy-icon-avatar" /> <span class="text">当前课程总门数100</span>
         </div>
       </div>

     </div>-->
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
<!--        <el-button class="filter-item" round type="primary" @click="$utils.routerLink(`/views/baseinfo/course/detail`)">-->
<!--          新增课程-->
<!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_course_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-input
          v-model="listQuery.code"
          placeholder="课程编号"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.name"
          placeholder="课程名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
        <el-select
          v-model="listQuery.status"
          placeholder="教研组（一期未启用）"
          clearable
          class="filter-item"
          style="margin-left:20px;width:200px"
        >
          <el-option key="1" label="语文组" value="1" />
          <el-option key="2" label="数学组" value="2" />
        </el-select>
      </template>
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
        <el-table-column label="课程编号" prop="id" sortable="custom" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.code }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学时" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.hours }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="学分" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.credit }}</span>
          </template>
        </el-table-column>

        <el-table-column label="课程类别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程属性">
          <template slot-scope="{row}">
            <span>{{ row.property }}</span>
          </template>
        </el-table-column>
        <el-table-column label="周上课节数">
          <template slot-scope="{row}">
            <span>{{ row.classNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教研组">
          <template slot-scope="{row}">
            <span>{{ row.researchGroupName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template slot-scope="{row}">
            <span>{{ row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="{row}">
            <span>{{ row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="160px">
          <template slot-scope="{row}">
<!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
<!--              编辑-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_course_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
<!--            <el-button type="primary" round size="mini" @click="deleteInfo(row.id)">-->
<!--              删除-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_course_delete"
              class-name="filter-item"
              name=""
              type="danger"
              round
              size="mini"
              @click="deleteInfo(row.id)"
            >
            </PermissionButton>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
    },
    data() {
      return {
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          dormitoryId: 0
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
      deleteInfo(id) {
        const that = this
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.$api.course.delete(id).then(data => {
            that.loading = false
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getList()
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }).catch(() => {
        })
      },
      add() {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/course/detail',
          query: {
            type: 'add'
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/course/detail',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this
        that.$api.course.list({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
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
