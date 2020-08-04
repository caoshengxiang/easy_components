<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="listQuery" :getPageList="getList">
      <template slot="left"></template>
      <template slot="right">
        <span style="color: #cccccc;font-size: 10px;">(编辑完成上课信息，点击保存)</span>
        <el-button round class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="save">
          保存
        </el-button>
      </template>
      <div slot="table">
        <div>

        </div>

        <el-table
          v-loading="listLoading"
          :data="pageData.records"
          fit
          highlight-current-row
        >
          <el-table-column label="序号" align="center" min-width="60">
            <template slot-scope="{row, $index}">
              <el-input v-model="row.seq"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="时间段" min-width="100" align="center">
            <template slot-scope="{row}">
              <!--          <span>{{ row.name }}</span>-->
              <el-select v-model="row.period" clearable filterable placeholder="请选择" class="filter-item">
                <el-option label="上午" value="上午"></el-option>
                <el-option label="下午" value="下午"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="节次" min-width="150" align="center">
            <template slot-scope="{row}">
              <!--          <span>{{ row.des }}</span>-->
              <el-input v-model="row.segment"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="课间活动" min-width="100" align="center">
            <template slot-scope="{row}">
              <!--          <span>{{ row.des }}</span>-->
              <el-select v-model="row.ifBreaktime" clearable filterable placeholder="请选择" class="filter-item">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="上课时间" min-width="200" align="center">
            <template slot-scope="{row}">
              <el-time-picker
                v-model="row.time"
                is-range
                value-format="HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                style="width: 100%"
              >
              </el-time-picker>
            </template>
          </el-table-column>
          <el-table-column label="创建人" min-width="150" align="center">
            <template slot-scope="{row}">
              <span>{{ row.creatorName }} </span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="150" align="center">
            <template slot-scope="{row}">
              <span>{{ row.created }} </span>
            </template>
          </el-table-column>
          <el-table-column label="编辑" align="center" width="250" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" round size="mini" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-button style="margin: 10px auto;" type="primary" icon="el-icon-plus" @click="addRow">
            添加数据列
          </el-button>
        </div>
      </div>
    </y-page-list-layout>
  </div>
</template>
<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ClassTime',
    components: {
      Breadcrumb,
      YPageListLayout,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        value: null,
        tableKey: 0,
        listLoading: false,
        dialogFormVisible: false,
        pageData: { records: [] },
        total: 0,
        listQuery: {
          page: 1,
          size: 200,
          termId: this.$route.query.id,
          descs: 'id',
        },
        delArr: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        const that = this
        that.listLoading = false
        this.delArr = []
        this.$api.termCourseSchedule.list(that.listQuery).then(res => {
          that.pageData.records = res.data.records.map(item => {
            if (item.startTime && item.endTime) {
              item.time = [item.startTime, item.endTime]
            }
            return item
          })
          setTimeout(() => {
            that.listLoading = false
          }, 200)
        }).catch(() => {
          that.listLoading = false
        })
      },
      save() {
        const records = this.pageData.records.map(item => {
          if (item.time && item.time.length) {
            item.startTime = item.time[0]
            item.endTime = item.time[1]
          }
        })
        const pa = {
          data: records,
          del: this.delArr
        }
        // console.log(this.pageData.records, this.pageData.records.concat(this.delArr))
        this.$api.termCourseSchedule.edit({
          id: this.$route.query.id,
          list: this.pageData.records.concat(this.delArr)
        }).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        })
      },
      handleDelete(row, index) {
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            that.pageData.records.splice(index, 1)
            if (row.id) {
              row.deleted = true
              this.delArr.push(row)
            }
          })
          .catch(err => { console.error(err) })
      },
      addRow() {
        this.pageData.records.push({
          seq: '',
          time: '',
          period: '',
          ifBreaktime: false,
          termId: this.$route.query.id
        })
      }
    }
  }
</script>
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
  }
</style>
