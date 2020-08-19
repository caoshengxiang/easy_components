<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
      <el-table-column label="学号" align="center" prop="id" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="专业" align="center" prop="clbum" />
      <el-table-column label="年级" align="center" prop="grade" />
      <el-table-column label="班级" align="center" prop="specialty" />
        <el-table-column label="处理结果" align="center" prop="specialty" />
        <el-table-column label="处理原因" align="center" prop="specialty" />
        <el-table-column label="处理时间" align="center" prop="specialty" />
      <el-table-column label="操作" fixed="right" align="center" width="220px">
        <template v-slot="{ row }">
          <el-button class="filter-item" round type="warning" @click="edit(row.id)">
            查看/编辑
          </el-button>
        </template>
      </el-table-column>
    </parentTable>

    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsBaseinfoAssetinfoList',
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
        },
      }
    },
    created() {
      const that = this
      that.getList()

    },
    methods: {
      edit(id){
        alert(id)
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
          path: '/views/moralManage/commentManage/detail',
          query: {
            type: 'add',
            back: this.$route.fullPath
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/moralManage/commentManage/detail',
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
