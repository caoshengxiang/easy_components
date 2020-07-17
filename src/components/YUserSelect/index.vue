<template>
    <div class="y-user-select">
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
          v-model="staffSelectResultList"
          :data="staffListData"
          filterable
          filter-placeholder="输入姓名，模糊查询"
          :titles="['待选用户','已选用户']">
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
        name: "YUserSelect",
      watch:{
        value:function (value) {
          this.dialogRecStatus = value;
        },
        initSelectedUser:function (value) {
          this.staffSelectResultList = value;
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
            staffListData:[],
            staffSelectResultList:this.initSelectedUser,
            dialogRecStatus:this.dialogStatus
          }
      },
      created(){
        this.getOrganizationList();
        this.getStaffList();
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
        getStaffList(){
          const that = this;
          that.$api.baseInfo.getStaffList().then(res => {
            if(res.code === 200){
              if (res.data && res.data.records && res.data.records.length > 0){
                that.staffListData = res.data.records;
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
          that.staffSelectResultList.forEach(function (id) {
            selectedList.push(that.staffListData.find(m =>m.id == id))
          })
          that.$emit('getSelectedUser',selectedList)
          that.$emit('input',false)
        },
        selectCancel(){
          this.staffSelectResultList = []
          this.$emit('input',false)
        }
      }
    }
</script>

<style scoped>
  .y-user-select>>>.el-dialog{
    min-width: 700px;
  }
  .y-user-select>>>.el-transfer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
