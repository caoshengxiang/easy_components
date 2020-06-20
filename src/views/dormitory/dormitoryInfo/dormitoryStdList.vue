<template>


  <div class="app-container">
    <div style="width: 100%;float: right;border-bottom:1px solid #e4ecf9;">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 5px;margin-top: 5px;float: right"  icon="el-icon-edit" @click="handleCreate">
        导入模板下载
      </el-button>
      <el-button class="filter-item" style="margin-bottom: 5px;margin-top: 5px;float: right"  type="primary" icon="el-icon-edit" @click="handleCreate">
        导入
      </el-button>
    </div>
    <div class="filter-container" style="float: left;margin-top: 10px;">
      <el-button class="filter-item"  style="margin-left: 0px;"  type="primary" @click="handleCreate">
        新增学生
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
      <el-table-column label="床位号" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="{row}">
          <span  class="link-type">{{ row.id }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="专业" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content_short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级"  width="110px" align="center">
        <template slot-scope="{row}">
          <span >{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="80px">
        <template slot-scope="{row}">
          <span >{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center" width="95">
        <template slot-scope="{row}">
          <span >{{ row.content2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            调换
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
        <el-form-item label="宿舍编号：">
          <el-input v-model="temp.status" v-if="dialogStatus=='create'"   class="filter-item" disabled/>
          <el-input v-model="temp.status" v-else  class="filter-item" />

        </el-form-item>
        <!--  <el-form-item label="Date" prop="timestamp">
            <el-date-picker v-model="temp.timestamp"  style="float: left;" type="datetime" placeholder="Please pick a date" />
          </el-form-item>-->
        <el-form-item label="宿舍类型：" >
          <el-input v-model="temp.status"   class="filter-item" disabled/>
        </el-form-item>
        <el-form-item label="宿舍负责人：" >
          <el-input v-model="temp.status"   class="filter-item" disabled/>
        </el-form-item>
        <el-form-item label="选择床位：" prop="type" v-if="dialogStatus=='create'">
          <el-radio-group v-model="temp.type">
            <el-radio :label="3">1床</el-radio>
            <el-radio :label="6">2床</el-radio>
            <el-radio :label="9">3床</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择学生："  v-if="dialogStatus=='create'">
          <div style="white-space: nowrap">   <el-select v-model="listQuery.grade" placeholder="年级" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in  gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
            <el-select v-model="listQuery.major" placeholder="专业（根据年级加载）" clearable class="filter-item" style="margin-left: 20px; width: 200px">
              <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="listQuery.class" placeholder="班级（根据班级加载）" clearable class="filter-item" style="margin-left: 20px; width: 200px">
              <el-option v-for="item in classInfo" :key="item.value" :label="item.label" :value="item.value" />
            </el-select></div>
        </el-form-item>
        <el-form-item   style="width: 800px" v-if="dialogStatus=='create'">
          <el-checkbox-group v-model="importance"  style="float: left;">
            <el-checkbox label="刘亦菲"></el-checkbox>
            <el-checkbox label="汤唯"></el-checkbox>
            <el-checkbox label="迪丽热巴"></el-checkbox>
            <el-checkbox label="高圆圆" ></el-checkbox>
            <el-checkbox label="杨大帅" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="床位："  v-if="dialogStatus!='create'">
          <el-select v-model="listQuery.bedInfo" placeholder="床位"  style="float: left;" class="filter-item">
            <el-option v-for="item in  bedInfo" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
    components: {Pagination,Breadcrumb},
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
        bedInfo:[{label:"1号床-刘大大",value:0},{label:"二号床-李大大",value:1}, {label:"三号床",value:2}, {label:"四号床",value:3}],
        importance:[],
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
          displayTime:'',
          bedInfo:''
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
          status: '11111',
          timestamp:''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '宿舍人员调换',
          create: '新增宿舍'
        },
        rules: {
          type: [{ required: true, message: '请选择床位', trigger: 'change' }],
          status: [{ required: true, message: '请选择学生', trigger: 'blur' }],
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
          timestamp: new Date(),
          title: 1,
          status: '11111',
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
