<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <el-form-item>
        <div class="title-container">
          <h3 class="title">职业院校综合管理及内部质量诊断与改进平台
          </h3>
        </div>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.account"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.pwd"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
        </el-input>
        <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
      </el-form-item>

      <el-form-item>
        <div class="login-btn">
          <el-button
            round
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;padding: 13px 0;"
            @click.native.prevent="handleLogin"
          >登录
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          account: 'test001',
          pwd: 'school123456',
          userType: '教职工'
        },
        loginRules: {
          account: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          pwd: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.account === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.pws === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              if (this.redirect && this.redirect !== 'undefined' && this.redirect !== undefined) {
                this.$router.push({
                  path: this.redirect,
                  query: this.otherQuery
                })
              } else {
                this.$router.push({
                  path: '/home',
                  query: this.otherQuery
                })
              }
              this.loading = false
            }).catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
      // afterQRScan() {
      //   if (e.key === 'x-admin-oauth-code') {
      //     const code = getQueryObject(e.newValue)
      //     const codeMap = {
      //       wechat: 'code',
      //       tencent: 'code'
      //     }
      //     const type = codeMap[this.auth_type]
      //     const codeName = code[type]
      //     if (codeName) {
      //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //         this.$router.push({ path: this.redirect || '/' })
      //       })
      //     } else {
      //       alert('第三方登录失败')
      //     }
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  $bg: #ffffff;
  $dark_gray: #ffffff;
  $light_gray: #eee;
  $assets: '~@/assets/';

  .login-container {
    background: url($assets + "images/logo-bg.png") 0 0 no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      position: absolute;
      width: 38%;
      height: 63%;
      background-color: #fff;
      border-radius: 20px;
      padding: 80px;
      box-shadow:0px 0px  10px 5px #ddd;
      .login-btn{
        padding: 30px 0;
      }
      .el-form-item{
        margin-bottom: 30px;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 30px;
        margin: 0 auto 40px auto;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
<style scoped>
  .login-form >>>.el-input input{
    background:rgba(247,247,247,1);
  }
  .login-form >>>.el-input--small .el-input__inner{
    height: 40px;
    line-height: 40px;
  }
  .login-form >>> .el-input__icon{
    font-size: 18px;
  }
</style>
