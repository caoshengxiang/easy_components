<template>
  <div class="form-box-cpt">
    <el-form label-position="right" label-width="140px">
      <draggable
        :clone="cloneData"
        v-model="list"
        :options="dragOptions"
      >
        <div v-for="(item, index) in list" :key="index" class="form-box-item-div">
          <render :item="item"></render>
        </div>
      </draggable>
    </el-form>
  </div>
</template>

<script>
  import { originalFormData } from '../config/originalFormData'
  import draggable from 'vuedraggable'
  import render from './render'

  export default {
    name: 'originalForm',
    data () {
      return {
        dragOptions: {
          group: {
            name: 'drag',
            pull: 'clone',
            put: false,
          },
          sort: false,
          ghostClass: 'ghost',
        },
        list: originalFormData.list,
      }
    },
    props: {},
    components: {
      draggable,
      render,
    },
    methods: {
      // 克隆,深拷贝对象
      cloneData (original) { // 返回数据是copy后的新列表数据，
        let originalData = JSON.parse(JSON.stringify(original))
        let random = parseInt(Math.random() * Math.pow(10, 6), 10)
        let fieldName = `formItem_${new Date().getTime()}_${random}`
        originalData.bindValue = (typeof originalData.bindValue) === 'string' ? '' : []
        originalData.tempFieldName = fieldName
        // console.log(originalData)
        // 深拷贝对象，防止默认空对象被更改
        return originalData
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  /*排序动画*/
  .flip-list-move {
    transition: transform 1s;
  }

  /*表单*/
  .form-box-cpt {
    border: 1px solid #ccc;
    padding: 20px;
    .form-box-item-div {
      .operate-box {
      }
    }
    .upload-demo {
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
</style>
