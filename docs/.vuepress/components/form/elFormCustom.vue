<template>
  <div class="com-pages">
    <fenerate-form
      @getFormList="getFormList"
      :initList="initList"
      :uploadOptions="{
            action: 'http://' + '/file/upload',
            headers: {authKey: userInfo.authKey},
            key: 'data.url',
            callback: callback
          }">
    </fenerate-form>
  </div>
</template>

<script>
  import fenerateForm from '../../../../src/components/generateForm/index'

  export default {
    name: 'elFormCustom',
    data () {
      return {
        userInfo: {
          authKey: 123,
        },
        initList: [],
      }
    },
    components: {
      fenerateForm,
    },
    methods: {
      callback (response, item, formConfig) {
        console.log(response, item, formConfig)
        item.bindValue = response.data.z
        formConfig.formField[item.tempFieldName] = item.bindValue
        formConfig.names[item.name] = item.bindValue
      },
      getFormList (da) {
        console.log(da)
      }
    }
  }
</script>

<style scoped>

</style>
