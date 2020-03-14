<template>
  <div id="r-table">
    <el-table :data="tableInfo" style="width: 100%" size="small">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="user.username" label="User"></el-table-column>
      <el-table-column prop="accepted_number" label="AC"></el-table-column>
      <el-table-column prop="submission_number" label="Total"></el-table-column>
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
      if (row.submission_number) {
        const tempNumber = parseInt(
          (row.accepted_number / row.submission_number) * 100
        );
        return `${tempNumber}%`;
      }
      return '';
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
