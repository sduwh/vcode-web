<template>
  <div id="rank">
    <table-wrap :title="title" :paginationInfo="paginationInfo">
      <template #action>
        <r-action></r-action>
      </template>
      <template #table>
        <div class="r-table-wrap">
          <r-table :tableInfo="tableInfo" :tableLimit="tableLimit"></r-table>
        </div>
      </template>
    </table-wrap>
  </div>
</template>

<script>
import TableWrap from 'base/table-wrap';
import RTable from 'components/rank/r-table';
import RAction from 'components/rank/r-action';
import api from 'api/api';

export default {
  components: {
    TableWrap,
    RTable,
    RAction,
  },
  data() {
    return {
      title: 'Rank',
      tableInfo: [],
      tableLimit: 20,
      paginationInfo: {
        total: 0,
        page_size: 0,
        hide_on_single_page: false,
        current_page: 1,
      },
    };
  },
  created() {
    api.getRank().then(res => {
      const { data } = res;
      if (data.code === 1) {
        const rankData = data.data;
        console.log(rankData);
        this.tableInfo = res.data.data.rankList;
        this.paginationInfo.total = res.data.data.rankList.length;
        this.paginationInfo.page_size = res.data.data.rankList.length;
      }
    });
  },
  methods: {},
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#rank
  padding 0 50px
  .r-table-wrap
    padding 0 20px
</style>
