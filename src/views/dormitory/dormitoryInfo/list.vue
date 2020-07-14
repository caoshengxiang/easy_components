<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="analysis">
      <div class="menu-2-box">
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <div class="text">
          <div class="analysis-text">100:80</div>
          <div class="analysis-text-small">当前床位总数男女比例</div>
        </div>
        </div>
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <div class="text">
          <div class="analysis-text">11：9</div>
          <div class="analysis-text-small">当前入住总数男女比例</div>
        </div>
        </div>
          <div
            :key="index"
            class="menu-2-item hvr-underline-from-center"
          >
            <i class="easy-icon easy-icon-avatar" /> <div class="text">
            <div class="analysis-text">11：9</div>
            <div class="analysis-text-small">当前未满寝室数男女比例</div>
          </div>
          </div>
            <div
              :key="index"
              class="menu-2-item hvr-underline-from-center"
            >
              <i class="easy-icon easy-icon-avatar" /> <div class="text">
              <div class="analysis-text">11：9</div>
              <div class="analysis-text-small">当前未满寝室数男女比例</div>
            </div>
            </div>
              <div
                :key="index"
                class="menu-2-item hvr-underline-from-center"
              >
                <i class="easy-icon easy-icon-avatar" /> <div class="text">
                <div class="analysis-text">11：9</div>
                <div class="analysis-text-small">当前空寝室数男女比例</div>
              </div>
              </div>
            </div>
          </div>
          <div class="filter-main-div">

            <div class="filter-container" style="width:60%; float: left;">
              <el-button class="filter-item" style="margin-left:10px;"  type="primary" @click="handleCreate">
                新增宿舍
              </el-button>
              <el-select v-model="listQuery.schoolGradeId" placeholder="年级" clearable style="margin-left:10px;width: 100px" class="filter-item">
                <el-option v-for="item in  classInfo" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <el-select v-model="listQuery.schoolSpecialtyId" placeholder="专业（根据年级加载）" clearable class="filter-item" style=" width: 200px">
                <el-option v-for="item in  majorInfo" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <el-select v-model="listQuery.schoolClbumId" placeholder="班级（根据班级加载）" clearable class="filter-item" style="width: 200px">
                <el-option v-for="item in  gradeInfo" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <el-select v-model="listQuery.state" placeholder="是否住满" clearable class="filter-item" style="width: 100px">
                <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-input v-model="listQuery.keyword" placeholder="宿舍编号或者负责人" prefix-icon="el-icon-search"  style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </div>
            <div class="filter-container" style="width:40%;float: right;text-align: right">
              <el-button class="filter-item " type="primary" @click="getList">
                搜索
              </el-button>
              <el-button class="filter-item "  @click="handleCreate">
                导入模板下载
              </el-button>
              <el-button class="filter-item "  type="primary" style="margin-right: 10px"  @click="handleCreate">
                导入
              </el-button>
            </div>
          <div class="filter-container" style="float: left;margin-top: 10px;">


          </div>


          <el-table

            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            border
            fit
            highlight-current-row
            :header-cell-style="{backgroundColor:'#EFF1F6'}"
          >
            <el-table-column label="宿舍编号" prop="id" sortable="custom" align="center" width="150">
              <template slot-scope="{row}">
          <span  class="link-type"><router-link tag="a"  :to="{path:'/dormitory/userIndex',query:{id: row.id, parentMenuId: $route.query.parentMenuId}}"
                                                class="routerWork">{{ row.id }}
                  </router-link></span>
              </template>
            </el-table-column>
            <el-table-column label="宿舍类别" width="150px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.cate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="宿舍位置" min-width="150px"  align="center">
              <template slot-scope="{row}">
                <span>{{ row.location }}</span>
              </template>
            </el-table-column>
            <el-table-column label="容纳人数" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column label="入住人数"  width="110px" align="center">
              <template slot-scope="{row}">
                <span style="color:red;">{{ row.studentNum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="宿舍状态" width="80px">
              <template slot-scope="{row}">
                <span style="color:red;">{{ row.state == 1?'未入住':(row.state == 2?'未住满':'已住满') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人" align="center" width="95">
              <template slot-scope="{row}">
                <span >{{ row.managerName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" class-name="status-col" width="100">
              <template slot-scope="{row}">
                <span >{{ row.managerPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="编辑" align="center" width="230" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary"  style="border-radius:15px;"  size="mini" @click="handleUpdate(row)">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
              <el-form-item label="宿舍编号：" prop="code">
                <el-input v-model="temp.code"  class="filter-item"/>

              </el-form-item>
              <!--  <el-form-item label="Date" prop="timestamp">
                  <el-date-picker v-model="temp.timestamp"  style="float: left;" type="datetime" placeholder="Please pick a date" />
                </el-form-item>-->
              <el-form-item label="宿舍类型：" >
                <el-select v-model="temp.cate" class="filter-item" style="float: left; width: 100%" placeholder="请选择">
                  <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name" :value="item.key"  />
                </el-select>
              </el-form-item>
              <el-form-item label="宿舍负责人：" prop="managerId">
                <el-select v-model="temp.managerId" class="filter-item" style="float: left; width: 100%" placeholder="请选择">
                  <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id"  />
                </el-select>
              </el-form-item>
              <el-form-item label="宿舍位置：" >
                <el-input v-model="temp.location"  class="filter-item"/>

              </el-form-item>
              <el-form-item label="容纳人数：" >
                <el-input v-model="temp.capacity"  class="filter-item"/>

              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请填写备注" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center" >
              <el-button @click="dialogFormVisible = false"  style="border-radius:15px;" >
                取消
              </el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"  style="border-radius:15px;" >
                保存
              </el-button>
            </div>
          </el-dialog>

        </div>
        </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      Pagination},
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
          { key: 1, display_name: '男生宿舍' },
          { key: 2, display_name: '女生宿舍' }
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
        gradeInfo: [],
        classInfo:[],
        majorInfo:[],
        staff: [],
        IsFull:[{label:"全部",value:0},{label:"未入住",value:1}, {label:"未住满",value:2}, {label:"已住满",value:3}],
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
          update: '编辑宿舍',
          create: '新增宿舍'
        },
        rules: {
          code: [{ required: true, message: '请填写宿舍编号', trigger: 'change' }],
          managerId: [{ required: true, message: '请填写宿舍联系人', trigger: 'blur' }],
        },
      }
    },
    created(){
      let that = this;
      that.getList();
      that.getGradeList();//赛选框年级
      that.getSpecialtyList();
      that.getClbumList();
      that.getStaffList();
    },
    methods:{
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
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        let that = this
          that.$refs['dataForm'].validate((valid) => {
          if (valid) {
            that.$api.dormitory.addDormitory({...that.temp}).then(data => {
              that.loading = false;
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: "操作成功"
                })
                that.getList();
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })}
        })

        that.dialogFormVisible = false
        that.getList();
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
        let that = this;
        that.$api.dormitory.getDetail(row.id).then(data => {
          that.loading = false;
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
        let that = this
        that.$refs['dataForm'].validate((valid) => {
          if (valid) {
              that.$api.dormitory.editDormitory({...that.temp}).then(data => {
                that.loading = false;
                if (data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: "操作成功"
                  })
                  that.getList();
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
      getStaffList(){
        let that = this;
        that.$api.baseInfo.getStaffList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.staff = data.data.records
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getGradeList(){
        let that = this;
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.classInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getSpecialtyList(){
        let that = this;
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.majorInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getClbumList(){
        let that = this;
        that.$api.baseInfo.getClbumList().then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.gradeInfo = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false;
      },
      getList(){
        let that = this;
        that.$api.dormitory.getPage({...that.listQuery}).then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.list = data.data.records
            this.total = data.data.total
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
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
<style lang="scss" scoped>

  .analysis {
    background-color: white;
    margin-top: 50px;
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
