<template>
  <div id="header" class="header">
    <el-row style="height:100%;">
      <el-col :span="12" class="header-icon">
        <div>Virtual Code Admin</div>
      </el-col>
      <el-col :span="12" class="header-user">
        <div>{{ this.$store.state.user.nickname }}</div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="white"
        >
          <el-submenu index="more">
            <template slot="title">More</template>
            <el-menu-item index="index" @click="handleBackIndex">Go Home</el-menu-item>
            <el-menu-item index="logout" @click="logout">Logout</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    logout() {
      this.$store.commit('user/setLoginStatus', false);
      this.$store.commit('user/logout');
      this.$router.push('/home');
    },
    handleBackIndex() {
      this.$router.push({ name: 'VMain' });
    },
  },
};
</script>

<style scoped>
.header {
  height: 100%;
}
.header-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  color: white;
}

.header-user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  color: white;
}

.header-user div {
  margin-right: 10px;
}
</style>
