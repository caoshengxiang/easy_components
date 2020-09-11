<template>
  <div class="app-container">
    <y-detail-page-layout>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px"
               style="width: 100%;"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="temp.name" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年份：" prop="year">
              <el-input v-model="temp.year" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学期：" prop="termName">
              <el-input v-model="temp.termName" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="周数：" prop="weeks">
              <el-input v-model="temp.weeks" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宿舍编号：" prop="code">
              <el-input v-model="temp.code" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核类型：" prop="type">
              <!--          <el-select v-model="temp.type" class="filter-item" style="float: left;" placeholder="请选择"  @change="getReason">-->
              <!--            <el-option label="内务考核" value="内务考核"/>-->
              <!--            <el-option label="纪律考核" value="纪律考核"/>-->
              <!--          </el-select>-->
              <el-input v-model="temp.type" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="扣除原因：" prop="reason">
              <!--          <el-select v-model="temp.reason" class="filter-item" style="float: left;" placeholder="请选择">-->
              <!--            <el-option v-for="item in reasonOptions" :key="item.name" :label="item.name"-->
              <!--                       :value="item.name"-->
              <!--            />-->
              <!--          </el-select>-->
              <el-input v-model="temp.reason" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="扣除分数：" prop="score">
              <el-input v-model="temp.score" type="text" class="filter-item"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </y-detail-page-layout>
  </div>
</template>

<script>
  export default {
    name: 'list_approve',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        temp: {},
        reasonOptions: [],
      }
    },
    watch: {
      detailInfo: function (value) {
        this.temp = value
      },
    },
    created() {
      if (this.detailInfo) {
        this.temp = this.detailInfo
      } else {
        // this.getDetail()
      }
    },
    // methods: {
    //   getReason(val) {
    //     let code = ''
    //     if (val === '内务考核') {
    //       code = 'dormitoryCheckReason'
    //     } else {
    //       code = 'dormitoryCheckReasonDiscipline'
    //     }
    //     this.temp.reason = ''
    //     this.$api.dictData.getByCode({ code: code }).then(res => {
    //       this.reasonOptions = res.data
    //     })
    //   },
    // }
  }
</script>

<style scoped>

</style>
