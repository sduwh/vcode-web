<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed label="日期" width="110">
      <template slot-scope="scope">
        <span style="">{{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="语言" width="100">
      <template slot-scope="scope">
        {{ scope.row.language }}
      </template>
    </el-table-column>
    <el-table-column label="执行用时" width="100">
      <template slot-scope="scope">
        {{ scope.row.time !== undefined && scope.row.time.length > 0 ? scope.row.time : 'N/A' }}
      </template>
    </el-table-column>
    <el-table-column label="内存占用" width="100">
      <template slot-scope="scope">
        {{ scope.row.memory !== undefined && scope.row.memory.length > 0 ? scope.row.memory : 'N/A' }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="提交结果" width="110">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.result === 5">Padding</el-tag>
        <el-tag v-else-if="scope.row.result === 1" type="success">Success</el-tag>
        <el-tag v-else-if="scope.row.result === 3" type="danger">MemoryLimit</el-tag>
        <el-tag v-else-if="scope.row.result === 2" type="danger">TimeLimit</el-tag>
        <el-tag v-else-if="scope.row.result === 6" type="danger">Compile Error</el-tag>
        <el-tag v-else-if="scope.row.result === 4" type="danger">Unknown Error</el-tag>
        <el-tag v-else type="danger">Error Answer</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import api from 'api/api';

export default {
  mounted() {
    this.timer = setInterval(this.getSubmissions, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      timer: null,
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
  },
};
</script>
