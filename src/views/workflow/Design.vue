<template>
  <div>
    <y-work-f-design :id="id"/>
  </div>
</template>

<script>
  import YWorkFDesign from '@/components/YWorkFDesign'

  export default {
    name: 'Design',
    components: { YWorkFDesign },
    data() {
      return {
        id: ''
      }
    },
    created() {
      const that = this
      if (!that.$route.query.id) {
        that.$utils.routerLink('/404')
        return
      }
      that.id = that.$route.query.id
    },
    methods: {}
  }
</script>
