<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleSave" :edit-status="true">
      <div class="data-fill">
        <div class="data-fill-l">
          <ul>
            <li v-for="(level1, index) in tree" :key="index">
              <div class="l1-name">{{level1.name}}</div>
              <ul>
                <li class="l2-name" :class="{'l2-name-active': level2Id === lev2.id}"
                    v-for="(lev2, index) in level1.indicatorTreeDTOS" :key="index"
                    @click="getIndex(lev2.id)"
                >{{lev2.name}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="data-fill-r">
          <parentTable v-loading="listLoading" :data="pageData" :no-page="true" slot="table" style="width: 100%;">
            <el-table-column label="指标编号" prop="id" align="center" width="80">
              <template slot-scope="{row}">
                {{ row.number }}
              </template>
            </el-table-column>
            <el-table-column label="指标名称" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column label="当年指标值" prop="id" align="center">
              <template slot-scope="{row}">
                <fill-type v-model="row.currentValue" :type="row.type" :remark="row.remark" :row="row"></fill-type>
              </template>
            </el-table-column>
            <el-table-column label="上年指标值" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.lastValue }}
              </template>
            </el-table-column>
            <el-table-column label="对比" prop="id" align="center" width="90">
              <template slot-scope="{row}">
                {{comparedYearData(row.type, row.currentValue, row.lastValue) }}
              </template>
            </el-table-column>
            <el-table-column label="标准值" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.standardValue }}
              </template>
            </el-table-column>
            <el-table-column label="目标值" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.targetValue }}
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="id" align="center" width="80">
              <template slot-scope="{row}">
                {{ row.type && indicatorTypeName()(row.type) }}
              </template>
            </el-table-column>
            <el-table-column label="帮助" prop="id" align="center" width="50">
              <template slot-scope="{row}">
                <el-tooltip class="item" effect="dark" :content="row.remark || '请根据类型填写！'" placement="top-end">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </parentTable>
        </div>
      </div>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import fillType from './fillType'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      fillType,
    },
    // props: {
    //   detailInfo: {
    //     type: Object,
    //     default() {
    //       return null
    //     }
    //   }
    // },
    data() {
      return {
        dataId: this.$route.query.id,
        level2Id: null,
        tree: [],
        pageData: [],
        listLoading: false,
      }
    },
    watch: {
      // detailInfo: function (value) {
      //   this.postForm = value
      // },
      level2Id(val) {
        if (val) {
          this.getDetail()
        }
      }
    },
    created() {
      // let that = this
      // if (this.detailInfo) {
      //   this.postForm = this.detailInfo
      // } else {
      //   this.getDetail()
      // }
      this.getTree()
    },
    methods: {
      ...mapGetters('enumerate', [
        'indicatorTypeName',
        'indicatorFillWayName',
      ]),
      comparedYearData(type, last, current) {
        if ((type === 2 || type === 3) && last && current) {
          return current - last
        }
      },
      getIndex(id) {
        this.level2Id = id
      },
      getTree() {
        this.$api.diagnosis.indicatorTree().then(res => {
          this.tree = res.data
          this.level2Id = res.data[0].indicatorTreeDTOS[0].id
        })
      },
      getDetail() {
        if (this.dataId) {
          this.listLoading = true
          this.$api.diagnosis.indicatorYearData({
            indicatorId: this.level2Id,
            indicatorYearId: this.dataId,
            // diagnosisId: null,
          }).then(res => {
            this.pageData = res.data
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
        } else {
          this.$router.push('/views/diagnosis/dataFilling/list')
        }
      },
      handleSave() {
        const checkVal = (type, value) => {
          let status = true
          if (type === 1) {
            // 字符串
          } else if (type === 2) {
            // 整数
            if (!value || /^\+?[1-9][0-9]*$/.test(value)) {
              //
            } else {
              status = false
            }
          } else if (type === 3) {
            // 小数
            if (!value || /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)) {
              //
            } else {
              status = false
            }
          } else if (type === 4) {
            /*是/否,*/
          } else if (type === 5) {
            /*百分数*/
            if (!value || /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)) {
              //
            } else {
              status = false
            }
          } else if (type === 6) {
            /*表格*/
          } else if (type === 7) {
            /*文本*/
          } else if (type === 8) {
            /*下拉选项*/
          }
          return status
        }
        let vaild = true
        let param = []
        this.pageData.forEach(item => {
          if (!checkVal(item.type, item.currentValue)) {
            vaild = false
          }
          let p = {
            id: item.id,
            indicatorId: item.indicatorId,
            indicatorYearId: this.dataId,
            data: item.currentValue
          }
          if (p.data) {
            param.push(p)
          }
        })
        if (vaild) {
          this.$api.diagnosis.indicatorYearDataModifyNum(param).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
          console.log('验证不通过！')
          this.$notify({
            title: '成功',
            message: '请按类型填写',
            type: 'error',
            duration: 2000
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  /*@import "~@/styles/mixin.scss";*/
  .data-fill {
    display: flex;

    .data-fill-l {
      width: 240px;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      box-shadow: 1px 2px 7px 0px rgba(190, 190, 190, 0.2);

      ul, li {
        padding: 0;
        margin: 0;
        list-style: none
      }

      .l1-name {
        height: 40px;
        background: #e5f3fd;
        color: #343434;
        line-height: 40px;
        padding-left: 10px;
        font-size: 15px;
      }

      .l2-name {
        font-size: 14px;
        font-weight: 500;
        color: #343434;
        padding-left: 30px;
        line-height: 35px;
        cursor: pointer;
      }

      .l2-name-active {
        color: #028EED;
        position: relative;

        &:before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 35px;
          background: #028EED;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }

    .data-fill-r {
      flex: 1;
      margin-top: 45px;
      box-shadow: 1px 2px 7px 0px rgba(190, 190, 190, 0.2);
    }
  }
</style>
