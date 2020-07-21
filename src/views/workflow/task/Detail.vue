<template>
  <div class="app-container task-detail">
    <div class="title-container task-title">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <detail  :detailInfo="this.formData"></detail>
    <detail  :detailInfo="this.originData"></detail>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import detail from '@/views/baseinfo/assetinfo/detail'
    export default {
        name: "WorkflowDetail",
      components: {Breadcrumb,detail},
      props: {
        //保存方法
        detailInfo: {
          type: Object,
          default: {}
        }
      },
      data(){
        return{
          form:{},
          formData:{},
          originData:{}
        }
      },
      created(){
          let that = this
          that.getDetail()
      },
      methods:{
        getDetail(){
          const that = this;
          that.$api.task.getDetail(that.$route.query.id).then(res => {
            if(res.code === 200){
              //返回成功
              that.formData = res.data.formData;
              that.originData = res.data.originData;
              console.log("that.originData")
              console.log(that.formData)
              console.log(that.originData)

            }
            else{
              that.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
<style scoped>
  .task-detail >>>.title-container:not(.task-title){
    display: none !important;
  }
</style>
