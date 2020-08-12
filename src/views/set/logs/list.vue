<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
      </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button class="filter-item"          size="mini" round type="primary" @click="$utils.routerLink(`/views/baseinfo/class/edit`)">-->
        <!--          新增班级-->
        <!--        </el-button>-->
        <!--        <PermissionButton-->
        <!--          menu-no=""-->
        <!--          class-name="filter-item"-->
        <!--          round-->
        <!--          type="primary"-->
        <!--          icon="el-icon-plus"-->
        <!--          name=""-->
        <!--          size="mini"-->
        <!--          :page-jump="true"-->
        <!--        />-->
        <el-input v-model="listQuery.description" placeholder="请输入内容" clearable
                  style="float: left;margin-left: 20px;width: 320px;">
          <el-select
            slot="prepend"
            v-model="listQueryKey"
            style="width: 90px;"
            placeholder="请选择"
          >
            <el-option label="全部" value="keyword"/>
            <el-option label="模块标题" value="title"/>
            <el-option label="业务类型" value="businessType"/>
            <el-option label="操作人" value="operName"/>
          </el-select>
        </el-input>
        <el-button class="filter-item" style="margin-left: 20px;float: left" round type="primary" size="mini"
                   @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" style="float: left" @click="resetSearch()" size="mini">
          重置
        </el-button>
      </template>
      <template slot="right">
        <!--        <el-button class="filter-item" round style="float:right;margin-right: 10px" type="primary" size="mini" @click="handleDownload">-->
        <!--          导入模板下载-->
        <!--        </el-button>-->

        <PermissionButton
          menu-no="_views_baseinfo_class_list_import"
          class-name="filter-item"
          round
          type="text"
          name=""
        >
          <excelImport
            ref="uploadControl"
            :limit="1"
            flag="clbum/importExcel"
            :style-type="1"
            title="导入"

            @fath="getList"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_baseinfo_class_list_import"
          class-name="filter-item"
          round
          icon="el-icon-download"
          name="导入模板下载"
          @click="handleDownload"
        />
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="模块标题" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.businessType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="请求URL" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主机地址" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operTime }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="创建时间" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.created }} </span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
            <!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
            <!--              编辑-->
            <!--            </el-button>-->
            <PermissionButton
              menu-no=""
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>

  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import excelImport from '@/components/excelImport.vue'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ViewsBaseinfoClassList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout,
      excelImport
    },
    data() {
      return {
        pageData: {},
        pagePara: {
          current: 0,
          size: 10,
        },
        listQuery: {
          description: '',
          descs: 'id'
        },
        listQueryKey: 'keyword'
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      handleDownload(url) {
        this.$utils.exportUtil('/clbum/download/importTemplate', this.listQuery, '导入模板下载')
      },
      resetSearch() {
        this.listQuery = {
          description: '',
          descs: 'id'
        }
        this.listQueryKey = 'keyword'
        this.searchList()
      },
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        const that = this
        const key = {}
        key[this.listQueryKey] = this.listQuery.description
        that.$api.logs.list({ ...that.listQuery, ...that.pagePara, ...key }).then(data => {
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
