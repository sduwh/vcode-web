/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// 尝试从localStorage恢复数据
const state = {
  nickname: window.localStorage.getItem('nickname') ? window.localStorage.getItem('nickname') : null,
  email: window.localStorage.getItem('email') ? window.localStorage.getItem('email') : "You haven't set a mailbox",
  token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null,
  account: window.localStorage.getItem('account') ? window.localStorage.getItem('account') : null,
  isLogin: JSON.parse(window.localStorage.getItem('isLogin') ? window.localStorage.getItem('isLogin') : false),
  permissions: window.localStorage.getItem('permissions') ? window.localStorage.getItem('permissions') : null,
  role: window.localStorage.getItem('role') ? window.localStorage.getItem('role') : null,
  refreshToken: window.localStorage.getItem('refreshToken') ? window.localStorage.getItem('refreshToken') : null,
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
  },
  getAccount: state => {
    return state.account;
  },
  getPermissions: state => {
    return state.permissions;
  },
  getRole: state => {
    return state.role;
  },
  getRefreshToken: state => {
    return state.refreshToken;
  },
};

const actions = {};
// 信息同步至localStorage,防止页面刷新数据丢失造成用户体验不好
const mutations = {
  setNickname(state, nickname) {
    if (nickname === undefined) {
      state.nickname = 'NULL';
      window.localStorage.setItem('nickname', 'NULL');
    } else {
      state.nickname = nickname;
      window.localStorage.setItem('nickname', nickname);
    }
  },
  setEmail(state, email) {
    if (email === undefined) {
      state.email = '';
      window.localStorage.setItem('email', "You haven't set a mailbox");
    } else {
      state.email = email;
      window.localStorage.setItem('email', email);
    }
  },
  setAccount(state, account) {
    if (account === undefined) {
      state.account = '';
      window.localStorage.setItem('account', '');
    } else {
      state.account = account;
      window.localStorage.setItem('account', account);
    }
  },
  setToken(state, token) {
    state.token = token;
    window.localStorage.setItem('token', token);
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
    window.localStorage.setItem('refreshToken', refreshToken);
  },
  setUserInfo(state, data) {
    mutations.setNickname(state, data.nickname);
    mutations.setEmail(state, data.email);
    mutations.setAccount(state, data.account);
  },
  setLoginStatus(state, status) {
    state.isLogin = status;
    window.localStorage.setItem('isLogin', status);
  },
  setPermissions(state, user) {
    state.permissions = user.permission;
    window.localStorage.setItem('permissions', user.permission);
  },
  setRole(state, user) {
    state.role = user.role;
    window.localStorage.setItem('role', user.role);
  },
  logout(state) {
    mutations.setNickname(state, '');
    mutations.setEmail(state, '');
    mutations.setToken(state, '');
    mutations.setAccount(state, '');
    mutations.setRole(state, { role: '' });
    mutations.setPermissions(state, { permission: '' });
    window.localStorage.removeItem('nickname');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('account');
    window.localStorage.removeItem('permissions');
    window.localStorage.removeItem('role');
    mutations.setLoginStatus(state, false);
    window.localStorage.removeItem('isLogin');
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
