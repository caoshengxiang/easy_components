<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p7.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.total }}</span>人</div>
            <div class="analysis-text-small">在读学生总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p8.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.manRate }}:{{ statisticsInfo.womanRate }}</span>
            </div>
            <div class="analysis-text-small">在读学生男女比例</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <el-select
          v-model="listQuery.type"
          placeholder="查询类型"
          clearable
          class="filter-item"
          style="margin-left:10px;margin-bottom: 10px;width: 100px"
        >
          <el-option v-for="item in AllEnum.班级类型" :key="item" :label="item" :value="item"/>
        </el-select>

        <el-select
          v-model="administrativeGradeId"
          placeholder="请选择年级"
          clearable
          style="margin-left:10px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="administrativeSpecialtyId"
          placeholder="请选择专业"
          clearable
          class="filter-item"
          @change="getClbumList"
          style="margin-left:10px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="administrativeClbumId"
          placeholder="请选择班级"
          clearable
          class="filter-item"
          style="margin-left:10px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.studentType"
          placeholder="学生类型"
          clearable
          class="filter-item"
          style="margin-left:10px;  width: 80px;margin-bottom: 10px;"
        >
          <el-option v-for="item in AllEnum.学生类型" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-select
          v-model="listQuery.state"
          placeholder="当前状态"
          clearable
          class="filter-item"
          style="margin-left:10px;  width: 80px;margin-bottom: 10px;"
        >
          <el-option v-for="item in AllEnum.当前状态" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-input
          v-model="listQuery.dormitoryCode"
          placeholder="宿舍编号"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 120px;margin-bottom: 10px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.keyword"
          placeholder="学号或者姓名"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 120px;margin-bottom: 10px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning"  @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right">
        <!--        <el-button class="filter-item"          size="mini" round type="primary" @click="downloadTemplate">-->
        <!--          学生信息模板下载-->
        <!--        </el-button>-->
        <!--        <el-button class="filter-item"          size="mini" round type="primary" @click="downloadCodeTemplate">-->
        <!--          学籍号模板下载-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_userinfo_list_importInfo"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="学生信息模板下载"
          @click="downloadTemplate"
        />
        <PermissionButton
          menu-no="_views_baseinfo_userinfo_list_importInfo"
          class-name="filter-item"
          round
          type="text"
          name=""
          style="padding: 0;margin-bottom: 10px;"
        >
          <excelImport
            ref="uploadControl"
            flag="student/importExcel"
            :style-type="1"
            title="更新学生信息"
            @fath="getList"
          />
        </PermissionButton>

        <PermissionButton
          menu-no="_views_baseinfo_userinfo_list_stuId"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="学籍号模板下载"
          @click="downloadCodeTemplate"
        />
        <PermissionButton
          menu-no="_views_baseinfo_userinfo_list_stuId"
          class-name="filter-item"
          type="text"
          round
          name="更新学籍号"
          style="padding: 0;margin-bottom: 10px;"
        >
          <excelImport
            ref="uploadControl"
            flag="/student/importCodeExcel"
            :style-type="1"
            title="更新学籍号"
            @fath="getList"
          />
        </PermissionButton>
        <!--        <el-button class="filter-item" round style="float:right;margin-right: 10px" type="primary" @click="handleDownload">-->
        <!--          导出-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_userinfo_export"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="handleDownload"
        />
      </template>

      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:99%;margin-left: 10px">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width:99%;margin-left: 10px"-->
        <!--        :header-cell-style="{backgroundColor:'#EFF1F6'}"-->
        <!--      >-->
        <el-table-column label="学号" prop="id" align="center" width="200px">
          <template slot-scope="{row}">
            <span>
              {{ row.studyCode }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.administrativeSpecialtyName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeGradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政班级">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学籍班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.schoolClbumName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dormitoryCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="就读方式" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.studyWay }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学生类型" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.studentType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证件号" class-name="status-col" width="200px">
          <template slot-scope="{row}">
            <span>{{ row.idNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" class-name="status-col" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二维码" class-name="status-col">
          <template slot-scope="{row}">
            <!--            <span class="link-type" @click="productInnerQR=true">查看</span>-->
            <PermissionButton
              menu-no="_views_baseinfo_userinfo_list_code"
              name="查看"
              type="text"
              @click="productInnerQR1(row,false)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="150">
          <template slot-scope="{row}">
            <!--            <el-button style="border-radius:15px;" type="primary" @click="downloadCodeImg(row)">-->
            <!--              下载-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_userinfo_list_code"
              class-name="filter-item"
              name="下载"
              type="primary"
              plain
              round
              size="mini"
              @click="productInnerQR1(row,true)"
            />
            <!--            <el-button style="border-radius:15px;" type="primary" @click="detailInfo(row.id)">-->
            <!--              详情-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_userinfo_detailInfo"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
    <el-dialog style=" width:500px;text-align: center;margin-left: 30%;height: 1000px" title="二维码"
               :visible.sync="productInnerQR"
    >
      <div class="qrcode" ref="qrCodeUrl" id="qrcode"/>
    </el-dialog>
  </div>
</template>
<script>
  // import Pagination from '@/components/Pagination'
  // import QRCode from 'qrcode'

  import QRCode from 'qrcodejs2'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import excelImport from '@/components/excelImport.vue'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ViewsBaseinfoUserinfoList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout,
      excelImport,
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
        AllEnum: [],
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        innerUrl: '../../../assets/ercode.png',
        productInnerQR: false,
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          state: '在读',
          type: '',
          schoolGradeId: '',
          schoolSpecialtyId: '',
          schoolClbumId: '',
          administrativeGradeId: '',
          administrativeSpecialtyId: '',
          administrativeClbumId: '',
          studentType: '',
          keyword: '',
          descs: 'id'
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        IsFull: [{
          name: '按行政班级',
          id: 2
        }, {
          name: '按学籍班级',
          id: 1
        }],
        jiudu: [{
          label: '全部',
          value: 0
        }, {
          label: '在读',
          value: 1
        }, {
          label: '离校',
          value: 2
        }],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          remark: '',
          title: 1,
          type: '',
          status: '',
          timestamp: '',
          week: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑宿舍',
          create: '新增宿舍周考核'
        },
        rules: {
          type: [{
            required: true,
            message: '请填写年份',
            trigger: 'change'
          }],
          week: [{
            required: true,
            message: '请填写考核周数',
            trigger: 'blur'
          }],
        },

        statisticsInfo: {},
        administrativeGradeId:'',
        administrativeSpecialtyId :'',
        administrativeClbumId:''
      }
    },
    mounted() {
      //  this.creatQrCode();
    },
    created() {
      const that = this
      that.getList()// 分页列表
      that.getGradeList()// 赛选框年级
      that.getSpecialtyList()
      //  that.getClbumList()

      that.getAllEnum()
      that.getStatistics()
    },
    methods: {
      resetSearch() {
        this.listQuery = {
          state: '在读',descs: 'id' }
        this.administrativeGradeId = ''
        this.administrativeSpecialtyId = ''
        this.administrativeClbumId = ''
        this.getList()
      },
      productInnerQR1(row, down) {

        this.productInnerQR = true

        if (document.getElementById('qrcode') != undefined) {
          document.getElementById('qrcode').innerHTML = ''
        }

        this.creatQrCode(row, down)
      },
      creatQrCode(row, down) {
        const that = this
        console.log(location.host)
        that.$nextTick(() => {
          var qrcode = new QRCode(that.$refs.qrCodeUrl, {
            text: location.host + process.env.VUE_APP_BASE_WEB_URL+'/student/detail?id=' + row.id, // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })

          if (down) {
            this.downloadCodeImg(row)
          }
        })
      },
      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/statistics/student/read', { ...that.listQuery }).then(data => {
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
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
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
      EncodeGetUrl(url) {
        const urlArr = url.split('?')
        let encodeUrl = urlArr[0]

        if (urlArr.length > 1) {
          encodeUrl += '?'
          const paramArr = urlArr[1].split('&')
          const encodeparamArr = []
          paramArr.forEach((item, index) => {
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            encodeparamArr.push(key + '=' + encodeURIComponent(value))
          })

          encodeUrl += encodeparamArr.join('&')
        }

        return encodeUrl
      },
      downloadTemplate() {
        this.$utils.exportUtil('/student/download/importTemplate', null, '学生信息模板')
      },
      downloadCodeTemplate() {
        this.$utils.exportUtil('/student/download/codeImportTemplate', null, '学籍号模板下载')
      },
      handleDownload(url) {
        this.$utils.exportUtil('/student/download/exportExcel', this.listQuery, '学生信息')
      },
      objToString(obj) {
        var str = ''
        if (obj) {
          Object.keys(obj).forEach((key, index) => {
            if (index === 0) {
              str = str + `?${key}=${obj[key]}`
            } else {
              str = str + `&${key}=${obj[key]}`
            }
          })
        }
        return str
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/baseinfo/detail',
          query: {
            id: id,
            type: 'detail'
          }
        })
      },
      detailInfo(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/userinfo/detailInfo',
          query: {
            id: id,
            type: 'detail',
            // menuLevel1: this.$route.query.menuLevel1,
            // menuId: this.$route.query.menuId,
          }
        })
      },
      myBrowser() {
        let userAgent = navigator.userAgent //取得浏览器的userAgent字符串
        let isOpera = userAgent.indexOf('Opera') > -1
        if (isOpera) {
          return 'Opera'
        }
         //判断是否Opera浏览器
        if (userAgent.indexOf('Firefox') > -1) {
          return 'FF'
        } //判断是否Firefox浏览器
        if (userAgent.indexOf('Chrome') > -1) {
          return 'Chrome'
        }
        if (userAgent.indexOf('Safari') > -1) {
          return 'Safari'
        } //判断是否Safari浏览器
        if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
          return 'IE'
        }
         //判断是否IE浏览器
        if (userAgent.indexOf('Trident') > -1) {
          return 'Edge'
        } //判断是否Edge浏览器
      },
      downloadCodeImg(row) {
        // this.productInnerQR1(row.id)
        if (this.myBrowser() === 'IE' || this.myBrowser() === 'Edge') {
          let canvas = document.getElementById('qrcode').getElementsByTagName('canvas')[0]//取到canvas
          let url = canvas.toDataURL('image/jpeg')//把canvas转换成base64
          let blob = canvas.msToBlob()
          window.navigator.msSaveBlob(blob, row.name + '.png')

        } else {
          let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas')
          let a = document.createElement('a')
          a.href = myCanvas[0].toDataURL('image/png')
          a.download = row.name
          a.click()

        }
        this.$message({
          message: '正在进行下载保存',
          type: 'success'
        })

        this.productInnerQR = false

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
          qrname: '二维码名称'
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
            })
          }
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
      getList() {
        const that = this
        if (that.listQuery.type === '学籍班') {
          that.listQuery.schoolGradeId = that.administrativeGradeId
          that.listQuery.schoolSpecialtyId = that.administrativeSpecialtyId
          that.listQuery.schoolClbumId = that.administrativeClbumId
          that.listQuery.administrativeGradeId =''
          that.listQuery.administrativeSpecialtyId = ''
          that.listQuery.administrativeClbumId =''
        }
        else{
          that.listQuery.schoolGradeId = ''
          that.listQuery.schoolSpecialtyId = ''
          that.listQuery.schoolClbumId = ''
          that.listQuery.administrativeGradeId =that.administrativeGradeId
          that.listQuery.administrativeSpecialtyId = that.administrativeSpecialtyId
          that.listQuery.administrativeClbumId =that.administrativeClbumId
        }
        that.listLoading = true
        that.$api.student.getPage({ ...that.pagePara, ...that.listQuery }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            that.getStatistics()
            //that.productInnerQR1(0,true)
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        }).catch(() => { that.listLoading = false })
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
