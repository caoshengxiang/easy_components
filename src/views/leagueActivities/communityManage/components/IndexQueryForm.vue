<template>
  <el-form inline :model="form">
    <el-form-item>
      <PermissionButton round menu-no="_views_leagueActivities_communityManage_add" type="primary" name="新增社团" :page-jump="true" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.name" placeholder="社团名称" />
    </el-form-item>
    <el-form-item>
      <!-- todo 对接口 -->
      <service-select
        v-model="form.type"
        name="name"
        field="id"
        :data-service="$api.baseInfo.getGradeList"
        placeholder="性质"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button
        class="filter-item"
        style="margin-left: 10px;float: left;"
        type="primary"
        @click="search"
        round
        size="mini"
      >
        搜索
      </el-button>
      <el-button class="filter-item" style="float: left;" round type="warning" @click="reset" size="mini">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ServiceSelect from '@/components/ServiceSelect';
import PermissionButton from '@/components/PermissionButton/PermissionButton'

export default {
  name: 'IndexQueryForm',
  components: {
    ServiceSelect,
    PermissionButton
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
      this.query(this.form);
    }
  }
};
</script>

<style scoped>
.query-form {
  display: flex;
}
</style>
