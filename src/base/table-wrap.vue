<template>
  <div id="table-wrap">
    <div class="header">
      <div class="title">
        <span class="desc">{{ title }}</span>
      </div>
      <slot name="mode"></slot>
      <slot name="action"></slot>
    </div>
    <div class="body">
      <slot name="table"></slot>
    </div>
    <div class="footer">
      <v-pagination class="pagination" :paginationInfo="paginationInfo"></v-pagination>
    </div>
  </div>
</template>

<script>
import VPagination from 'base/v-pagination'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    paginationInfo: {
      type: Object,
      required: true,
    }
  },
  components: {
    VPagination,
  },
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
  #table-wrap
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
    .footer
      position relative
      padding 20px 0
      text-align right
</style>