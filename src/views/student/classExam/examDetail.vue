<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="listQuery" :getPageList="getList">
      <template slot="left">
        <el-select
          v-model="listQuery.administrativeGradeId"
          placeholder="年级"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeSpecialtyId"
          placeholder="专业"
          clearable
          class="filter-item"
          @change="getClbumList"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeClbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="listQuery.termId"
          placeholder="学期"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
        >
          <el-option v-for="item in termOptions" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select v-model="listQuery.year" placeholder="年份" style="margin-left:5px;width: 100px" >
          <el-option v-for="item in yearsOptions" :key="item" :label="item"
                     :value="item"
          />
        </el-select>
        <el-input
          v-model="listQuery.month"
          placeholder="月份"
          prefix-icon="el-icon-search"
          style="margin-left: 5px;width: 100px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right">
          <PermissionButton
            menu-no="_views_student_classExam_export_jw"
            class-name="filter-item"
            type="text"
            name="导入"
            round
          >
            <excelImport
              ref="uploadControl"
              :flag="flag"
              :style-type="1"
              title="导入"
              @fath="getList"
            />
          </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_cc"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_cg"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_jc"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_zz"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_qs"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_rc"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_student_classExam_export_ws"
          class-name="filter-item"
          type="text"
          name="导入"
          round
        >
          <excelImport
            ref="uploadControl"
            :flag="flag"
            :style-type="1"
            title="导入"
            @fath="getList"
          />
        </PermissionButton>

        <PermissionButton
          menu-no="_views_student_classExam_temple_jw"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          @click="downloadTemplate"
          round
        />  <PermissionButton
        menu-no="_views_student_classExam_temple_cc"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_cg"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_jc"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_zz"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_qs"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_rc"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />  <PermissionButton
        menu-no="_views_student_classExam_temple_ws"
        class-name="filter-item"
        type="primary"
        icon="el-icon-plus"
        name=""
        @click="downloadTemplate"
        round
      />
        </template>
      <parentTable v-loading="listLoading" :data="pageData.records" @sortTable="sortTable" slot="table" style="width:100%">
        <el-table-column label="学月" align="center">
          <template slot-scope="{row}">
            <span>{{ row.month }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
        <template slot-scope="{row}">
          <span>{{ row.administrativeClbumName }}</span>
        </template>
      </el-table-column>
        <el-table-column label="班主任" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeGradeName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="男生" align="center">
          <template slot-scope="{row}">
            <span>{{ row.boys }} </span>
          </template>
        </el-table-column>
        <el-table-column label="女生" align="center">
          <template slot-scope="{row}">
            <span>{{ row.girls }} </span>
          </template>
        </el-table-column>
        <el-table-column label="教学管理得分"  align="left" v-if="listQuery.examType === 'jw'"  prop="socre"  sortable="custom" show-overflow-tooltip>
            <template v-slot="{ row }">
              <div v-if="row.id === editRowKey">
                <el-row  style="display: flex;align-items: center;">
                    <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                    <el-col :span="10" :offset="1">
                      <PermissionButton
                        menu-no="_views_student_classExam_editScore"
                        type="text"
                        @click="saveRow(row)"
                      >
                        <el-icon name="check" />
                      </PermissionButton>
                      <PermissionButton
                        menu-no="_views_student_classExam_editScore"
                        type="text"
                        @click="cancelRow(row)"
                      >
                        <el-icon name="close" />
                      </PermissionButton>
                    </el-col>
                </el-row>
              </div>
              <el-row v-else style="display: flex;align-items: center;">
                <el-col :span="13">{{ row.socre }}</el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore"
                    type="text"
                    @click="editRow(row)"
                  >
                    <el-icon name="edit" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </template>
        </el-table-column>
        <el-table-column label="财产破坏打分" align="center" v-if="listQuery.examType === 'cc'"   prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore1"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore1"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore1"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="常规考核" align="center" v-if="listQuery.examType === 'cg'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore2"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore2"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore2"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="纠察打分" align="center" v-if="listQuery.examType === 'jc'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore3"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore3"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore3"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="值周考核打分" align="center" v-if="listQuery.examType === 'zz'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore4"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore4"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore4"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="寝室管理打分" align="center" v-if="listQuery.examType === 'qs'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore5"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore5"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore5"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="日常规范打分" align="center" v-if="listQuery.examType === 'rc'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore6"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore6"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore6"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="卫生打分" align="center" v-if="listQuery.examType === 'ws'"  prop="socre" sortable="custom" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div v-if="row.id === editRowKey">
              <el-row  style="display: flex;align-items: center;">
                <el-col :span="13"><el-input type="number" v-model="row.socre" /></el-col>
                <el-col :span="10" :offset="1">
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore7"
                    type="text"
                    @click="saveRow(row)"
                  >
                    <el-icon name="check" />
                  </PermissionButton>
                  <PermissionButton
                    menu-no="_views_student_classExam_editScore7"
                    type="text"
                    @click="cancelRow(row)"
                  >
                    <el-icon name="close" />
                  </PermissionButton>
                </el-col>
              </el-row>
            </div>
            <el-row v-else style="display: flex;align-items: center;">
              <el-col :span="13">{{ row.socre }}</el-col>
              <el-col :span="10" :offset="1">
                <PermissionButton
                  menu-no="_views_student_classExam_editScore7"
                  type="text"
                  @click="editRow(row)"
                >
                  <el-icon name="edit" />
                </PermissionButton>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
import YPageListLayout from '@/components/YPageListLayout'
import Breadcrumb from '@/components/Breadcrumb'
import PermissionButton from '@/components/PermissionButton/PermissionButton'
import excelImport from '@/components/excelImport.vue'

export default {
  name: 'ViewsRecruitPlanList',
  components: {
    Breadcrumb,
    YPageListLayout,
    PermissionButton,
    excelImport
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
      editRowKey: null,
      opt: [
        {
          key: '',
          label: '全部'
        },{
        key: true,
        label: '是'
      }, {
        key: false,
        label: '否'
      }],
      grantType: [  {
        key: '',
        label: '全部'
      },{
        key: 1,
        label: '奖学金'
      }, {
        key: 2,
        label: '助学金'
      }],
      statisticsInfo:{},
      specialty: [],
      gradeInfo: [],
      majorInfo:[],
      tableKey: 0,
      pageData: { },
      total: 0,
      listLoading: false,
      listQuery: {
        descs: 'id',
        examType: ''
      },
      pagePara: {
        current: 0,
        size: 10
      },
      termOptions: [],
      yearsOptions: [],
      classInfo:[],
      flag:''
    }
  },
  created() {
    const that = this
    that.listQuery.examType = this.$route.path.split('/').pop();
    that.flag = '/classExam/importExcel?examType=' +  that.listQuery.examType
    that.getList()
    that.getGradeList()
    this.getSpecialtyList()
    that.getStatistics()
    that.getTerm()
  },
  methods: {
    editRow(row) {
      if (this.editRowKey) {
        this.$message.warning('请先保存其他列改动！');
        return;
      }
      this.editRowKey = row.id;

    },
    saveRow(row) {
      let editForm = {
        examType: this.listQuery.examType,
        id: row.id,
        socre: row.socre
      }
          this.$api.classExam.editScore(editForm).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '编辑分数成功',
                type: 'success',
                duration: 2000
              });
              this.editRowKey = null;
              this.getList();
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          }).catch(_ => this.loading = false);
    },
    cancelRow() {
      this.editRowKey = null;
    },
    sortTable(val){
      console.log(val)
      this.listQuery.descs = val.descs
      this.listQuery.ascs = val.ascs
      this.getList()
    },
    getTerm() {
      this.$api.dormitoryCheck.terms().then(res => {
        this.termOptions = res.data
      })
      this.$api.dormitoryCheck.years().then(res => {
        this.yearsOptions = res.data
      })
    },
    downloadTemplate() {
      this.$utils.exportUtil('/classExam/download/importTemplate', {examType:this.listQuery.examType}, '导出模板')
    },
    getStatistics() {
      let that = this
      that.$api.statistics.getStatistics('/grant/pageStaics', { ...that.listQuery }).then(data => {
        that.loading = false
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
    getGradeList() {
      const that = this
      that.$api.baseInfo.getGradeList().then(data => {
        that.loading = false
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
        that.loading = false
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
        gradeId: that.listQuery.administrativeGradeId,
        specialtyId: that.listQuery.administrativeSpecialtyId
      }).then(data => {
        that.loading = false
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
    resetSearch() {
      this.listQuery = { descs: 'id' }
      this.listQuery.examType = this.$route.path.split('/').pop();
      this.getList()
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
          this.$api.classExam.delete(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
              this.getStatistics()
            }
          })
        })
        .catch(err => { console.error(err) })
    },
    getList() {
      const that = this
      this.listLoading = true
      this.$api.classExam.listDetail({ ...that.listQuery, ...that.pagePara }).then(res => {
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
