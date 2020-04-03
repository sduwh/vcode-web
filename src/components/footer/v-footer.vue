<template>
  <div id="footer">
    <div class="info">
      <div class="title">
        <span>{{ footerInfo.title }}</span>
      </div>
      <div class="desc">
        <span class="copyright"
          >Powered by <a :href="footerInfo.github" target="_blank">{{ footerInfo.copyright }}</a></span
        >
        <span>|</span>
        <span class="version">Version {{ footerInfo.version }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 关于「footer」组件的信息
    footerInfo: {
      type: Object,
      title: 'Virtual Code',
      copyright: 'Sduwh Vcode Team',
      version: '0',
      github: 'https://github.com/sduwh',
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #footer
    width 100%
    height 100px
    .share
      width 100%
      height 50px
      padding 7px 0
      text-align center
      a
        display inline-block
        width 35px
        height 35px
        margin-left 15px
        vertical-align middle
        img
          width 100%
          height 100%
        &:first-child
          margin 0
    .info
      width 100%
      height 50px
      text-align center
      .title
        width 100%
        height 25px
        span
          display inline-block
          width 100%
          height 25px
          line-height @height
          color $color-font-gray
      .desc
        width 100%
        height 25px
        span
          height 25px
          line-height @height
          margin-left 10px
          color $color-font-gray
          a
            color $color-font-theme
</style>
