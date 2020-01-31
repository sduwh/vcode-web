<template>
  <div id="rank">
    <table-wrap
      :title="title"
      :paginationInfo="paginationInfo"
    >
      <template #action>
        <r-action></r-action>
      </template>
      <template #table>
        <div class="r-table-wrap">
          <r-table
            :tableInfo="tableInfo"
            :tableLimit="tableLimit"
          ></r-table>
        </div>
      </template>
    </table-wrap>
  </div>
</template>

<script>
  import TableWrap from 'base/table-wrap'
  import VPagination from 'base/v-pagination'
  import RTable from 'components/rank/r-table'
  import RAction from 'components/rank/r-action'
  import api from 'api/api'
  export default {
    components: {
      TableWrap,
      VPagination,
      RTable,
      RAction,
    },
    data() {
      return {
        title: 'Rank',
        paginationInfo: {},
        tableInfo: [],
        tableLimit: 20,
        tableInfoCnt: 0,
        paginationInfo: {
          total: 0,
          page_size: 0,
          hide_on_single_page: false,
          current_page: 1,
        },
      }
    },
    created() {
      api.getUserRank('').then(res => {
        this.tableInfo = res.data.data.results
        this.tableInfoCnt = res.data.data.total
        this._initPaginationInfo()
        this._solveTableInfo()
      })
    },
    methods: {
      _solveTableInfo() {
        let len = this.tableLimit < this.tableInfoCnt ? this.tableLimit : this.tableInfoCnt
        this.tableInfo = this.tableInfo.slice(0, len)
      },
      _initPaginationInfo() {
        this.paginationInfo.total = this.tableInfoCnt
        this.paginationInfo.page_size = this.tableLimit
      },
    },
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  #rank
    padding 0 50px
    .r-table-wrap
      padding 0 20px
</style>