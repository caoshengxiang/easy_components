<template>
  <div>
    <UploadImage2 v-model="img"/>
  </div>
</template>

<script>
  import UploadImage2 from '../../../../../src/components/Upload/UploadImage2'

  export default {
    name: 'uploadImage2_limit1',
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
