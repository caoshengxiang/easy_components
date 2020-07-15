<template>
  <div>
    <y-work-f-design :id="id"></y-work-f-design>
  </div>
</template>

<script>
  import yWorkFDesign from '@/components/yWorkFDesign'

  export default {
    name: 'Design',
    components: { yWorkFDesign },
    data() {
      return {
        id: ''
      }
    },
    created() {
      const that = this
    },
    methods: {}
  }
</script>
