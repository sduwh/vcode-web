<template>
  <div id="center-wrap" class="user-center">
    <div class="header">
      <div class="title">
        <span class="desc">{{ title }}</span>
        <span style="margin-left: 20px;">
          <el-button size="mini" round type="primary" @click="goAdmin()">Manage</el-button>
        </span>
      </div>
    </div>
    <div class="body">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    goAdmin() {
      this.$router.push({ name: 'Admin' });
    },
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #center-wrap
    width 100%
    border-radius 6px
    box-shadow: $box-shadow-1
    .header
      padding 25px 20px
      .title
        display inline-block
        vertical-align middle
        .desc
          font-size $font-size-medium-m
          letter-spacing 1px
</style>
