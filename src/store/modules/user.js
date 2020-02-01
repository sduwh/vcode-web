// 尝试从sessionStorage恢复数据
const state = {
  nickname: window.sessionStorage.getItem("nickname")
    ? window.sessionStorage.getItem("nickname")
    : null,
  email: window.sessionStorage.getItem("email")
    ? window.sessionStorage.getItem("email")
    : null,
  token: window.sessionStorage.getItem("token")
    ? window.sessionStorage.getItem("token")
    : null,
  isLogin: window.sessionStorage.getItem("isLogin")
    ? window.sessionStorage.getItem("isLogin")
    : false
};

const getters = {
  getNickname: state => {
    return state.nickname;
  },
  getEmail: state => {
    return state.email;
  },
  getToken: state => {
    return state.token;
  },
  getLoginStatus: state => {
    return state.isLogin;
  }
};

const actions = {};
// 信息同步至sessionStorage,防止页面刷新数据丢失造成用户体验不好
const mutations = {
  setNickname(state, nickname) {
    if (nickname == undefined) {
      state.nickname = "NULL";
      window.sessionStorage.setItem("nickname", "NULL");
    } else {
      state.nickname = nickname;
      window.sessionStorage.setItem("nickname", nickname);
    }
  },
  setEmail(state, email) {
    if (email == undefined) {
      state.email = "";
      window.sessionStorage.setItem("email", "");
    } else {
      state.email = email;
      window.sessionStorage.setItem("email", email);
    }
  },
  setToken(state, token) {
    state.token = token;
    window.sessionStorage.setItem("token", token);
  },
  setUserInfo(state, data) {
    mutations.setNickname(state, data.nickname);
    mutations.setEmail(state, data.email);
  },
  setLoginStatus(state, status) {
    state.isLogin = status;
    window.sessionStorage.setItem("isLogin", status);
  },
  logout(state) {
    mutations.setNickname(state, "");
    mutations.setEmail(state, "");
    mutations.setToken(state, "");
    window.sessionStorage.removeItem("nickname");
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("token");
    mutations.setLoginStatus(state, false);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
