<template>
  <div>
    <uploadFile v-model="img" :limit="4"/>
  </div>
</template>

<script>
  import uploadFile from '../../../../../src/components/Upload/uploadFile'

  export default {
    name: 'uploadFile_limit4',
    components: {
      uploadFile
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
