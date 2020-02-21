<template>
  <div id="v-main" ref="VMain">
    <el-container>
      <el-header v-show="isHeaderShow">
        <v-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer v-show="isFooterShow">
        <v-footer :footerInfo="footerInfo" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import VHeader from 'components/header/v-header';
import VFooter from 'components/footer/v-footer';

export default {
  data() {
    return {
      // 控制页面是否显示「header」组件
      isHeaderShow: true,
      // 控制页面是否显示「footer」组件
      isFooterShow: true,
      // 关于「footer」组件的信息
      footerInfo: {
        title: 'Virtual Code',
        copyright: 'Sduwh VCode Team',
        version: '0.0.1',
        github: 'https://github.com/sduwh',
      },
    };
  },
  components: {
    VHeader,
    VFooter,
  },
  created() {
    this.changeIsHeaderShow();
    this.changeIsFooterShow();
  },
  watch: {
    // 监听路由信息，改变变量「isHeadrShow」
    $route() {
      this.changeIsHeaderShow();
      this.changeIsFooterShow();
    },
    // 监听变量「isHeaderShow」，绑定/取消滚动事件
    isHeaderShow() {
      if (!this.isHeaderShow) {
        window.addEventListener('scroll', this.handleScroll, true);
      } else {
        // 如果组件展示，则取消监听滚动事件
        window.removeEventListener('scroll', this.handleScroll, true);
      }
    },
  },
  methods: {
    // 根据当前的路由信息判断是否要展示 header 组件
    changeIsHeaderShow() {
      this.isHeaderShow = this.$route.path !== '/home';
    },
    changeIsFooterShow() {
      this.isFooterShow = this.$route.name !== 'ProblemDetail';
    },
    // 处理滚动事件：滚动条滚动时，显示 header 组件
    handleScroll(e) {
      const event = e || window.event;
      const target = event.target || event.srcElement;
      // console.log(target.scrollingElement.scrollTop)
      if (target.scrollingElement.scrollTop) {
        // 显示 header 组件
        this.isHeaderShow = true;
      }
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #v-main, .el-container, .el-header, .el-main, .el-footer
    min-width $page-min-width
</style>
