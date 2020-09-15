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
<!--        <service-select-->
<!--          v-model="listQuery.clbumId"-->
<!--          name="name"-->
<!--          field="id"-->
<!--          :data-service="$api.baseInfo.getClbumList"-->
<!--          placeholder="类型（枚举？）"-->
<!--          style="margin-left: 10px"-->
<!--          clearable-->
<!--        />-->
        <el-input
          v-model="listQuery.name"
          placeholder="类型"
          prefix-icon="el-icon-search"
          style="margin-left: 10px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="reset">
          重置
        </el-button>
      </template>
      <template slot="right">

        <span style=" font-size: 14px;color: #999999;margin-right: 5px">自动审核：</span>
        <el-switch
          class="filter-item"
          v-model="conductPointForm.AUTO_AUDIT.value"
          on-color="#13ce66"
          off-color="#ff4949"
          on-text="aa"
          active-value="true"
          inactive-value="false"
          @change="changeSwitch()"
          off-text="bb">
        </el-switch>

        <el-button class="filter-item" style="margin-left: 10px" round type="primary" @click="conductPointSetting">
          操行分设置
        </el-button>
        <el-button class="filter-item" round type="warning" @click="warnSetting">
          预警设置
        </el-button>

      </template>
      <template slot="right">
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="类型" prop="name" align="center" >
        </el-table-column>
<!--        <el-table-column label="详情" prop="property" align="center" >-->
<!--        </el-table-column>-->
<!--        <el-table-column label="得分" prop="property" align="center" >-->
<!--        </el-table-column>-->
        <el-table-column label="操作" fixed="right" align="center" width="220px">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_moralManage_conductScore_settingDetail"
              class-name="filter-item"
              name="详情"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
            <PermissionButton
              menu-no="_views_moralManage_conductScore_remove"
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
    <el-dialog title="操行分设置" :visible.sync="dialogFormVisible">
      <el-form ref="conductPointForm" :model="conductPointForm" label-position="right" label-width="150px"
               style="width: 80%; margin-left:50px;"
      >
        <el-form-item class="postInfo-container-item " label="学生默认操行分：">
          <el-input v-model="conductPointForm.DEFAULT_POINT.value" class="filter-item"/>
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="学生操行分标准：">
          <el-input v-model="conductPointForm.POINT_STANDARD.value" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveData()">
          保存
        </el-button>
        <el-button  type="primary" @click="conductPointReset">
          重置学生操行分
        </el-button>
        <el-button type="primary" @click="conductPointGenerate">
          生成学生操行分
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="预警设置" :visible.sync="dialogFormVisible1">
      <el-form ref="warnForm" :model="conductPointForm" label-position="right" label-width="200px"
               style="width: 80%; margin-left:50px;"
      >
        <el-form-item class="postInfo-container-item " label="学生操行分预警分值：">
          <el-input v-model="conductPointForm.ALERT_VALUE.value" class="filter-item"/>
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="操行分低于平均分是否预警：">
          <el-radio-group v-model="conductPointForm.IF_ALERT.value">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="postInfo-container-item " label="一月减少操行分预警分值：">
          <el-input v-model="conductPointForm.DEDUCT_ALERT.value" class="filter-item"/>
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="操行分高于平均分是否表扬：">
          <el-radio-group v-model="conductPointForm.IF_PRAISE.value">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="一月增加操行分表扬值：">
          <el-input v-model="conductPointForm.PRAISE_VALUE.value" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveDataOne()">
          保存
        </el-button>
      </div>
    </el-dialog>
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
      radio:1,
      radio1:2,
      dialogFormVisible1: false,
      dialogFormVisible: false,
      listLoading: false,
      pageData: {},
      pagePara: {
        current: 0,
        size: 10
      },
      listQuery: {
        dormitoryId: 0,
        descs: 'id',
      },
      switchs:true,
      statisticsInfo: {},
      useStatus: [],
      purpose: [],
      temp:{},
      conductPointForm:{
        ALERT_VALUE: {value: null},
        AUTO_AUDIT: {value: null},
        DEDUCT_ALERT: {value: null},
        DEFAULT_POINT: {value: null},
        IF_ALERT: {value: null},
        IF_PRAISE: {value: null},
        POINT_STANDARD: {value: null},
        PRAISE_VALUE: {value: null}
      }
    }
  },
  created() {
    const that = this;
    that.getList();
    this.getConductPoint();
    that.getByTypeId('purpose');
    that.getByTypeId('useStatus')
  },
  methods: {
    conductPointSetting() {
      this.getConductPoint();
      this.dialogFormVisible = true
    },
    /*生成学生操行分*/
    conductPointGenerate() {
      this.$api.conductScore.conductPointGenerate().then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '生成学生操行分成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    /*重置学生操行分*/
    conductPointReset() {
      this.$api.conductScore.conductPointReset().then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '重置学生操行分成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    warnSetting() {
      this.getConductPoint();
      this.dialogFormVisible1 = true
    },
    getConductPoint() {
      // CONDUCT_POINT_SETTING
      this.$api.globalConfig.getValuesByKey({key:'CONDUCT_POINT_SETTING'}).then(res => {
        this.conductPointForm = res.data.fieldValues
      })
    },
    saveDataOne(){
      this.$refs.warnForm.validate(valid => {
        if (valid) {
          let params = {key:'CONDUCT_POINT_SETTING',fieldValues:this.conductPointForm};
          this.$api.globalConfig.edit(params).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '设置成功',
                type: 'success',
                duration: 2000
              });
              this.dialogFormVisible1 = false
            }
          })
        }else {
          this.$message.warning('请完善表单信息！');
        }
      })
    },
    saveData(){
      this.$refs.conductPointForm.validate(valid => {
        if (valid) {
          let params = {key:'CONDUCT_POINT_SETTING',fieldValues:this.conductPointForm};
          this.$api.globalConfig.edit(params).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '设置成功',
                type: 'success',
                duration: 2000
              });
              this.dialogFormVisible = false
            }
          })
        }else {
          this.$message.warning('请完善表单信息！');
        }
      })
    },
    changeSwitch(){
        let params = {key:'CONDUCT_POINT_SETTING',fieldValues:this.conductPointForm};
        this.$api.globalConfig.edit(params).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '设置成功',
              type: 'success',
              duration: 2000
            })
          }
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
      that.loading = true;
      that.$confirm('请确认是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        that.$api.conductScore.conductTypeRemove( id ).then(data => {
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
        that.loading = false
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
    detailInfo(id) {
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
      that.$api.conductScore.conductType({ ...that.listQuery, ...that.pagePara }).then(data => {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
