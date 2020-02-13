import axios from './axios';

const api = {
  getProblems(params) {
    return axios.get('/problem/list', { params });
  },
  getProblem(params) {
    return axios.get('/problem/detail', { params });
  },
  getContests(params) {
    return axios.get('/contests', params);
  },
  getSubmissions(params) {
    return axios.get('/submissions', params);
  },
  getSubmission(params) {
    return axios.get('/submission', params);
  },
  getRank(params) {
    return axios.get('/rank', params);
  },
  getTags(params) {
    return axios.get('/tag/all', { params });
  },
  getUserRank(params) {
    return axios.get('user-rank', params);
  },
  login(params) {
    return axios.post('/user/login', params);
  },
  signIn(params) {
    return axios.post('/user/sign_in', params);
  },
};

export default api;
