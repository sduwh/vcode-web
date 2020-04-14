import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const VMain = () => import('views/v-main');
const Home = () => import('pages/usual/home/home');
const Problems = () => import('pages/usual/problems/problems');
const Contests = () => import('pages/usual/contests/contests');
const Contest = () => import('pages/usual/contests/contest');
const Status = () => import('pages/usual/status/status');
const Rank = () => import('pages/usual/rank/rank');
const Notice = () => import('pages/usual/notice/notice');
const About = () => import('pages/usual/about/about');
const ProblemDetail = () => import('pages/usual/problems/problem-detail');
const Login = () => import('pages/usual/login/login');
const SignIn = () => import('pages/usual/login/signIn');
const User = () => import('pages/usual/user/center');
const UserEditInfo = () => import('pages/usual/user/edit-user-info');
const UserMain = () => import('pages/usual/user/user');
const UserChangePassword = () => import('pages/usual/user/change-password');
const AdminProblemCreate = () => import('pages/admin/pages/problem/create');
const AdminProblemUpdate = () => import('pages/admin/pages/problem/update');
const AdminProblemList = () => import('pages/admin/pages/problem/list');
const AdminMain = () => import('views/v-admin');
const AdminIndex = () => import('pages/admin/pages/index');
const AdminAdmin = () => import('pages/admin/pages/user/admin');
const AdminUser = () => import('pages/admin/pages/user/user');
const AdminContest = () => import('pages/admin/pages/contest/contest');
const AdminContestList = () => import('pages/admin/pages/contest/contest-list');
const AdminContestProblems = () => import('pages/admin/pages/contest/contest-problems');
const AdminAbout = () => import('pages/admin/pages/about/about');
const NoPermission = () => import('pages/error/403');
const ErrorPage = () => import('pages/error/error');
const NoPage = () => import('pages/error/404')

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
          meta: {
            requireLogin: true,
          },
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
            roles: ['admin', 'teacher', 'captain', 'user'],
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
          name: 'SignIn',
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
          path: '404',
          name: '404',
          component: NoPage,
        },
        {
          path: 'error',
          name: 'Error',
          component: ErrorPage,
        },
      ],
    },
    {
      path: '*',    // 404 page
      redirect: '/404'
    }
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
    return next({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
  }
  if (checkUserRole(to) === true) {
    return next();
  }
  // redirect 403 page
  return next({ path: '/403', query: { redirect: router.currentRoute.fullPath } });
});

export default router;
