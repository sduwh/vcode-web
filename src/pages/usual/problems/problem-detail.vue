<template>
  <div id="problem-detail">
    <el-row>
      <el-col :span="10">
        <show-problem></show-problem>
      </el-col>
      <el-col :span="14">
        <problem-code-editor :language="language"></problem-code-editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ShowProblem from 'pages/usual/problems/show-problem';
import ProblemCodeEditor from 'pages/usual/problems/problem-code-editor';
import api from 'api/api';
import { getLanguagesArray } from 'util/codeEditerUtil';

export default {
  components: {
    ShowProblem,
    ProblemCodeEditor,
  },
  mounted() {
    this.getProblem();
  },
  data() {
    return {
      problem: Object,
      language: [],
    };
  },
  methods: {
    getProblem() {
      api
        .getProblem({
          originId: this.$route.params.id,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.problem = data;
            this.language = getLanguagesArray(this.problem.choiceLanguages);
          }
        });
    },
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
