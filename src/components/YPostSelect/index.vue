<template>
    <div class="y-post-select">
      <!--<el-tree-->
        <!--:data="organizationData"-->
        <!--:props="treeProps"-->
        <!--ref="organizationTree">-->
      <!--</el-tree>-->
      <el-dialog
        :title="title"
        :visible="dialogRecStatus"
        center
        :show-close="false"
      >
        <el-transfer
          :props="{
          key: 'id',
          label: 'name'
        }"
          v-model="postSelectResultList"
          :data="postListData"
          filterable
          filter-placeholder="输入岗位，模糊查询"
          :titles="['待选岗位','已选岗位']">
          <el-popover
            slot-scope="{ option }"
            placement="top-start"
            title="所属岗位"
            width="200"
            trigger="hover"
            :content="getPostsAllName(option)">
            <span slot="reference">{{ option.name }}</span>
          </el-popover>
          <div slot="left-footer" style="text-align: center;padding: 5px 0;">
            <el-button type="warning" class="transfer-footer" size="mini" round>高级搜索</el-button>
            <el-button type="info" class="transfer-footer" size="mini" round>重置</el-button>
          </div>
        </el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSelectUser">确 定</el-button>
          <el-button @click="selectCancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "YPostSelect",
      watch:{
        value:function (value) {
          this.dialogRecStatus = value;
        },
        initSelectedUser:function (value) {
          this.postSelectResultList = value;
        }
      },
      props: {
        title: {
          type: String,
          required: false,
          default: ''
        },
        value: {
          type: Boolean,
          required: false,
          default: false
        },
        initSelectedUser: {
          type: Array,
          required: false,
          default: function () {
            return []
          }
        }
      },
      data(){
          return{
            treeProps:{
              label: 'name'
            },
            organizationData:[],
            postListData:[],
            postSelectResultList:this.initSelectedUser,
            dialogRecStatus:this.dialogStatus
          }
      },
      created(){
        this.getOrganizationList();
        this.getPostList();
      },
      methods:{
        getOrganizationList(){
          const that = this;
          that.$api.common.getOrganizationAllList().then(res => {
            if(res.code === 200){
              if (res.data && res.data.length > 0){
                that.organizationData = that.$utils.transformTree(res.data,{keyField:'id',childField :'children',parentField :'parentId'});
              }
            }else{
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        },
        getPostList(){
          const that = this;
          that.$api.post.simpleAll().then(res => {
            if(res.code === 200){
              if (res.data && res.data.length > 0){
                that.postListData = res.data;
              }
            }else{
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        },
        getPostsAllName(item){
          if (item.posts && item.posts.length > 0){
            return `(${item.posts.map(m => m.organizationName).join(',')})${item.posts.map(m => m.postName).join(',')}`
          }
          return '无'
        },
        saveSelectUser(){
          const that = this;
          let selectedList = []
          that.postSelectResultList.forEach(function (id) {
            selectedList.push(that.postListData.find(m =>m.id == id))
          })
          that.$emit('getSelectedUser',selectedList)
          that.$emit('input',false)
        },
        selectCancel(){
          this.postSelectResultList = []
          this.$emit('input',false)
        }
      }
    }
</script>

<style scoped>
  .y-post-select>>>.el-dialog{
    min-width: 700px;
  }
  .y-post-select>>>.el-transfer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
