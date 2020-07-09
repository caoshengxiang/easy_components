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
          <i class="easy-icon easy-icon-avatar" /> <div class="text"><div class="analysis-text">12000</div>
          <div class="analysis-text-small">在读学生总数</div></div>
        </div>
        <div
          :key="index"
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <div class="text">
          <div class="analysis-text">11：9</div>
          <div class="analysis-text-small">在读学生男女比例</div>
        </div>
        </div>
      </div>

    </div>
    <div class="filter-main-div">
    <div class="filter-container" style="width:60%; float: left;">
      <el-select v-model="listQuery.grade" placeholder="年级" clearable style="margin-left:10px;width: 100px" class="filter-item">
        <el-option v-for="item in  gradeInfo" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.major" placeholder="专业（根据年级加载）" clearable class="filter-item" style=" width: 200px">
        <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.class" placeholder="班级（根据班级加载）" clearable class="filter-item" style="width: 200px">
      <el-option v-for="item in classInfo" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
      <el-select v-model="listQuery.full" placeholder="班级" clearable class="filter-item" style="width: 100px">
        <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.jiudu" placeholder="就读" clearable class="filter-item" style="width: 100px">
        <el-option v-for="item in jiudu" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.description" placeholder="宿舍编号或者负责人" prefix-icon="el-icon-search"  style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </div>
    <div class="filter-container" style="width:40%;float: right;text-align: right">

      <el-button class="filter-item"   type="primary" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item"   type="primary"  @click="handleCreate">
        学生信息模板下载
      </el-button>
      <el-button class="filter-item"  type="primary"   @click="handleCreate">
        学籍号模板下载
      </el-button>
      <el-button class="filter-item"   type="primary"  @click="handleCreate">
        更新学生信息
      </el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate">
        更新学籍号
      </el-button>
      <el-button class="filter-item"style="margin-right: 10px" type="primary"  @click="handleCreate">
        导出
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width:99%;margin-left: 10px"
      :header-cell-style="{backgroundColor:'#EFF1F6'}"
    >
      <el-table-column label="学号" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="{row}">
          <span >
                                              {{ row.id }}
                  </span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="150px"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" width="110px" align="center">
        <template slot-scope="{row}">
            <span  class="link-type">
          <router-link tag="a" :to="{path:'/baseinfo/detail',query:{id: row.id}}"
                       class="routerWork">{{ row.schoolSpecialtyName }}
          </router-link>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="年级"  width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.schoolGradeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行政班级" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.administrativeClbumName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学籍班级" align="center" width="95">
        <template slot-scope="{row}">
          <span >{{ row.schoolClbumName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就读方式" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.studyWay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生类型" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.studentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" class-name="status-col" width="100">
      <template slot-scope="{row}">
        <span >{{ row.homePhone }}</span>
      </template>
    </el-table-column>
      <el-table-column label="二维码" class-name="status-col" width="100">
      <template slot-scope="{row}">
                <span  class="link-type" @click="productInnerQR=true">查看</span>
      </template>
    </el-table-column>
      <el-table-column label="二维码下载" class-name="status-col" width="300">
        <template slot-scope="{row}">
          <el-button style="border-radius:15px;" type="primary" @click="downloadCodeImg(row)">
            下载
          </el-button>
          <el-button style="border-radius:15px;" type="primary" size="mini" @click="detail(row.id)">
            详情
          </el-button>
          <el-button style="border-radius:15px;" type="primary" size="mini" @click="detailInfo(row.id)">
            详情二
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </div>
    <el-dialog title="二维码" :visible.sync="productInnerQR" width="250px">
      <div class="qcode-wrap">
        <div class="qcode-item" v-loading="loading">
          <img style="width: 100%" src="../../../assets/ercode.png" />
        </div>
      </div>
    </el-dialog>
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
          current: 1,
          size: 10,
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
          path:"/baseinfo/detail",
          query: {
            id:id,
            type: "detail"
          }
        })
      },
      detailInfo(id){
        let that =this;
        that.$router.push({
          path:"/baseinfo/detailInfo",
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
        that.$api.student.getPage().then(data => {
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
