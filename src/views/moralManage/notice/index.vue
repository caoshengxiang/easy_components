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
        <el-table-column label="职工编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.staffNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" width="120">
          <template slot-scope="{row}">
            <span>{{ row.sex }} </span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门-岗位" align="center">
          <template slot-scope="{row}">
            <span v-for="(item, index) in row.posts" :key="item.id"><span v-if="index > 0">、</span>{{ item.organizationName }}-{{ item.postName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="基本信息" align="center">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_staff_detail"
              class-name="filter-item"
              name=""
              type="text"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <el-table-column label="学历证书" align="center">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_staff_eduDetail"
              class-name="filter-item"
              name=""
              type="text"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <el-table-column label="工资情况" align="center">
          <template slot-scope="{row}">
            <!--          <i class="el-icon-edit"></i>-->
            <PermissionButton
              menu-no="_views_staff_wageDetail"
              class-name="filter-item"
              name=""
              type="text"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <!--      </el-table>-->
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
      setComment() {
        if (this.selection.length > 0) {
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
