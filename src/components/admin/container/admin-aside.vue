<template>
  <div id="aside" class="aside">
    <el-menu
      style="height:100%"
      :router="true"
      :default-active="activeIndex"
      @select="handleSelect"
      unique-opened
    >
      <div class="demo-image image">
        <div class="block" v-for="fit in fits" :key="fit">
          <el-image
            style="width: 100px; height: 100px; border-radius: 50%"
            :src="url"
            :fit="fit"
          ></el-image>
        </div>
      </div>
      <el-menu-item index="index">
        <i class="el-icon-monitor"></i>
        <span slot="title">homepage</span>
      </el-menu-item>
      <el-submenu index="user-menu">
        <template slot="title"><i class="el-icon-user"></i>User</template>
        <el-menu-item index="admin">admin</el-menu-item>
        <el-menu-item index="user">user</el-menu-item>
      </el-submenu>
      <el-submenu index="problem-menu">
        <template slot="title">
          <i class="el-icon-star-off"></i>Problem
        </template>
        <el-menu-item index="problemlist">ProblemList</el-menu-item>
        <el-menu-item index="problemcreate">Create</el-menu-item>
      </el-submenu>
      <el-submenu index="contest-menu">
        <template slot="title"><i class="el-icon-medal"></i>Contest</template>
        <el-menu-item index="contest-list">ContestList</el-menu-item>
        <el-menu-item index="contest">Create</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import logo from 'common/image/logo.png';

export default {
  data() {
    return {
      activeIndex: this.$store.state.admin.activeIndex,
      fits: ['fill'],
      url: logo,
    };
  },
  methods: {
    handleSelect(val) {
      this.$store.commit('admin/setActiveIndex', val);
    },
  },
};
</script>

<style scoped>
.aside {
  height: 100%;
}
.image {
  text-align: center;
  margin-top: 20%;
  margin-bottom: 10%;
}
</style>
