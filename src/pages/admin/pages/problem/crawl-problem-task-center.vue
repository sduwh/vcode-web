<template>
  <div>
    <div class="header">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="10">
          <div>Crawl Task</div>
        </el-col>
        <el-col :span="6">
          <el-button size="medium" @click="HandleToCrawlProblemList">Crawl Problem List</el-button>
          <el-button type="primary" size="medium" @click="dialogVisible = true">Create Task</el-button>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="OJ Keywords" prefix-icon="el-icon-search" v-model="search"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider"></el-divider>
    <div>
      <crawl-problem-task-list :search="search" v-if="reloadList === true"></crawl-problem-task-list>
    </div>
    <crawl-problem-task-create
      :dialog-visible.sync="dialogVisible"
      :reloadList.sync="reloadList"
    ></crawl-problem-task-create>
  </div>
</template>

<script>
import CrawlProblemTaskList from 'pages/admin/pages/problem/crawl-problem-task-list';
import CrawlProblemTaskCreate from 'pages/admin/pages/problem/crawl-problem-task-create';

export default {
  name: 'crawl-problem-task-center',
  components: {
    CrawlProblemTaskList,
    CrawlProblemTaskCreate,
  },
  data() {
    return {
      search: '',
      dialogVisible: false,
      reloadList: true,
    };
  },
  methods: {
    HandleToCrawlProblemList() {
      this.$router.push({ name: 'AdminProblemCrawl' });
    },
  },
};
</script>

<style scoped>
.divider {
  margin: 10px 0;
}
</style>
