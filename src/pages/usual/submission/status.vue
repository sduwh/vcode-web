<template>
  <div id="status">
    <table-wrap
      :title="title"
      :paginationInfo="paginationInfo"
      @handleChangePage="getSubmissions($event, paginationInfo.current_page)"
    >
      <template #table>
        <s-table :tableInfo="tableInfo" :tableLimit="paginationInfo.page_size"></s-table>
      </template>
    </table-wrap>
  </div>
</template>

<script>
import TableWrap from 'components/table-wrap';
// import VPagination from 'components/v-pagination';
import STable from 'pages/usual/submission/s-table';
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
      paginationInfo: {
        total: 0,
        page_size: 15,
        hide_on_single_page: false,
        current_page: 1,
      },
    };
  },
  created() {
    this.getSubmissions(1);
  },
  methods: {
    getSubmissions(pageNum) {
      api
        .getGlobalSubmission({
          page: pageNum,
          size: this.paginationInfo.page_size,
          search: '',
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const submissionData = data.data;
            this.tableInfo = submissionData.submissionList;
            this.paginationInfo.total = submissionData.total;
          }
        });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#status
  box-sizing border-box
  padding 0 50px
</style>