<template>
  <div id="r-table">
    <el-table :data="tableInfo" style="width: 100%" size="small">
      <el-table-column prop="userAccount" label="ID"></el-table-column>
      <el-table-column prop="username" label="User"></el-table-column>
      <el-table-column prop="acNum" label="AC"></el-table-column>
      <el-table-column prop="submission_number" label="Total">
        <template slot-scope="scope">
          {{ scope.row.acNum + scope.row.wrongNum }}
        </template>
      </el-table-column>
      <el-table-column label="Rate">
        <template slot-scope="scope">
          <div slot="reference">
            {{ calcRate(scope.row) }}
          </div>
        </template>
      </el-table-column>
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
    calcRate(row) {
      if (row.acNum) {
        const tempNumber = parseInt((row.acNum / (row.acNum + row.wrongNum)) * 100);
        return `${tempNumber}%`;
      }
      return '';
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
