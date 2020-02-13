<template>
  <div id="tags">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span class="desc">Tags</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >Pick One</el-button
        >
      </div>
      <div class="tag-wrap">
        <el-tag
          size="small"
          type="info"
          v-for="tag in tagsInfo"
          :key="tag.name"
          >{{ tag.name }}</el-tag
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    tagsInfo: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

@import '~common/stylus/variable.styl'
  #tags
    width 100%
    .header
      .desc
        font-size $font-size-medium
      .el-button
        font-size $font-size-regular-m
    .tag-wrap
      width 100%
      .el-tag
        margin-left 10px
        margin-top 10px
</style>
