<template>
  <div class="app-container">
    <div style="width: 100%;float: right;border-bottom:1px solid #e4ecf9;">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left" />
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 60px"
    >
      <el-table-column label="学号"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名"   align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业"align="center">
        <template slot-scope="{row}">
          <span>{{ row.content_short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级"  align="center">
        <template slot-scope="{row}">
          <span >{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="{row}">
          <span >{{ row.content1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center">
        <template slot-scope="{row}">
          <span >{{ row.content2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" class-name="status-col" >
        <template slot-scope="{row}">
          <span >{{ row.content3 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="内务考核" prop="id" sortable="custom" align="center">
        <template slot-scope="{row}">
            <span  class="link-type">
          <router-link tag="a" :to="{path:'/dormitory/checkRecord',query:{id: row.id}}"
                       class="routerWork">{{ row.id }}
          </router-link>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="纪律考核" prop="id" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span  class="link-type">
          <router-link tag="a" :to="{path:'/dormitory/dormitoryCheckRecord',query:{id: row.id}}"
                       class="routerWork">{{ row.id }}
          </router-link>
            </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'ComplexTable',
    components: {Pagination,Breadcrumb},
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
        displayTime:'',
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          sort: '+id',
          description:'',
          displayTime:''
        },
        gradeInfo: [{label:"全部",value:0},{label:"一年级",value:1}, {label:"二年级",value:2}, {label:"三年级",value:3}],
        classInfo:[{label:"全部",value:0},{label:"一班",value:1}, {label:"二班",value:2}, {label:"三班",value:3}],
        majorInfo:[{label:"全部",value:0},{label:"数学",value:1}, {label:"软件",value:2}, {label:"英语",value:3}],
        IsFull:[{label:"全部",value:0},{label:"未住",value:1}, {label:"未住满",value:2}, {label:"已住满",value:3}],
      }
    },
    created(){
      let that = this;
      console.log(this.$route.query.id)
      that.getList();
    },
    methods:{
      handleDelete(row, index) {
        let that = this;
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            that.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })

      },
      getList(){
        let that = this;
        console.log(that.listQuery);
        that.list =[{
          "id": 21,
          "timestamp": 100001,
          "title": "杨大帅",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 22,
          "timestamp":  1000011,
          "title": "陈晓",
          "content_short": '数学',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 23,
          "timestamp": 1000012,
          "title": "易中天",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 24,
          "timestamp": 1000013,
          "title": "刘德华",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }, {
          "id": 25,
          "timestamp": 1000041,
          "title": "刘亦菲",
          "content_short": '软件',
          "content": '年级',
          "content1": '班级',
          "content2": '杨再林',
          "content3": '15196637504'
        }]

        that.listLoading = false;
      },
      handleDelete(row, index) {
        let that = this;
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            that.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })

      },
    }
  }
</script>
