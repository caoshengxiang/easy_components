<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" style="margin-left: 0px;" type="primary" @click="handleCreate">
          新增扣分记录
        </el-button>
      </template>
      <template slot="right"></template>
      <parentTable
        v-loading="listLoading"
        :data="pageData.records"
        style="width: 100%;"
        slot="table"
      >
        <el-table-column label="学号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studyCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣分类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣分时间">
          <template slot-scope="{row}">
            <span>{{ row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣分原因" align="center">
          <template slot-scope="{row}">
            <span>{{ row.reason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
<!--            <el-button type="primary" @click="handleUpdate(row)">-->
<!--              编辑-->
<!--            </el-button>-->
            <el-button v-if="row.status!='deleted'" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </parentTable>

    </y-page-list-layout>
    <el-dialog custom-class="dialogClass" :close-on-click-modal="false" :title="dialogTitle"
               :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px"
               style="width: 400px; margin-left:50px;"
      >

        <el-form-item label="考核类型：" prop="type">
          <el-select disabled v-model="temp.type" class="filter-item" style="float: left;" placeholder="请选择" @change="getReason">
            <el-option label="内务考核" value="内务考核"/>
            <el-option label="纪律考核" value="纪律考核"/>
          </el-select>
        </el-form-item>
        <el-form-item label="扣除原因：" prop="reason">
          <el-select v-model="temp.reason" class="filter-item" style="float: left;" placeholder="请选择"
                     @change="reasonChange"
          >
            <el-option v-for="item in reasonOptions" :key="item.name" :label="item.name"
                       :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="扣除分数：" prop="score">
          <el-input v-model.number="temp.score" type="number" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="deductionSave" :loading="deductionSaveLoading">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
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
      var checkScore = (rule, value, callback) => {
        if (!value && value !== 0) {
          return callback(new Error('请填写扣除分数'))
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value <= 0) {
            callback(new Error('扣除分数必须大于0'))
          } else {
            callback()
          }
        }
      }
      return {
        listLoading: false,
        pageData: { records: [] },
        pagePara: {
          current: 1,
          size: 10
        },
        listQuery: {
          descs: 'id',
        },
        /*dialog*/
        dialogFormVisible: false,
        dialogTitle: '',
        temp: {
          dormitoryWeeklyAssessmentId: null,
          type: null,
          score: '',
          reason: ''
        },
        row: {},
        rules: {
          reason: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择原因',
            trigger: 'change'
          }],
          score: [
            {
              required: true,
              message: '请填写扣除分数',
              trigger: 'change'
            },
            {
              validator: checkScore,
              trigger: 'blur'
            }
          ],
        },
        reasonOptions: [],
        deductionSaveLoading: false,
        /*dialog*/
      }
    },
    created() {
      let that = this
      console.log(this.$route.query.id)
      that.getList()
    },
    methods: {
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: '',
          title: 1,
          status: '',
          type: ''
        }
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.dormitoryCheck.studentRocords({
          ...that.pagePara, ...that.listQuery,
          dormitoryStuWeeklyAssessmentId: this.$route.query.id,
          // id: this.$route.query.id,
        }).then(res => {
          this.pageData = res.data
          that.listLoading = false
        }).catch(() => {
          that.listLoading = false
        })
      },
      handleCreate(row) {
        this.dialogFormVisible = true
        this.temp.type = this.$route.query.type
        this.getReason(this.temp.type)
        this.row = row
      },
      getReason(val) {
        let code = ''
        if (val === '内务考核') {
          code = 'dormitoryCheckReason'
        } else {
          code = 'dormitoryCheckReasonDiscipline'
        }
        this.temp.reason = ''
        this.$api.dictData.getByCode({ code: code }).then(res => {
          this.reasonOptions = res.data
        })
      },
      reasonChange(val) {
        if (val) {
          this.reasonOptions.forEach(item => {
            if (item.name === val && !isNaN(parseInt(item.remark, 10))) {
              this.temp.score = parseInt(item.remark, 10)
            }
          })
        } else {
          this.temp.score = ''
        }
      },
      deductionSave() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.deductionSaveLoading = true
            this.temp.dormitoryStuWeeklyAssessmentId = this.$route.query.id
            // this.temp.id = this.$route.query.id
            this.$api.dormitoryCheck.studentRocordsAdd(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '扣分成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
              this.deductionSaveLoading = false
            }).catch(() => { this.deductionSaveLoading = false })
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
            this.$api.dormitoryCheck.studentRocordsDel(row.id)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
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
