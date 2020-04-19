<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="hex" label="Id" width="200"></el-table-column>
      <el-table-column prop="taskId" label="Task Id" width="200"></el-table-column>
      <el-table-column prop="oj" label="OJ" width="100"></el-table-column>
      <el-table-column prop="key" label="Key" width="120"></el-table-column>
      <el-table-column prop="createTime" label="Create Time" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="result" label="Result" width="100">
        <template slot-scope="scope">
          <el-tag :type="statusMap(scope.row.result)">{{ scope.row.result }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="Author" width="130"></el-table-column>
      <el-table-column fixed="right" label="Options">
        <template slot-scope="scope">
          <el-button @click="showTaskDetail(scope.row)" type="text" size="small">
            view
          </el-button>
          <el-button @click="handleFormClone(scope.row)" type="text" size="small">
            clone
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pagination.currentPage"
        :total="pagination.total"
        :page-size="pagination.pageSize"
      >
      </el-pagination>
    </div>
    <crawl-problem-task-detail :show-task="showTask" :dialog-visible.sync="dialogVisible" @cloneTask="cloneTask">
    </crawl-problem-task-detail>
  </div>
</template>

<script>
import api from 'api/api';
import { crawlStatusMap } from 'util/crawlUtil';
import CrawlProblemTaskDetail from 'pages/admin/pages/problem/crawl-problem-task-detail';

export default {
  name: 'crawl-problem-task-list',
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  components: {
    CrawlProblemTaskDetail,
  },
  mounted() {
    this.getTaskList(1);
  },
  data() {
    return {
      dialogVisible: false,
      pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      tableData: [
        {
          hex: '',
          taskId: '',
          oj: '',
          key: '',
          result: '',
          createTime: '',
          author: '',
        },
      ],
      showTask: {
        hex: '',
        taskId: '',
        oj: '',
        key: '',
        result: '',
        createTime: '',
        author: '',
      },
    };
  },
  methods: {
    getTaskList(pageNum) {
      api
        .getCrawlTaskList({
          page: pageNum,
          size: this.pagination.pageSize,
          search: this.search,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            this.tableData = data.data.taskList;
            this.pagination.total = data.data.total;
          }
        });
    },
    showTaskDetail(form) {
      this.dialogVisible = true;
      this.showTask = form;
    },
    handleFormClone(form) {
      this.$confirm('Sure you want to clone this task.')
        .then(_ => {
          this.cloneTask(form);
        })
        .catch(_ => {});
    },
    cloneTask(form) {
      api.cloneCrawlTask(form).then(res => {
        const { data } = res;
        if (data.code === 1) {
          this.getTaskList(1);
          this.dialogVisible = false;
          this.showTask = {
            hex: '',
            taskId: '',
            oj: '',
            key: '',
            result: '',
          };
        }
      });
    },
    statusMap(status) {
      return crawlStatusMap(status);
    },
  },
  watch: {
    search() {
      this.getTaskList(1);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
