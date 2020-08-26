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
        <el-select v-model="listQuery.level1" style="width: 200px;" clearable filterable
                   placeholder="诊断项目" class="filter-item"
        >
          <el-option
            v-for="item in indexOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-select v-model="listQuery.level1" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="诊断要素" class="filter-item"
        >
          <el-option
            v-for="item in indexOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-button class="filter-item" round type="primary" style="margin-left: 10px;" @click="editHandle">
          编辑
        </el-button>
        <el-button class="filter-item" type="success" round @click="editHandle">
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
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="编号" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="诊断点名称" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="涉及指标编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原因集合" align="center">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="措施集合" align="center">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="效果集合">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
            <el-button round type="primary" @click="editHandle">编辑</el-button>
          </template>
        </el-table-column>
        <!--    </el-table>-->
      </parentTable>
    </y-page-list-layout>
    <el-dialog
      width="600px"
      title="编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="诊断类型：" prop="code">
          <el-select v-model="temp.level" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in indexLevelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" prop="name" v-if="temp.level === 2">
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 100%;" placeholder="诊断项目">
            <!--            <el-option-->
            <!--              v-for="item in partOptions"-->
            <!--              :key="item.id"-->
            <!--              :label="item.name"-->
            <!--              :value="item.id"-->
            <!--            />-->
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" prop="name" v-if="temp.level === 3">
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 50%;" placeholder="诊断项目">
            <!--            <el-option-->
            <!--              v-for="item in partOptions"-->
            <!--              :key="item.id"-->
            <!--              :label="item.name"-->
            <!--              :value="item.id"-->
            <!--            />-->
          </el-select>
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 50%;" placeholder="诊断要素">
            <!--            <el-option-->
            <!--              v-for="item in partOptions"-->
            <!--              :key="item.id"-->
            <!--              :label="item.name"-->
            <!--              :value="item.id"-->
            <!--            />-->
          </el-select>
        </el-form-item>
        <el-form-item label="诊断名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item"/>
        </el-form-item>
        <el-form-item label="诊断编号：" prop="name">
          <el-input v-model="temp.name" placeholder="多个指标编号请用英文逗号分隔" class="filter-item"/>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="temp.resource">
            <el-radio label="正常"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary">
            保存
          </el-button>
        </el-form-item>
      </el-form>
      <!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
      <!--        -->
      <!--      </div>-->
    </el-dialog>
    <el-dialog
      width="600px"
      title="编辑"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        label-position="right"
        label-width="120px"
        style="width: 520px;"
      >
        <el-form-item label="操作：">
          <el-button type="success">新增集合</el-button>
        </el-form-item>
        <el-form-item label="集合：" prop="name" v-for="(item, index) in groupList" :key="index">
          <el-input v-model="temp.text" class="filter-item" style="width: 310px;margin-right: 10px;"/>
          <el-button type="danger">删除</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible2 = false">
            取消
          </el-button>
          <el-button type="primary">
            保存
          </el-button>
        </el-form-item>
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
    name: 'ViewsDiagnosisIndexMgKeyElementsList',
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
        },
        indexOptions: [],
        dialogFormVisible: false,
        temp: {
          level: ''
        },
        indexLevelOptions: [
          {
            name: '诊断项目',
            id: 1
          },
          {
            name: '诊断要素',
            id: 2
          },
          {
            name: '诊断指标',
            id: 3
          },
        ],
        dialogFormVisible2: false,
        groupList: [
          {
            id: 1,
            text: 'a'
          },
          {
            id: 2,
            text: 'b'
          },
          {
            id: 3,
            text: 'c'
          },
        ]
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
          records: [{ name: '' }],
          total: 1
        }
      },
      editHandle() {
        this.dialogFormVisible = true
      },
      editHandle2() {
        this.dialogFormVisible2 = true
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
