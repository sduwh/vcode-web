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
      <el-table-column prop="hex" label="ID"> </el-table-column>
      <el-table-column prop="result" label="Status">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="small" :type="statusTag(scope.row.result)">{{ solveStatus(scope.row) }}</el-tag>
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
  </div>
</template>

<script>
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
  methods: {
    solveTime(row) {
      return row.time === '' ? '--' : `${row.time}ms`;
    },
    solveStatus(row) {
      const map = {
        '4': 'Unkonw Error',
        '6': 'Compile Error',
        '1': 'Accept',
        '0': 'Wrong Answer',
        '2': 'Time Out',
        '3': 'Memory Out',
        '5': 'Padding',
      };
      return map[row.result];
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
      return memory === '' ? '--' : `${parseInt(memory / (1024 * 1024))}MB`;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
