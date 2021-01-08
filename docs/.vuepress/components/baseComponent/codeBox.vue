// 包裹示例组件
<template>
  <div class="code">
    <div class="code--title">
      <h2>{{title}}</h2>
      <small>{{description}}</small>
    </div>
    <div class="code--demo">
      <div class="code-content">
        <slot></slot>
      </div>
    </div>
    <div v-if="isShow"
         class="code--segment">
      <slot name="codeText"></slot>
    </div>
    <div v-if="$slots.codeText"
         class="code--button">
      <div @click="handleToggleShow"
           class="code--show">
        <i v-if="isShow" class="el-icon-arrow-up"></i>
        <i v-if="!isShow" class="el-icon-arrow-down"></i>
        <span class="code--show-text">{{codeTextBtn}}</span>
      </div>
      <div v-if="onlineLink"
           class="code--online"
           @click="handleOnline">
        {{codeTextBtnOnline}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    onlineLink: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false,
      codeTextBtn: '显示代码',
      codeTextBtnOnline: '在线运行'
    }
  },
  methods: {
    handleToggleShow () {
      this.isShow = !this.isShow
      this.codeTextBtn = this.isShow ? '隐藏代码' : '显示代码'
    },
    handleOnline () {
      window.open(this.onlineLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  padding: 40px 0;
  .code--title {
    h2 {
      padding: 0;
      margin: 0;
      border-bottom: none;
      font-size: 18px;
    }

    small {
      font-size: 14px;
      display: inline-block;
      margin: 10px 0;
      color: #5e6d82;
    }
  }
  .code--demo {
    border: 1px solid #ebebeb;
    border-bottom: none;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 rgba(232, 237, 250, 0.6),
      0 1px 2px 0 rgba(232, 237, 250, 0.5);
    .code-content {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 4%;
      border-bottom: 1px solid #ddd;
      overflow: auto;
      width: 100%;
    }
  }
  .code--button {
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    border: 1px solid #ebebeb;

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }

    .code--show {
      // flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      .code--show-text {
        margin-left: 10px;
      }
    }
    .code--online {
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 5px;
      padding-right: 25px;
    }
    .code--online:hover {
      font-size: 17px;
    }
  }

  & + .code {
    margin-top: 40px;
  }

  &:not(:first-child) {
    margin-top: 40px;
  }
}
</style>
