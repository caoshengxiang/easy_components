<template>
  <div class="app-container">
    <div class="filter-container" style="float: left">
      <el-date-picker v-model="listQuery.displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" prefix-icon="el-icon-search"   class="filter-item" placeholder="时间范围" />
      <el-input v-model="listQuery.title" placeholder="Title" style=" padding-left: 20px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style=" padding-left: 20px;width: 200px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style=" padding-left: 20px;width: 200px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style=" padding-left: 20px;width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>

    </div>
    <div class="filter-container" style="float: right">
      <el-input v-model="listQuery.description" placeholder="文本描述" prefix-icon="el-icon-search"  style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-edit" @click="handleCreate">
        导入
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;"  icon="el-icon-edit" @click="handleCreate">
        导出
      </el-button>

      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table

      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTimeNew('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" >{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: {Pagination},
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      parseTimeNew(time, cFormat) {
        if (arguments.length === 0) {
          return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
          date = time
        } else {
          if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
          }
          if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
          }
          date = new Date(time)
        }
        const formatObj = {
          y: date.getFullYear(),
          m: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          i: date.getMinutes(),
          s: date.getSeconds(),
          a: date.getDay()
        }
        const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
          const value = formatObj[key]
          // Note: getDay() returns 0 on Sunday
          if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
          return value.toString().padStart(2, '0')
        })
        return time_str
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
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
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id',
          description:'',
          displayTime:''
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
      }
    },
    created(){
      let that = this;
      that.getList();
    },
    methods:{
      getList(){
        let that = this;
        console.log(that.listQuery);
        that.list =[{
          "id": 21,
          "timestamp": 635739192277,
          "author": "Karen",
          "reviewer": "Frank",
          "title": "Mdnpaih Tgyc Hiihitdqh Rlrr Pvjs Ndwcwvkc Nkuvc",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 41.53,
          "importance": 2,
          "type": "US",
          "status": "published",
          "display_time": "2005-01-22 22:56:56",
          "comment_disabled": true,
          "pageviews": 3622,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 22,
          "timestamp": 1579602526356,
          "author": "Linda",
          "reviewer": "Edward",
          "title": "Mperfi Xgy Xqprtp Yyejdno Jjjjx Asngpr",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 68.42,
          "importance": 2,
          "type": "US",
          "status": "draft",
          "display_time": "2018-01-15 14:53:47",
          "comment_disabled": true,
          "pageviews": 4618,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 23,
          "timestamp": 1097213202845,
          "author": "Patricia",
          "reviewer": "Steven",
          "title": "Fmjundk Myqpudqvns Uopyn Eusnneph Gwipqrt",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 78.47,
          "importance": 1,
          "type": "US",
          "status": "draft",
          "display_time": "1977-07-12 20:53:37",
          "comment_disabled": true,
          "pageviews": 483,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 24,
          "timestamp": 87395187329,
          "author": "Shirley",
          "reviewer": "Brian",
          "title": "Twdmvvq Eehoqhmrz Vkuyt Dcjuww Irigzmwp Haspxfri Vdcq Ptzl Fupyixjhj",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 94.84,
          "importance": 1,
          "type": "US",
          "status": "published",
          "display_time": "1970-07-03 05:13:45",
          "comment_disabled": true,
          "pageviews": 1702,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 25,
          "timestamp": 194396722869,
          "author": "Richard",
          "reviewer": "Cynthia",
          "title": "Yhgbl Vtzomq Jvwdpiofi Expe Uvuxd Cfhau Hbehmbn Umlnqodzh Vokdcmlxv",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 71.87,
          "importance": 2,
          "type": "JP",
          "status": "published",
          "display_time": "1981-11-18 11:14:13",
          "comment_disabled": true,
          "pageviews": 2327,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 26,
          "timestamp": 19994375644,
          "author": "Thomas",
          "reviewer": "Edward",
          "title": "Utyupr Pnvwo Koubtgmb Yxoxbhukv Bthhgboy Rgbwscncnv Qffishhf",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 11.12,
          "importance": 2,
          "type": "US",
          "status": "draft",
          "display_time": "1992-08-21 08:55:59",
          "comment_disabled": true,
          "pageviews": 2064,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 27,
          "timestamp": 876348141288,
          "author": "Mary",
          "reviewer": "William",
          "title": "Jytaqnl Cwpynd Axyod Reuzgfqvod Jjlxkk Qapcdutduj Biakx Wlwzi",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 30.48,
          "importance": 3,
          "type": "CN",
          "status": "draft",
          "display_time": "2017-07-03 17:11:46",
          "comment_disabled": true,
          "pageviews": 2228,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 28,
          "timestamp": 1010177360851,
          "author": "Angela",
          "reviewer": "Laura",
          "title": "Nwvtiqoj Ilyfb Ggsw Pnvbonslp Jfhuksbboo Rbqk",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 27.18,
          "importance": 1,
          "type": "JP",
          "status": "published",
          "display_time": "1970-09-13 18:01:08",
          "comment_disabled": true,
          "pageviews": 1698,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 29,
          "timestamp": 101963956541,
          "author": "Steven",
          "reviewer": "Cynthia",
          "title": "Uvwfykdg Zvehpt Wovyicg Hyxmovmm Sedrq Lwhttf Bphnmtd Mspav Kcjdmv Qeogjpxnz",
          "content_short": "mock data",
          "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
          "forecast": 58.13,
          "importance": 2,
          "type": "US",
          "status": "published",
          "display_time": "1992-04-16 17:17:14",
          "comment_disabled": true,
          "pageviews": 2532,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        },
          {
            "id": 30,
            "timestamp": 890625355108,
            "author": "David",
            "reviewer": "Margaret",
            "title": "Uumx Ltbht Ehycsdu Fcgsmip Rbbsyokf",
            "content_short": "mock data",
            "content": "<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>",
            "forecast": 80.13,
            "importance": 2,
            "type": "US",
            "status": "draft",
            "display_time": "1982-06-11 03:44:20",
            "comment_disabled": true,
            "pageviews": 986,
            "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
            "platforms": ["a-platform"]
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
