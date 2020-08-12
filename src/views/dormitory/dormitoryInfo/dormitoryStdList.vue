<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" style="margin-left: 0px;" round type="primary" @click="handleCreate">
          新增学生
        </el-button>
      </template>
      <template slot="right">
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
        <el-table-column label="床位号" prop="bedNo" align="center" width="150">
          <template slot-scope="{row}">
            {{ row.bedNo }}
          </template>
        </el-table-column>
        <el-table-column label="学号" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studyCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.gradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班级" width="80px">
          <template slot-scope="{row}">
            <span>{{ row.clbumName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班主任" align="center" width="95">
          <template slot-scope="{row}">
            <span>{{ row.teacherName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.teacherMobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" round size="mini" @click="handleUpdate(row)">
              调换
            </el-button>
            <el-button round v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="宿舍编号：">
          <el-input v-model="dormitoryDetail.code" v-if="dialogStatus=='create'" class="filter-item" disabled/>
          <el-input v-model="dormitoryDetail.code" v-else @blur="changeDo" class="filter-item"/>

        </el-form-item>
        <!--  <el-form-item label="Date" prop="timestamp">
            <el-date-picker v-model="temp.timestamp"  style="float: left;" type="datetime" placeholder="Please pick a date" />
          </el-form-item>-->
        <el-form-item label="宿舍类型：">
          <el-input v-model="dormitoryDetail.cate" v-if="dialogStatus=='create'" class="filter-item" disabled/>
          <el-input v-model="bedInfo.cate" v-else class="filter-item" disabled/>
        </el-form-item>
        <el-form-item label="宿舍负责人：">
          <el-input v-model="managerName" v-if="dialogStatus=='create'" class="filter-item" disabled/>
          <el-input v-model="bedInfo.teacherName" v-else class="filter-item" disabled/>
        </el-form-item>
        <el-form-item label="选择床位：" prop="importance" v-if="dialogStatus=='create'">
          <el-checkbox-group v-model="importance" style="float: left;">
            <el-checkbox :label="item" :value="item" v-for="item in bedInfo1"></el-checkbox>
          </el-checkbox-group>

        </el-form-item>
        <el-form-item label="选择学生：" v-if="dialogStatus=='create'">
          <div style="white-space: nowrap">
            <el-select v-model="listQuery.schoolGradeId" @change="getClbumList" placeholder="年级" clearable
                       style="margin-left:10px;width: 100px" class="filter-item">
              <el-option v-for="item in  classInfo" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <el-select v-model="listQuery.schoolSpecialtyId" @change="getClbumList" placeholder="专业（根据年级加载）" clearable
                       class="filter-item" style=" width: 200px">
              <el-option v-for="item in  majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <el-select v-model="listQuery.schoolClbumId" placeholder="班级（根据班级加载）" @change="getStdNoBedList" clearable
                       class="filter-item" style="width: 200px">
              <el-option key="0" label="全部班级" value="0"/>
              <el-option v-for="item in  gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item style="width: 800px" v-if="dialogStatus=='create'">
          <el-checkbox-group v-model="beds" style="float: left;">
            <el-checkbox :label="item.id" v-for="item in noBedStd">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="床位：" v-if="dialogStatus!='create'">
          <el-select v-model="desBed" placeholder="床位" style="float: left;" class="filter-item">
            <el-option :label="item.studentName" :value="item.bedNo" v-for="item in bedInfo.beds"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>


</template>
<script>
  import Pagination from '@/components/Pagination'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Pagination,
      Breadcrumb,
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
        detailNew: {},
        bedInfo: {},
        bedInfo1: [],
        importance: [],
        beds: [],
        displayTime: '',
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: true,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          dormitoryId: 0,
          descs: 'id',
        },
        source: {},
        desBed: {},
        managerName: '',
        dormitoryDetail: {},
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        noBedStd: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          remark: '',
          title: 1,
          type: '',
          status: '11111',
          timestamp: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '宿舍人员调换',
          create: '新增学生'
        },
        rules: {
          type: [{
            required: true,
            message: '请选择床位',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择学生',
            trigger: 'blur'
          }],
        },
      }
    },
    created() {
      let that = this
      that.listQuery.dormitoryId = that.$route.query.id
      that.managerName = that.$route.query.managerName
      that.getList()
      that.getGradeList()//赛选框年级
      that.getSpecialtyList()
    },
    methods: {
      getDetail() {
        let that = this
        that.bedInfo1 = []
        that.$api.dormitory.getDetail(that.listQuery.dormitoryId).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.dormitoryDetail = data.data
            let tempBed = []
            for (let i = 0; i < that.dormitoryDetail.capacity; i++) {
              tempBed.push((i + 1) + '床')
            }
            tempBed.forEach(function (temp) {
              let add = true
              that.pageData.records.forEach(function (item) {
                if (item.bedNo === temp) {
                  add = false
                }
              })

              if (add) {
                that.bedInfo1.push(temp)
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGradeList() {
        let that = this
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getSpecialtyList() {
        let that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.majorInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getClbumList() {
        let that = this
        that.$api.baseInfo.getClbumList({
          gradeId: that.listQuery.schoolGradeId,
          specialtyId: that.listQuery.schoolSpecialtyId
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.gradeInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getStdNoBedList() {
        let that = this
        let param = {}
        if (that.listQuery.schoolClbumId > 0) {
          param.clbumId = that.listQuery.schoolClbumId
        } else {
          param = {}
        }
        that.$api.student.getStdNoBedList({ ...param }).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.noBedStd = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      resetTemp() {
        let that = this
        that.listQuery.schoolGradeId = ''
        that.listQuery.schoolSpecialtyId = ''
        that.listQuery.schoolClbumId = ''
        that.noBedStd = []
        that.importance = []
      },
      handleCreate() {
        let that = this
        that.resetTemp()
        that.getDetail()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        let that = this
        if (this.importance.length == 0) {
          this.$notify({
            title: '失败',
            message: '请选择床位',
            type: 'false',
            duration: 2000
          })
          return
        }

        if (this.beds.length == 0) {
          this.$notify({
            title: '失败',
            message: '请选择学生',
            type: 'false',
            duration: 2000
          })
          return
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.importance.length != this.beds.length) {
              this.$notify({
                title: '失败',
                message: '床位数和学生数必须相等',
                type: 'false',
                duration: 2000
              })
              return
            }
            let addInfo = []
            for (let i = 0; i < this.importance.length; i++) {
              addInfo.push({
                dormitoryId: that.listQuery.dormitoryId,
                bedNo: that.importance[i],
                studentId: (that.beds[i])
              })
            }

            that.$api.dormitory.addDormitoryBed(addInfo).then(data => {
              that.loading = false
              if (data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '新增人员成功',
                  type: 'success',
                  duration: 2000
                })

                this.importance = []
                this.beds = []
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })

            this.dialogFormVisible = false

          }
        })
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
        let that = this
        that.source = row
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true

        that.changeDo()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      changeDo() {
        //// 根据宿舍编号查询出床位列表
        let that = this
        let ss = that.dormitoryDetail.code
        that.$api.dormitory.dormitoryBedState({ code: that.dormitoryDetail.code }).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.bedInfo = data.data
            let i = 0
            if (that.bedInfo.beds != null) {
              that.bedInfo.beds.forEach(function (item) {
                if (item.studentId) {
                  item.studentName = item.bedNo + '-' + item.studentName + (item.gradeName == null ? '' : item.gradeName) + (item.clbumName == null ? '' : item.clbumName)
                }

                if (!item.id) {
                  item.id = i
                  i++
                }
              })
            } else {
              that.bedInfo = {}
              that.bedInfo.beds = []
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })

        that.detailNew = { id: 5 }
      },
      updateData() {
        let that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

            console.log(that.bedInfo)
            let change = {
              source: {
                id: that.source.id,
                dormitoryId: that.listQuery.dormitoryId,
                bedNo: that.source.bedNo,
                studentId: that.source.studentId
              },
              target: {
                dormitoryId: that.bedInfo.id,
                bedNo: this.desBed,
                studentId: that.bedInfo.beds.find(m => m.bedNo === this.desBed).studentId,
                id: that.bedInfo.beds.find(m => m.bedNo === this.desBed).id
              }
            }

            that.$api.dormitory.exchangeDormitoryBed({ ...change }).then(data => {
              that.loading = false
              if (data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '调换床位成功',
                  type: 'success',
                  duration: 2000
                })

                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
            this.dialogFormVisible = false
          }
        })
      },
      handleDelete(row, index) {
        let that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {

            that.$api.dormitory.deleteDormitoryBed({ id: row.id }).then(data => {
              that.loading = false
              if (data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '删除床位成功',
                  type: 'success',
                  duration: 2000
                })

                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          })
          .catch(err => { console.error(err) })

      },
      getList() {
        let that = this
        that.$api.dormitory.getDormitoryBedPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.pageData = data.data
            this.total = data.data.total

            that.getDetail()
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
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
  }
</style>
