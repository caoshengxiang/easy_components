<template>
  <div class="app-container staff-detail">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
    <div style="position: fixed;right: 0;z-index: 999">
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
                <el-form-item label="专业代码：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业名称：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业简称：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="所属部系：" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.type" :disabled="type!=='add'" clearable filterable style="width: 100%">
                    <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="学制：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.type" :disabled="type!=='add'" clearable filterable style="width: 100%">
                    <!--          <el-option v-for="item in  " :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="班级类型：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" placeholder="多个以中文逗号隔开" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业技能方向：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" placeholder="" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="修业年限：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="批准设置日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="首次招生日期：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否停招：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="是" value="是"/>
                    <el-option key="2" label="否" value="否"/>
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="停招时间	：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否撤销：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="是" value="是"/>
                    <el-option key="2" label="否" value="否"/>
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="撤销时间：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="重点专业：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="特色专业：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="国际合作专业：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="是" value="是"/>
                    <el-option key="2" label="否" value="否"/>
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="校企合作专业：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="是" value="是"/>
                    <el-option key="2" label="否" value="否"/>
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="是否全日制专业：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="是" value="是"/>
                    <el-option key="2" label="否" value="否"/>
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
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
<style lang="scss">
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
