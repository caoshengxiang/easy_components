<template>
  <common-layout>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <index-query-form ref="queryForm" :query="getData" />
      </template>
      <template slot="right">
        <el-form inline>
          <el-form-item>
            <PermissionButton
              menu-no="_views_moralManage_notice_setNotice"
              name="通知书时间设置"
              @click="setNotice"
              round
            />
          </el-form-item>
          <el-form-item>
            <PermissionButton
              menu-no="_views_moralManage_notice_setComment"
              name="设置评语"
              @click="setComment"
              round
            />
          </el-form-item>
        </el-form>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;" @selectionChange="onTableSelect">
        <el-table-column type="selection" align="center" />
        <el-table-column label="学期" align="center" prop="term" />
        <el-table-column label="学生姓名" prop="name" />
        <el-table-column label="年级" align="center" prop="grade" />
        <el-table-column label="专业" align="center" prop="specialty" />
        <el-table-column label="班级" align="center" prop="clbum" />
        <el-table-column label="创建人" prop="creatorName" />
        <el-table-column label="离校时间" align="center" prop="offTime" />
        <el-table-column label="一、二年级报到时间" align="center" prop="returnDateOneTwo" />
        <el-table-column label="三年级报到时间" align="center" prop="returnDateThree" />
        <el-table-column label="通知书发放时间" align="center" prop="noticeDate" />
        <el-table-column label="创建时间" align="center" prop="createDate" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_moralManage_notice_setComment"
              name=""
              type="text"
              @click="setComment(row)"
              round
            >
              评语
            </PermissionButton>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </common-layout>
</template>

<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import CommonLayout from '../common/CommonLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import IndexQueryForm from './components/IndexQueryForm'
  import { setSate } from './noticeStore'

  export default {
    name: 'MoralManageNoticeIndex',
    components: {
      YPageListLayout,
      CommonLayout,
      PermissionButton,
      IndexQueryForm
    },
    data() {
      return {
        tableData: { records: [] },
        loading: false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        selection: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(query) {
        this.loading = true;
        this.$api.moralManageNotice.page(Object.assign({}, this.pageInfo, query))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
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
      onTableSelect(selection) {
        this.selection = selection;
      }
    }
  };
</script>

<style scoped>

</style>
