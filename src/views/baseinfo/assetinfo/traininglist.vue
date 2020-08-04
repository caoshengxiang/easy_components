<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>


    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/32.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{statisticsInfo.stationCount}}</span>个</div>
            <div class="analysis-text-small">总工位数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
<!--        <el-button class="filter-item" round type="primary" @click="detail()">-->
<!--          新增实训室-->
<!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_assetinfo_training_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-select
          v-model="listQuery.orgId"
          default-value="0"
          placeholder="使用机构"
          clearable
          style="margin-left: 20px;width: 200px"
          class="filter-item"
        >
          <el-option v-for="item in constructionList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-input
          v-model="listQuery.name"
          placeholder="实训室名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="searchList">
          搜索
        </el-button>
      </template>
      <el-table
        slot="table"
        v-loading="listLoading"
        :data="pageData.records"
        fit
        highlight-current-row
        style="width: 100%;"
      >

        <el-table-column label="实训室名称" prop="id" sortable="custom" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="教室" align="center">
          <template slot-scope="{row}">
            <span>{{ row.teachingRoomCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实训室类别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="建成年月" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.buildDate }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="使用机构" align="center">
          <template slot-scope="{row}">
            <span >{{ row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
<!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
<!--              编辑-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_training_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
<!--            <el-button type="primary" round size="mini">-->
<!--              删除-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_traininglist_remove"
              class-name="filter-item"
              name=""
              type="danger"
              round
              size="mini"
              @click="deleteInfo(row.id)"
            >
            </PermissionButton>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
    },
    data() {
      return {
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
        constructionList: [],
        statisticsInfo:{}
      }
    },
    created() {
      const that = this
      that.getList() // //查询列表

      that.getStatistics()
      that.organizationSimpleAll() // //查询建筑物列表
    },
    methods: {

      getStatistics(){
        let that = this
        that.$api.statistics.getStatistics('/statistics/trainingRoom',{ ...that.listQuery }).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.statisticsInfo = data.data;
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
          that.$api.assetinfo.deleteTrainingRoom({ id: id }).then(data => {
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
          path: '/views/baseinfo/assetinfo/trainingdetail',
          query: {
            id: id,
          }
        })
      },
      organizationSimpleAll() {
        const that = this
        that.$api.baseInfo.organizationSimpleAll().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.constructionList = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getList() {
        const that = this
        that.$api.assetinfo.getTrainingRoomPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
    }
  }
</script>
