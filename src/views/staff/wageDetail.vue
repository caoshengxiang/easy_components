<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout :save="handleCreate" :edit-status="false">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
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
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    user: {},
    staff: {}
  }

  export default {
    name: 'ComplexTable',
    components: { Breadcrumb, YDetailPageLayout },
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
        dataId: this.$route.query.id,
        activeName: 'first',
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        if (this.dataId) {
          this.$api.staff.detailBase(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
