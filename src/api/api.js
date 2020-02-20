import axios from './axios';

const api = {
  getProblems(params) {
    return axios.get('/problem/list', { params });
  },
  getProblem(params) {
    return axios.get('/problem/detail', { params });
  },
  getContests(params) {
    return axios.get('/contest/list', { params });
  },
  createContest(params) {
    return axios.post('/contest/create', params);
  },
  editContest(params) {
    return axios.post('/contest/edit', params);
  },
  deleteContest(params) {
    return axios.post('/contest/delete', params);
  },
  getContestProblemList(params) {
    return axios.get('/contest/problems', { params });
  },
  addProblemToContest(params) {
    return axios.post('/contest/problem', params);
  },
  removeProblemFromContest(params) {
    return axios.delete('/contest/problem', { params });
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
