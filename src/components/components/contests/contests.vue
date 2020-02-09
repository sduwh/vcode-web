<template>
  <div id="contests">
    <table-wrap
      :title="title"
      :paginationInfo="paginationInfo"
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
  import TableWrap from 'base/table-wrap'
  import VPagination from 'base/v-pagination'
  import CTable from 'components/contests/c-table'
  import CAction from 'components/contests/c-action'
  import api from 'api/api'
  export default {
    components: {
      TableWrap,
      VPagination,
      CTable,
      CAction,
    },
    data() {
      return {
        title: 'Contests',
        paginationInfo: {},
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
      }
    },
    created() {
      api.getContests('').then(res => {
        this.tableInfo = res.data.data.results
        this.tableInfoCnt = res.data.data.total
        this._initPaginationInfo()
        this._solveTableInfo()
        this.loadingStatus = false
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
  @import '~common/stylus/variable.styl'
  #contests
    box-sizing border-box
    padding 0 50px
    .action-wrap
      display inline-block
      float right
</style>