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
        :destroy-on-close="true"
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
          :titles="['待选用户','已选用户']"
          @left-check-change="checkItem">
          <!--<div slot="left-footer" style="text-align: center;padding: 5px 0;">-->
            <!--<el-button type="warning" class="transfer-footer" round>高级搜索</el-button>-->
            <!--<el-button type="info" class="transfer-footer" round>重置</el-button>-->
          <!--</div>-->
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
          const that = this
          if (that.staffListData && that.staffListData.length > 0 && value && value.length > 0){
            const resultList = [];
            value.forEach(function (id) {
              if (that.staffListData.findIndex(m =>m.userId === id) > -1)
                resultList.push(that.staffListData.find(m => m.userId === id))
            })
            if (resultList && resultList.length > 0)
              that.staffSelectResultList = resultList.map(m =>m.id)
          }
        },
        staffSelectResultList:function (value) {
          const that = this;
          if (!that.multiSelect) {
            if (that.staffListData && that.staffListData.length > 0 && value && value.length > 0) {
              that.staffListData.forEach(function (item) {
                item.disabled = true;
              })
              value.forEach(function (id) {
                that.staffListData.forEach(function (item) {
                  if (id === item.userId)
                    item.disabled = false;
                })
              })
            }else{
              if (that.staffListData && that.staffListData.length > 0){
                that.staffListData.forEach(function (item) {
                  item.disabled = false;
                })
              }
            }
          }
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
        },
        //多选模式
        multiSelect: {
          type: Boolean,
          required: false,
          default: true
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
          that.$api.staff.stafflist().then(res => {
            if(res.code === 200){
              if (res.data && res.data.length > 0){
                that.staffListData = res.data;
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
            if (that.staffListData.findIndex(m =>m.id == id) > -1)
              selectedList.push(that.staffListData.find(m =>m.id == id))
          })
          that.$emit('getSelectedUser',selectedList)
          that.$emit('input',false)
        },
        selectCancel(){
          this.$emit('input',false)
        },
        checkItem(value){
          const that = this
          if (!that.multiSelect) {
            if (that.staffListData && that.staffListData.length > 0 && value && value.length > 0){
              value.forEach(function (id) {
                that.staffListData.forEach(function (item) {
                  if (that.staffSelectResultList.findIndex(id => id === item.userId) > -1)
                    return;
                  if (id === item.userId)
                    item.disabled = false;
                  else
                    item.disabled = true;
                })
              })
            }else{
              if (that.staffListData && that.staffListData.length > 0) {
                that.staffListData.forEach(function (item) {
                  if (that.staffSelectResultList.findIndex(id => id === item.userId) > -1)
                    return;
                  item.disabled = false;
                })
              }
            }
          }
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
