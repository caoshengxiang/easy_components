
<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item"          size="mini" round type="primary" @click="$utils.routerLink(`/views/baseinfo/class/edit`)">
          新增班级
        </el-button>
        <el-select
          v-model="listQuery.specialtyId"
          placeholder="专业"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
         <el-option v-for="item in  majorList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select
          v-model="listQuery.gradeId"
          placeholder="年级"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
          <el-option v-for="item in gradeList " :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select
          v-model="listQuery.campus"
          placeholder="校区"
          clearable
          filterable
          style="margin-left: 20px;width: 100px"
          class="filter-item"
        >
          <el-option v-for="item in campus" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" size="mini" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round style="float:right;margin-right: 10px" type="primary" size="mini"  @click="handleDownload">
          导入模板下载
        </el-button>
        <excelImport
          :limit="1"
          ref="uploadControl"
          flag="clbum/importExcel"
          :styleType="1"
          title= "导入"

        ></excelImport>
      </template>
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        slot="table"
      >        <el-table-column label="班级名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
        <el-table-column label="所在校区" align="center">
        <template slot-scope="{row}">
          <span>{{ row.campus }}</span>
        </template>
      </el-table-column>
        <el-table-column label="预分配人数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.allocationNum }}</span>
        </template>
      </el-table-column>
        <el-table-column label="所属专业" align="center">
        <template slot-scope="{row}">
          <span>{{ row.specialtyName }}</span>
        </template>
      </el-table-column>
        <el-table-column label="所属年级" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gradeName }}</span>
        </template>
      </el-table-column>
        <el-table-column label="班主任" align="center">
        <template slot-scope="{row}">
          <span>{{ row.headTeacherName }}</span>
        </template>
      </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
            <el-button type="primary" round size="mini" @click="detail(row.id)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>





  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import excelImport from '@/components/excelImport.vue';
  export default {
    name: 'ComplexTable',
    components: {Breadcrumb,Pagination,YPageListLayout,excelImport},
    data() {
      return {
        pageData:{},
        pagePara:{
          current:0,
          size:10
        },
        listQuery: {
          dormitoryId:0
        },
        majorList:[],
        gradeList:[],
        AllEnum:[],
        campus:[]
      }
    },
    created(){
      let that = this;
      that.getList();
      that.getAllEnum();
      that.getMajor();
      that.getGrade();
      that.getByTypeId(52)
    },
    methods:{
      getByTypeId(id){
        const that = this
        that.$api.dictData.getByTypeId({ dictTypeId: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 52:
                that.campus = data.data
                break;
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getAllEnum(){
        let that = this
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
      getMajor(){
        let that = this
        that.$api.major.listbase({...that.listQuery,...that.pagePara}).then(data => {
          if(data.code === 200){
            //返回成功
            that.majorList = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGrade(){
        let that = this
        that.$api.grade.listbase({...that.listQuery,...that.pagePara}).then(data => {
          if(data.code === 200){
            //返回成功
            that.gradeList = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleDownload(url){
        this.$utils.exportUtil('/clbum/download/importTemplate',this.listQuery, '导入模板下载')
      },
      searchList(){
        let that = this;
        that.pagePara.current = 0
        that.getList()
      },
      add(){
        let that =this;
        that.$router.push({
          path:"/views/baseinfo/class/edit",
          query: {
            type: "add"
          }
        })
      },
      detail(id){
        let that =this;
        that.$router.push({
          path:"/views/baseinfo/class/edit",
          query: {
            id:id,
            type: "add"
          }
        })
      },
      getList(){
        let that = this;
        that.$api.clbum.list({...that.listQuery,...that.pagePara}).then(data => {
          that.loading = false;
          if(data.code === 200){
            //返回成功
            that.pageData = data.data
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

