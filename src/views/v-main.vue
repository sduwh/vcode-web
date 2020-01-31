<template>
  <div id="v-main" ref="VMain">
    <el-container>
      <el-header v-show="isHeaderShow">
        <v-header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer v-show="isFooterShow">
        <v-footer
          :footerInfo="footerInfo"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import VHeader from "components/header/v-header";
import VFooter from 'components/footer/v-footer'
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
        copyright: 'Sduwh Start Code Team',
        version: '1.0',
        github: 'https://github.com/sduwh',
        wechat: '',
        weibo: '',
      },
    };
  },
  components: {
    VHeader,
    VFooter,
  },
  created() {
    this._changeIsHeaderShow()
    this._changeIsFooterShow()
  },
  watch: {
    // 监听路由信息，改变变量「isHeadrShow」
    $route() {
      this._changeIsHeaderShow()
      this._changeIsFooterShow()
    },
    // 监听变量「isHeaderShow」，绑定/取消滚动事件
    isHeaderShow() {
      if (!this.isHeaderShow) {
        window.addEventListener('scroll', this._handleScroll, true)
      } else {
        // 如果组件展示，则取消监听滚动事件
        window.removeEventListener('scroll', this._handleScroll, true)
      }
    },
  },
  methods: {
    // 根据当前的路由信息判断是否要展示 header 组件
    _changeIsHeaderShow() {
      this.isHeaderShow = this.$route.path == "/home" ? false : true
    },
    _changeIsFooterShow() {
      this.isFooterShow = this.$route.name == 'ProblemDetail' ? false : true
    },
    // 处理滚动事件：滚动条滚动时，显示 header 组件
    _handleScroll(e) {
      var event = e || window.event,
          target = event.target || event.srcElement
      // console.log(target.scrollingElement.scrollTop)
      if (target.scrollingElement.scrollTop) {
        // 显示 header 组件
        this.isHeaderShow = true
      }
    }
  }
};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
  #v-main, .el-container, .el-header, .el-main, .el-footer
    min-width $page-min-width

</style>