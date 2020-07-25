<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <!-- <div class="right">
       <div class="menu-2-box">
         <div
           :key="index"
           class="menu-2-item hvr-underline-from-center"
         >
           <i class="easy-icon easy-icon-avatar" /> <span class="text">占地面积100 平方米</span>
         </div>
         <div
           :key="index"
           class="menu-2-item hvr-underline-from-center"
         >
           <i class="easy-icon easy-icon-avatar" /> <span class="text">独立产权面积100 平方米</span>
         </div>
       </div>

     </div>-->
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" round type="primary" @click="$utils.routerLink(`/views/baseinfo/assetinfo/detail`)">-->
        <!--          新增用地-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_baseinfo_assetinfo_add"
          class-name="filter-item"
          round
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-input
          v-model="listQuery.keyword"
          placeholder="用地编号或名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </template>
      <template slot="right">
        <el-button class="filter-item" round type="primary" @click="searchList">
          搜索
        </el-button>
      </template>
      <el-table
        :key="tableKey"
        slot="table"
        v-loading="listLoading"
        :data="pageData.records"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="土地产权" prop="id" sortable="custom" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.property }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="使用状况" align="center">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="校区" align="center">
          <template slot-scope="{row}">
            <span>{{ row.campus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用途" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.user }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="面积(平方米)" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column label="土地证号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.certificateNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
<!--            <el-button type="primary" round size="mini" @click="detail(row.id)">-->
<!--              编辑-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_edit"
              class-name="filter-item"
              name=""
              type="primary"
              round
              size="mini"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
            </PermissionButton>
<!--            <el-button type="primary" round size="mini" @click="deleteInfo(row.id)">-->
<!--              删除-->
<!--            </el-button>-->
            <PermissionButton
              menu-no="_views_baseinfo_assetinfo_list_remove"
              class-name="filter-item"
              name=""
              type="danger"
              round
              size="mini"
              @click="deleteInfo(row.id)"
            >
            </PermissionButton>
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>

  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
    },
    data() {
      return {
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          dormitoryId: 0
        },
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      searchList() {
        const that = this
        that.pagePara.current = 0

        that.getList()
      },
      deleteInfo(id) {
        const that = this
        that.$confirm('请确认是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.$api.assetinfo.deleteLand({ id: id }).then(data => {
            that.loading = false
            if (data.code === 200) {
              that.getList()
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }).catch(() => {
        })
      },
      add() {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/assetinfo/detail',
          query: {
            type: 'add'
          }
        })
      },
      detail(id) {
        const that = this
        that.$router.push({
          path: '/views/baseinfo/assetinfo/detail',
          query: {
            id: id,
            type: 'add'
          }
        })
      },
      getList() {
        const that = this
        that.$api.assetinfo.getLandPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.loading = false
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
        that.listLoading = false
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
