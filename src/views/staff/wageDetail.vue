<template>
  <div class="app-container staff-detail">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
    <div style="position: fixed;right: 0;z-index: 999">
      <el-button
        v-if="type==='detail'"
        class="filter-item download-button"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="type='add'"
      >
        编辑
      </el-button>
      <el-button
        v-if="type==='add'"
        class="filter-item download-button"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="type='detail'"
      >
        取消
      </el-button>
      <el-button
        v-if="type==='add'"
        class="filter-item download-button"
        style="margin-left: 10px;margin-right: 0px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        保存
      </el-button>
    </div>
    <div class="createPost-container">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

        <div class="createPost-main-container">
          <div class="postInfo-container">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title">基</div>
                <div class="icon-info">基本信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职工编号：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职工姓名：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="性别：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="身份证号：" label-width="180px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="基本工资：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="学段：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">工</div>
                <div class="icon-info">工资情况</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="岗位工资或见习期工资	：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="薪级工资：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="10%工资：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="农村教师津补贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="农村教师岗位补助：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="乡镇工作补贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="津补贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教龄津贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="独子费：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="70%绩效：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="特教津贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="特级教师津贴：" prop="type" label-width="180px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="工资总额：" prop="type" label-width="180px" class="postInfo-container-item">
                  <span style="color: red;font-size: 16px;font-weight: bold;">0</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'

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
    components: { Breadcrumb },
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
      }
    },
    created() {
    },
    methods: {
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
