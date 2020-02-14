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
            :fit="fit"></el-image>
        </div>
      </div>
      <el-menu-item index="homepage">
        <i class="el-icon-monitor"></i>
        <span slot="title">homepage</span>
      </el-menu-item>
      <el-submenu index="user-menu">
        <template slot="title"><i class="el-icon-user"></i>User</template>
        <el-menu-item index="admin">管理员</el-menu-item>
        <el-menu-item index="user">用户</el-menu-item>
      </el-submenu>
      <el-submenu index="problrm-menu">
        <template slot="title"><i class="el-icon-star-off"></i>Problem</template>
        <el-menu-item index="">题目列表</el-menu-item>
        <el-menu-item index="problem">创建题目</el-menu-item>        
      </el-submenu>
      <el-menu-item index="contest">
        <i class="el-icon-medal"></i>Contest
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$store.state.admin.activeIndex,
      fits: ['fill'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
.image{
  text-align: center;
  margin-top: 20%;
  margin-bottom: 10%;
}
</style>
