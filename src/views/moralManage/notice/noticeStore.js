import Vue from 'vue';

const state = Vue.observable({
  listSelection: [],
  query: null
});

export function setSate(key, val) {
  state[key] = val;
}

export function getState(key) {
  return state[key]
}
