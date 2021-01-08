<template>
  <div class="bg-white">
    <div class="padding bg-gray">{size}的尺寸有xs/sm/df/lg/xl</div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">外边距</div>
      <div class="basis-df padding-bottom-xs">内边距</div>
      <div class="basis-df">.margin-{size}</div>
      <div class="basis-df">.padding-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">水平方向外边距</div>
      <div class="basis-df padding-bottom-xs">水平方向内边距</div>
      <div class="basis-df">.margin-lr-{size}</div>
      <div class="basis-df">.padding-lr-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">垂直方向外边距</div>
      <div class="basis-df padding-bottom-xs">垂直方向内边距</div>
      <div class="basis-df">.margin-tb-{size}</div>
      <div class="basis-df">.padding-tb-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">上外边距</div>
      <div class="basis-df padding-bottom-xs">上内边距</div>
      <div class="basis-df">.margin-top-{size}</div>
      <div class="basis-df">.padding-top-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">右外边距</div>
      <div class="basis-df padding-bottom-xs">右内边距</div>
      <div class="basis-df">.margin-right-{size}</div>
      <div class="basis-df">.padding-right-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">下外边距</div>
      <div class="basis-df padding-bottom-xs">下内边距</div>
      <div class="basis-df">margin-bottom-{size}</div>
      <div class="basis-df">.padding-bottom-{size}</div>
    </div>
    <div class="flex flex-wrap padding solid-top">
      <div class="basis-df padding-bottom-xs">左外边距</div>
      <div class="basis-df padding-bottom-xs">左内边距</div>
      <div class="basis-df">.margin-left-{size}</div>
      <div class="basis-df">.padding-left-{size}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layout_8'
  }
</script>

<style scoped>

</style>
