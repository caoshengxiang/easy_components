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
                <el-form-item label="职工编号：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职工姓名：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="性别：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="身份证号：" label-width="140px" class="postInfo-container-item">
                  <el-input disabled v-model="postForm.type" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="有无教师资格证：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option key="1" label="有" value="有"/>
                    <el-option key="2" label="无" value="无"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="教师资格类型：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职称类型：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="获得专业技术职务时间：" prop="type" label-width="160px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    value-format="yyyy-MM"
                    :disabled="type!=='add'"
                    type="month"
                    placeholder="选择月"
                    style="width: 100%;"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="专业技术职务级别：" prop="type" label-width="140px" class="postInfo-container-item">
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
                <el-form-item label="聘任专业技术职务：" prop="type" label-width="140px" class="postInfo-container-item">
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
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">全</div>
                <div class="icon-info">全日制学历</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="全日制学历(学位)：" prop="type" label-width="140px" class="postInfo-container-item">
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
                <el-form-item label="学位：" prop="type" label-width="140px" class="postInfo-container-item">
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
                <el-form-item label="毕业时间：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    value-format="yyyy-MM"
                    :disabled="type!=='add'"
                    type="month"
                    placeholder="选择月"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="毕业院校：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="毕业专业：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FD774B">最</div>
                <div class="icon-info">最高学历</div>
              </h3>
            </div>

            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="最高学历(学位)" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  />
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="学位：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-select
                    v-if="type==='add'"
                    v-model="postForm.type"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                    <!--                    <el-option v-for="item in majorInfo" :key="item.value" :label="item.label" :value="item.value" />-->
                  </el-select>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="毕业时间：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="毕业院校：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="毕业专业：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
              <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FF687B">专</div>
                <div class="icon-info">专业技术职务(最高)：</div>
              </h3>
            </div>

            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="职位等级：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="名称：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="发证单位：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="发证日期：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#43D6B3">职</div>
                <div class="icon-info" style="width: 75px">职业资格证书</div>
              </h3>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="等级：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    placeholder=""
                    clearable
                    class="filter-item"
                    style=" width: 100%"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="证书名称：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="发证单位：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-input v-if="type==='add'" v-model="postForm.type" class="filter-item"/>
                  <el-input v-else v-model="postForm.type" disabled class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="6" :span="6">
                <el-form-item label="发证日期：" prop="type" label-width="140px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.type"
                    :disabled="type!=='add'"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期"
                  />
                </el-form-item>
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
