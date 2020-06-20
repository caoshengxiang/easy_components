<template>
  <div class="app-container">
    <div style="width: 100%;float: right;border-bottom:1px solid #e4ecf9;">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    </div>
    <div class="filter-container" style=";margin-top: 10px;float: left">
      <el-button class="filter-item" style="margin-left: 0px;"  type="primary" @click="handleCreate">
        新增扣分记录
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="学号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTimeNew('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="150px"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="扣分类型" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content_short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分数"  width="110px" align="center">
        <template slot-scope="{row}">
          <span >{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="扣分时间" width="80px">
        <template slot-scope="{row}">
          <span >{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="扣分原因" align="center" width="95">
        <template slot-scope="{row}">
          <span >{{ row.content2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">

        <el-form-item label="扣除原因：" >
          <el-select v-model="temp.timestamp" class="filter-item" style="float: left;" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name" :value="item.key"  />
          </el-select>
        </el-form-item>
        <el-form-item label="扣除分数：" prop="status">
          <el-input v-model="temp.status"  class="filter-item"/>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center" >
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
  export default {
    name: 'ComplexTable',
    components: {Breadcrumb,Pagination},
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
        calendarTypeOptions1: [ { key: 1, display_name: '不出早操' }, { key: 2, display_name: '进女生宿舍' }],
        displayTime:'',
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          sort: '+id',
          description:'',
          displayTime:''
        },
        gradeInfo: [{label:"全部",value:0},{label:"一年级",value:1}, {label:"二年级",value:2}, {label:"三年级",value:3}],
        classInfo:[{label:"全部",value:0},{label:"一班",value:1}, {label:"二班",value:2}, {label:"三班",value:3}],
        majorInfo:[{label:"全部",value:0},{label:"数学",value:1}, {label:"软件",value:2}, {label:"英语",value:3}],
        IsFull:[{label:"全部",value:0},{label:"未住",value:1}, {label:"未住满",value:2}, {label:"已住满",value:3}],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          remark: '',
          title: 1,
          type: '',
          status: '',
          timestamp:''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '修改扣分记录',
          create: '新增扣分记录'
        },
        rules: {
          type: [{ required: true, message: '请填写宿舍编号', trigger: 'change' }],
          status: [{ required: true, message: '请填写宿舍联系人', trigger: 'blur' }],
        },
      }
    },
    created(){
      let that = this;
      console.log(this.$route.query.id)
      that.getList();
    },
    methods:{
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })}
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
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDelete(row, index) {
        let that = this;
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            that.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })

      },
      getList(){
        let that = this;
        console.log(that.listQuery);
        that.list =[{
          "id": 21,
          "timestamp": 100001,
          "title": "杨大帅",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 22,
          "timestamp":  1000011,
          "title": "陈晓",
          "content_short": '数学',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 23,
          "timestamp": 1000012,
          "title": "易中天",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 24,
          "timestamp": 1000013,
          "title": "刘德华",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 25,
          "timestamp": 1000041,
          "title": "刘亦菲",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }]

        that.listLoading = false;
      },
      handleDelete(row, index) {
        let that = this;
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
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
