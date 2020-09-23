<template>
  <div>
    <switch class="sm" @change="SetSize" :class="size?'checked':''"></switch>
    <div class="padding bg-white text-center">
      <div class="padding" :class="size?'solids':'solid'">四周</div>
      <div class="padding margin-top" :class="size?'solids-top':'solid-top'">上</div>
      <div class="padding margin-top" :class="size?'solids-right':'solid-right'">右</div>
      <div class="padding margin-top" :class="size?'solids-bottom':'solid-bottom'">下</div>
      <div class="padding margin-top" :class="size?'solids-left':'solid-left'">左</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'shoadow_1',
    data() {
      return {
        size: false
      };
    },
    methods: {
      SetSize(e) {
        this.size = e.detail.value
      }
    }
  }
</script>

<style scoped>

</style>
