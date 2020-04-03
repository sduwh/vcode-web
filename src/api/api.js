import axios from './axios';

const api = {
  getProblems(params) {
    return axios.get('/problem/list', { params });
  },
  getProblem(params) {
    return axios.get('/problem/detail', { params });
  },
  createProblem(params) {
    return axios.post('/admin/problem/create', params);
  },
  delProblem(params) {
    return axios.delete('/admin/problem/delete', { params });
  },
  updateProblem(params) {
    return axios.post('/admin/problem/edit', params);
  },
  updateProblemVisible(params) {
    return axios.post('/admin/problem/visible', params);
  },
  getContests(params) {
    return axios.get('/contest/list', { params });
  },
  getContest(params) {
    return axios.get('/contest/detail', { params });
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
  checkContestPassword(params) {
    return axios.get('/contest/password', { params });
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
    return axios.get('/submission/problem/user', { params });
  },
  getGlobalSubmission(params) {
    return axios.get('/submission', { params });
  },
  getContestSubmission(params) {
    return axios.get('/submission/contest', { params });
  },
  uploadSubmussion(params) {
    return axios.post('/submission', params);
  },
  getRank(params) {
    return axios.get('/rank', { params });
  },
  getContestRank(params) {
    return axios.get('/rank/contest', { params });
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
  editAbout(params) {
    return axios.post('/about/doc', params);
  },
  getAbout() {
    return axios.get('/about/doc');
  },
  getUsers(params) {
    return axios.get('/admin/user/list', { params });
  },
  getAdmins(params) {
    return axios.get('/admin/user/admin-list', { params });
  },
  updateUserInfoByAdmin(params) {
    return axios.post('/admin/user/info', params);
  },
  deleteUserByAdmin(params) {
    return axios.delete('/admin/user/', { params });
  },
};

export default api;
