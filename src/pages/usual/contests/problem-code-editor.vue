<template>
  <div id="v-editor">
    <div class="main">
      <div class="e-tab">
        <div class="language">
          <el-select size="mini" v-model="labelValue">
            <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="e-panel">
        <div class="editor">
          <code-editor :code.sync="code" :mode="labelValue"></code-editor>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="console-btn">
        <el-button size="mini" @click="changeIsConsoleShow">Console</el-button>
        <el-button size="mini" type="primary" @click="handleSubmitClick">Submit</el-button>
      </div>
      <div class="console-body" v-show="isConsoleShow">
        <div class="result">{{ consoleData }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { languageMap } from 'util/codeEditerUtil';
import codeEditor from 'components/code-editor';
import api from 'api/api';

export default {
  components: {
    codeEditor,
  },
  props: {
    contestName: {
      type: String,
      required: true,
    },
    problemOriginId: {
      type: String,
      required: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.consoleInterval);
  },
  data() {
    return {
      labelValue: 'text/x-c++src',
      language: [
        {
          label: 'C++',
          value: 'text/x-c++src',
        },
        {
          label: 'Java',
          value: 'text/x-java',
        },
        {
          label: 'Python3',
          value: 'python',
        },
        {
          label: 'C',
          value: 'text/x-csrc',
        },
      ],
      isConsoleShow: false,
      code: '',
      submissionIdHex: '',
      consoleInterval: null,
      consoleData: 'Judge Result Info',
    };
  },
  methods: {
    changeIsConsoleShow() {
      this.isConsoleShow = !this.isConsoleShow;
    },
    handleSubmitClick() {
      // 如果代码为空，则不发起网络请求
      if (this.code.length === 0) {
        this.$message({ message: 'Please input the code', type: 'warning' });
      } else if (this.code.length < 50) {
        this.$message({ message: 'The length of code must be more than 50', type: 'warning' });
      } else {
        api
          .uploadSubmission({
            problemOriginId: this.problemOriginId,
            contestName: this.contestName,
            language: this.mapLanguage(this.labelValue),
            code: this.code,
          })
          .then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.$message.success('Submit success');
              const submissionData = data.data;
              this.submissionIdHex = submissionData.submissionId;
              this.consoleInterval = setInterval(this.getConsoleDetail, 1000);
            } else {
              this.$message.error(data.message);
            }
          });
      }
    },
    getConsoleDetail() {
      api
        .getSubmissionDetail({
          submissionIdHex: this.submissionIdHex,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const submissionData = data.data;
            const { submission } = submissionData;
            if (submission.result === 5) {
              this.consoleData = 'padding';
            } else {
              this.consoleData = submission.resultMessage;
              clearInterval(this.consoleInterval);
            }
          }
        });
    },
    mapLanguage(mode) {
      return languageMap(this.language, mode);
    },
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
#v-editor
  width 100%
  height 100%
  // border 1px solid #000

  .main
    position relative
    width 100%
    height 400px
    // background-color gray

    .e-tab
      top 0
      left 0
      width 100%
      border 1px solid #e4e7ed
      border-right none
      border-left none
      background-color #fff

      .language
        display inline-block
        padding 4px 10px 5px

.e-panel
  width 100%
  max-height calc(100% - 40px)
  height calc(100% - 40px)
  scroll-y()

  .editor
    height 100%

.footer
  position relative
  width 100%
  height 40px
  border-top 1px solid #e4e7ed
  line-height 40px

  .console-btn
    display flex
    align-items center
    justify-content flex-end
    margin-top 10px

  .console-body
    position absolute
    width 100%
    top -200px
    left 0
    min-height 200px
    background-color #fff
    border-top 1px solid #e4e7ed

    .result
      width 90%
      height 170px
      margin 15px auto
      border 1px solid #e4e7ed
      border-radius 5px
      padding 0 10px
</style>
