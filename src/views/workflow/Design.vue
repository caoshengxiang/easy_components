<template>
  <div id="canvas" />
</template>

<script>
  import Modeler from 'bpmn-js/lib/Modeler'
  import API from '@/api'
    export default {
      name: 'Design',
      created() {
          const that = this
        API.workflow.getDetail().then(data => {
          var modeler = new Modeler({ container: '#canvas' })
            modeler.importXML(data, function(err) {
          })
        })
      },
      methods: {
        test() {
          const that = this
        }
      }
    }
</script>

<style scoped>

</style>
