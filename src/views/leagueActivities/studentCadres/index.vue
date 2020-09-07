<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <div class="statisticsInfo" v-loading="loading">
      <div class="menu-2-box">
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a1.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ studentLeaderTotal || 0 }}</span></div>
            <div class="analysis-text-small">学生干部总数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <PermissionButton
          menu-no="_views_leagueActivities_studentCadres_add"
          class-name="filter-item"
          round
          type="primary"
          size="mini"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <service-select
          v-model="listQuery.gradeId"
          :data-service="$api.baseInfo.getGradeList"
          name="name"
          field="id"
          placeholder="年级"
          clearable
          class="filter-item"
          :immediate="false"
          style="margin-left: 10px; width: 180px"
        />
        <service-select
          v-model="listQuery.specialtyId"
          :data-service="$api.baseInfo.getSpecialtyList"
          name="name"
          field="id"
          placeholder="专业"
          clearable
          class="filter-item"
          :immediate="false"
          style="margin-left: 10px; width: 180px"
        />
        <service-select
          v-model="listQuery.clbumId"
          :data-service="$api.baseInfo.getClbumList"
          :default-query="{
            gradeId: listQuery.gradeId,
            specialtyId: listQuery.specialtyId
          }"
          name="name"
          field="id"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left: 10px; width: 180px"
        />
<!--        <el-select v-model="listQuery.timestamp" class="filter-item"-->
<!--                   style="margin-left: 10px;" placeholder="学期">-->
<!--          <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name"-->
<!--                     :value="item.key"-->
<!--          />-->
<!--        </el-select>-->
        <service-select
          style="margin-left: 12px;"
          v-model="listQuery.termId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getTermList"
          placeholder="学期"
          :immediate="false"
          clearable
        />
        <el-input v-model="listQuery.name" placeholder="姓名" style="margin-left:10px;width: 180px"/>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          @click="search"
          round
          size="mini"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="reset" size="mini">
          重置
        </el-button>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="学年" prop="year" min-width="80"/>
        <el-table-column label="学期" prop="termName" min-width="120"/>
        <el-table-column label="学生姓名" prop="name" min-width="120"/>
        <el-table-column label="年级" prop="grade" min-width="120"/>
        <el-table-column label="专业" prop="specialty" min-width="160"/>
        <el-table-column label="班级" prop="clbum" min-width="120"/>
        <el-table-column label="学生干部岗位" prop="postName" min-width="160" show-overflow-tooltip/>
        <el-table-column label="创建人" prop="creator"/>
        <el-table-column label="创建时间" align="center" prop="created" min-width="160"/>
        <el-table-column label="评价" prop="score" min-width="180" show-overflow-tooltip/>
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_studentCadres_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_studentCadres_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row.id)"
              round
            />
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>

<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import ServiceSelect from "../../../components/ServiceSelect";

  export default {
    name: 'studentCadres',
    components: {
      ServiceSelect,
      YPageListLayout,
      PermissionButton,
      Breadcrumb
    },
    data() {
      return {
        tableData: {records: []},
        loading: false,
        pageInfo: {
          current: 1,
          size: 10,
          descs: 'id'
        },
        selection: [],
        listQuery: {
          descs: 'id',
        },
        gradeInfo: [],
        studentLeaderTotal: 0
      }
    },
    created() {
      this.search();
      // this.getClbumList()
    },
    methods: {
      getData() {
        this.loading = true;
        this.$api.studentCadres.getPage(Object.assign({}, this.pageInfo, this.listQuery))
          .then(res => {
            this.tableData = res.data;
            if (Object.keys(this.listQuery).length === 1) {
              this.studentLeaderTotal = res.data.total
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteRow(id) {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$api.studentCadres.remove(id).then(res=>{
              this.search()
            })
          });
      },
      search() {
        this.pageInfo.current = 1;
        this.getData();
      },
      reset() {
        this.listQuery = {descs: 'id'};
        this.search();
      },
      getClbumList() {
        const that = this;
        that.$api.baseInfo.getClbumList({
          gradeId: that.listQuery.gradeId,
          specialtyId: that.listQuery.specialtyId
        }).then(data => {
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
    },
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .item-img {
      width: 50px;
      height: 50px;
    }
  }
</style>
