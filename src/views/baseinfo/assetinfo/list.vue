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
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.totalArea }}</span>平方米</div>
            <div class="analysis-text-small">占地面积</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.aloneArea }}</span>平方米</div>
            <div class="analysis-text-small">独立产权面积</div>
          </div>
        </div>
      </div>
    </div>

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
        <el-select
          v-model="listQuery.status"
          default-value="0"
          placeholder="使用状况"
          clearable
          style="margin-left: 20px;width: 200px"
          class="filter-item"
        >
          <el-option v-for="item in useStatus" :key="item.name" :label="item.name" :value="item.name"/>
        </el-select>
        <el-select
          v-model="listQuery.user"
          default-value="0"
          placeholder="用途"
          clearable
          style="margin-left: 20px;width: 200px"
          class="filter-item"
        >
          <el-option v-for="item in purpose" :key="item.name" :label="item.name" :value="item.name"/>
        </el-select>
        <el-input
          v-model="listQuery.addr"
          placeholder="地址"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" style="margin-left: 20px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="土地产权" prop="id" align="center">
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
            <span>{{ row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column label="土地证号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.certificateNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="{row}">
            <span>{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="160">
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
            />
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
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>

  </div>
</template>
<script>
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'ViewsBaseinfoAssetinfoList',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
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
        purpose: []
      }
    },
    created() {
      const that = this
      that.getList()
      that.getStatistics()

      that.getByTypeId('purpose')
      that.getByTypeId('useStatus')
    },
    methods: {
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'useStatus':
                that.useStatus = data.data
                break
              case 'purpose':
                that.purpose = data.data
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
      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/statistics/land/area', { ...that.listQuery }).then(data => {
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
        that.listLoading = true
        that.$api.assetinfo.getLandPage({ ...that.listQuery, ...that.pagePara }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            that.getStatistics()
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
