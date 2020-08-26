<template>
    <div class="y-page-list-layout">
      <div class="y-info" v-if="$slots.left || $slots.right">
        <div class="y-left">
          <slot name="left"></slot>
        </div>
        <div class="y-right">
          <slot name="right"></slot>
          <el-dropdown trigger="click" v-show="showExportBox">
            <el-button type="primary" round>
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <div class="y-page-list-export-box" ref="exportBtnBox"></div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <template>
        <slot name="table"></slot>
      </template>
      <pagination style="border: 1px solid #EBECED" v-if="pageList.total>0" :total="pageList.total" :page.sync="pagePara.current" :limit.sync="pagePara.size" @pagination="getPageList" />
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
    export default {
        name: "y-page-list-layout",
      components: {Pagination},
      props: {
        pageList: {
          type: Object,
          default:function () {
            return {
              total:0
            }
          }
        },
        pagePara:{
          type: Object,
          default:function () {
            return {}
          }
        },
        getPageList: {
          type: Function,
          default: function(){

          }
        }
      },
      data(){
          return{
            showExportBox:false
          }
      },
      mounted(){
          const that = this
        if (that.$slots.right && that.$slots.right.length > 0){
          let exportCount = 0
          that.$slots.right.forEach(function (item) {
            if (item.elm.innerText.indexOf('导出') > -1) {
              exportCount++
            }
          })
          if (exportCount > 1){
            that.$slots.right.forEach(function (item) {
              if (item.elm.innerText.indexOf('导出') > -1) {
                that.$refs.exportBtnBox.append(item.elm)
              }
            })
            that.showExportBox = true
          }
        }
      },
    }
</script>
<style lang="scss">
  .y-page-list-layout{
    .y-left {
      .el-input--small .el-input__inner {
        border-radius: 20px;
      }
      .el-input-group {
        .el-input__inner {
          border-radius: 0 !important;
        }
      }
    }
  }
  .y-page-list-export-box{
    padding: 15px;
  }
</style>
<style lang="scss" scoped>
 .y-page-list-layout{
   margin-top: 8px;
   background-color: #fff;
   padding: 17px;
   .y-info{
     display: flex;
     justify-content:space-between;
     margin-bottom: 12px;
   }
 }
</style>
