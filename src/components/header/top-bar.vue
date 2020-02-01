<template>
  <div id="top-bar">
    <el-row>
      <el-col class="hidden-sm-and-down logo-wrap" :md="5">
        <div class="logo">
          <span>Virtual Code</span>
        </div>
      </el-col>
      <el-col :sm="24" :md="16" class="nav-wrap">
        <div class="nav">
          <el-row type="flex" justify="space-around">
            <el-menu
              active-text-color="#409EFF"
              class="el-menu-demo"
              mode="horizontal"
              :default-active="this.$route.path"
              router
            >
              <el-col
                :span="navInfo.col"
                v-for="(navInfo, index) in nav"
                :key="index"
              >
                <el-menu-item :index="navInfo.path" class="grid-content"
                  ><span>{{ navInfo.name }}</span></el-menu-item
                >
              </el-col>
            </el-menu>
          </el-row>
        </div>
      </el-col>
      <el-col :md="3" class="logInfo hidden-sm-and-down">
        <template>
          <div style="display:flex;">
            <div
              v-if="this.$store.state.user.isLogin == false"
              class="log"
              @click="login"
            >
              <span>Login</span>
            </div>
            <div
              v-if="this.$store.state.user.isLogin == false"
              class="log"
              @click="siginIn"
            >
              <span>Sign in</span>
            </div>

            <!-- logined -->
            <div
              v-if="this.$store.state.user.isLogin == true"
              class="log"
              @click="userCenter"
            >
              <span>{{ this.$store.state.user.nickname }}</span>
            </div>
            <div
              v-if="this.$store.state.user.isLogin == true"
              class="log"
              @click="logout"
            >
              <span>Logout</span>
            </div>
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { path: "/home", name: "Home", col: 3 },
        { path: "/problems", name: "Problems", col: 4 },
        { path: "/contests", name: "Contests", col: 4 },
        { path: "/status", name: "Status", col: 3 },
        { path: "/rank", name: "Rank", col: 3 },
        { path: "/notice", name: "Notice", col: 4 },
        { path: "/about", name: "About", col: 3 }
      ]
    };
  },
  methods: {
    login() {
      // this.$store.commit("user/setLoginStatus", true);
      console.log(this.$store.getters["user/getLoginStatus"]);
      this.$router.push("/login");
    },
    siginIn() {
      this.$router.push("/sign_in");
    },
    logout() {
      this.$store.commit("user/setLoginStatus", false);
      this.$store.commit("user/logout");
    },
    userCenter() {}
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #top-bar
    padding 0 50px
    height 60px
    .logo-wrap
      // border 1px solid #000
      .logo
        // border 1px solid red
        width 100%
        height @height
        line-height @height
        text-align center
        span
          font-size $font-size-large
          letter-spacing 2px
    .nav-wrap
      .nav
        width 100%
        // border 1px solid green
        .el-row
          width 100%
          // border 1px solid yellow
          padding 15px 0
          .el-menu-demo
            width 90%
            border none
            .grid-content
              width 100%
              height 30px
              padding 0
              text-align center
              line-height @height
              // border  1px solid #000
              &:hover
                background-color $color-background-theme
              span
                display inline-block
                font-size $font-size-regular-x
                font-weight 700
                width 100%
                height @height
                line-height @height
                letter-spacing 2px
                // border 1px solid red
                &:hover
                  color #409EFF
                  background-color $color-background-theme
                  transition transform .3s linear
                  transform scale3d(1.2, 1, 1)
                  border none
                  // font-size 30px
            .grid-content.is-active
              background-color $color-background-theme!important
    .logInfo
      height @height
      // border 1px solid blue
      padding 15px 0
      .log
        width 100%
        height 30px
        line-height @height
        text-align center
        span
          display inline-block
          width 100%
          height @height
          letter-spacing 2px
          font-size $font-size-regular-x
          font-weight 700
          cursor pointer
          &:hover
            color #409EFF
            transition transform .3s ease
            transform scale3d(1.2, 1, 1)
</style>
