<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a7.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.totalCount }}</span>栋</div>
            <div class="analysis-text-small">建筑物总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a8.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.tenYearCount }}</span>栋</div>
            <div class="analysis-text-small">十年以上建筑物数量</div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <span class="text">建筑物总数100</span>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        >
          <i class="easy-icon easy-icon-avatar" /> <span class="text">十年以上建筑物数量100</span>
        </div>
      </div>
    </div>-->
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" round type="primary" @click="detail()">-->
        <!--          新增建筑物-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_assetinfo_building_add"
          class-name="filter-item"
          round
          type="primary"
          size="mini"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-select
          v-model="listQuery.orgId"
          placeholder="部门"
          clearable
          style="margin-left: 20px; width: 200px"
          class="filter-item"
        >
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input
          v-model="listQuery.name"
          placeholder="建筑物名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" @click="searchList"
                   size="mini"
        >
          搜索
        </el-button>

        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}" size="mini">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="校区" prop="id" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.campus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="建筑物名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简写名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.alias }}</span>
          </template>
        </el-table-column>
        <el-table-column label="建筑物地址" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.addr }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="建成年月" align="center">
          <template slot-scope="{row}">
            <span>{{ row.buildDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用年限">
          <template slot-scope="{row}">
            <span>{{ row.yearLimit }}年</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="160">
          <template slot-scope="{row}">
            <!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
            <!--              编辑-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_building_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
            <!--            <el-button type="primary" round size="mini" @click="deleteInfo(row.id)">-->
            <!--              删除-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_buildinglist_remove"
              class-name="filter-item"
              name=""
              type="danger"
              round
              size="mini"
              @click="deleteInfo(row.id)"
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsBaseinfoSssetinfoBuildinglist',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
    },
    data() {
      return {
        listLoading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          code: '',
          constructionId: '',
          descs: 'id'
        },
        departmentList: [],

        statisticsInfo: {}
      }
    },
    created() {
      const that = this
      that.getList() // //查询列表

      that.getStatistics()
      that.getDepartmentList() // //查询建筑物列表
    },
    methods: {

      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/statistics/construction', { ...that.listQuery }).then(data => {
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
      deleteInfo(id) {
        const that = this
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.$api.assetinfo.deleteConstruction({ id: id }).then(data => {
            that.loading = false
            if (data.code === 200) {
              that.getList()
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }).catch(() => {
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/assetinfo/buildingdetail',
          query: {
            id: id,
          }
        })
      },
      getDepartmentList() {
        const that = this
        that.pagePara.size = 10000
        that.$api.organization.simpleAll().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.departmentList = data.data
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
        that.listLoading = true
        that.$api.assetinfo.getConstructionPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            that.getStatistics()
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

