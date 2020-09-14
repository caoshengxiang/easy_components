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
          :default-query="{
            gradeId: listQuery.gradeId,
            specialtyId: listQuery.specialtyId
          }"
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
          v-model="listQuery.name"
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
        <el-button class="filter-item" round type="warning" @click="reset">
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
          @click="generateNote"
        />

        <PermissionButton
          menu-no="_views_moralManage_classNotice_down"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="downloadPkg"
        />

        <PermissionButton
          menu-no="_views_moralManage_classNotice_setNotice"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="setNotice"
        />
        <PermissionButton
          menu-no="_views_moralManage_classNotice_setCommentCommon"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="setComment()"
        />

      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;" @selectionChange="onTableSelect">
      <el-table-column type="selection" align="center"  />
      <el-table-column label="学期" align="center" prop="termName" min-width="140px"/>
      <el-table-column label="学生姓名" prop="studentName" min-width="140px"/>
      <el-table-column label="年级" align="center" prop="grade"/>
      <el-table-column label="专业" align="center" prop="specialty" min-width="220px"/>
      <el-table-column label="班级" align="center" prop="clbum" min-width="140px"/>
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="离校时间" align="center" prop="holidayDate" min-width="140px"/>
      <el-table-column label="一、二年级报到时间" width="150px" align="center" prop="underGradeRegisterDate" />
      <el-table-column label="三年级报到时间" width="140px" align="center" prop="seniorGradeRegisterDate" />
      <el-table-column label="通知书发放时间" width="140px" align="center" prop="sendDate" min-width="140px"/>
      <el-table-column label="创建时间" align="center" prop="created" min-width="140px"/>
      <el-table-column label="操作" fixed="right" align="center" min-width="280px">
        <template v-slot="{ row }">
<!--          <PermissionButton-->
<!--            menu-no="_views_moralManage_classNotice_previewDetail"-->
<!--            name=""-->
<!--            type="primary"-->
<!--            @click="pre(row)"-->
<!--            round-->
<!--          >-->
<!--            预览-->
<!--          </PermissionButton>-->
          <PermissionButton
            menu-no="_views_moralManage_classNotice_previewDetail"
            name=""
            type="primary"
            round
            :page-jump="true"
            :page-query="{id: row.id}"
          >
            预览
          </PermissionButton>
          <PermissionButton
            :disabled="!row.wordUrl"
            menu-no="_views_moralManage_classNotice_download"
            name=""
            type="primary"
            @click="openLinkUrl(row.wordUrl)"
            round
          >
            下载
          </PermissionButton>
          <PermissionButton
            menu-no="_views_moralManage_classNotice_previewDetail"
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
          :src="wordUrl"
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
  import {setSate} from "./noticeStore";

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
          descs: 'id'
        },
        statisticsInfo: {},
        useStatus: [],
        purpose: [],
        selection:[],
        wordUrl: null
      }
    },
    created() {
      const that = this;
      that.getList();

      that.getByTypeId('purpose');
      that.getByTypeId('useStatus')
    },
    methods: {
      openLinkUrl(url) {
        location.href = url;
      },
      setNotice() {
        const query = this.listQuery;
        if (query.gradeId && query.specialtyId && query.termId && query.clbumId) {
          setSate('listSelection', query);
          this.$router.push({
            path: '/views/moralManage/classNotice/setNotice',
            query: Object.assign({},query)
          })
        } else {
          this.$message.warning('请确认年级、专业、班级及学期后进行通知书时间设置！');
        }
      },
      setComment(row) {
        const query = {
          back: this.$route.fullPath
        };
        if (row) {
          setSate('listSelection', [row]);
          setSate('batch', false);
          this.$router.push({ path: '/views/moralManage/classNotice/setComment', query });
        } else if (this.selection.length > 0) {
          setSate('listSelection', this.selection);
          setSate('batch', true);
          this.$router.push({ path: '/views/moralManage/classNotice/setComment', query })
        } else {
          this.$message.warning('请先选择至少一行数据！');
        }
      },
      pre(row){
        let that = this;
        this.wordUrl = "https://view.officeapps.live.com/op/view.aspx?src=" + location.origin + row.wordUrl;
        this.$nextTick(function () {
          that.dialogFormVisible = true
        })
      },
      getByTypeId(id) {
        const that = this;
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'useStatus':
                that.useStatus = data.data;
                break;
              case 'purpose':
                that.purpose = data.data;
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
      searchList() {
        const that = this;
        that.pagePara.current = 0;

        that.getList()
      },
      reset() {
        this.listQuery = {descs: 'id'};
        this.searchList();
      },
      deleteInfo(id) {
        const that = this;
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.loading = true;
          that.$api.classNotice.remove(id).then(data => {
            that.loading = false;
            if (data.code === 200) {
              that.searchList()
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }).catch(() => {
          that.loading = false;
        })
      },
      add() {
        const that = this;
        that.$router.push({
          path: '/views/baseinfo/assetinfo/detail',
          query: {
            type: 'add'
          }
        })
      },
      detail(id) {
        const that = this;
        that.$router.push({
          path: '/views/baseinfo/assetinfo/detail',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this;
        that.listLoading = true;
        that.$api.classNotice.getPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.listLoading = false;
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        }).catch(() => { that.listLoading = false })
      },
      downloadPkg() {
        const { clbumId,termId } = this.listQuery;
        if (!clbumId || !termId) {
          this.$message({
            type:'warning',
            message: '请先选择班级和学期！'
          });
          return
        }
        this.$api.classNotice.downloadPkg({clbumId,
          termId})
      },
      onTableSelect(selection) {
        this.selection = selection;
      },
      /*生成通知书*/
      generateNote() {
        const { clbumId,termId } = this.listQuery;
        if (!clbumId || !termId) {
          this.$message({
            type:'warning',
            message: '请先选择班级和学期！'
          });
          return
        }
        this.$api.classNotice.generateNote({
          clbumId,
          termId
        }).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '生成通知书成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
