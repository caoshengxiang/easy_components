<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p6.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{pageData.total}}</span>个班级</div>
            <div class="analysis-text-small">班级总数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button class="filter-item"          size="mini" round type="primary" @click="$utils.routerLink(`/views/baseinfo/class/edit`)">-->
        <!--          新增班级-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_class_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          size="mini"
          :page-jump="true"
        />
        <el-select
          v-model="listQuery.specialtyId"
          placeholder="专业"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
          <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.gradeId"
          placeholder="年级"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
          <el-option v-for="item in gradeList " :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.campus"
          placeholder="校区"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
          <el-option v-for="item in campus" :key="item.name" :label="item.name" :value="item.name"/>
        </el-select>
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" size="mini" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}" size="mini">
          重置
        </el-button>
      </template>
      <template slot="right">
        <!--        <el-button class="filter-item" round style="float:right;margin-right: 10px" type="primary" size="mini" @click="handleDownload">-->
        <!--          导入模板下载-->
        <!--        </el-button>-->

        <PermissionButton
          menu-no="_views_baseinfo_class_list_import"
          class-name="filter-item"
          round
          type="text"
          name=""
        >
          <excelImport
            ref="uploadControl"
            :limit="1"
            flag="clbum/importExcel"
            :style-type="1"
            title="导入"

            @fath = "getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_baseinfo_class_list_import"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="导入模板下载"
          @click="handleDownload"
        />
      </template>
      <el-table
        slot="table"
        v-loading="listLoading"
        :data="pageData.records"
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="班级名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在校区" align="center">
          <template slot-scope="{row}">
            <span>{{ row.campus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预分配人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.allocationNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.gradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班主任" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherPhone }}</span>
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
              menu-no="_views_baseinfo_class_edit"
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
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import excelImport from '@/components/excelImport.vue'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ViewsBaseinfoClassList',
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
        majorList: [],
        gradeList: [],
        AllEnum: [],
        campus: []
      }
    },
    created() {
      const that = this
      that.getList()
      that.getAllEnum()
      that.getMajor()
      that.getGrade()
      that.getByTypeId('campus')
    },
    methods: {
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'campus':
                that.campus = data.data
                break
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getAllEnum() {
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
      getMajor() {
        const that = this
        that.$api.major.listbase({ ...that.listQuery, ...that.pagePara }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.majorList = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGrade() {
        const that = this
        that.$api.grade.listbase({ ...that.listQuery, ...that.pagePara }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.gradeList = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleDownload(url) {
        this.$utils.exportUtil('/clbum/download/importTemplate', this.listQuery, '导入模板下载')
      },
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      add() {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/class/edit',
          query: {
            type: 'add'
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/class/edit',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this
        that.$api.clbum.list({ ...that.listQuery, ...that.pagePara }).then(data => {
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


