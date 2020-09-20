<template>
  <div class="dialog-con">
    <div class="view-form">
      <el-form label-position="right" label-width="140px"
               ref="ruleFormProd"
               :model="configForm">
        <div v-for="(item, index) in configForm.list" :key="index" class="form-box-item-div"
             :style="{display: item.inline?'inline-block':'block'}">
          <render :item="item" :index="index" :uploadOptions="uploadOptions"></render>
        </div>

        <el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div style="padding: 20px 140px">
      <el-button @click="prePage('ruleFormProd')" v-if="currentPage != 1">预览上一页</el-button>
      <el-button @click="submitForm('ruleFormProd')">{{currentPage == configFormList.length ? '预览提交' : '预览下一页'}}
      </el-button>
      <el-button type="danger" @click="saveForm">保存模板</el-button>
    </div>
  </div>
</template>

<script>
  import render from './components/render'

  export default {
    name: 'previewDev',
    props: ['params'],
    components: {
      render,
    },
    data () {
      return {
        currentPage: 1,
        configForm: {
          list: [],
        },
        configFormList: [],
        uploadOptions: {
          type: Object,
          default () {
            return {
              action: '',
              headers: {},
              key: 'data.url',
              callback () {},
            }
          },
        },
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.currentPage < this.configFormList.length) {
              this.currentPage++
              this.configForm.list = this.params.configFormList[this.currentPage - 1]
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      prePage () {
        this.currentPage--
        this.configForm.list = this.params.configFormList[this.currentPage - 1]
      },
      saveForm () {
        this.$emit('close', {data: 'save'})
      },
    },
    created () {
      this.configFormList = this.params.configFormList
      this.configForm.list = this.params.configFormList[0]
      this.currentPage = 1
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .dialog-con {
    padding: 50px 20px;
  }

  .view-form {
    margin: 30px auto;
    width: 960px;
    border: 1px solid #ccc;
    padding: 20px;
  }
</style>
