<template>
  <div id="contest-detail">
    <table-wrap
      :title="title"
      :paginationInfo="paginationInfo"
    >
      <template #table>
        <p-table
          :tableInfo="tableInfo"
          :tableLimit="tableLimit"
        ></p-table>
      </template>
    </table-wrap>
  </div>
</template>

<script>
  import TableWrap from 'base/table-wrap'
  import PTable from 'components/problems/p-table'
  import api from 'api/api'
  export default {
    components: {
      TableWrap,
      PTable,
    },
    data() {
      return {
        title: "Problem List",
        tableInfo: [],
        tableLimit: 15,
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
      api.getProblems('').then(res => {
        this.tableInfoCnt = res.data.data.total
        this._solveTableInfo(res.data.data.results)
        this._initPaginationInfo()
      })
    },
    methods: {
      _solveTableInfo(tableInfo) {
        let len = this.tableLimit < this.tableInfoCnt ? this.tableLimit : this.tableInfoCnt
        for (var i = 0; i < len; i ++) {
          let obj = Object.assign({}, tableInfo[i], {
            ac_rate: (tableInfo[i].submission_number == 0 ? 0 : (tableInfo[i].accepted_number / tableInfo[i].submission_number).toFixed(2)) + '%',
            tagShow: tableInfo[i].tags[0],
          })
          this.tableInfo.push(obj)
        }
      },
      _initPaginationInfo() {
        this.paginationInfo.total = this.tableInfoCnt
        this.paginationInfo.page_size = this.tableLimit
      },  
    },
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>