<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <el-input v-model="input" placeholder="评价表名称" clearable />

        <p>评价状态</p>
        <el-switch
          style="margin-left: 20px;"
          v-model="value3"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用"
        ></el-switch>

        <p>选择评价项</p>

        <div style="text-align: center">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :button-texts="['到左边', '到右边']"
            :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
            @change="handleChange"
            :data="data"
          ></el-transfer>
        </div>

        <el-button size="mini" type="success" @click="keep()" style="margin-top:40px;">保存</el-button>
        <el-button size="mini" type="info" @click="cancel()" style="margin-top:40px;">取消</el-button>
      </template>
    </y-page-list-layout>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import YDetailPageLayout from "@/components/YDetailPageLayout";
export default {
  components: {
    Breadcrumb,
    YDetailPageLayout,
  },
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 20; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
        });
      }
      return data;
    };
    return {
      data: generateData(),
      input: "",
      value3: true,
      value: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key}-{option.label}
          </span>
        );
      },
    };
  },
  methods: {
    keep() {
      console.log("保存");
    },
    cancel() {
      this.$router.push("/views/attainment/questionnaire/Administration");
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>