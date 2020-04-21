<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed label="日期" width="110">
        <template slot-scope="scope">
          <span style="">{{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="语言" min-width="90">
        <template slot-scope="scope">
          {{ scope.row.language }}
        </template>
      </el-table-column>
      <el-table-column label="执行用时" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.time !== undefined && scope.row.time.length > 0 ? scope.row.time : 'N/A' }}
        </template>
      </el-table-column>
      <el-table-column label="内存占用" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.memory !== undefined && scope.row.memory.length > 0 ? scope.row.memory : 'N/A' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="提交结果" min-width="120">
        <template slot-scope="scope">
          <el-button class="submission-button" @click="showSubmissionDetail(scope.row)">
            <el-tag :type="localSubmitTagMap(scope.row.result)">{{ localSubmitStatusMap(scope.row.result) }}</el-tag>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Submission" :visible.sync="dialogVisible" width="70%">
      <submission-detail :hex="submissionHex"></submission-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api/api';
import { submitTagMap, submitStatusMap } from 'util/submitUtil';

import SubmissionDetail from 'pages/usual/submission/submission-detail';

export default {
  // TODO 调整submission结果UI
  mounted() {
    this.timer = setInterval(this.getSubmissions, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    SubmissionDetail,
  },
  data() {
    return {
      dialogVisible: false,
      timer: null,
      tableData: [],
      submissionHex: '',
    };
  },
  methods: {
    localSubmitTagMap(status) {
      return submitTagMap(status);
    },
    localSubmitStatusMap(status) {
      return submitStatusMap(status);
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    getSubmissions() {
      api
        .getSubmissions({
          originId: this.$route.params.id,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const submissionData = data.data;
            this.tableData = submissionData.submissionList;
          }
        });
    },
    showSubmissionDetail(form) {
      this.dialogVisible = true;
      this.submissionHex = form.hex;
    },
  },
};
</script>

<style scoped>
.submission-button {
  padding: 0;
  border-width: 0;
}
</style>
