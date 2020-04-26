<template>
  <div id="s-table">
    <el-table :data="tableInfo" style="width: 100%" size="small">
      <el-table-column prop="create_time" label="When">
        <template slot-scope="scope">
          <div slot="reference">
            {{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="hex" label="ID">
        <template slot-scope="scope">
          <div slot="reference">
            {{ scope.row.hex }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="Status">
        <template slot-scope="scope">
          <div slot="reference">
            <el-button class="button" @click="showSubmissionDetail(scope.row)">
              <el-tag size="small" :type="statusTag(scope.row.result)">{{ solveStatus(scope.row) }}</el-tag>
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="problemOriginId" label="Problem">
        <template slot-scope="scope">
          <router-link :to="{ name: 'ProblemDetail', params: { id: scope.row.problemOriginId } }">
            {{ scope.row.problemOriginId }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Time">
        <template slot-scope="scope">
          <div slot="reference">
            {{ solveTime(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="memory" label="Memory">
        <template slot-scope="scope">
          <div slot="reference">
            {{ solveMemory(scope.row.memory) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="language" label="Language"></el-table-column>
      <el-table-column prop="nickname" label="Author"></el-table-column>
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
import SubmissionDetail from 'pages/usual/submission/submission-detail';
import { submitStatusMap } from 'util/submitUtil';

export default {
  props: {
    tableInfo: {
      type: Array,
      required: true,
    },
    tableLimit: {
      type: Number,
      default: 20,
    },
  },
  components: {
    SubmissionDetail,
  },
  data() {
    return {
      submissionHex: '',
      dialogVisible: false,
    };
  },
  methods: {
    solveTime(row) {
      return row.time === '' ? '--' : `${row.time}ms`;
    },
    solveStatus(row) {
      return submitStatusMap(row.result);
    },
    statusTag(status) {
      switch (status) {
        case 1:
          return 'success';
        case 5:
          return '';
        default:
          return 'danger';
      }
    },
    solveMemory(memory) {
      return memory === '' ? '--' : memory + `KB`;
    },
    showSubmissionDetail(form) {
      if (form.userAccount === this.$store.state.user.account) {
        this.submissionHex = form.hex;
        this.dialogVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.button {
  padding: 0;
  border-width: 0;
}
</style>
