<template>
  <div id="status">
    <table-wrap :title="title" :paginationInfo="paginationInfo">
      <template #table>
        <s-table :tableInfo="tableInfo" :tableLimit="tableLimit"></s-table>
      </template>
    </table-wrap>
  </div>
</template>

<script>
import TableWrap from 'base/table-wrap';
// import VPagination from 'base/v-pagination';
import STable from 'components/status/s-table';
import api from 'api/api';

export default {
  components: {
    TableWrap,
    // VPagination,
    STable,
  },
  data() {
    return {
      title: 'Status',
      tableInfo: [],
      tableLimit: 20,
      tableInfoCnt: 0,
      paginationInfo: {
        total: 0,
        page_size: 0,
        hide_on_single_page: false,
        current_page: 1,
      },
    };
  },
  created() {
    api.getSubmissions('').then(res => {
      this.tableInfo = res.data.data.results;
      this.tableInfoCnt = res.data.data.total;
      this.initPaginationInfo();
      this.solveTableInfo();
    });
  },
  methods: {
    solveTableInfo() {
      const len = this.tableLimit < this.tableInfoCnt ? this.tableLimit : this.tableInfoCnt;
      this.tableInfo = this.tableInfo.slice(0, len);
    },
    initPaginationInfo() {
      this.paginationInfo.total = this.tableInfoCnt;
      this.paginationInfo.page_size = this.tableLimit;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#status
  box-sizing border-box
  padding 0 50px
</style>
