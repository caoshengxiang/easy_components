<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">男生：{{ statisticsInfo.manTotal }} </span></div>
            <div class="analysis-text"><span class="tag">女生：{{ statisticsInfo.womanTotal }}</span></div>
            <div class="analysis-text-small">当前床位总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">男生：{{ statisticsInfo.manCount }}</span></div>
            <div class="analysis-text"><span class="tag">女生：{{ statisticsInfo.womanCount }}</span></div>
            <div class="analysis-text-small">当前入住总数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p3.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">男生：{{ statisticsInfo.fullManCount }}</span></div>
            <div class="analysis-text"><span class="tag">女生：{{ statisticsInfo.fullWomanCount }}</span></div>
            <div class="analysis-text-small">当前已满寝室数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p4.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">男生：{{ statisticsInfo.notFullManCount }}</span></div>
            <div class="analysis-text"><span class="tag">女生：{{ statisticsInfo.notFullWomanCount }}</span></div>
            <div class="analysis-text-small">当前未满寝室数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p5.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">男生：{{ statisticsInfo.emptyManCount }}</span></div>
            <div class="analysis-text"><span class="tag">女生：{{ statisticsInfo.emptyWomanCount }}</span></div>
            <div class="analysis-text-small">当前空寝室数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_dormitory_dormitoryInfo_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          :page-jump="true"
        />
        <el-select
          v-model="listQuery.gradeId"
          placeholder="年级"
          clearable
          style="margin-left:10px;width: 100px"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.specialtyId"
          placeholder="专业"
          clearable
          class="filter-item"
          style=" margin-left:10px;width: 100px"
          @change="getClbumList"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.clbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:10px;width: 100px"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select v-model="listQuery.state" placeholder="是否住满" clearable class="filter-item"
                   style="width: 100px;margin-left: 10px"
        >
          <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input
          v-model="listQuery.keyword"
          placeholder="宿舍编号或者负责人"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'};searchList()">
          重置
        </el-button>
      </template>
      <template slot="right">
        <!--        <el-button class="filter-item" round type="primary" @click="downloadTemplate">-->
        <!--          导入模板下载-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_dormitory_dormitoryInfo_import"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="人员导入模板"
          @click="downloadTemplate"
        />
        <PermissionButton
          menu-no="_views_dormitory_dormitoryInfo_import"
          class-name="filter-item"
          type="text"
          round
          name=""
          style="padding: 0;margin-bottom: 10px;"
        >
          <excelImport
            ref="uploadControl"
            flag="dormitoryBed/importExcel"
            :style-type="1"
            title="人员导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_dormitory_dormitoryInfo_import"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="宿舍导入模板"
          @click="downloadTemplate1"
        />
        <PermissionButton
          menu-no="_views_dormitory_dormitoryInfo_import"
          class-name="filter-item"
          type="text"
          round
          name=""
          style="padding: 0;margin-bottom: 10px;"
        >
          <excelImport
            ref="uploadControl1"
            flag="dormitory/importExcel"
            :style-type="1"
            title="宿舍导入"
            @fath="getList"
          />
        </PermissionButton>
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--      <el-table-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--        slot="table"-->
        <!--      >-->
        <el-table-column label="宿舍编号" prop="id" align="center">
          <template slot-scope="{row}">
            {{ row.code }}
          </template>
        </el-table-column>
        <el-table-column label="宿舍类别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍位置" align="center">
          <template slot-scope="{row}">
            <span>{{ row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="容纳人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.capacity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studentNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍状态" align="center">
          <template slot-scope="{row}">
            <!--            <span>{{ row.state == 1?'未入住':(row.state == 2?'未住满': (row.state == 3 ?'已住满':'')) }}</span>-->

            <el-tag v-if="row.state == 1" type="info">未入住</el-tag>
            <el-tag v-if="row.state == 2" type="info">未住满</el-tag>
            <el-tag v-if="row.state == 3" type="warning">已住满</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.managerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.managerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center" width="140px" class-name="small-padding fixed-width">
          <template slot-scope="{row, $index}">
            <!--            <el-button type="primary" style="border-radius:15px;" size="mini" @click="handleUpdate(row)">-->
            <!--              编辑-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_dormitory_dormitoryInfo_detail"
              class-name="filter-item"
              round
              size="mini"
              type="primary"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
            <!--            <el-button type="primary" style="border-radius:15px;" size="mini" @click="detail(row.id)">-->
            <!--              人员-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_dormitory_dormitoryInfo_dormitoryStdList"
              name=""
              type="warning"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id, managerName: row.managerName}"
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import excelImport from '@/components/excelImport.vue'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsDormitoryDormitoryInfoList',
    components: {
      PermissionButton,
      Breadcrumb,
      excelImport,
      YPageListLayout
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
        pageData: {},
        statisticsInfo: {},
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: false,
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          descs: 'id',
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        staff: [],
        AllEnum: [],
        IsFull: [{
          label: '全部',
          value: 0
        }, {
          label: '未入住',
          value: 1
        }, {
          label: '未住满',
          value: 2
        }, {
          label: '已住满',
          value: 3
        }],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          remark: '',
          title: 1,
          type: '',
          status: '',
          timestamp: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑宿舍',
          create: '新增宿舍'
        },

      }
    },
    created() {
      const that = this
      that.getList()
      that.getGradeList()// 赛选框年级
      that.getSpecialtyList()
      that.getClbumList()
      that.getStaffList()
      that.getAllEnum()
      that.getStatistics()
    },
    methods: {
      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/statistics/dormitory', { ...that.listQuery }).then(data => {
          if (data.code === 200) {
            that.statisticsInfo = data.data
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
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      downloadCodeTemplate() {
        this.$utils.exportUtil('/dormitoryBed/download/importTemplate', null, '宿舍导入模板')
      },
      downloadTemplate() {
        this.$utils.exportUtil('/dormitoryBed/download/importTemplate', null, '人员导入模板')
      },
      downloadTemplate1() {
        this.$utils.exportUtil('/dormitory/download/importTemplate', null, '宿舍导入模板')
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: 1,
          status: '',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          //    this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        const that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.$api.dormitory.addDormitory({ ...that.temp }).then(data => {
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                that.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          }
        })

        that.dialogFormVisible = false
        that.getList()
      },
      handleAdd() {
        this.temp = Object.assign({}) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        const that = this
        that.$api.dormitory.getDetail(row.id).then(data => {
          if (data.code === 200) {
            row = data.data
            that.temp = Object.assign({}, row) // copy obj
            that.dialogStatus = 'update'
            that.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          }
        })
      },
      updateData() {
        const that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.$api.dormitory.editDormitory({ ...that.temp }).then(data => {
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                that.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
            that.dialogFormVisible = false
          }
        })
      },
      getStaffList() {
        const that = this
        that.$api.baseInfo.getStaffList().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.staff = data.data.records
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGradeList() {
        const that = this
        that.$api.baseInfo.getGradeList().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getSpecialtyList() {
        const that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.majorInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getClbumList() {
        const that = this
        that.$api.baseInfo.getClbumList({
          gradeId: that.listQuery.gradeId,
          specialtyId: that.listQuery.specialtyId
        }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.gradeInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.dormitory.getPage({ ...that.pagePara, ...that.listQuery }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            that.getStatistics()
            that.listLoading = false
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleDelete(row, index) {
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            that.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })
      },
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
<style lang="scss" scoped>

  .analysis {
    background-color: white;

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
      padding-left: 2px;
      padding-top: 2px;
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
      padding-top: 2px;
      margin-bottom: 2px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .text {
        margin-left: 16px;
      }
    }
  }
</style>
<style lang="scss" scoped>

</style>
