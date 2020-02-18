<template>
  <div id="contests">
    <table-wrap
      :title="title"
      :paginationInfo="paginationInfo"
      @handleChangePage="getContests($event, pageNum)"
    >
      <template #action>
        <div class="action-wrap">
          <c-action></c-action>
        </div>
      </template>
      <template #table>
        <c-table
          v-loading="loadingStatus"
          :tableInfo="tableInfo"
          :tableLimit="tableLimit"
        ></c-table>
      </template>
    </table-wrap>
  </div>
</template>

<script>
import TableWrap from 'base/table-wrap';
// import VPagination from 'base/v-pagination';
import CTable from 'components/contests/c-table';
import CAction from 'components/contests/c-action';
import api from 'api/api';

export default {
  components: {
    TableWrap,
    // VPagination,
    CTable,
    CAction,
  },
  data() {
    return {
      pageNum: 1,
      title: 'Contests',
      tableInfo: [],
      tableLimit: 10,
      tableInfoCnt: 0,
      paginationInfo: {
        total: 0,
        page_size: 0,
        hide_on_single_page: false,
        current_page: 1,
      },
      loadingStatus: true,
    };
  },
  created() {
    this.getContests(1);
  },
  methods: {
    solveTableInfo(tableInfo) {
      this.tableInfo = [];
      let len = tableInfo.length;
      let nowTimeStamp = new Date().getTime();
      for (let i = 0; i < len; i++) {
        // eslint-disable-next-line prefer-object-spread
        const objStartTimeStamp = new Date(tableInfo[i].startTime).getTime();
        const objEndTimeStamp = new Date(tableInfo[i].endTime).getTime();
        // eslint-disable-next-line prefer-object-spread
        const obj = Object.assign({}, tableInfo[i], {
          status:
            // eslint-disable-next-line no-nested-ternary
            objStartTimeStamp > nowTimeStamp
              ? 'ready'
              : objEndTimeStamp < nowTimeStamp
              ? 'ended'
              : 'started',
        });

        obj.id = obj.name;
        this.tableInfo.push(obj);
      }
    },
    initPaginationInfo() {
      this.paginationInfo.total = this.tableInfoCnt;
      this.paginationInfo.page_size = this.tableLimit;
    },
    getContests(pageNum) {
      api
        .getContests({
          page: pageNum,
          size: 10,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.tableInfoCnt = data.total;
            this.initPaginationInfo();
            this.solveTableInfo(data.contestList);
            this.loadingStatus = false;
          }
        });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
#contests
  box-sizing border-box
  padding 0 50px
  .action-wrap
    display inline-block
    float right
</style>
