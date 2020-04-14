<template>
  <div class="page-main">
    <div class="title">You find a bad request</div>
    <div class="content">Looks like something went wrong.</div>
    <div class="hint">
      If you are interested, <a class="link" href="https://github.com/sduwh" target="_blank">contact us</a> and we can
      let you fix the problem
    </div>
    <div class="button">
      <el-button round v-if="this.$route.query.redirect" @click="goBack()">Take me back</el-button>
      <el-button type="primary" round @click="goHome()">Take me home</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  mounted() {
    if (this.$route.query.redirect !== null && this.$route.query.redirect !== undefined) {
      this.next = this.$route.query.redirect;
    }
  },
  data() {
    return {
      next: '',
    };
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    goBack() {
      this.$router.push(this.next);
    },
  },
};
</script>

<style scoped>
.page-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-main div {
  margin-top: 40px;
}

.title {
  display: block;
  font-size: 60px;
}

.content {
  font-size: 20px;
}

.link {
  color: #409eff;
}

.hint {
  font-weight: bold;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
