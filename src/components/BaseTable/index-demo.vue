<template>
  <div class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <span class="com-bar-item"><el-button type="primary" @click="add">添加</el-button></span>
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.keyword"
                placeholder="请输入关键词"
                clearable
              />
            </span>
            <span class="com-bar-item">
              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              <el-button type="primary" plain @click="moreShow = !moreShow">更多
                <i v-if="!moreShow" class="el-icon-arrow-right el-icon--right" />
                <i v-else class="el-icon-arrow-up el-icon--right" />
              </el-button>
            </span>
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <el-col :xs="24" :sm="6">
                <el-date-picker
                  v-model="value1"
                  style="width: 260px;"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-select v-model="searchForm.value" clearable placeholder="是否有摄像头">
                  <el-option label="有摄像头" :value="1" />
                  <el-option label="无摄像头" :value="0" />
                </el-select>
              </el-col>
              <el-row :gutter="20" style="padding-left: 90px;">
                <el-col :xs="24" :sm="6">
                  <el-button icon="el-icon-search" type="primary" style="width: 100%;margin-bottom: 14px" @click="search('searchForm')">查 询
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="6">
                  <el-button style="width: 100%;margin-bottom: 14px;" @click="resetForm('searchForm')">重 置</el-button>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="con">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @pageQueryChange="pageQueryChange"
        >
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">图片</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">地图</el-button>
            </template>
          </el-table-column>
        </fixed-thead>
      </div>
    </div>
  </div>
</template>

<script>
  import FixedThead from '@/components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet_demo'

  export default {
    name: 'FenceIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          keyword: '',
          name: '',
          focused: '',
          capacityStart: '',
          capacityEnd: ''
        },
        pageForm: {
          size: 20,
          current: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead,
        /**/
        value1: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      pageQueryChange(pageForm) {
        this.pageForm = pageForm
        this.getList()
      },
      resetForm(formName) {
        this.searchForm.keyword = ''
        this.searchForm.capacityStart = ''
        this.searchForm.capacityEnd = ''
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.loading = true
        this.$api.fence.list(Object.assign({},
          this.pageForm,
          this.searchForm
        )).then(res => {
          const { data } = res
          this.total = data.total
          this.tableData = data.records
          this.loading = false
        }).catch(() => { this.loading = false })
      },
      /**/
      add() {
        this.$router.push({ name: 'fence-add' })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
