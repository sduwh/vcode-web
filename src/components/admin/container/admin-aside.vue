<template>
  <div id="aside" class="aside">
    <el-menu
      style="height:100%"
      :router="true"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-submenu index="user-menu">
        <template slot="title"><i class="el-icon-user"></i>User</template>
        <el-menu-item index="admin">管理员</el-menu-item>
        <el-menu-item index="user">用户</el-menu-item>
      </el-submenu>
      <el-menu-item index="problem">
        <i class="el-icon-menu"></i>Problem
      </el-menu-item>
      <el-menu-item index="contest">
        <i class="el-icon-menu"></i>Contest
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$store.state.admin.activeIndex,
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
</style>
