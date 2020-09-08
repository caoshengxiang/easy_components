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
            style="margin-left: 10px;"
            clearable
          />
          <service-select
            v-model="listQuery.specialtyId"
            name="name"
            field="id"
            :data-service="$api.baseInfo.getSpecialtyList"
            placeholder="专业"
            style="margin-left: 10px;"
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
            style="margin-left: 10px;"
            clearable
          />

        <el-select
          v-model="listQuery.state"
          name="name"
          placeholder="审核状态"
          style="margin-left: 10px;"
          clearable
        >
          <el-option v-for="item in ['待审核','审核通过','审核拒绝']" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-button class="filter-item" style="margin-left: 10px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="reset">
          重置
        </el-button>
      </template>
      <template slot="right">
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="学号" prop="studyCode" align="center" >
        </el-table-column>
        <el-table-column label="姓名" prop="name" align="center" >
        </el-table-column>
        <el-table-column label="详情" prop="reason" align="center" >
        </el-table-column>
        <el-table-column label="操行分" prop="score" align="center" >
        </el-table-column>
        <el-table-column label="时间" prop="updateTime" align="center" >
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center" >
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="220px">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_moralManage_conductScore_audit"
              name=""
              type="primary"
              @click="open(row.id)"
              round
            >
              审核
            </PermissionButton>
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
    YPageListLayout,
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
      purpose: [],
      selectedId: null
    }
  },
  created() {
    const that = this;
    that.getList();
    that.getByTypeId('purpose');
    that.getByTypeId('useStatus')
  },
  methods: {
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
      that.$api.conductScore.getConductDeductRecord({ ...that.listQuery, ...that.pagePara }).then(data => {
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
    open(id) {
      this.selectedId = id;
      this.$confirm('是否通过？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        center: true,
        callback: this.confirmCallBack
      })
    },
    confirmCallBack(action,instance) {
      switch (action) {
        case 'confirm':
          this.audit({id: this.selectedId, state: '审核通过'});
          break;
        case 'cancel':
          this.audit({id: this.selectedId, state: '审核拒绝'});
          break;
        default:
          break
      }
    },
    audit(params) {
      this.$api.conductScore.check(params).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
