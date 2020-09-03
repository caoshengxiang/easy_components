<template>
  <div>
    <el-form v-if="type" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="val">
        <!--字符型-->
        <el-input :disabled="disabled" v-if="type === 1" type="text" v-model="ruleForm.val" size="small"
                  @change="emitInput"/>
        <!--整数-->
        <el-input :disabled="disabled" v-if="type === 2" type="number" v-model="ruleForm.val" size="small"
                  @change="emitInput"/>
        <!--小数-->
        <el-input :disabled="disabled" v-if="type === 3" type="number" v-model="ruleForm.val" size="small"
                  @change="emitInput"/>
        <!--是/否-->
        <el-select :disabled="disabled" v-if="type === 4" v-model="ruleForm.val" @change="emitInput">
          <el-option label="是" value="是"/>
          <el-option label="否" value="否"/>
        </el-select>
        <!--百分数-->
        <span v-if="type === 5">
          <el-input :disabled="disabled" type="number" style="width: 90%" v-model="ruleForm.val" size="small"
                    @change="emitInput"/>%
        </span>
        <!--表格-->
        <span v-if="type === 6">
          <el-button type="text" @click="showTable" style="color: red;">编辑表格</el-button>
        </span>
        <!--文本-->
        <span v-if="type === 7">
          <el-button type="text" @click="showTableText">编辑文本</el-button>
        </span>

        <!--下拉选项-->
        <el-select :disabled="disabled" v-if="type === 8" v-model="ruleForm.val" @change="emitInput">
          <el-option v-for="(item, index) in selectOptions" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
    </el-form>

    <el-dialog
      width="40%"
      :title="row.name"
      :visible.sync="dialogFormVisibleText"
      :close-on-click-modal="false"
    >
      <el-input :disabled="disabled" v-if="type === 7" :rows="5" type="textarea" v-model="textCurrentValue" size="small"
                @change="emitInput"/>

      <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 10px;">
        <el-button @click="dialogFormVisibleText = false">
          取消
        </el-button>
        <el-button :disabled="disabled" type="primary" @click="editSaveText">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="90%"
      :title="row.name"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div v-if="row.number === 358">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th colspan="2" style="width: 50px;">周次</th>
              <th v-for="i in weeksNum" :key="i">{{ i }}</th>
            </tr>
            <tr>
              <th rowspan="2" style="width: 5vw">上学期</th>
              <th style="width: 5vw">迟到率(%)</th>
              <td v-for="(item, i) in tableData[0]" :key="i" style="width: 50px;">
                <input :disabled="disabled" type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th style="width: 5vw">缺课率(%)</th>
              <td v-for="(item, i) in tableData[1]" :key="i" style="width: 50px;">
                <input :disabled="disabled" type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th rowspan="2" style="width: 5vw">下学期</th>
              <th style="width: 5vw">迟到率(%)</th>
              <td v-for="(item, i) in tableData[2]" :key="i" style="width: 50px;">
                <input :disabled="disabled" type="number" v-model="item.value">
              </td>
            </tr>
            <tr>
              <th style="width: 5vw">缺课率(%)</th>
              <td v-for="(item, i) in tableData[3]" :key="i" style="width: 50px;">
                <input :disabled="disabled" type="number" v-model="item.value">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 10px;">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button :disabled="disabled" type="primary" @click="editSave">
            保存
          </el-button>
        </div>
      </div>

      <div v-if="row.number === 361 || row.number === 379">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th>专业名称</th>
              <th>专职教师人数</th>
              <th>兼职教师人数</th>
              <th>学生人数</th>
              <th>生师比例</th>
            </tr>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.value1}}</td>
              <td>{{item.value2}}</td>
              <td>{{item.value3}}</td>
              <td>{{item.value4}}</td>
              <td>{{proportion(item.value2, item.value3, item.value4)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="row.number === 324">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th rowspan="2">项目/专业</th>
              <th colspan="4">在校人数</th>
            </tr>
            <tr>
              <th>小计</th>
              <th>一年级</th>
              <th>二年级</th>
              <th>三年级</th>
            </tr>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.value1}}</td>
              <td>{{getSum(item.value2 + item.value3 + item.value4)}}</td>
              <td>{{item.value2}}</td>
              <td>{{item.value3}}</td>
              <td>{{item.value4}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="row.number === 325">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th>专业名称</th>
              <th>毕业人数</th>
              <th>就业率(%)</th>
              <th>对口就业率(%)</th>
              <th>初次就业起薪(元)</th>
            </tr>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.value1}}</td>
              <td>{{item.value2}}</td>
              <td>{{item.value3}}</td>
              <td>{{item.value4}}</td>
              <td>{{item.value5}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="row.number === 326">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th>类型</th>
              <th>实训室名称</th>
              <th>工位数</th>
              <th>建成年月</th>
            </tr>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.value1}}</td>
              <td>{{itemvalue2}}</td>
              <td>{{item.value3}}</td>
              <td>{{item.valuee4}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="row.number === 341">
        <div style="width: 100%;overflow: auto;">
          <table class="index381">
            <tbody>
            <tr>
              <th>专业名称</th>
              <th>录取数</th>
            </tr>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.value1}}</td>
              <td>{{item.value2}}</td>
            </tr>
            </tbody>
          </table>
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
      },
      disabled: {
        defalut: false,
        type: Boolean,
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
        dialogFormVisibleText: false,
        temp: {},
        tableData: null,
        weeksNum: 20,
        textCurrentValue: '', // 文本
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
            // 指标编号初始数据
            this.initTable(va.number)
          } else if (va.type === 7) { // 文本
            this.textCurrentValue = ''
          }
        }
      }
    },
    methods: {
      emitInput(val) {
        console.log('emitInput', val)
        this.$emit('input', val)
      },
      proportion(aa, bb, cc) {
        function gcd(a, b) {
          if (b === 0) {
            return a
          }
          var r = parseInt(a % b)
          return gcd(b, r)
        }

        if (aa && bb && cc) {
          let ys = gcd(aa + bb, cc)
          return (aa + bb) / ys + ':' + cc / ys
        } else {
          return ''
        }
      },
      initTable(number) {
        if (number === 358) { // 学生迟到、缺课率
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
        } else if (number === 361 || number === 379 || number === 324 || number === 325 || number === 326 || number === 341) {
          // 各专业中教师数量
          this.tableData = []
        }
      },
      editSaveText() {
        let p = {
          id: this.row.id,
          indicatorId: this.row.indicatorId,
          indicatorYearId: this.$route.query.id,
          data: this.textCurrentValue
        }
        this.$api.diagnosis.indicatorYearDataModify(p).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.dialogFormVisibleText = false
          }
        })
      },
      editSave() {
        // console.log('表格数', this.tableData)
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
            this.dialogFormVisible = false
            this.dialogFormVisibleText = false
          }
        })
      },
      getDetail() {
        this.$api.diagnosis.indicatorYearDataById({ id: this.row.id }).then(res => {
          this.temp = res.data
          if (this.row.type === 6) {
            if (res.data.jsonData) {
              this.tableData = JSON.parse(res.data.jsonData)
            } else { // 详情未返回number
              this.initTable(this.row.number)
            }
          } else if (this.row.type === 7) {
            this.textCurrentValue = res.data.data
          }
        })
      },
      getDetailAll() {
        if (this.row.type === 6) { // 表格
          console.log('表格类型')
          if (this.row.id) {
            this.getDetail()
          } else {
            // 指标编号初始数据
            this.initTable(this.row.number)
          }
        } else if (this.row.type === 7) { // 文本
          if (this.row.id) {
            this.getDetail()
          } else {
            this.textCurrentValue = ''
          }
        }
      },
      showTable() {
        this.getDetailAll()
        this.dialogFormVisible = true
      },
      showTableText() {
        this.getDetailAll()
        this.dialogFormVisibleText = true
      },
      getSum(s1, s2, s3){
        let sum = 0
        if (s1 && typeof s1 === 'number') {
          sum += s1
        }
        if (s2 && typeof s2 === 'number') {
          sum += s2
        }
        if (s3 && typeof s3 === 'number') {
          sum += s3
        }
        return sum
      },
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
