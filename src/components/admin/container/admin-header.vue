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
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="white"
        >
          <el-submenu index="1">
            <template slot="title">More</template>
            <el-menu-item index="2-1">返回首页</el-menu-item>
            <el-menu-item index="2-2">退出</el-menu-item>
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
    logout: () => {
      console.log('logout');
    },
    handleSelect: (key, keyPath) => {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.header {
  height: 100%;
  font: white;
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

.header-submenu {
  font: white;
}
</style>
