<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <!--    <div class="statisticsInfo">-->
    <!--      <div class="menu-2-box">-->
    <!--        <div-->
    <!--          class="menu-2-item hvr-underline-from-center"-->
    <!--        ><img src="../../../assets/p1.png" height="50" width="50"/>-->
    <!--          <div class="text">-->
    <!--            <div class="analysis-text"><span class="tag">男生：{{statisticsInfo.manTotal}} </span></div>-->
    <!--            <div class="analysis-text"><span class="tag">女生：{{statisticsInfo.womanTotal}}</span></div>-->
    <!--            <div class="analysis-text-small">当前床位总数</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div/>-->
    <!--      </div>-->
    <!--    </div>-->
    <y-page-list-layout>
      <template slot="left">
        <!--        <PermissionButton-->
        <!--          menu-no="_views_set_post_add"-->
        <!--          class="filter-item"-->
        <!--          icon="el-icon-plus"-->
        <!--          type="primary"-->
        <!--          name=""-->
        <!--          round-->
        <!--          @click="handleAdd"-->
        <!--        />-->
        <el-button class="filter-item" round type="warning">
          预警设置
        </el-button>
        <el-select v-model="level1" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="一级指标" class="filter-item"
                   @change="level1Change"
        >
          <el-option
            v-for="item in level1List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="listQuery.parentId" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="二级指标" class="filter-item"
                   @change="level2Change"
        >
          <el-option
            v-for="item in level2List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <!--        <el-button style="margin-left: 20px;" class="filter-item" type="primary" round @click="searchList">-->
        <!--          搜索-->
        <!--        </el-button>-->
        <!--        <el-button class="filter-item" round type="warning" @click="resetSearch()">-->
        <!--          重置-->
        <!--        </el-button>-->
        <el-button class="filter-item" round type="primary" style="margin-left: 10px;" @click="editHandle(null)">
          编辑
        </el-button>
        <el-button class="filter-item" type="success" round @click="addHandle">
          新增
        </el-button>
      </template>
      <template slot="right">
        <!--导出-->
        <!--        <PermissionButton-->
        <!--          menu-no="_views_dormitory_classRecord_export"-->
        <!--          class-name="filter-item"-->
        <!--          @click="exportClassRecord"-->
        <!--          type="primary"-->
        <!--          round-->
        <!--        />-->
      </template>
      <parentTable ref="multipleTable" @selectionChange="handleSelectionChange" v-loading="listLoading"
                   :data="pageData" slot="table" style="width: 100%;">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column label="名称" prop="name" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="编号" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.type && indicatorTypeName()(row.type) }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="必填" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>-->
        <!--              {{}}-->
        <!--            </span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.state === true ? '正常': '禁用' }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="通用报告" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{}}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="备注" align="center">
          <template slot-scope="{row}">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{row.creatorName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button round type="primary" @click="editHandle(row)">编辑</el-button>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
    <el-dialog
      width="600px"
      title="指标编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="ruleForm"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
        :model="temp" :rules="rules"
      >
        <el-form-item label="指标等级：" prop="level">
          <el-select v-model="temp.level" @change="levelChange" class="filter-item" style="float: left;width: 100%;"
                     placeholder="请选择">
            <el-option
              v-for="item in indexLevelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" prop="parentId" v-if="temp.level === 2">
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 100%;" placeholder="一级指标">
            <el-option
              v-for="item in level1List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" v-if="temp.level === 3">
          <el-select v-model="level1Id" @change="level1Change_dialog" class="filter-item"
                     style="float: left;width: 50%;" placeholder="一级指标">
            <el-option
              v-for="item in level1List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 50%;" placeholder="二级指标">
            <el-option
              v-for="item in level2List_dialog"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指标名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item"/>
        </el-form-item>
        <el-form-item label="指标编号：" prop="number">
          <el-input v-model="temp.number" class="filter-item"/>
        </el-form-item>

        <el-form-item label="指标值类型：" filterable prop="type">
          <el-select v-model="temp.type" class="filter-item" style="float: left;width: 100%;" placeholder="请选择"
                     clearable>
            <el-option
              v-for="item in indicatorType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" prop="state">
          <el-radio-group v-model="temp.state">
            <el-radio :label="true">正常</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="temp.remark" class="filter-item"/>
        </el-form-item>
        <el-form-item label="自动填入：">
          <el-radio-group v-model="temp.autoFill">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="填入方式：">
          <el-select v-model="temp.fillWay" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in indicatorFillWay"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="对应指标编号：">
          <el-input v-model="temp.fillWayNo" placeholder="多个以英文逗号隔开" class="filter-item"/>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" :loading="editSaveLoading" @click="editSave">
            保存
          </el-button>
        </el-form-item>
      </el-form>
      <!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
      <!--        -->
      <!--      </div>-->
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'ViewsDiagnosisIndexMgList',
    components: {
      Breadcrumb,
    },
    data() {
      var checkType = (rule, value, callback) => {
        if (this.temp.level === 3 && !value) {
          callback(new Error('请选择指标值类型'))
        } else {
          callback()
        }
      }
      return {
        importance: [],
        listLoading: false,
        pageData: [],
        pagePara: {
          current: 1,
          size: 10
        },
        listQuery: {
          descs: 'id',
          level: 3,
          parentId: '',
        },
        level1: null,
        indexOptions: [],
        dialogFormVisible: false,
        temp: {
          level: '',
          name: '',
          number: '',
          state: true,
          remark: '',
          autoFill: false,
          fillWay: '',
          fillWayNo: '',
          parentId: null,
        },
        indexLevelOptions: [
          {
            name: '一级指标',
            id: 1
          },
          {
            name: '二级指标',
            id: 2
          },
          {
            name: '三级指标',
            id: 3
          },
        ],
        level1List: [],
        level2List: [],
        editSaveLoading: false,
        rules: {
          level: [
            {
              required: true,
              message: '请选择指标等级',
              trigger: 'change'
            },
          ],
          name: [
            {
              required: true,
              message: '请输入指标名称',
              trigger: 'blur'
            },
          ],
          number: [
            {
              required: true,
              message: '请输入指标编号',
              trigger: 'blur'
            },
          ],
          type: [
            {
              validator: checkType,
              trigger: 'change'
            }
          ],
        },
        level2List_dialog: [],
        level1Id: null,
      }
    },
    computed: {
      ...mapState('enumerate', [
        'indicatorType',
        'indicatorFillWay',
      ])
    },
    created() {
      // this.getList()
      this.getLevel1()
    },
    methods: {
      ...mapGetters('enumerate', [
        'indicatorTypeName',
        'indicatorFillWayName',
      ]),
      searchList() {
        this.pagePara.current = 0
        this.getList()
      },
      getLevel1() {
        this.$api.diagnosis.indicatorList({
          level: 1
        }).then(res => {
          if (res.code === 200) {
            // 返回成功
            this.level1List = res.data
          }
        })
      },
      level1Change(val) {
        this.listQuery.parentId = null
        this.getLevel2(val)
      },
      getLevel2(id) {
        this.$api.diagnosis.indicatorList({
          parentId: id,
          level: 2
        }).then(res => {
          if (res.code === 200) {
            // 返回成功
            this.level2List = res.data
          }
        })
      },
      level2Change() {
        this.pagePara.current = 1
        this.getList()
      },
      getList() {
        if (!this.listQuery.parentId) {
          return
        }
        this.listLoading = true
        this.$api.diagnosis.indicatorList({ ...this.pagePara, ...this.listQuery }).then(res => {
          this.listLoading = false
          if (res.code === 200) {
            // 返回成功
            this.pageData = res.data
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        console.log(val, '选择')
        // console.log(this.$refs.multipleTable.$refs.table)
        // console.log(this.$refs.multipleTable.testMethods())
      },
      tempInit() {
        this.temp = {
          level: '',
          name: '',
          number: '',
          state: true,
          remark: '',
          autoFill: false,
          fillWay: '',
          fillWayNo: '',
          parentId: null,
        }
      },
      addHandle() {
        this.tempInit()
        this.dialogFormVisible = true
      },
      editHandle(row) {
        if (row) {
          this.level1Id = this.level1
          this.level1Change_dialog(this.level1Id, this.temp.parentId)
          this.temp = row
        } else if (this.listQuery.parentId) { // 二级
          this.temp = this.level2List.find(item => item.id === this.listQuery.parentId)
        } else if (this.level1) {
          this.temp = this.level1List.find(item => item.id === this.level1)
        } else {
          return
        }
        this.dialogFormVisible = true
      },
      editSave() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.editSaveLoading = true
            if (!this.temp.id) {
              this.$api.diagnosis.indicatorAdd(this.temp).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }
                this.editSaveLoading = false
                this.dialogFormVisible = false
              }).catch(() => {
                this.editSaveLoading = false
              })
            } else {
              this.$api.diagnosis.indicatorEdit(this.temp).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }
                this.editSaveLoading = false
                this.dialogFormVisible = false
              }).catch(() => {
                this.editSaveLoading = false
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })

      },
      levelChange() {
        this.temp.parentId = null
      },
      level1Change_dialog(val, pid = null) {
        this.temp.parentId = pid
        this.getLevel2_dialog(val)
      },
      getLevel2_dialog(id) {
        this.$api.diagnosis.indicatorList({
          parentId: id,
          level: 2
        }).then(res => {
          if (res.code === 200) {
            // 返回成功
            this.level2List_dialog = res.data
          }
        })
      },
      // exportClassRecord() {
      //   this.$api.dormitoryCheck.dormitoryClbumTimeAssessmentExportExcel({ ...this.pagePara, ...this.listQuery })
      // },
    }
  }
</script>
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
  }
</style>
