<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <service-select
          v-model="listQuery.specialtyId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getSpecialtyList"
          placeholder="专业"
          style="margin-left: 10px;width: 160px"
          clearable
        />
        <service-select
          v-model="listQuery.clbumId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getClbumList"
          :default-query="{ specialtyId: listQuery.specialtyId }"
          placeholder="班级"
          style="margin-left: 10px;width: 160px"
          clearable
        />
        <el-select
          v-model="listQuery.oper"
          placeholder="奖/惩"
          clearable
          class="filter-item"
          style="margin-left:10px;width: 120px"
        >
          <el-option v-for="item in AllEnum['奖惩类型']" :label="item" :value="item" :key="item"/>
        </el-select>
        <el-input placeholder="级别" v-model="listQuery.level" style="margin-left:10px;width: 120px"/>
        <el-date-picker
          style="margin-left: 12px;"
          v-model="cancelTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="撤销时间开始"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="撤销时间结束"
        />
        <el-input placeholder="姓名" v-model="listQuery.name" style="margin-left:10px;width: 100px"/>
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="reset">
          重置
        </el-button>
      </template>
      <template slot="right">
        <PermissionButton
          menu-no="_views_rewardsAndPunishments_undo_export"
          class-name="filter-item"
          type="primary"
          @click="exportClassRecord"
          round
        />
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="学号" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.studyCode }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.grade }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.clbum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="{row}">
            <span>{{ row.oper }}</span>
          </template>
        </el-table-column>
        <el-table-column label="撤销时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cancelTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="撤销文件" class-name="status-col">
          <template slot-scope="{row}">
<!--            <el-button round @click="openLinkUrl(row.cancelFile)">下载</el-button>-->
            <PermissionButton
              v-if="row.cancelFile"
              menu-no="_views_rewardsAndPunishments_undo_download"
              class-name="filter-item"
              round
              size="mini"
              name=""
              @click="openLinkUrl(row.cancelFile)"
            />
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_rewardsAndPunishments_undo_detail"
              class-name="filter-item"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{id: row.id}"
              round
            />
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import ServiceSelect from '@/components/ServiceSelect'

  export default {
    name: 'RewardsAndPunishmentsCancelRecordList',
    data() {
      return {
        AllEnum: {},
        listLoading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          descs: 'id',
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        cancelTime: null
      }
    },
    created() {
      const that = this;
      that.getList();
      that.getAllEnum()
    },
    components: {
      Breadcrumb,
      ServiceSelect
    },
    methods: {
      openLinkUrl(url) {
        location.href = url;
      },
      exportClassRecord() {
        this.$api.rewardsAndPunishments.downloadRewardsPunishmentCancel({ ...this.pagePara, ...this.listQuery })
      },
      getAllEnum() {
        const that = this;
        that.$api.globalConfig.getAllEnum().then(data => {
          if (data.code === 200) {
            that.AllEnum = data.data
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
      getList() {
        const that = this;
        that.listLoading = true;
        const sendData = {...that.pagePara, ...that.listQuery};
        if (that.cancelTime) {
          sendData.cancelTimeStart = that.cancelTime[0];
          sendData.cancelTimeEnd = that.cancelTime[1];
        }
        that.$api.rewardsAndPunishments.getCancelPage(sendData).then(data => {
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
        })
      },
      reset() {
        this.listQuery = {descs: 'id'};
        this.getList();
      }
    }
  }
</script>

<style scoped>

</style>
