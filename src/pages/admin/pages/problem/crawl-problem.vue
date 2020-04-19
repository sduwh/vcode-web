<template>
  <div>
    <div class="header">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="12">
          <div>Crawl Problem</div>
        </el-col>
        <el-col :span="4">
          <el-button size="medium" type="primary" @click="goCrawlTaskCenter">Crawl Task Center</el-button>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="Title Keywords" prefix-icon="el-icon-search" v-model="search"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider"></el-divider>
    <div class="body">
      <crawl-problem-list :search="search"></crawl-problem-list>
    </div>
  </div>
</template>

<script>
import CrawlProblemList from 'pages/admin/pages/problem/crawl-problem-list';

export default {
  name: 'crawl-problem',
  components: {
    CrawlProblemList,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    goCrawlTaskCenter() {
      this.$router.push({ name: 'AdminProblemCrawlCenter' });
    },
  },
};
</script>

<style scoped>
.divider {
  margin: 10px 0;
}
</style>
