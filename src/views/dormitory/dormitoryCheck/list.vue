<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
      <el-button class="filter-item download-button" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="handleCreate">
        导出扣分记录
      </el-button>
      <el-button class="filter-item download-button"   type="primary" icon="el-icon-edit" @click="handleCreate">
        导出宿舍考核
      </el-button>
      <el-button class="filter-item download-button"   type="primary"  icon="el-icon-edit" @click="handleCreate">
        导出当天宿舍得分
      </el-button>
    </div>
    <div class="filter-container" style="float: left;margin-top: 10px;">
      <el-button class="filter-item" style="margin-left: 0px;"  type="primary" icon="el-icon-edit" @click="handleCreate">
        新增周宿舍考核
      </el-button>
      <el-select v-model="listQuery.grade" placeholder="年级" clearable style="margin-left:20px;width: 100px" class="filter-item">
        <el-option v-for="item in  gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.major" placeholder="专业（根据年级加载）" clearable class="filter-item" style="margin-left: 20px; width: 200px">
        <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.class" placeholder="班级（根据班级加载）" clearable class="filter-item" style="margin-left: 20px; width: 200px">
      <el-option v-for="item in classInfo" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
      <el-select v-model="listQuery.full" placeholder="年份" clearable class="filter-item" style="margin-left: 20px;width: 100px">
        <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.full" placeholder="学期" clearable class="filter-item" style="margin-left: 20px;width: 100px">
        <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.full" placeholder="周数" clearable class="filter-item" style="margin-left: 20px;width: 100px">
        <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      </div>
    <div class="filter-container" style="margin-top: 10px;float: right">
      <el-input v-model="listQuery.description" placeholder="宿舍编号或者负责人" prefix-icon="el-icon-search"  style="margin-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="getList">
        搜索
      </el-button>

    </div>

    <el-table

      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="姓名" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="{row}">
          <span >
                                              {{ row.content2 }}
                  </span>
        </template>
      </el-table-column>
      <el-table-column label="学期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTimeNew('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="周数" min-width="150px"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宿舍编号" width="110px" align="center">
        <template slot-scope="{row}">
            <span  class="link-type">
          <router-link tag="a" :to="{path:'/dormitory/userManage',query:{id: row.id}}"
                       class="routerWork">{{ row.id }}
          </router-link>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="宿舍类别"  width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宿舍位置" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="容纳人数" align="center" width="95">
        <template slot-scope="{row}">
          <span >{{ row.content2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入住人数" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本周得分" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="年份：" prop="type">
          <el-input v-model="temp.type"  class="filter-item"/>

        </el-form-item>

        <el-form-item label="学期：">
          <el-select v-model="temp.timestamp" class="filter-item" style="float: left;" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name" :value="item.key"  />
          </el-select>

        </el-form-item>
        <el-form-item label="考核周数：" prop="week">
          <el-input v-model="temp.week"  class="filter-item"/>

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
        calendarTypeOptions1: [
          { key: 1, display_name: '春季' },
          { key: 2, display_name: '秋季' }
        ],
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
          timestamp:'',
          week:''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑宿舍',
          create: '新增宿舍周考核'
        },
        rules: {
          type: [{ required: true, message: '请填写年份', trigger: 'change' }],
          week: [{ required: true, message: '请填写考核周数', trigger: 'blur' }],
        },
      }
    },
    created(){
      let that = this;
      that.getList();
    },
    methods:{
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: 1,
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
      getList(){
        let that = this;
        console.log(that.listQuery);
        that.list =[{
          "id": 21,
          "timestamp": '男生宿舍',
          "author": "Karen",
          "reviewer": "Frank",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 8,
          "content": 8,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 22,
          "timestamp": '男生宿舍',
          "author": "Linda",
          "reviewer": "Edward",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 7,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 23,
          "timestamp": '男生宿舍',
          "author": "Patricia",
          "reviewer": "Steven",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 6,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 24,
          "timestamp": '男生宿舍',
          "author": "Shirley",
          "reviewer": "Brian",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 5,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 25,
          "timestamp": '男生宿舍',
          "author": "Richard",
          "reviewer": "Cynthia",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 9,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 26,
          "timestamp": '男生宿舍',
          "author": "Thomas",
          "reviewer": "Edward",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 7,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 27,
          "timestamp": '男生宿舍',
          "author": "Mary",
          "reviewer": "William",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 6,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 28,
          "timestamp": '男生宿舍',
          "author": "Angela",
          "reviewer": "Laura",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 8,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 29,
          "timestamp": '男生宿舍',
          "author": "Steven",
          "reviewer": "Cynthia",
          "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
          "content_short": 10,
          "content": 7,
          "content1": '未住满',
          "content2": '杨再林',
          "content3": '15196637504'
        },
          {
            "id": 30,
            "timestamp": '男生宿舍',
            "author": "David",
            "reviewer": "Margaret",
            "title": "成都市武侯大道一段园中园西区2栋三单元3楼7号",
            "content_short": 10,
            "content": 7,
            "content1": '未住满',
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
<style>
  .download-button{
    margin-bottom: 5px;margin-top: 5px;float: right
  }
</style>
