<template>
  <div class="statistics-container" v-loading="loading">
    <div class="statistics-item">
      <img class="item-img" src="../../../../assets/a1.png" alt="" >
      <div class="item-info">
        <div class="item-head">社团总数</div>
        <div class="item-data">{{ data.communitySum || 0 }}</div>
      </div>
    </div>
    <div class="statistics-item">
      <img class="item-img" src="../../../../assets/a1.png" alt="" >
      <div class="item-info">
        <div class="item-head">兴趣爱好</div>
        <div class="item-data">{{ data.communitySum || 0 }}</div>
      </div>
    </div>
    <div class="statistics-item">
      <img class="item-img" src="../../../../assets/a1.png" alt="" >
      <div class="item-info">
        <div class="item-head">爱心公益</div>
        <div class="item-data">{{ data.communitySum || 0 }}</div>
      </div>
    </div>
    <div class="statistics-item">
      <img class="item-img" src="../../../../assets/a1.png" alt="" >
      <div class="item-info">
        <div class="item-head">各级别人数</div>
        <div class="item-data">{{ data.communitySum || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listStatistics',
  data() {
    return {
      loading: false,
      data: {}
    }
  },
  methods: {
    getData() {
      this.loading = true;
      //  todo 对接口
    }
  }
};
</script>

<style lang="scss" scoped>
.statistics-container {
  display: flex;
  align-items: center;
  .statistics-item {
    display: flex;
    align-items: center;
    margin-right: 24px;
    background-color: rgba(242, 242, 242, 1);
    padding: 12px;
    border-radius: 4px;
    .item-img {
      width: 80px;
      height: 80px;
    }
    .item-info {
      margin-left: 12px;
      text-align: center;
      font-size: 16px;
      .item-head {
        font-weight: bold;
      }
      .item-data {
        margin-top: 6px;
        font-size: 24px;
        font-weight: bold;
        color: #1890ff;
      }
    }
  }
}
</style>
