<template>
  <div>
    <el-form v-if="type" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="val">
        <!--字符型-->
        <el-input v-if="type === 1" type="text" v-model="ruleForm.val" size="small" @change="emitInput"/>
        <!--整数-->
        <el-input v-if="type === 2" type="number" v-model="ruleForm.val" size="small" @change="emitInput"/>
        <!--小数-->
        <el-input v-if="type === 3" type="number" v-model="ruleForm.val" size="small" @change="emitInput"/>
        <!--是/否-->
        <el-select v-if="type === 4" v-model="ruleForm.val" @change="emitInput">
          <el-option label="是" value="是"/>
          <el-option label="否" value="否"/>
        </el-select>
        <!--百分数-->
        <span v-if="type === 5">
          <el-input type="number" style="width: 90%" v-model="ruleForm.val" size="small" @change="emitInput"/>%
        </span>
        <!--表格-->
        <span v-if="type === 6">
          <el-button type="text" @click="showTable">编辑表格</el-button>
        </span>
        <!--文本-->
        <el-input v-if="type === 7" type="textarea" v-model="ruleForm.val" size="small" @change="emitInput"/>
        <!--下拉选项-->
        <el-select v-if="type === 8" v-model="ruleForm.val" @change="emitInput">
          <el-option v-for="(item, index) in selectOptions" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
    </el-form>

    <el-dialog
      width="90%"
      :title="row.name"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div v-if="row.number === 381">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th colspan="2" style="width: 50px;">周次</th>
              <th v-for="i in weeksNum" :key="i">{{ i+1 }}</th>
            </tr>
            <tr>
              <th rowspan="2" style="width: 5vw">上学期</th>
              <th style="width: 5vw">迟到率(%)</th>
              <td v-for="(item, i) in tableData[0]" :key="i" style="width: 50px;">
                <input type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th style="width: 5vw">缺课率(%)</th>
              <td v-for="(item, i) in tableData[1]" :key="i" style="width: 50px;">
                <input type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th rowspan="2" style="width: 5vw">下学期</th>
              <th style="width: 5vw">迟到率(%)</th>
              <td v-for="(item, i) in tableData[2]" :key="i" style="width: 50px;">
                <input type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th style="width: 5vw">缺课率(%)</th>
              <td v-for="(item, i) in tableData[3]" :key="i" style="width: 50px;">
                <input type="number" v-model="item.value">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="editSave">
            保存
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'fillType',
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
      },
      data: {
        default: null
      },
      remark: {
        default: null
      },
      row: {
        default: {}
      }
    },
    data() {
      const checkVal = (rule, value, callback) => {
        if (this.type === 1) {
          // 字符串
          callback()
        } else if (this.type === 2) {
          // 整数
          if (!this.ruleForm.val || /^\+?[1-9][0-9]*$/.test(this.ruleForm.val)) {
            callback()
          } else {
            callback(new Error('请输入整数'))
          }
        } else if (this.type === 3) {
          // 小数
          if (!this.ruleForm.val || /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.ruleForm.val)) {
            callback()
          } else {
            callback(new Error('请输入小数'))
          }
        } else if (this.type === 4) {
          /*是/否,*/
          callback()
        } else if (this.type === 5) {
          /*百分数*/
          if (!this.ruleForm.val || /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.ruleForm.val)) {
            callback()
          } else {
            callback(new Error('请输入百分数'))
          }
        } else if (this.type === 6) {
          /*表格*/
          callback()
        } else if (this.type === 7) {
          /*文本*/
          callback()
        } else if (this.type === 8) {
          /*下拉选项*/
          callback()
        } else {
          return
        }
      }
      return {
        ruleForm: {
          val: '',
        },
        rules: {
          val: [
            {
              validator: checkVal,
              trigger: 'blur'
            }
          ]
        },
        dialogFormVisible: false,
        temp: {},
        tableData: null,
        weeksNum: 20,
      }
    },
    computed: {
      selectOptions() {
        return this.remark.split('、')
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(va) {
          this.ruleForm.val = va
        }
      },
      row: {
        immediate: true,
        handler(va) {
          if (va.type === 6) { // 表格
            console.log('表格类型')
            if (va.id) {
              this.getDetail()
            } else {
              // 指标编号初始数据
              if (va.number !== 381) {
                this.tableData = [
                  [],
                  [],
                  [],
                  []
                ]
                for (let i = 0; i < this.weeksNum; i++) {
                  this.tableData[0].push({ value: '' })
                  this.tableData[1].push({ value: '' })
                  this.tableData[2].push({ value: '' })
                  this.tableData[3].push({ value: '' })
                }
              } else { // 专业人数统计表
                this.tableData = {
                  total: 0,
                  grade1: 0,
                  grade2: 0,
                  grade3: 0,
                }
              }
            }
          }
        }
      }
    },
    methods: {
      emitInput(val) {
        console.log('emitInput', val)
        this.$emit('input', val)
      },
      editSave() {
        console.log('表格数', this.tableData)
        let p = {
          id: this.row.id,
          indicatorId: this.row.indicatorId,
          indicatorYearId: this.$route.query.id,
          jsonData: JSON.stringify(this.tableData)
        }
        this.$api.diagnosis.indicatorYearDataModify(p).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      getDetail() {
        this.$api.diagnosis.indicatorYearDataById({ id: this.row.id }).then(res => {
          this.temp = res.data
          this.tableData = JSON.parse(res.data.jsonData)
        })
      },
      showTable() {
        this.dialogFormVisible = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .index381 {
    border-collapse: collapse;
    border: 0;
    width: 100%;
    text-align: center;

    th, td {
      text-align: center;
      border: 1px solid #ccc;
    }

    input {
      width: 50px;
      border: 0;
    }
  }
</style>
