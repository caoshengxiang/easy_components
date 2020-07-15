<template>
    <div class="y-detail-page-layout">
      <slot></slot>
      <div class="y-options" v-if="$slots.default">
        <template v-if="!isEdit">
          <el-button type="primary" round @click="isEdit = true">编辑</el-button>
        </template>
        <template v-else>
          <el-button type="primary" round @click="save">保存</el-button>
          <el-button type="info" round @click="isEdit = false">取消</el-button>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      watch:{
          editStatus:function (value) {
            this.isEdit = value;
          }
      },
      props: {
        //编辑状态
        editStatus: {
          type: Boolean,
          default:false
        },
        //保存方法
        save: {
          type: Function,
          default: function(){

          }
        }
      },
      data(){
          return{
            isEdit:this.editStatus
          }
      }
    }
</script>

<style lang="scss" scoped>
  .y-detail-page-layout{
    background-color: #fff;
    margin-top: 12px;
    position: relative;
    .y-options{
      position: absolute;
      right: 9px;
      top:9px;
    }
  }
</style>
<style scoped>
  .y-detail-page-layout>>>.el-tabs__item{
    height: 50px;
    line-height: 50px;
  }
  .y-detail-page-layout>>>.el-tabs__item.is-top:nth-child(2){
    padding-left: 20px;
  }
  .y-detail-page-layout>>>.el-tabs__content{
    padding: 17px;
  }
  .y-detail-page-layout>>>.el-tabs__nav-wrap::after{
    height: 1px;
  }
</style>
