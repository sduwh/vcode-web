<template>
  <div id="v-editor">
    <div class="main">
      <div class="e-tab">
        <div class="language">
          <el-select size="mini" v-model="lableValue">
            <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
      </div>
      <div class="e-panel">
        <div class="virtual-header">virtual header</div>
        <div class="editor">
          <codemirror v-model="code" ref="myEditor" :options="editorOption"></codemirror>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="console-btn">
        <el-button size="mini" @click="changeIsConsoleShow">Console</el-button>
        <el-button size="mini" type="primary" @click="handleSubmitClick">Submit</el-button>
      </div>
      <div class="console-body" v-show="isConsoleShow">
        <div class="result">['a', 'b', 'c']</div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';
import api from 'api/api';

require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');

export default {
  components: {
    codemirror,
  },
  mounted() {
    this.editor.focus();
    this.editor.setSize('auto', 'auto');
    console.log(this.$route.params.id);
  },
  data() {
    return {
      lableValue: 'text/x-c++src',
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
    };
  },
  methods: {
    changeIsConsoleShow() {
      this.isConsoleShow = !this.isConsoleShow;
    },
    handleSubmitClick() {
      // 如果代码为空，则不发起网络请求
      if (this.editor.getValue().length === 0) {
        this.$message({ message: '请输入代码', type: 'warning' });
      } else {
        api
          .uploadSubmussion({
            problemOriginId: this.$route.params.id,
            language: this.mapLanguage(this.editorOption.mode),
            code: this.code,
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    mapLanguage(mode) {
      for (let i = 0; i < this.language.length; i++) {
        if (this.language[i].value === mode) {
          return this.language[i].label.toLowerCase();
        }
      }
      return '';
    },
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor;
    },
    editorOption() {
      return {
        mode: this.lableValue,
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
      };
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
      height  calc(100vh - 100px - 40px)
      // background-color gray
      .e-tab
        position absolute
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
        height 100%
        scroll-y()
        .virtual-header
          width 100%
          height 39px
    .footer
      position relative
      width 100%
      height 40px
      border-top 1px solid #e4e7ed
      line-height 40px
      .console-btn
        display inline-block
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
