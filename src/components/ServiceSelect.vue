<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    filterable
    :value="textValue"
    :loading="loading"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  >
    <template v-if="pureList">
      <el-option
        v-for="(obj, index) in dataList"
        :key="index"
        :label="obj"
        :value="obj"
        @click.native="$emit('after-select', obj)"
      />
    </template>
    <template v-else>
      <el-option
        v-for="(obj, index) in dataList"
        :key="index"
        :label="obj[name]"
        :value="obj[field]"
        @click.native="$emit('after-select', obj)"
      />
    </template>
  </el-select>
</template>

<script>
  import ElementEmitter from 'element-ui/src/mixins/emitter'

  export default {
    name: 'ServiceSelect',
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
      immediate: {
        type: Boolean,
        default: true
      },
      /**
       * data数据格式 true 值数组  false 对象数组
       */
      pureList: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: false,
        dataList: []
      }
    },
    computed: {
      textValue () {
        return this.value || ''
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
      if (!this.immediate) {
        this.getData();
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value)
      },
      // 下拉框显示/隐藏
      handleVisibleChange (showFlag) {
        if (showFlag && this.immediate) {
          this.getData()
        }
      },
      // 获取数据
      getData () {
        this.loading = true;
        this.dataService(this.defaultQuery)
          .then(res => {
            if (res.code === 200) {
              const data = res.data;
              if (this.pureList) {
                this.dataList = data
              } else {
                // eslint-disable-next-line no-prototype-builtins
                const index = data.findIndex(obj => !obj.hasOwnProperty(this.field));
                if (index === -1) {
                  this.dataList = data
                } else {
                  this.$message({ type: 'warning', message: `数据中存在不含有${this.field}属性的对象！` })
                }
              }
              this.loading = false
            }
          })
      }
    }
  }
</script>
