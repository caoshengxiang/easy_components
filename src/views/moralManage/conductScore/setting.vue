<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">

        <PermissionButton
          menu-no="_views_moralManage_conductScore_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <service-select
          v-model="listQuery.clbumId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getClbumList"
          placeholder="类型（枚举？）"
          style="margin-left: 10px"
          clearable
        />
        <el-input
          v-model="listQuery.addr"
          placeholder="详情"
          prefix-icon="el-icon-search"
          style="margin-left: 10px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right">
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="类型" prop="property" align="center" >
        </el-table-column>
        <el-table-column label="详情" prop="property" align="center" >
        </el-table-column>
        <el-table-column label="得分" prop="property" align="center" >
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="220px">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_moralManage_classNotice_setComment"
              name=""
              type="primary"
              @click="pre(row)"
              round
            >
              预览
            </PermissionButton>
            <PermissionButton
              menu-no="_views_moralManage_classNotice_setComment"
              name=""
              type="primary"
              @click="setComment(row)"
              round
            >
              评语
            </PermissionButton>
            <PermissionButton
              menu-no="_views_moralManage_classNotice_remove"
              class-name="filter-item"
              name=""
              type="danger"
              round
              size="mini"
              @click="deleteInfo(row.id)"
            />
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>

  </div>
</template>
<script>
import ServiceSelect from '@/components/ServiceSelect';
import PermissionButton from '@/components/PermissionButton/PermissionButton'
import Breadcrumb from '@/components/Breadcrumb'
import YPageListLayout from '@/components/YPageListLayout'

export default {
  name: 'ViewsBaseinfoAssetinfoList',
  components: {
    ServiceSelect,
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
        dormitoryId: 0,
        descs: 'id'
      },
      statisticsInfo: {},
      useStatus: [],
      purpose: []
    }
  },
  created() {
    const that = this
    that.getList()
    that.getStatistics()

    that.getByTypeId('purpose')
    that.getByTypeId('useStatus')
  },
  methods: {
    getByTypeId(id) {
      const that = this
      that.$api.dictData.getByCode({ code: id }).then(data => {
        if (data.code === 200) {
          switch (id) {
            case 'useStatus':
              that.useStatus = data.data
              break
            case 'purpose':
              that.purpose = data.data
              break
          }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getStatistics() {
      let that = this
      that.$api.statistics.getStatistics('/statistics/land/area', { ...that.listQuery }).then(data => {
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
        that.$api.assetinfo.deleteLand({ id: id }).then(data => {
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
    add() {
      const that = this
      that.$router.push({
        path: '/views/baseinfo/assetinfo/detail',
        query: {
          type: 'add'
        }
      })
    },
    detail(id) {
      const that = this
      that.$router.push({
        path: '/views/baseinfo/assetinfo/detail',
        query: {
          id: id,
          type: 'add'
        }
      })
    },
    getList() {
      const that = this
      that.listLoading = true
      that.$api.assetinfo.getLandPage({ ...that.listQuery, ...that.pagePara }).then(data => {
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

<style lang="scss" scoped>

</style>
