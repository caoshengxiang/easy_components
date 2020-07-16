<template>
    <div class="y-user-select">
      <el-tree
        :data="organizationData"
        show-checkbox>
      </el-tree>
    </div>
</template>

<script>
    export default {
        name: "YUserSelect",
      data(){
          return{
            treeProps:{
              label: 'name',
              children: 'zones',
              isLeaf: 'leaf'
            },
            organizationData:[]
          }
      },
      created(){

      },
      methods:{
        getOrganizationList(){
          const that = this;
          that.$api.common.getOrganizationList({size:999}).then(res => {
            if(res.code === 200){
              that.organizationData = res.data;
            }else{
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
