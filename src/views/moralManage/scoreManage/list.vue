<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">优：{{ statisticsInfo.excellentTotal || 0 }}人 </span></div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">良：{{ statisticsInfo.goodTotal || 0 }}人 </span></div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p3.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">中：{{ statisticsInfo.mediumTotal || 0 }}人 </span></div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/p4.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">差：{{ statisticsInfo.poorTotal || 0 }}人 </span></div>
        </div>
      </div>
    </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_moralManage_scoreManage_detail"
          class-name="filter-item"
          round
          type="primary"
          name=""
          :page-jump="true"
        />
          <service-select
            v-model="listQuery.gradeId"
            name="name"
            field="id"
            :data-service="$api.baseInfo.getGradeList"
            placeholder="年级"
            style="margin-left: 10px"
            clearable
          />
          <service-select
            v-model="listQuery.specialtyId"
            name="name"
            field="id"
            :data-service="$api.baseInfo.getSpecialtyList"
            placeholder="专业"
            style="margin-left: 10px"
            clearable
          />
          <service-select
            v-model="listQuery.clbumId"
            name="name"
            field="id"
            :data-service="$api.baseInfo.getClbumList"
            placeholder="班级"
            style="margin-left: 10px"
            clearable
          />
        <el-input v-model="listQuery.name" placeholder="姓名"
                  style="margin-left: 10px;width:150px"/>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          @click="searchList"
          round
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery={}">
          重置
        </el-button>
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="学期" prop="term" />
      <el-table-column label="学号" align="center" prop="studyCode" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="专业" align="center" prop="specialty" />
      <el-table-column label="年级" align="center" prop="grade" />
      <el-table-column label="班级" align="center" prop="clbum" />
      <el-table-column label="操行分" align="center" prop="score" />
      <el-table-column label="操行等级" align="center" prop="rank" />
<!--      <el-table-column label="操作" fixed="right" align="center" width="220px">-->
<!--        <template v-slot="{ row }">-->
<!--          <PermissionButton-->
<!--            menu-no="_views_moralManage_scoreManage_userScore"-->
<!--            name=""-->
<!--            type="primary"-->
<!--            @click="detail(row.id)"-->
<!--            round-->
<!--          >-->
<!--          </PermissionButton>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </parentTable>

    </y-page-list-layout>
  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'ViewsBaseinfoAssetinfoList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout,
      ServiceSelect
    },
    data() {
      return {
        statisticsInfo: {},
        listLoading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
        },
      }
    },
    created() {
      const that = this
      that.getList()
      that.getStatistics()
    },
    methods: {

      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/conductAssessment/stat', { ...that.listQuery }).then(data => {
          if (data.code === 200) {
            let { list = [] } = data.data
            list.forEach( item => {
              switch (item.key) {
                case '优':
                  that.statisticsInfo.excellentTotal = item.value
                  break;
                case '良':
                  that.statisticsInfo.goodTotal = item.value
                  break;
                case '中':
                  that.statisticsInfo.mediumTotal = item.value
                  break;
                case '差':
                  that.statisticsInfo.poorTotal = item.value
                  break;
              }
            })

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
      add() {
        const that = this
        that.$router.push({
          path: '/views/moralManage/commentManage/detail',
          query: {
            type: 'add',
            back: this.$route.fullPath
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/moralManage/scoreManage/userScore',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.scoreManage.getPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            // that.getStatistics()
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
