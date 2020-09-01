<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleSave" :edit-status="true">
      <span style="position: relative;top: 30px;">{{$route.query.year}} 标准值与目标值设置</span>
      <div class="data-fill">
        <div class="data-fill-l">
        </div>
        <div class="data-fill-r">
          <parentTable v-loading="listLoading" :data="pageData" :no-page="true" slot="table" style="width: 100%;">
            <el-table-column label="指标编号" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.number }}
              </template>
            </el-table-column>
            <el-table-column label="指标名称" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column label="标准值" prop="id" align="center">
              <template slot-scope="{row}">
                <fill-type v-model="row.standardValue" :type="row.type" :remark="row.remark" :row="row"></fill-type>
              </template>
            </el-table-column>
            <el-table-column label="目标值" prop="id" align="center">
              <template slot-scope="{row}">
                <fill-type v-model="row.targetValue" :type="row.type" :remark="row.remark" :row="row"></fill-type>
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="id" align="center">
              <template slot-scope="{row}">
                {{ row.type && indicatorTypeName()(row.type) }}
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
  import fillType from '../dataFilling/fillType'
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
        pageData: [],
        listLoading: false,
      }
    },
    watch: {
      // detailInfo: function (value) {
      //   this.postForm = value
      // },
    },
    created() {
      // let that = this
      // if (this.detailInfo) {
      //   this.postForm = this.detailInfo
      // } else {
      //   this.getDetail()
      // }
      this.getDetail()
    },
    methods: {
      ...mapGetters('enumerate', [
        'indicatorTypeName',
        'indicatorFillWayName',
      ]),
      getDetail() {
        if (this.dataId) {
          this.listLoading = true
          this.pageData = []
          this.$api.diagnosis.indicatorYearStandardDetail({
            indicatorYearStandardId: this.dataId,
          }).then(res => {
            this.pageData = res.data
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
        } else {
          this.$router.push('/views/diagnosis/valueSetting/list')
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
          if (!checkVal(item.type, item.standardValue)) {
            vaild = false
          }
          if (!checkVal(item.type, item.targetValue)) {
            vaild = false
          }
          if (item.standardValue && item.targetValue && item.targetValue <= item.standardValue) {
            vaild = false
          }
          let p = {
            id: item.id,
            indicatorId: item.indicatorId,
            indicatorYearStandardId: this.dataId,
            standardValue: item.standardValue,
            targetValue: item.targetValue,
          }
          if (p.standardValue || p.targetValue) {
            param.push(p)
          }
        })
        if (vaild) {
          this.$api.diagnosis.indicatorYearStandardAdd(param).then(res => {
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
            message: '请按类型填写且目标值应大于标准值',
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
      width: 0px;
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
