import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const VMain = () => import("views/v-main");
const Home = () => import("components/home/home");
const Problems = () => import("components/problems/problems");
const Contests = () => import("components/contests/contests");
const Status = () => import("components/status/status");
const Rank = () => import("components/rank/rank");
const Notice = () => import("components/notice/notice");
const About = () => import("components/about/about");
const ProblemDetail = () => import("components/problems/problem-detail");
const ConTestDetail = () => import("components/contests/contest-detail");
const Login = () => import("components/login/login");
const SignIn = () => import("components/login/signIn");
const User = () => import("components/user/center");
const UserEditInfo = () => import("components/user/edit-user-info");
const UserMain = () => import("components/user/user");
const UserChangePassword = () => import("components/user/change-password");

const AdminMain = () => import("views/v-admin");
const AdminIndex = () => import("components/admin/pages/index");
const AdminAdmin = () => import("components/admin/pages/admin");
const AdminUser = () => import("components/admin/pages/user");
const AdminProblem = () => import("components/admin/pages/problem");
const AdminContest = () => import("components/admin/pages/contest");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/admin",
      name: "Admin",
      component: AdminMain,
      redirect: "/admin/index",
      children: [
        {
          path: "index",
          name: "AdminIndex",
          component: AdminIndex
        },
        {
          path: "admin",
          name: "AdminAdmin",
          component: AdminAdmin
        },
        {
          path: "user",
          name: "AdminUser",
          component: AdminUser
        },
        {
          path: "problem",
          name: "AdminProblem",
          component: AdminProblem
        },
        {
          path: "contest",
          name: "AdminContest",
          component: AdminContest
        }
      ]
    },
    {
      path: "/",
      name: "VMain",
      component: VMain,
      redirect: {
        path: "/home"
      },
      children: [
        {
          path: "home",
          name: "Home",
          component: Home
        },
        {
          path: "problems",
          name: "Problems",
          component: Problems
        },
        {
          path: "contests",
          name: "Contests",
          component: Contests
        },
        {
          path: "status",
          name: "Status",
          component: Status
        },
        {
          path: "rank",
          name: "Rank",
          component: Rank
        },
        {
          path: "notice",
          name: "Notice",
          component: Notice
        },
        {
          path: "about",
          name: "About",
          component: About
        },
        {
          path: "problem/:id",
          name: "ProblemDetail",
          component: ProblemDetail
        },
        {
          path: "contest/:id",
          name: "ConTestDetail",
          component: ConTestDetail
        },
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/sign_in",
          name: "SiginIn",
          component: SignIn
        },
        {
          path: "/user",
          name: "User",
          component: UserMain,
          redirect: {
            path: "/user/center"
          },
          children: [
            {
              path: "center",
              name: "UserCenter",
              component: User
            },
            {
              path: "edit",
              name: "EditUserInfo",
              component: UserEditInfo
            },
            {
              path: "change-password",
              name: "ChangePassword",
              component: UserChangePassword
            }
          ]
        }
      ]
    }
  ]
});
