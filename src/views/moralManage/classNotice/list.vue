<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <service-select
          v-model="listQuery.gradeId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getGradeList"
          placeholder="年级"
          style="width: 100px;"
          clearable
        />
        <service-select
          v-model="listQuery.specialtyId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getSpecialtyList"
          placeholder="专业"
          style="margin-left: 10px;width: 100px;"
          clearable
        />
        <service-select
          v-model="listQuery.clbumId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getClbumList"
          placeholder="班级"
          style="margin-left: 10px;width: 100px;"
          clearable
        />
        <service-select
          v-model="listQuery.termId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getTermList"
          placeholder="学期"

          style="margin-left: 10px;width: 100px;"
          clearable
        />
        <el-input
          v-model="listQuery.addr"
          placeholder="姓名"
          prefix-icon="el-icon-search"
          style="margin-left: 10px;width: 150px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" style="margin-left: 10px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right">
        <PermissionButton
          menu-no="_views_moralManage_classNotice_produce"
          class-name="filter-item"
          round
          type="primary"
          name=""
          :page-jump="true"
        />

        <PermissionButton
          menu-no="_views_moralManage_classNotice_down"
          class-name="filter-item"
          round
          type="primary"
          name=""
          :page-jump="true"
        />

        <PermissionButton
          menu-no="_views_moralManage_classNotice_setNotice"
          class-name="filter-item"
          round
          type="primary"
          name=""
          :page-jump="true"
        />
        <PermissionButton
          menu-no="_views_moralManage_classNotice_setCommentCommon"
          class-name="filter-item"
          round
          type="primary"
          name=""
          :page-jump="true"
        />

      </template>  <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
      <el-table-column type="selection" align="center"  />
      <el-table-column label="学期" align="center" prop="id" />
      <el-table-column label="学生姓名" prop="name" />
      <el-table-column label="年级" align="center" prop="grade" />
      <el-table-column label="专业" align="center" prop="specialty" />
      <el-table-column label="班级" align="center" prop="clbum" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="离校时间" align="center" prop="offTime" />
      <el-table-column label="一、二年级报到时间" width="150px" align="center" prop="returnDateOneTwo" />
      <el-table-column label="三年级报到时间" width="140px" align="center" prop="returnDateThree" />
      <el-table-column label="通知书发放时间" width="140px" align="center" prop="noticeDate" />
      <el-table-column label="创建时间" align="center" prop="createDate" />
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
    <el-dialog title="预览" :visible.sync="dialogFormVisible">
      <div style="height: 600px">
        <iframe
          src='https://view.officeapps.live.com/op/view.aspx?src=http://cdpta.cdhrss.chengdu.gov.cn/frt/frtuploadfile/uploadaffix/link/bulletin2020/20200713215944137.docx'
          style="overflow: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ServiceSelect from '@/components/ServiceSelect';
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import {setSate} from "@/views/moralManage/notice/noticeStore";

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
        dialogFormVisible: false,
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
      setNotice() {
        const query = this.$refs.queryForm.getData();
        if (query.gradeId && query.specialtyId && query.termId && query.clbumId) {
          setSate('listSelection', query);
          this.$router.push({ path: '/views/moralManage/setNotice' })
        } else {
          this.$message.warning('请确认年级、专业、班级及学期后进行通知书时间设置！');
        }
      },
      setComment(row) {
        if (row) {
          this.$router.push({ path: '/views/moralManage/setComment', query: { id: row.id } });
        } else if (this.selection.length > 0) {
          setSate('listSelection', this.selection);
          this.$router.push({ path: '/views/moralManage/setComment' })
        } else {
          this.$message.warning('请先选择至少一行数据！');
        }
      },
      pre(){
        let that = this
        that.dialogFormVisible = true
      },
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
