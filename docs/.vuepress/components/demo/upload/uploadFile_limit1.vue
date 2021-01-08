<template>
  <div>
    <uploadFile v-model="img"/>
  </div>
</template>

<script>
  import uploadFile from '../../../../../src/components/Upload/uploadFile'

  export default {
    name: 'uploadFile_limit1',
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
