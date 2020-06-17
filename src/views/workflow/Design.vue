<template>
  <div>
    <y-work-f-design :id="id"></y-work-f-design>
  </div>
</template>

<script>
  import YWorkFDesign from '@/components/yWorkFDesign/Index'
    export default {
      name: 'Design',
      components:{YWorkFDesign},
      data(){
        return{
          id:'1'
        }
      },
      created() {
        const that = this;
      },
      methods: {
      }
    }
</script>
