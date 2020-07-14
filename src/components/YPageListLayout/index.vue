<template>
    <div class="y-page-list-layout">
      <div class="y-info" v-if="$slots.left || $slots.right">
        <div class="y-left">
          <slot name="left"></slot>
        </div>
        <div class="y-right">
          <slot name="right"></slot>
        </div>
      </div>
      <template>
        <slot name="table"></slot>
      </template>
      <pagination v-show="pageList.total>0" :total="pageList.total" :page.sync="pagePara.current" :limit.sync="pagePara.size" @pagination="getPageList" />
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
      }
    }
</script>

<style lang="scss" scoped>
 .y-page-list-layout{
   margin-top: 12px;
   background-color: #fff;
   padding: 17px;
   .y-info{
     display: flex;
     justify-content:space-between;
     margin-bottom: 12px;
   }
 }
</style>
