<template>
  <div :class="`y-detail-page-layout ${isEdit?'':'page-disabled'}`">
    <slot></slot>
    <div class="y-options" v-if="$slots.default">
      <template v-if="!isEdit">
        <PermissionButton v-if="menuNo" type="primary" round @click="isEdit = true" :menu-no="menuNo"></PermissionButton>
        <el-button v-else type="primary" round @click="isEdit = true">编辑</el-button>
      </template>
      <template v-else>
        <PermissionButton v-if="menuNo" type="primary" round @click="save" :menu-no="menuNo" name="保存"></PermissionButton>
        <el-button v-else type="primary" round @click="save">保存</el-button>
        <PermissionButton v-if="menuNo" type="info" round @click="isEdit = false" :menu-no="menuNo" name="取消"></PermissionButton>
        <el-button v-else type="info" round @click="isEdit = false">取消</el-button>
      </template>
    </div>
  </div>
</template>

<script>
  import PermissionButton from '../PermissionButton/PermissionButton'

  export default {
    components: { PermissionButton },
    name: 'index',
    watch: {
      editStatus: function (value) {
        this.isEdit = value
      },
      isEdit: function (value) {
        this.initPageStatus(value)
      }
    },
    props: {
      //按钮编号
      menuNo: {
        default: '',
        type: String
      },
      //编辑状态
      editStatus: {
        type: Boolean,
        default: false
      },
      //保存方法
      save: {
        type: Function,
        default: function () {

        }
      }
    },
    data() {
      return {
        isEdit: this.editStatus
      }
    },
    mounted(){
      this.initPageStatus(this.isEdit)
      this.addFormPageClick()
    },
    beforeDestroy(){
      this.removeFormPageClick()
    },
    methods:{
      initPageStatus(editStatus){
        const that = this
        that.$nextTick(() => {
          let formList = document.querySelector(".y-detail-page-layout").getElementsByTagName("form")
          if (formList)
          {
            formList.forEach(function (form) {
              form.forEach(function (formItem) {
                formItem.disabled = !editStatus;
                formItem.readOnly = !editStatus;
              })
            })
          }
        })
      },
      formPageClick(event){
        if (!this.isEdit)
          event.stopPropagation()
      },
      addFormPageClick(){
        const formObj = document.querySelector('.y-detail-page-layout.page-disabled form')
        if (formObj)
          formObj.addEventListener('click', this.formPageClick, true)
      },
      removeFormPageClick(){
        const formObj = document.querySelector('.y-detail-page-layout.page-disabled form')
        if (formObj)
          formObj.removeEventListener('click', this.formPageClick, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .y-detail-page-layout {
    background-color: #fff;
    margin-top: 12px;
    position: relative;

    .y-options {
      position: absolute;
      right: 9px;
      top: 9px;
    }
  }
</style>
<style scoped>
  .y-detail-page-layout >>> .el-tabs__item {
    height: 50px;
    line-height: 50px;
  }

  .y-detail-page-layout >>> .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

  .y-detail-page-layout >>> .el-tabs__content {
    padding: 17px;
  }

  .y-detail-page-layout >>> .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .y-detail-page-layout.page-disabled >>> input:disabled,.y-detail-page-layout.page-disabled >>> textarea:disabled{
    border: none;
    cursor: text;
    resize: none;
  }
  .y-detail-page-layout.page-disabled >>> input:disabled +*{
    display: none;
  }
</style>
