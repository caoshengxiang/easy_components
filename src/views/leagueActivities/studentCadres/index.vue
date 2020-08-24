<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
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
        <el-input v-model="listQuery.communityName" placeholder="年级"
                  style="margin-left:10px;width: 180px"
        />
        <el-input v-model="listQuery.jobs" placeholder="专业" style="margin-left:10px;width: 180px"/>
        <el-select
          v-model="listQuery.clbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:10px;"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select v-model="listQuery.timestamp" class="filter-item"
                   style="margin-left: 10px;" placeholder="学期">
          <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name"
                     :value="item.key"
          />
        </el-select>
        <el-input v-model="listQuery.name" placeholder="姓名" style="margin-left:10px;width: 180px"/>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          @click="getData"
          round
          size="mini"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click=" listQuery = {descs: 'id'}" size="mini">
          重置
        </el-button>
        <div class="statistics-container" v-loading="statisticsLoading">
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">学生干部总数</div>
              <div class="item-data">{{ data.communitySum || 0 }}</div>
            </div>
          </div>
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">校级干部</div>
              <div class="item-data">{{ data.communitySum || 0 }}</div>
            </div>
          </div>
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">各级别人数</div>
              <div class="item-data">{{ data.communitySum || 0 }}</div>
            </div>
          </div>
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="学年" prop="communityName"/>
        <el-table-column label="学期" prop="name"/>
        <el-table-column label="学生姓名" prop="class"/>
        <el-table-column label="年级" align="center" prop="grade"/>
        <el-table-column label="专业" prop="specialty"/>
        <el-table-column label="班级" prop="jobs"/>
        <el-table-column label="级别" align="center" prop="jobDate"/>
        <el-table-column label="任职单位" align="center" prop="remark"/>
        <el-table-column label="干部名称" prop="workContent"/>
        <el-table-column label="创建人" prop="comment"/>
        <el-table-column label="创建时间" align="center" prop="createdDate"/>
        <el-table-column label="评价" prop="remark"/>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_studentCadres_detail"
              name="详情"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_studentCadres_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row)"
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

  export default {
    name: 'studentActivities',
    components: {
      YPageListLayout,
      PermissionButton
    },
    data() {
      return {
        tableData: {records: []},
        loading: false,
        statisticsLoading:false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        selection: [],
        listQuery: {
          descs: 'id',
        },
        gradeInfo: [],
        data: {}
      }
    },
    created() {
      this.getData();
      this.getClbumList()
    },
    methods: {
      getData(query) {
        this.loading = true;
        // todo 对接口
        if (query) {
          this.filters = query;
        }
        this.$api.moralManageNotice.page(Object.assign({}, this.pageInfo, this.listQuery))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteRow() {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // todo 对接口
          });
      },
      getClbumList() {
        const that = this
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
  .statistics-container {
    display: flex;
    align-items: center;
    margin-top: 16px;

    .statistics-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      background-color: rgba(242, 242, 242, 1);
      padding: 12px;
      border-radius: 4px;

      .item-img {
        width: 80px;
        height: 80px;
      }

      .item-info {
        margin-left: 12px;
        text-align: center;
        font-size: 16px;

        .item-head {
          font-weight: bold;
        }

        .item-data {
          margin-top: 6px;
          font-size: 24px;
          font-weight: bold;
          color: #1890ff;
        }
      }
    }
  }
</style>
