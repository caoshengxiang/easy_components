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
        <el-select v-model="listQuery.level1" style="width: 200px;" clearable filterable
                   placeholder="诊断项目" class="filter-item" @change="level1Change"
        >
          <el-option
            v-for="item in keyElement1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="listQuery.level2" style="width: 200px;margin-left: 20px;" clearable filterable
                   placeholder="诊断要素" class="filter-item" @change="level2Change"
        >
          <el-option
            v-for="item in keyElement2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
      <parentTable v-loading="listLoading" :data="pageData" slot="table" style="width: 100%;">
        <el-table-column label="编号" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.number }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="诊断点名称" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="涉及指标编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.indicatorNumbers }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原因集合" align="center">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="措施集合" align="center">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="效果集合">
          <template slot-scope="{row}">
            <el-button round type="text" @click="editHandle2">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col">
          <template slot-scope="{row}">
            <el-button round type="primary" @click="editHandle(row)">编辑</el-button>
          </template>
        </el-table-column>
        <!--    </el-table>-->
      </parentTable>
    </y-page-list-layout>
    <el-dialog
      width="600px"
      title="编辑"
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
        <el-form-item label="诊断类型：" prop="type">
          <el-select v-model="temp.type" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in diagnosisType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" prop="parentId" v-if="temp.type === 2">
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 100%;" placeholder="诊断项目">
            <el-option
              v-for="item in keyElement1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快速定位：" prop="parentId" v-if="temp.type === 3">
          <el-select v-model="dialogLevel1Id" @change="level1Change_dialog" class="filter-item" style="float: left;width: 50%;" placeholder="诊断项目">
            <el-option
              v-for="item in keyElement1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 50%;" placeholder="诊断要素">
            <el-option
              v-for="item in level2List_dialog"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="诊断名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item"/>
        </el-form-item>
        <el-form-item label="诊断编号：" prop="indicatorNumbers">
          <el-input v-model="temp.indicatorNumbers" placeholder="多个指标编号请用英文逗号分隔" class="filter-item"/>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="temp.state">
            <el-radio :label="true">正常</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="editSave" :loading="editSaveLoading">
            保存
          </el-button>
        </el-form-item>
      </el-form>
      <!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
      <!--        -->
      <!--      </div>-->
    </el-dialog>
    <el-dialog
      width="600px"
      title="编辑"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        label-position="right"
        label-width="120px"
        style="width: 520px;"
      >
        <el-form-item label="操作：">
          <el-button type="success">新增集合</el-button>
        </el-form-item>
        <el-form-item label="集合：" prop="name" v-for="(item, index) in groupList" :key="index">
          <el-input v-model="temp.text" class="filter-item" style="width: 310px;margin-right: 10px;"/>
          <el-button type="danger">删除</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible2 = false">
            取消
          </el-button>
          <el-button type="primary">
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
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'ViewsDiagnosisIndexMgKeyElementsList',
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
        listLoading: false,
        pageData: [],
        dialogFormVisible: false,
        temp: {
          level: ''
        },
        listQuery: {
          level1: null,
          level2: null,
        },
        dialogFormVisible2: false,
        groupList: [
          {
            id: 1,
            text: 'a'
          },
          {
            id: 2,
            text: 'b'
          },
          {
            id: 3,
            text: 'c'
          },
        ],
        keyElement1: [],
        keyElement2: [],
        editSaveLoading: false,
        rules: {
          type: [
            {
              required: true,
              message: '请选择诊断类型',
              trigger: 'change'
            },
          ],
          name: [
            {
              required: true,
              message: '请输入诊断名称',
              trigger: 'blur'
            },
          ],
        },
        level2List_dialog: [],
        dialogLevel1Id: null,
      }
    },
    computed: {
      ...mapState('enumerate', [
        'diagnosisType',
      ])
    },
    created() {
      // const that = this
      // that.getList()
      this.getList({
        type: 1,
      }, () => {
        //
      })
    },
    methods: {
      level1Change(va) {
        this.keyElement2 = []
        this.listQuery.level2 = null
        if (va) {
          console.log(va)
          this.getList({
            type: 2,
            parentId: va
          })
        }
      },
      level2Change(va) {
        if (va) {
          this.getList({
            type: 3,
            parentId: va
          })
        }
      },
      getList(params = {}, callback) {
        const that = this
        that.listLoading = true
        that.$api.diagnosis.diagnosisEleList(params).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            if (params.type === 1) {
              that.keyElement1 = data.data
            } else if (params.type === 2) {
              that.keyElement2 = data.data
            } else {
              that.pageData = data.data
            }
            callback && callback()
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      editHandle(row) {
        if (row) {
          this.dialogLevel1Id = this.listQuery.level1
          this.level1Change_dialog(this.dialogLevel1Id, this.temp.parentId)
          this.temp = row
        } else if (this.listQuery.level2) { // 二级
          this.temp = this.keyElement2.find(item => item.id === this.listQuery.level2)
        } else if (this.listQuery.level1) {
          this.temp = this.keyElement1.find(item => item.id === this.listQuery.level1)
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
              this.$api.diagnosis.diagnosisEleAdd(this.temp).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList({
                    type: 3,
                    parentId: this.listQuery.level2
                  })
                }
                this.editSaveLoading = false
                this.dialogFormVisible = false
              }).catch(() => {
                this.editSaveLoading = false
              })
            } else {
              this.$api.diagnosis.diagnosisEleEdit(this.temp).then(res => {
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList({
                    type: 3,
                    parentId: this.listQuery.level2
                  })
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
      level1Change_dialog(val, pid = null) {
        this.temp.parentId = pid
        this.getLevel2_dialog(val)
      },
      getLevel2_dialog(id) {
        this.$api.diagnosis.diagnosisEleList({
          type: 2,
          parentId: id
        }).then(res => {
          if (res.code === 200) {
            // 返回成功
            this.level2List_dialog = res.data
          }
        })
      },
      tempInit() {
        this.temp = {
          type: null,
          parentId: null,
          state: true,
          name: '',
          indicatorNumbers: '',
        }
      },
      addHandle() {
        this.tempInit()
        this.dialogFormVisible = true
      },
      editHandle2() {
        this.dialogFormVisible2 = true
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
