<template>
  <div id="c-action">
    <div class="search">
      <el-input placeholder="keyword" size="small" suffix-icon="el-icon-search" v-model="input"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      input: '',
    };
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #c-action
    width 500px
    display inline-block
    vertical-align middle
    text-align center
    .search
      display inline-block
      width 50%
      padding-left 40%
    .search
      margin-left 20px
</style>
