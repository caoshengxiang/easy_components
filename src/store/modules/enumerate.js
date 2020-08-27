const state = {
  indicatorType: [
    { value: 1, name: '字符型'},
    { value: 2, name: '整数'},
    { value: 3, name: '小数'},
    { value: 4, name: '是/否'},
    { value: 5, name: '百分数'},
    { value: 6, name: '表格'},
    { value: 7, name: '文本'},
    { value: 8, name: '下拉选项'},
  ],
  indicatorFillWay: [
    { value: 1, name: '求和'},
    { value: 2, name: '求差'},
    { value: 3, name: '求积'},
    { value: 4, name: '求商'},
    { value: 5, name: '求百分差'},
    { value: 6, name: '两年差'},
  ],
}
const mutations = {}
const actions = {}
const getters = {
  indicatorTypeName:(state, getters) => (val) => {
    let item = state.indicatorType.find(item => item.value === val)
    return item.name
  },
  indicatorFillWayName:(state, getters) => (val) => {
    let item = state.indicatorFillWay.find(item => item.value === val)
    return item.name
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
