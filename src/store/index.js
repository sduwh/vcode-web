import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import admin from './modules/admin';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    admin,
  },
  strict: debug,
});
