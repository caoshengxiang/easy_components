<template>
  <div>
    <ProgressItem></ProgressItem>
  </div>
</template>

<script>
  import API from '@/api'
  import ProgressItem from '@/components/ProgressItem'
    export default {
      name: 'Design',
      components:{ProgressItem},
      created() {
        const that = this
        API.workflow.getDetail().then(data => {
        })
      },
      methods: {
        test() {
          const that = this
        }
      }
    }
</script>
