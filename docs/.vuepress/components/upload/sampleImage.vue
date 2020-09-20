<template>
  <div>
    <UploadImage v-model="img"/>
  </div>
</template>

<script>
  import UploadImage from '../../../../src/components/Upload/UploadImage'

  export default {
    name: 'sampleImage',
    components: {
      UploadImage
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
