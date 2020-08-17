<template>
  <el-form inline :model="form">
    <el-form-item>
      <PermissionButton round menu-no="_views_leagueActivities_memberManage_add" type="primary" name="新增社员" :page-jump="true" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.communityName" placeholder="社团名称" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.jobs" placeholder="职务" />
    </el-form-item>
    <el-form-item>
      <el-date-picker v-model="form.timeStart" placeholder="任职时间开始" value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item label-width="20px" label="-">
      <el-date-picker v-model="form.timeStart" placeholder="任职时间结束" value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.name" placeholder="姓名" />
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
import PermissionButton from '@/components/PermissionButton/PermissionButton'

export default {
  name: 'IndexQueryForm',
  components: {
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
      form: {
        communityName: this.$route.query.communityName
      }
    }
  },
  /*watch: {
    $route(newVal, oldVal) {
      if (newVal.path === '/views/leagueActivities/memberManage') {
        if (newVal.query.communityName !== oldVal.query.communityName) {
          this.form.communityName = newVal.query.communityName;
        }
        this.search();
      }
    }
  },*/
  methods: {
    search() {
      this.query(this.form);
    },
    reset() {
      this.form = {};
      this.query(this.form);
    }
  },
};
</script>

<style scoped>
.query-form {
  display: flex;
}
</style>
