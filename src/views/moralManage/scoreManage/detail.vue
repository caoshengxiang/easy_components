<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="操行记录" name="first">
          <el-form ref="postForm" class="form-container" :model="postForm" label-width="70px" :rules="rules" >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="年份："  class="postInfo-container-item " prop="year">
                      <el-date-picker
                        v-model="postForm.year"
                        align="right"
                        type="year"
                        value-format="yyyy"
                        style="width: 320px"
                        placeholder="选择年">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学期："  class="postInfo-container-item " prop="termId" >
                      <service-select
                        style="width: 320px"
                        v-model="postForm.termId"
                        name="name"
                        field="id"
                        :data-service="$api.baseInfo.getTermList"
                        placeholder="学期"
                        clearable
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="优：" class="postInfo-container-item " prop="excellentLower" style="display: inline-block">
                      <el-input v-model="postForm.excellentLower" class="filter-item" style="width: calc(50% - 5px)"/>
                      <span style="display: inline-block;width: 10px;text-align: center">-</span>
                      <el-input v-model="postForm.excellentUpper" class="filter-item" style="width: calc(50% - 5px)" @blur="validateField('excellentLower')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="良：" class="postInfo-container-item " prop="goodLower" style="display: inline-block">
                      <el-input v-model="postForm.goodLower" class="filter-item" style="width: calc(50% - 5px)"/>
                      <span style="display: inline-block;width: 10px;text-align: center">-</span>
                      <el-input v-model="postForm.goodUpper" class="filter-item" style="width: calc(50% - 5px)" @blur="validateField('goodLower')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="中：" class="postInfo-container-item " prop="middleLower" style="display: inline-block">
                      <el-input v-model="postForm.middleLower" class="filter-item" style="width: calc(50% - 5px)"/>
                      <span style="display: inline-block;width: 10px;text-align: center">-</span>
                      <el-input v-model="postForm.middleUpper" class="filter-item" style="width: calc(50% - 5px)" @blur="validateField('middleLower')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="差：" class="postInfo-container-item " prop="poorLower" style="display: inline-block">
                      <el-input v-model="postForm.poorLower" class="filter-item" style="width: calc(50% - 5px)"/>
                      <span style="display: inline-block;width: 10px;text-align: center">-</span>
                      <el-input v-model="postForm.poorUpper" class="filter-item" style="width: calc(50% - 5px)" @blur="validateField('poorLower')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'ComplexTable',
    components: {
      ServiceSelect,
      Breadcrumb,
      YDetailPageLayout
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      const validateExcellentLower = (rule, value, callback) => {
        if (value && this.postForm.excellentUpper && (Number(value) > Number(this.postForm.excellentUpper))) {
          callback(new Error('左值不能大于右值！'));
        } else {
          callback();
        }
      };

      const validateGoodLowerLower = (rule, value, callback) => {
        if (
          this.postForm.excellentLower &&
          this.postForm.goodUpper &&
          (Number(this.postForm.excellentLower) <= Number(this.postForm.goodUpper))
        ) {
          callback(new Error('良范围右值应小于优范围左值！'));
        } else if (value && this.postForm.goodUpper && (Number(value) > Number(this.postForm.goodUpper))) {
          callback(new Error('左值不能大于右值！'));
        } else {
          callback();
        }
      };

      const validateMiddleLower = (rule, value, callback) => {
        if (
          this.postForm.goodLower &&
          this.postForm.middleUpper &&
          (Number(this.postForm.goodLower) <= Number(this.postForm.middleUpper))
        ) {
          callback(new Error('中范围右值应小于良范围左值！'));
        } else if (value && this.postForm.middleUpper && (Number(value) > Number(this.postForm.middleUpper))) {
          callback(new Error('左值不能大于右值！'));
        } else {
          callback();
        }
      };

      const validatePoorLower = (rule, value, callback) => {
        if (
          this.postForm.middleLower &&
          this.postForm.poorUpper &&
          (Number(this.postForm.middleLower) <= Number(this.postForm.poorUpper))
        ) {
          callback(new Error('差范围右值应小于中范围左值！'));
        } else if (value && this.postForm.poorUpper && (Number(value) > Number(this.postForm.poorUpper))) {
          callback(new Error('左值不能大于右值！'));
        } else {
          callback();
        }
      };

      return {
        editStatus: true,
        postForm: {},
        rules: {
          year: [{
            required: true,
            message: '请选择年份',
            trigger: 'change'
          }],
          termId: [{
            required: true,
            message: '请选择学期',
            trigger: 'change'
          }],
          excellentLower: [
            {
              required: true,
              message: '请填写优范围',
              trigger: 'change'
            },
            { validator: validateExcellentLower, trigger: 'blur' }
          ],
          goodLower: [
            {
              required: true,
              message: '请填写良范围',
              trigger: 'change'
            },
            { validator: validateGoodLowerLower, trigger: 'blur' }
          ],
          middleLower: [
            {
              required: true,
              message: '请填写中范围',
              trigger: 'change'
            },
            { validator: validateMiddleLower, trigger: 'blur' }
          ],
          poorLower: [
            {
              required: true,
              message: '请填写差范围',
              trigger: 'change'
            },
            { validator: validatePoorLower, trigger: 'blur' }
          ],
        },
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = true
      }

    },
    methods: {
      validateField(prop) {
        this.$refs.postForm.validateField(prop)
      },
      getDetail() {
        const that = this;
        that.$api.assetinfo.getLandDetail(that.id).then(data => {
          that.loading = false;
          if (data.code === 200) {
            that.postForm = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save() {
        const that = this;
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.scoreManage.edit({ ...that.postForm }).then(data => {
                that.loading = false;
                if (data.code === 250) {
                  const back = this.$route.query.back;
                  if (back) {
                    this.$router.push(back)
                  }

                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  });
                  const back = this.$route.query.back;
                  if (back) {
                    this.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              }).catch(_ => this.loading = false);
            } else {
              that.$api.scoreManage.add({ ...that.postForm }).then(data => {
                that.loading = false;
                if (data.code === 250) {
                  const back = this.$route.query.back;
                  if (back) {
                    this.$router.push(back)
                  }
                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  });
                  const back = this.$route.query.back;
                  if (back) {
                    this.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              }).catch(_ => this.loading = false);
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

.form-container {
  max-width: 600px;
  margin: auto;
}
</style>
