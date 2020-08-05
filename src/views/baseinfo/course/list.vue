<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/course.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{pageData.total}}</span>门</div>
            <div class="analysis-text-small">当前课程总门数</div>
          </div>
        </div>
      </div>
    </div>

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
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {}">
          重置
        </el-button>
      </template>
      <template slot="right">
        <PermissionButton
          menu-no="_views_baseinfo_course_import"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="课程模板"
          @click="downloadTemplate"
        />
        <PermissionButton
          menu-no="_views_baseinfo_course_import"
          class-name="filter-item"
          type="text"
          round
          name="课程导入"
          style="padding: 0;margin-bottom: 10px;"
        >
          <excelImport
            ref="uploadControl"
            :limit="1"
            flag="/course/importExcel"
            :style-type="1"
            title="课程导入"
          />
        </PermissionButton>
      </template>
      <el-table
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
  import excelImport from '@/components/excelImport.vue'

  export default {
    name: 'ViewsBaseinfoCourseList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout,
      excelImport
    },
    data() {
      return {
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
      downloadTemplate() {
        this.$utils.exportUtil('/course/download/importTemplate', null, '课程模板')
      },
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

