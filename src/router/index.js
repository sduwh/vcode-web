import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

Vue.use(Router);

const VMain = () => import('views/v-main');
const Home = () => import('components/home/home');
const Problems = () => import('components/problems/problems');
const Contests = () => import('components/contests/contests');
const Contest = () => import('components/contests/contest');
const Status = () => import('components/status/status');
const Rank = () => import('components/rank/rank');
const Notice = () => import('components/notice/notice');
const About = () => import('components/about/about');
const ProblemDetail = () => import('components/problems/problem-detail');
const Login = () => import('components/login/login');
const SignIn = () => import('components/login/signIn');
const User = () => import('components/user/center');
const UserEditInfo = () => import('components/user/edit-user-info');
const UserMain = () => import('components/user/user');
const UserChangePassword = () => import('components/user/change-password');
const AdminProblemCreate = () => import('components/admin/pages/problem/create');
const AdminProblemUpdate = () => import('components/admin/pages/problem/update');
const AdminProblemList = () => import('components/admin/pages/problem/list');
const AdminMain = () => import('views/v-admin');
const AdminIndex = () => import('components/admin/pages/index');
const AdminAdmin = () => import('components/admin/pages/admin');
const AdminUser = () => import('components/admin/pages/user');
const AdminContest = () => import('components/admin/pages/contest');
const AdminContestList = () => import('components/admin/pages/contest-list');
const AdminContestProblems = () => import('components/admin/pages/contest-problems');
const AdminAbout = () => import('components/admin/pages/about/about');
const NoPermission = () => import('components/error/403');
const ErrorPage = () => import('components/error/error');

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      component: AdminMain,
      redirect: '/admin/index',
      children: [
        {
          path: 'index',
          name: 'AdminIndex',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminIndex,
        },
        {
          path: 'admin',
          name: 'AdminAdmin',
          meta: {
            roles: ['admin'],
            requireLogin: true,
          },
          component: AdminAdmin,
        },
        {
          path: 'user',
          name: 'AdminUser',
          meta: {
            roles: ['admin'],
            requireLogin: true,
          },
          component: AdminUser,
        },
        {
          path: 'problem-create',
          name: 'AdminProblemCreate',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminProblemCreate,
        },
        {
          path: 'problem-update',
          name: 'AdminProblemUpdate',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminProblemUpdate,
        },
        {
          path: 'problem-list',
          name: 'AdminProblemList',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminProblemList,
        },
        {
          path: 'contest',
          name: 'AdminContest',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminContest,
        },
        {
          path: 'contest-list',
          name: 'AdminContestList',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminContestList,
        },
        {
          path: 'contest-problems',
          name: 'AdminContestProblems',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: AdminContestProblems,
        },
        {
          path: 'about',
          name: 'adminAbout',
          meta: {
            roles: ['admin'],
            requireLogin: true,
          },
          component: AdminAbout,
        },
      ],
    },
    {
      path: '/',
      name: 'VMain',
      component: VMain,
      redirect: {
        path: '/home',
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'problems',
          name: 'Problems',
          component: Problems,
        },
        {
          path: 'contests',
          name: 'Contests',
          component: Contests,
        },
        {
          path: 'contest/:id',
          name: 'Contest',
          component: Contest,
        },
        {
          path: 'status',
          name: 'Status',
          component: Status,
        },
        {
          path: 'rank',
          name: 'Rank',
          component: Rank,
        },
        {
          path: 'notice',
          name: 'Notice',
          component: Notice,
        },
        {
          path: 'about',
          name: 'About',
          component: About,
        },
        {
          path: 'problem/:id',
          name: 'ProblemDetail',
          meta: {
            roles: ['admin', 'teacher', 'captain'],
            requireLogin: true,
          },
          component: ProblemDetail,
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
        },
        {
          path: '/sign_in',
          name: 'SiginIn',
          component: SignIn,
        },
        {
          path: '/user',
          name: 'User',
          component: UserMain,
          redirect: {
            path: '/user/center',
          },
          children: [
            {
              path: 'center',
              name: 'UserCenter',
              meta: { requireLogin: true },
              component: User,
            },
            {
              path: 'edit',
              name: 'EditUserInfo',
              meta: { requireLogin: true },
              component: UserEditInfo,
            },
            {
              path: 'change-password',
              name: 'ChangePassword',
              meta: { requireLogin: true },
              component: UserChangePassword,
            },
          ],
        },
        {
          path: '403',
          name: '403',
          component: NoPermission,
        },
        {
          path: 'error',
          name: 'Error',
          component: ErrorPage,
        },
      ],
    },
  ],
});

function checkUserLogin(to) {
  const { meta } = to;
  if (meta.requireLogin === true) {
    if (store.state.user.isLogin !== true) {
      return false;
    }
  }
  return true;
}

function checkUserRole(to) {
  const { role } = store.state.user;
  const { meta } = to;
  const { roles } = meta;
  // Check the url is require authentication
  if (roles === undefined || roles === null) return true;

  if (Array.isArray(roles)) {
    for (let i = 0; i < roles.length; i++)
      if (role === roles[i]) {
        return true;
      }
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if (!checkUserLogin(to)) {
    // logout && cleanInfo && redirect login page
    store.commit('user/setLoginStatus', false);
    store.commit('user/logout');
    return next({ path: '/login' });
  }
  if (checkUserRole(to) === true) {
    return next();
  }
  // redirect 403 page
  return next({ path: '/403' });
});

export default router;
