<template>
  <div id="about" class="about">
    <div class="about-block"><MarkdownPreview :initialValue="doc" /></div>
  </div>
</template>

<script>
import api from 'api/api';
import { MarkdownPreview } from 'vue-meditor';

export default {
  mounted() {
    api.getAbout().then(res => {
      if (res.data.code === 1) {
        this.doc = res.data.data;
      } else if (res.data.code === 0) {
        this.doc = '# Here there is nothing to say';
      } else {
        this.$message.error('Some error occurred here');
      }
    });
  },
  components: {
    MarkdownPreview,
  },
  data() {
    return {
      title: 'About',
      doc: '',
    };
  },
};
</script>

<style scoped>
.about {
  box-sizing: border-box;
  padding: 0 50px 20px;
}

.about-block {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
}
</style>
