<template>
  <div :class="`y-detail-page-layout ${editStatus?'':'page-disabled'}`">
    <div class="y-page-content">
      <slot/>
    </div>
    <div class="y-options" v-if="$slots.default">
      <template v-if="!editStatus">
        <PermissionButton v-if="menuNo" type="primary" round @click="handleEdit"
                          :menu-no="menuNo"
        />
        <el-button v-else type="primary" round @click="handleEdit">编辑</el-button>
      </template>
      <template v-else>
        <PermissionButton v-if="menuNo" type="primary" round @click="save" :menu-no="menuNo"
                          name="保存"
        />
        <el-button v-else type="primary" round @click="save">保存</el-button>
        <PermissionButton v-if="menuNo && editStatus" type="info" round @click="handleCancel" :menu-no="menuNo"
                          name="取消"
        />
        <template v-else>
          <el-button v-if="editStatus" type="info" round @click="handleCancel">取消</el-button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import PermissionButton from '../PermissionButton/PermissionButton'

  export default {
    name: 'index',
    components: { PermissionButton },
    props: {
      // 按钮编号
      menuNo: {
        default: '',
        type: String
      },
      // 编辑状态 :editStatus.sync="false"
      editStatus: {
        type: Boolean,
        required: true
      }
    },
    watch: {
      editStatus: function (value) {
        this.initPageStatus(value, false)
      }
    },
    mounted() {
      this.initPageStatus(this.editStatus, true)
    },
    methods: {
      initPageStatus(editStatus, bindEventStatus) {
        const that = this;
        that.$nextTick(() => {
          let formList = document.querySelectorAll('.y-detail-page-layout .el-form');
          if (formList) {
            formList.forEach(function (form) {
              form.forEach(function (formItem) {
                formItem.disabled = !editStatus;
                formItem.readOnly = !editStatus;
              });
            });

            const iframeEditor = document.querySelectorAll('.y-detail-page-layout .el-form iframe');
            iframeEditor.forEach(function (obj) {
              obj.contentWindow.document.body.setAttribute('contenteditable', editStatus);
            });

            if (bindEventStatus) {
              that.addFormPageClick();
            }
          }
        })
      },
      formPageClick(event) {
        if (!this.editStatus) {
          event.stopPropagation();
        }
      },
      addFormPageClick() {
        const that = this;
        const formObj = document.querySelectorAll('.y-detail-page-layout .y-page-content .el-tab-pane');
        if (formObj && formObj.length > 0) {
          formObj.forEach(function (obj) {
            obj.addEventListener('click', that.formPageClick, true);
          });
        }
      },
      save() {
        this.$emit('save');
      },
      handleEdit() {
        this.$emit('update:editStatus', true);
      },
      handleCancel() {
        this.$emit('update:editStatus', false);
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
