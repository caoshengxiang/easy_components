<template>
  <div :class="`y-detail-page-layout ${isEdit?'':'page-disabled'}`">
    <div class="y-page-content">
      <slot></slot>
    </div>
    <div class="y-options" v-if="$slots.default">
      <slot name="options">
        <el-button v-if="saveBtnName" type="primary" round @click="save">{{saveBtnName}}</el-button>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
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
      // 按钮名称
      saveBtnName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isEdit: this.editStatus
      }
    },
    watch: {
      editStatus: function (value) {
        this.isEdit = value
      },
      isEdit: function (value) {
        this.initPageStatus(value, false)
      }
    },
    mounted() {
      this.initPageStatus(this.isEdit, true)
    },
    methods: {
      initPageStatus(editStatus, bindEventStatus) {
        const that = this
        that.$nextTick(() => {
          let formList = document.querySelectorAll('.y-detail-page-layout .el-form')
          if (formList) {
            formList.forEach(function (form) {
              form.forEach(function (formItem) {
                formItem.disabled = !editStatus
                formItem.readOnly = !editStatus
              })
            })

            const iframeEditor = document.querySelectorAll('.y-detail-page-layout .el-form iframe')
            iframeEditor.forEach(function (obj) {
              obj.contentWindow.document.body.setAttribute('contenteditable', editStatus)
            })

            if (bindEventStatus) {
              that.addFormPageClick()
            }
          }
        })
      },
      formPageClick(event) {
        if (!this.isEdit) {
          event.stopPropagation()
        }
      },
      addFormPageClick() {
        const that = this
        const formObj = document.querySelectorAll('.y-detail-page-layout .y-page-content .el-tab-pane')
        if (formObj && formObj.length > 0) {
          formObj.forEach(function (obj) {
            obj.addEventListener('click', that.formPageClick, true)
          })
        }
      },
      save() {
        this.$emit('save')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .y-detail-page-layout {
    background-color: #fff;
    margin-top: 8px;
    position: relative;

    .y-options {
      position: absolute;
      right: 9px;
      top: 9px;
    }

    /*.el-tabs__item {*/
    /*  font-size: 15px;*/
    /*}*/
  }
</style>
<style scoped>
  .y-detail-page-layout >>> .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 15px;
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

  .y-detail-page-layout.page-disabled >>> input:disabled, .y-detail-page-layout.page-disabled >>> textarea:disabled {
    border: none;
    cursor: text;
    resize: none;
    padding-left: 0px; /*对齐*/
  }

  .y-detail-page-layout.page-disabled >>> input:disabled + *,
  .y-detail-page-layout.page-disabled >>> .el-input__suffix,
  .y-detail-page-layout.page-disabled >>> .edui-default .edui-editor-toolbarbox,
  .y-detail-page-layout.page-disabled >>> .edui-default .edui-editor-bottomContainer {
    display: none;
  }
</style>
