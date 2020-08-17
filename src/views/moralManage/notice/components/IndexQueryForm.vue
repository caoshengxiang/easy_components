<template>
  <el-form inline :model="form">
    <el-form-item>
      <service-select
        v-model="form.gradeId"
        name="name"
        field="id"
        :data-service="$api.baseInfo.getGradeList"
        placeholder="年级"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <service-select
        v-model="form.specialtyId"
        name="name"
        field="id"
        :data-service="$api.baseInfo.getSpecialtyList"
        placeholder="专业"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <service-select
        v-model="form.clbumId"
        name="name"
        field="id"
        :data-service="$api.baseInfo.getClbumList"
        placeholder="班级"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <service-select
        v-model="form.termId"
        name="name"
        field="id"
        :data-service="$api.baseInfo.getTermList"
        placeholder="学期"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.name" placeholder="姓名" />
    </el-form-item>
    <el-form-item>
      <el-button
        class="filter-item"
        style="margin-left: 10px;float: left;"
        type="primary"
        @click="query"
        round
        size="mini"
      >
        搜索
      </el-button>
      <el-button class="filter-item" style="float: left;" round type="warning" @click="search" size="mini">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ServiceSelect from '@/components/ServiceSelect';

export default {
  name: 'IndexQueryForm',
  components: {
    ServiceSelect
  },
  props: {
    query: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    search() {
      this.query(this.form);
    },
    reset() {
      this.form = {};
    },
    getData() {
      return this.form;
    }
  }
};
</script>

<style scoped>
.query-form {
  display: flex;
}
</style>
