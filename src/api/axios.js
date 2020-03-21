import axios from 'axios';
import { baseAPI } from './config';
import router from 'router/index';
import store from 'store/index';

const instance = axios.create({
  baseURL: baseAPI,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${store.state.user.token}`; // save token in store
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// Do something after get response
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // TODO: refreash token
          store.commit('user/setLoginStatus', false);
          store.commit('user/logout');
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 403:
          router.replace({
            path: '/403',
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        default:
          router.replace({
            path: '/error',
            query: { redirect: router.currentRoute.fullPath },
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;
