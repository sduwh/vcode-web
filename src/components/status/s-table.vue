<template>
  <div id="s-table">
    <el-table :data="tableInfo" style="width: 100%" size="small">
      <el-table-column prop="create_time" label="When">
        <template slot-scope="scope">
          <div slot="reference">
            {{ timeFormat(scope.row.create_time) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="result" label="Status">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="small" :type="statusTag(scope.row.result)">{{
              solveStatus(scope.row)
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="problem" label="Problem">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'ProblemDetail', params: { id: scope.row.problem } }"
            >{{ scope.row.problem }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="statistic_info.time_cost" label="Time">
        <template slot-scope="scope">
          <div slot="reference">
            {{ solveTime(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statistic_info.memory_cost" label="Memory">
        <template slot-scope="scope">
          <div slot="reference">
            {{ solveMemory(scope.row.statistic_info.memory_cost) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="language" label="Language"></el-table-column>
      <el-table-column prop="username" label="Author"></el-table-column>
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
      return row.statistic_info.time_cost === undefined
        ? '--'
        : `${row.statistic_info.time_cost}ms`;
    },
    solveStatus(row) {
      let map = {
        '4': 'Runtime Error',
        '-2': 'Compile Erroe',
        '0': 'Accept',
        '-1': 'Wrong Answer',
        '1': 'Time Limit',
      };
      return map[row.result];
    },
    statusTag(status) {
      switch (status) {
        case 0:
          return 'success';
        case -1:
          return 'danger';
        case -2:
          return 'warning';
        case 1:
          return 'warning';
        case 4:
          return 'danger';
        default:
          return 'danger';
      }
    },
    solveMemory(memory) {
      return memory === undefined
        ? '--'
        : `${parseInt(memory / (1024 * 1024))}MB`;
    },
    timeFormat(d) {
      // eslint-disable-next-line no-var
      var d = new Date(d);
      return (
        // eslint-disable-next-line prefer-template
        d.getFullYear() +
        '-' +
        // eslint-disable-next-line prefer-template
        (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) +
        '-' +
        // eslint-disable-next-line prefer-template
        (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) +
        ' ' +
        // eslint-disable-next-line prefer-template
        (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) +
        ':' +
        // eslint-disable-next-line prefer-template
        (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) +
        ':' +
        // eslint-disable-next-line prefer-template
        (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds())
      );
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
