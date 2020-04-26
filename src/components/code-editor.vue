<template>
  <div style="height: 100%">
    <codemirror class="editor" v-model="editorCode" ref="problemCodeEditor" :options="editorOption"></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';

require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');

export default {
  props: {
    code: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  name: 'code-editor',
  mounted() {
    this.editor.focus();
    this.editor.setSize('auto', '100%');
    this.editor.refresh();
    this.editorCode = this.code;
  },
  components: {
    codemirror,
  },
  data() {
    return {
      editorCode: '',
    };
  },
  computed: {
    editor() {
      return this.$refs.problemCodeEditor.editor;
    },
    editorOption() {
      return {
        mode: this.mode,
        tabSize: 2,
        theme: 'cm-s-eclipse',
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        scrollbarStyle: null,
        autofocus: true,
      };
    },
  },
  watch: {
    editorCode(newCode) {
      this.$emit('update:code', newCode);
    },
  },
};
</script>

<style scoped>
  .editor {
    height: 100%;
  }
</style>
