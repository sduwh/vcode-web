<template>
  <div class="tinymce-editor">
    <editor
      v-model="localValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    >
    </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver';
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/wordcount'; // 字数统计插件

export default {
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    valueName: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: 'lists image wordcount',
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image | removeformat',
    },
  },
  data() {
    return {
      init: {
        // language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        // language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = `data:image/jpeg;base64,${blobInfo.base64()}`;
          success(img);
        },
      },
      localValue: this.value,
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    onClick(e) {
      this.$emit('onClick', e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.localValue = '';
    },
  },
  watch: {
    value(newValue) {
      this.localValue = newValue;
    },
    localValue(newValue) {
      this.$emit('input', this.valueName, newValue);
    },
  },
};
</script>
