<template>
  <el-collapse-transition>
    <div id="v-header">
      <top-bar />
    </div>
  </el-collapse-transition>
</template>

<script>
import TopBar from './top-bar'

export default {
  // props: {
  //   isHeaderShow: {
  //     type: Boolean,
  //     default: true,
  //   }
  // },
  components: {
    TopBar,
  },
};
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
  #v-header
    position fixed
    top 0
    left 0
    width 100%
    min-width $page-min-width
    z-index $z-index-regular
    background-color $color-background-theme
    box-shadow: 0px 0px 5px rgba(100, 100, 100, .1);
</style>