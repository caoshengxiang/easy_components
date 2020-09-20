<template>
  <div class="generate-form">
    <!--<el-row :gutter="20">-->
    <!--<el-col :span="10">-->
    <!--<h3 class="view-form-t">表单控件:</h3>-->
    <!--<original-form></original-form>-->
    <!--</el-col>-->
    <!--<el-col :span="14">-->
    <!--<h3 class="view-form-t">请将表单控件拖至下方并配置:</h3>-->
    <!--<dev-form @getData="getDataHandle" :initList="initList"></dev-form>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <div style="display: flex">
      <div style="width: 540px;box-sizing: border-box;">
        <h3 class="view-form-t">表单控件:</h3>
        <original-form></original-form>
      </div>
      <div style="flex: 1">
        <h3 class="view-form-t">请将表单控件拖至下方灰色区域并配置:</h3>
        <dev-form @getData="getDataHandle" :initList="initList"></dev-form>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import originalForm from './components/originalForm'
  import devForm from './components/devForm'
  import render from './components/render'
  import previewDev from './previewDev'

  export default {
    name: 'generateForm',
    data () {
      return {
        // configForm: {
        //   list: [],
        // },
        configFormList: [],
      }
    },
    props: {
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
      initList: {
        type: Array,
        default () {
          return []
        },
      },
    },
    components: {
      draggable,
      originalForm,
      devForm,
      render,
    },
    methods: {
      getDataHandle (data) {
        // this.configForm.list = data
        this.configFormList = data
        this.$dlg.modal(previewDev, {
          title: '预览',
          width: 1300,
          height: 800,
          params: {
            configFormList: this.configFormList,
          },
          callback: da => {
            if (da.data === 'save') {
              this.saveForm()
            }
          },
        })
      },
      saveForm () {
        this.$emit('getFormList', this.configFormList)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .generate-form {
    margin: auto 20px;
  }

</style>
