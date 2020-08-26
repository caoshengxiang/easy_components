<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <!--    <div class="statisticsInfo">-->
    <!--      <div class="menu-2-box">-->
    <!--        <div-->
    <!--          class="menu-2-item hvr-underline-from-center"-->
    <!--        ><img src="../../../assets/p1.png" height="50" width="50"/>-->
    <!--          <div class="text">-->
    <!--            <div class="analysis-text"><span class="tag">男生：{{statisticsInfo.manTotal}} </span></div>-->
    <!--            <div class="analysis-text"><span class="tag">女生：{{statisticsInfo.womanTotal}}</span></div>-->
    <!--            <div class="analysis-text-small">当前床位总数</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div/>-->
    <!--      </div>-->
    <!--    </div>-->
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--        <PermissionButton-->
        <!--          menu-no="_views_set_post_add"-->
        <!--          class="filter-item"-->
        <!--          icon="el-icon-plus"-->
        <!--          type="primary"-->
        <!--          name=""-->
        <!--          round-->
        <!--          @click="handleAdd"-->
        <!--        />-->
        <el-button class="filter-item" round type="warning">
          预警设置
        </el-button>
        <el-select v-model="listQuery.level1" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="一级指标" class="filter-item"
        >
          <el-option
            v-for="item in indexOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-select v-model="listQuery.level1" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="二级指标" class="filter-item"
        >
          <el-option
            v-for="item in indexOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <!--        <el-button style="margin-left: 20px;" class="filter-item" type="primary" round @click="searchList">-->
        <!--          搜索-->
        <!--        </el-button>-->
        <!--        <el-button class="filter-item" round type="warning" @click="resetSearch()">-->
        <!--          重置-->
        <!--        </el-button>-->
        <el-button class="filter-item" round type="primary" style="margin-left: 10px;">
          编辑
        </el-button>
        <el-button class="filter-item" type="success" round>
          新增
        </el-button>
      </template>
      <template slot="right">
        <!--导出-->
        <!--        <PermissionButton-->
        <!--          menu-no="_views_dormitory_classRecord_export"-->
        <!--          class-name="filter-item"-->
        <!--          @click="exportClassRecord"-->
        <!--          type="primary"-->
        <!--          round-->
        <!--        />-->
      </template>
      <parentTable ref="multipleTable" @selectionChange="handleSelectionChange" v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column label="名称" prop="name" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="编号" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="必填" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.administrativeGradeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用报告" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button round type="primary" @click="editHandle">编辑</el-button>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
    <el-dialog
      width="600px"
      title="菜单编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
<!--        <el-form-item label="部门代码：" prop="code">-->
<!--          <el-input v-model="temp.code" class="filter-item"/>-->

<!--        </el-form-item>-->
<!--        <el-form-item label="部门名称：" prop="name">-->
<!--          <el-input v-model="temp.name" class="filter-item"/>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="上级部门：" filterable prop="">-->
<!--          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in partOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="联系电话：">-->
<!--          <el-input v-model="temp.phone" class="filter-item"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="">-->
<!--          <el-button @click="dialogFormVisible = false">-->
<!--            取消-->
<!--          </el-button>-->
<!--          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
<!--            保存-->
<!--          </el-button>-->
<!--        </el-form-item>-->
      </el-form>
      <!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
      <!--        -->
      <!--      </div>-->
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ViewsDiagnosisIndexMgList',
    components: {
      Breadcrumb,
    },
    data() {
      return {
        importance: [],
        listLoading: false,
        pageData: { records: [] },
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          descs: 'id',
          level1: '',
        },
        indexOptions: [],
        dialogFormVisible: false,
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
      getList() {
        const that = this
        // that.listLoading = true
        // that.$api.dormitoryCheck.dormitoryClbumTimeAssessmentList({ ...that.pagePara, ...that.listQuery }).then(data => {
        //   that.listLoading = false
        //   if (data.code === 200) {
        //     // 返回成功
        //     that.pageData = data.data
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: data.msg
        //     })
        //   }
        // })
        that.pageData = {
          records: [{name: '办学年份'}],
          total: 1
        }
      },
      handleSelectionChange(val) {
        console.log(val, '选择')
        // console.log(this.$refs.multipleTable.$refs.table)
        // console.log(this.$refs.multipleTable.testMethods())
      },
      editHandle() {
        this.dialogFormVisible = true
      },
      // exportClassRecord() {
      //   this.$api.dormitoryCheck.dormitoryClbumTimeAssessmentExportExcel({ ...this.pagePara, ...this.listQuery })
      // },
    }
  }
</script>
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
  }
</style>
