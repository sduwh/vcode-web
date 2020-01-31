<template>
  <div id="v-pagination">
    <el-pagination background
      layout="prev, pager, next"
      :pager-count="pager_count"
      :total="paginationInfo.total"
      :hide-on-single-page="paginationInfo.hide_on_single_page"
      :page-size="paginationInfo.page_size"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    paginationInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pager_count: 5
    }
  },
};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  #v-pagination
    display inline-block
</style>