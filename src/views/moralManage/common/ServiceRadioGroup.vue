<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    :loading="loading"
    @change="handleChange"
    v-loading="loading"
    v-model="textValue"
  >
    <el-scrollbar :style="{ height: height, overflow: 'hidden' }" viewClass="radio-container">
      <el-radio
        v-for="(obj, index) in dataList"
        :key="index"
        :label="obj[field]"
        :name="groupName"
        @click.native="$emit('after-select', obj)"
      >
        {{ getLabel(obj) }}
      </el-radio>
    </el-scrollbar>
  </el-radio-group>
</template>

<script>
  import ElementEmitter from 'element-ui/src/mixins/emitter'

  export default {
    name: 'ServiceRadioGroup',
    provide: { elFormItem: false }, // 拦截elFormItem往下的注入，避免input等文本框错误的渲染
    mixins: [ElementEmitter],
    props: {
      // props
      /**
       * 组件值
       */
      value: {
        type: [String, Number],
        default: ''
      },
      /**
       * 数据接口,必穿
       */
      dataService: {
        type: Function,
        required: true
      },
      /**
       * 默认查询
       */
      defaultQuery: {
        type: Object,
        default: null
      },
      /**
       * label对应的属性key
       */
      name: {
        type: String,
        default: 'label'
      },
      /**
       * value对应的属性key（不传field时取name）
       */
      field: {
        type: String,
        default: 'value'
      },
      /**
       * 是否每次打开下拉框都请求数据
       */
      height: {
        type: [Number, String],
        default: 200
      },
      /**
       * label format
       */
      // eslint-disable-next-line vue/require-default-prop
      format: {
        type: Function
      },
      /**
       * radio对应的name 用以分组
       */
      groupName: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        loading: false,
        dataList: [],
        textValue: this.value || ''
      }
    },
    watch: {
      // 监听值变化触发表单校验
      value: {
        deep: true,
        immediate: true,
        handler (newVal) {
          this.dispatch('ElFormItem', 'el.form.change', [newVal])
        }
      }
    },
    created () {
      this.getData();
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value)
      },
      // label渲染
      getLabel (obj) {
        if (this.format) {
          return this.format(obj)
        } else {
          return obj[this.name];
        }
      },
      // 获取数据
      getData () {
        this.loading = true;
        this.dataService(this.defaultQuery)
          .then(res => {
            if (res.code === 200) {
              const data = res.data;
              // eslint-disable-next-line no-prototype-builtins
              const index = data.findIndex(obj => !obj.hasOwnProperty(this.field));
              if (index === -1) {
                this.dataList = data
              } else {
                this.$message({ type: 'warning', message: `数据中存在不含有${this.field}属性的对象！` })
              }
              this.loading = false
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .radio-container {
    display: flex;
    flex-direction: column;
    label {
      margin: 6px 0;
    }
  }
</style>
