<template>
  <div id="show-problem">
    <div class="main">
      <div class="v-tab">
        <span @click="changeTab" class="description" ref="description">
          <i class="el-icon-reading"></i> Description
        </span>
        <span @click="changeTab" class="submission" ref="submission"> <i class="el-icon-timer"></i> Submission </span>
        <!-- <span @click="changeTab" class="discuss" ref="discuss">
          <i class="el-icon-chat-line-round"></i> Discuss
        </span> -->
      </div>
      <div class="v-panel">
        <div class="virtual-header">virtual header</div>
        <keep-alive>
          <component :is="componentId" :title="'bind title'" :paginationInfo="{}"></component>
        </keep-alive>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import ProblemDesc from 'base/problem-desc';
import TableWrap from 'base/table-wrap';
// import Discuss from 'components/discuss/discuss';
import ProblemStatus from 'components/status/problem-status';

export default {
  components: {
    ProblemDesc,
    TableWrap,
    // Discuss,
    ProblemStatus,
  },
  data() {
    return {
      componentId: ProblemDesc,
    };
  },
  methods: {
    changeTab(e) {
      const event = e || window.event;
      const target = event.target || event.srcElement;
      const { className } = target;
      this.changeColor(className);
      switch (className) {
        case 'description':
          this.componentId = ProblemDesc;
          break;
        case 'submission':
          this.componentId = ProblemStatus;
          break;
        // case 'discuss':
        //   this.componentId = Discuss;
        //   break;
        default:
          this.componentId = ProblemDesc;
          break;
      }
    },
    changeColor(className) {
      this.$refs.description.style.color = '#000';
      this.$refs.submission.style.color = '#000';
      // this.$refs.discuss.style.color = '#000';
      this.$refs[className].style.color = '#409EFF';
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
  #show-problem
    width 100%
    height 100%
    // background-color deeppink
    // opacity 0.3
    .main
      position relative
      width 100%
      height calc(100vh - 100px - 40px)
      // background-color deepskyblue
      .v-tab
        position absolute
        top 0
        left 0
        width 100%
        border 1px solid #e4e7ed
        border-right none
        border-left none
        background-color #fff
        span
          display inline-block
          padding 12px 10px
          font-size 14px
          cursor pointer
          // border-top 1px solid #e4e7ed
          &:first-child
            color $color-font-theme
      .v-panel
        width 100%
        height 100%
        scroll-y()

        // background-color red
        .virtual-header
          width 100%
          height 38px
        // padding-top 60px
    .footer
      width 100%
      height 40px
      border-top 1px solid #e4e7ed
</style>
