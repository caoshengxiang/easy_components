<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    </div>
    <div class="filter-container" style="margin-top: 10px;float: left">
      <el-button class="filter-item" style="margin-left: 0px;"  type="primary" icon="el-icon-edit" @click="handleAdd">
        新增建筑物
      </el-button>
      <el-select v-model="listQuery.importance" placeholder="部门" clearable style=" width: 200px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="filter-container" style="margin-top: 10px;float: right">
      <el-input v-model="listQuery.description" placeholder="建筑物名称" prefix-icon="el-icon-search"  style="margin-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="getList">
        搜索
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
      <el-table-column label="校区" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="{row}">
          <span >
                                              {{ row.content2 }}
                  </span>
        </template>
      </el-table-column>
      <el-table-column label="建筑物名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTimeNew('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简写名称" min-width="150px"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建筑物地址" width="110px" align="center">
        <template slot-scope="{row}">
            <span >
         {{ row.id }}

            </span>
        </template>
      </el-table-column>
      <el-table-column label="建成年月"  width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用年限" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="status-col" width="200">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="detail(row.id)">
            编辑
          </el-button>
          <el-button type="primary" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import QRCode from 'qrcode';

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
        innerUrl:'../../../assets/ercode.png',
        productInnerQR:false,
        calendarTypeOptions1: [
          { key: 1, display_name: '春季' },
          { key: 2, display_name: '秋季' }
        ],
        displayTime:'',
        tableKey: 0,
        list: [
        ],
        total: 20,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          jiudu: undefined,
          sort: '+id',
          description:'',
          displayTime:'',
          qrname:'二维码名称'
        },
        gradeInfo: [{label:"全部",value:0},{label:"一年级",value:1}, {label:"二年级",value:2}, {label:"三年级",value:3}],
        classInfo:[{label:"全部",value:0},{label:"一班",value:1}, {label:"二班",value:2}, {label:"三班",value:3}],
        majorInfo:[{label:"全部",value:0},{label:"数学",value:1}, {label:"软件",value:2}, {label:"英语",value:3}],
        IsFull:[{label:"全部",value:0},{label:"按行政班级",value:1}, {label:"按学籍班级",value:2}],
        jiudu:[{label:"全部",value:0},{label:"在读",value:1}, {label:"离校",value:2}],
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
      detail(id){
        let that =this;
        that.$router.push({
          path:"/baseinfo/buildingdetail",
          query: {
            id:id,
            type: "detail"
          }
        })
      },
      downloadCodeImg(row){
        QRCode.toDataURL(this.innerUrl, {
          width: 390
        }, function(err, url) {
          let a = document.createElement('a');
          a.href = url;
          a.download = row.qrname +".png";
          a.click();
        });
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: 1,
          title: 1,
          status: '',
          type: '',
          qrname:'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
          "content3": '15196637504',
          'qrname':'二维码名称'
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
            "content3": '15196637504',
            'qrname':'二维码名称'
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
  .qcode-wrap {
    display: flex;

  .qcode-item {
    width: 200px;
    height: 200px;

  }
  }
</style>
