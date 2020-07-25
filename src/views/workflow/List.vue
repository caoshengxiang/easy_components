<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="right">
        <!--        <el-button class="filter-item" round type="primary" @click="$utils.routerLink('/workflow/detail')">-->
        <!--          新增-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_workflow_Detail_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
      </template>
      <el-table
        slot="table"
        v-loading="loading"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        :header-cell-style="{backgroundColor:'#EFF1F6'}"
      >
        <el-table-column label="流程名称" prop="name" align="center"/>
        <el-table-column label="创建用户" prop="creatorName" width="350px" align="center"/>
        <el-table-column label="创建时间" prop="created" align="center" width="350"/>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="{row}">
            <!--            <el-button type="primary" round @click="$utils.routerLink(`/workflow/detail?id=${row.id}`)">修改</el-button>-->
            <PermissionButton
              menu-no="_views_workflow_Detail_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
            <!--            <el-button type="warning" round @click="$targetNewPage(`/workflow/design?id=${row.id}`)">设计流程</el-button>-->
            <PermissionButton
              menu-no="_views_workflow_Design_set"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
              :_target="true"
            >
            </PermissionButton>
            <!--            <el-button type="danger" round @click="deleteInfo(row.id)">删除</el-button>-->
            <PermissionButton
              menu-no="_views_workflow_List_remove"
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
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'WorkflowList',
    components: {
      Breadcrumb,
      YPageListLayout,
      PermissionButton
    },
    data() {
      return {
        loading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        }
      }
    },
    created() {
      const that = this
      that.getList()// 分页列表
    },
    methods: {
      getList() {
        const that = this
        that.loading = true
        that.$api.workflow.getList(that.pagePara).then(res => {
          that.loading = false
          if (res.code === 200) {
            // 返回成功
            that.pageData = res.data
          } else {
            that.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      deleteInfo(id) {
        const that = this
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.$utils.loading.show()
          that.$api.workflow.deleteInfo(id).then(res => {
            that.$utils.loading.hide()
            if (res.code === 200) {
              that.$message.success('操作成功！')
              that.getList()
            } else {
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
