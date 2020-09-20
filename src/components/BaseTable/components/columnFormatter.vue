<template>
  <el-table-column
    v-if="item.slot"
    :label="item.name"
    :sortable="item.sortable"
    :prop="item.key"
    :width="item.width || 'auto'"
    :min-width="item.minWidth || '140px'"
    :class-name="item.className"
    :label-class-name="item.labelClassName"
    :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip"
  >
    <template slot-scope="scope">
      <div v-if="item.state_type" :style="item.styleObject">
        <span v-for="(type, index_t) in item.state_type" :key="index_t">
          <span
            v-if="scope.row[item.key] === type.value"
            :style="item.type_style[scope.row[item.key]]"
          >
            {{ type.label }}
          </span>
        </span>
      </div>
      <div v-else :style="item.styleObject">
        <span :style="item.type_style[scope.row[item.key]]">{{ scope.row[item.key] }} </span>
      </div>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="item.name"
    :sortable="item.sortable"
    :prop="item.key"
    :width="item.width || 'auto'"
    :min-width="item.minWidth || '140px'"
    :formatter="item.formatter"
    :class-name="item.className"
    :label-class-name="item.labelClassName"
    :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip"
  />
</template>

<script>
  export default {
    name: 'ColumnFormatter',
    props: {
      item: {
        default() {
          return {}
        },
        type: Object
      }
    }
  }
</script>

<style scoped>

</style>
