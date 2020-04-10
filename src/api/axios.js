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

function reFreshToken() {
  return instance.post('/user/refresh-token', { refreshToken: `${store.state.user.refreshToken}` });
}

instance.setToken = (token, refreshToken) => {
  console.log('set token');
  instance.defaults.headers['Authorization'] = token;
  store.commit('user/setToken', token);
  store.commit('user/setRefreshToken', refreshToken);
};

let isRefreshing = false;

let requests = [];

instance.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.Authorization = `${store.state.user.token}`; // save token in store
    }
    return config;
  },
  error => {
    // Do something for request error
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
          const config = error.config;
          if (!isRefreshing) {
            isRefreshing = true;
            return reFreshToken()
              .then(res => {
                console.log(res);
                const { data } = res;
                if (data.code !== 1) {
                  store.commit('user/logout');
                  router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath },
                  });
                } else {
                  const { token } = data.data;
                  const { refreshToken } = data.data;
                  instance.setToken(token, refreshToken);
                  config.headers.Authorization = token;
                  requests.forEach(cb => cb(token));
                }
                requests = [];
                return instance(config);
              })
              .finally(() => {
                isRefreshing = false;
              });
          } else {
            return new Promise(resolve => {
              requests.push(token => {
                config.headers.Authorization = token;
                resolve(instance(config));
              });
            });
          }
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
