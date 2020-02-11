// 尝试从sessionStorage恢复数据
const state = {
  activeIndex: window.sessionStorage.getItem('adminActivateIndex')
    ? window.sessionStorage.getItem('adminActivateIndex')
    : '',
};

const getters = {
  getActiveIndex: state => {
    return state.activeIndex;
  },
};

const actions = {};

const mutations = {
  setActiveIndex: (state, val) => {
    state.activeIndex = val;
    window.sessionStorage.setItem('adminActivateIndex', val);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
