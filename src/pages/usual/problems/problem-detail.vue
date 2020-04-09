<template>
  <div id="problem-detail">
    <el-row>
      <el-col :span="10">
        <show-problem></show-problem>
      </el-col>
      <el-col :span="14">
        <v-editor></v-editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ShowProblem from 'pages/usual/problems/show-problem';
import VEditor from 'pages/usual/problems/problem-editor';

export default {
  components: {
    ShowProblem,
    VEditor,
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #problem-detail
    width 100%
    .el-row
      .el-col
        height calc(100vh - 100px)
        padding 0 10px
        border-right 1px solid #e4e7ed
        &:first-child
          border-left 1px solid #e4e7ed
</style>
