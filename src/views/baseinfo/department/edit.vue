<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="save">
    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="width: 600px;margin: auto;">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="24">
              <el-form-item label="系部编号：" prop="code" label-width="120px" class="postInfo-container-item">
                <el-input  v-model="postForm.code" class="filter-item" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="系部名称：" prop="name" label-width="120px" class="postInfo-container-item">
                <el-input  v-model="postForm.name" class="filter-item" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="系部负责人：" prop="type" label-width="120px" class="postInfo-container-item">
                <el-select v-model="postForm.type" placeholder="岗位"  clearable filterable style="width: 160px;margin-right: 10px;">
        <el-option v-for="item in gangwei " :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-select v-model="postForm.leaderId" placeholder="负责人" clearable filterable style="width: 200px">
            <el-option v-for="item in  staff" :key="item.userId" :label="item.name" :value="item.userId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    type: '',
    tableData: [{ key: 'xxx' }, { key: 'xxxx' }],
    tableData2: [],
    tableData3: [],
    tableData4: [],
    tableData5: [],
    tableData6: [],
  }

  export default {
    name: 'ComplexTable',
    components: { Breadcrumb,YDetailPageLayout },
    data() {
      return {
        type: 'detail',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请填写年份',
            trigger: 'change'
          }],
        },
        gangwei:[],
        staff:[]
      }
    },
    created() {
      let that = this
      that.simpleAll()
      that.staffAll()
    },
    methods: {
      simpleAll(){
        let that = this
        that.$api.post.simpleAll().then(data => {
          if(data.code === 200){
            //返回成功
            that.gangwei = data.data
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      staffAll(){
        let that = this
        that.$api.staff.list().then(data => {
          if(data.code === 200){
            //返回成功
            that.staff = data.data.records
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      },
      handleAdd() {
        this.postForm.tableData.push({ key: '' })
      },
      handleAdd2() {
        this.postForm.tableData2.push({ key: '' })
      },
      handleAdd3() {
        this.postForm.tableData3.push({ key: '' })
      },
      handleAdd4() {
        this.postForm.tableData4.push({ key: '' })
      },
      handleAdd5() {
        this.postForm.tableData5.push({ key: '' })
      },
      handleAdd6() {
        this.postForm.tableData6.push({ key: '' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .staff-detail {
  }

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;
  }
</style>
