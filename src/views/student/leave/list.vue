<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.attendance }}</span></div>
            <div class="analysis-text-small">当前在读学生出勤率</div>
          </div>
        </div>
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.bjCount }}</span>人</div>
            <div class="analysis-text-small">病假人数</div>
          </div>
        </div>
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.busCount }}</span>人</div>
            <div class="analysis-text-small">事假人数</div>
          </div>
        </div>
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.otherCount }}</span>人</div>
            <div class="analysis-text-small">其他人数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增学期-->
        <!--        </el-button>-->


        <PermissionButton
          menu-no="_views_student_leave_add"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
        <el-select
          v-model="listQuery.administrativeGradeId"
          placeholder="年级"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeSpecialtyId"
          placeholder="专业"
          clearable
          class="filter-item"
          @change="getClbumList"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeClbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-date-picker
          v-model="dateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          style="width: 250px;margin-top: 3px;margin-left: 5px"
          class="filter-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期"
        />
        <el-input
          v-model="listQuery.keyword"
          placeholder="关键字"
          prefix-icon="el-icon-search"
          style="margin-left: 5px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right">
          <PermissionButton
            menu-no="_views_student_leave_detail_export"
            class-name="filter-item"
            type="primary"
            icon="el-icon-plus"
            name=""
            @click="exportDetail"
            round
          />
        <PermissionButton
          menu-no="_views_student_leave_total_export"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          @click="exportStatics"
          round
        />
        </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="学号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studyCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeGradeName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.startTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.endTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.state == 1?'审核中':(row.state == 2?'审核通过 ':(row.state == 3?'审核拒绝':'')) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.applyTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_student_leave_detail"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.leaveId}"
              v-if="row.state == 1"
              round
            />
            <PermissionButton
              menu-no="_views_student_leave_detailAudit"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.leaveId}"
              v-if="row.state > 1"
              round
            />
            <PermissionButton
            menu-no="_views_student_leave_audit"
            type="success"
            name=""
            v-if="row.state == 1"
            :page-jump="true"
            :page-query="{id: row.leaveId}"
            round
          />
            <PermissionButton
              v-if="row.dakaTime"
              menu-no="_views_student_leave_map"
              type="primary"
              name=""
              @click="showMap(row)"
              round
            />
          </template>


        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
    <el-dialog title="定位" :visible.sync="dialogFormVisible"
               v-loading="loading"
    >
    <baidu-map :style="{width:map.width,height:map.height}"
               class="map"
               ak="QESRXGTH3unGiZpCnns1bep6hOCH7erg"
               :zoom="map.zoom"
               :center="{lng: map.center.lng, lat: map.center.lat}"
               :mapClick="false"
               :scroll-wheel-zoom="true">
      <bm-marker :position="{lng: map.center.lng, lat: map.center.lat}" :dragging="false" >
        <bm-info-window :show="true">
          <div style="font-size: 14px;color: #ff7a0e">位置信息</div>
          <div style="font-size: 12px;color: #0a76a4;margin-top: 5px">{{posttion}}</div>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    </el-dialog>
  </div>
</template>
<script>
import YPageListLayout from '@/components/YPageListLayout'
import Breadcrumb from '@/components/Breadcrumb'
import PermissionButton from '@/components/PermissionButton/PermissionButton'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

import { BmBoundary, BmInfoWindow,BmMarker, BmLabel, BmContextMenu, BmContextMenuItem } from 'vue-baidu-map'

export default {
  name: 'ViewsRecruitPlanList',
  components: {
    Breadcrumb,
    YPageListLayout,
    PermissionButton,
    BaiduMap,
    BmMarker,
    BmLabel,
    BmInfoWindow
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      posttion:'',
      loading: false,
      dialogFormVisible: false,
      infoWindows: [],
      map: {
        width: '48vw',
        height: '50vh',
        center: {
          lng: 104.07,
          lat: 30.67,
        },
        zoom: 20,
      },
      opt: [
        {
          key: '',
          label: '全部'
        },{
        key: true,
        label: '是'
      }, {
        key: false,
        label: '否'
      }],
      grantType: [  {
        key: '',
        label: '全部'
      },{
        key: 1,
        label: '奖学金'
      }, {
        key: 2,
        label: '助学金'
      }],
      statisticsInfo:{},
      specialty: [],
      gradeInfo: [],
      classInfo:[],
      majorInfo:[],
      tableKey: 0,
      pageData: { },
      total: 0,
      listLoading: false,
      listQuery: {
        descs: 'id'
      },
      pagePara: {
        current: 0,
        size: 10
      },
      dateTime:[]
    }
  },
  created() {
    const that = this
    that.getList()
    that.getGradeList()
    this.getSpecialtyList()
    that.getStatistics()

  },
  methods: {
    showMap(row){
      this.dialogFormVisible = true
      this.posttion = row.position
      this.map.center.lat = row.lat
      this.map.center.lng = row.lon
    },
    exportStatics() {
      this.$utils.exportUtil('/leave/exportStatics', this.listQuery, '学生请假汇总')
    },
    exportDetail() {
      this.$utils.exportUtil('/leave/exportDetail', this.listQuery, '学生请假详情')
    },
    getStatistics() {
      let that = this
      that.$api.statistics.getStatistics('/leave/staticsPage', { ...that.listQuery }).then(data => {
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
    getGradeList() {
      const that = this
      that.$api.baseInfo.getGradeList().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.classInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getSpecialtyList() {
      const that = this
      that.$api.baseInfo.getSpecialtyList().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.majorInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getClbumList() {
      const that = this
      that.$api.baseInfo.getClbumList({
        gradeId: that.listQuery.administrativeGradeId,
        specialtyId: that.listQuery.administrativeSpecialtyId
      }).then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.gradeInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    resetSearch() {
      this.listQuery = { descs: 'id' }
      this.dateTime = []
      this.getList()
    },
    removeHandle(row) {
      // console.log(data)
      const that = this
      that.$confirm('确认删除当前记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$api.leave.delete(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
              this.getStatistics()
            }
          })
        })
        .catch(err => { console.error(err) })
    },
    getList() {
      const that = this
      this.listLoading = true
      if (that.dateTime) {
        that.listQuery.startTime = that.dateTime[0]
        that.listQuery.endTime = that.dateTime[1]
      } else {
        that.listQuery.startTime = ''
        that.listQuery.endTime = ''
      }
      this.$api.leave.list({ ...that.listQuery, ...that.pagePara }).then(res => {
        that.pageData = res.data
        that.getStatistics()
        setTimeout(() => {
          that.listLoading = false
        }, 200)
      }).catch(() => {
        that.listLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.right {
  flex: 1;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 35px;
    margin-bottom: 8px;
  }

  .menu-2-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .menu-2-item {
    display: flex;
    align-items: center;
    color: #656565;
    font-size: 12px;
    width: 230px;
    height: 101px;
    background: rgb(255, 185, 129);
    border-radius: 3px;
    padding-left: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    .text {
      margin-left: 16px;
    }
  }
}
</style>
