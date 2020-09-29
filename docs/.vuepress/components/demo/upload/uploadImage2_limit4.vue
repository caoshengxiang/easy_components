<template>
  <div>
    <UploadImage2 v-model="img" :limit="4"/>
  </div>
</template>

<script>
  import UploadImage2 from '../../../../../src/components/Upload/UploadImage2'

  export default {
    name: 'uploadImage2_limit4',
    components: {
      UploadImage2
    },
    data() {
      return{
        img: ''
      }
    }
  }
</script>

<style scoped>

</style>
