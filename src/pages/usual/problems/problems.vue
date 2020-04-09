<template>
  <div id="problems">
    <el-row type="flex" justify="sapce-around">
      <el-col :sm="24" :md="24">
        <table-wrap :title="title" :paginationInfo="paginationInfo" @handleChangePage="getProblems($event, pageNum)">
          <template #mode>
            <div class="mode">
              <el-tag type="info" size="mini">Upgrade</el-tag>
            </div>
          </template>
          <template #table>
            <p-table v-loading="loadingStatus" :tableInfo="tableInfo" :tableLimit="tableLimit"></p-table>
          </template>
        </table-wrap>
      </el-col>
      <!-- <el-col :md="6" class="hidden-sm-and-down">
        <p-action :actionInfo="actionInfo"></p-action>
        <tags class="tags" :tagsInfo="tagsInfo"></tags>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import TableWrap from 'components/table-wrap';
// import Tags from 'components/tags';
// import PAction from 'pages/problems/p-action';
import PTable from 'pages/usual/problems/p-table';
import api from 'api/api';

export default {
  components: {
    TableWrap,
    // PAction,
    // Tags,
    PTable,
  },
  created() {
    // 获取标签数据
    // api.getTags('').then(res => {
    //   this.tagsInfo = res.data.data;
    // });
    // 获取题目数据
    this.getProblems(1);
  },
  data() {
    return {
      pageNum: 1,
      title: 'Problem List',
      actionInfo: {
        difficulty: ['all', 'low', 'mid', 'high'],
        mode: ['recommend', 'upgrade', 'challenge'],
      },
      tagsInfo: [],
      tableInfo: [],
      tableInfoCnt: 0,
      tableLimit: 10,
      paginationInfo: {
        // 总条目数：对应 this.tableInfoCnt
        total: 0,
        // 每页显示条目个数：对应 this.tableLimit
        page_size: 0,
        hide_on_single_page: false,
        current_page: 1,
      },
      loadingStatus: true,
    };
  },
  methods: {
    // 处理返回的 problems 数据
    solveTableInfo(tableInfo) {
      this.tableInfo = [];
      const len = tableInfo.length;
      for (let i = 0; i < len; i++) {
        // eslint-disable-next-line prefer-object-spread
        const obj = Object.assign({}, tableInfo[i], {
          ac_rate:
            // eslint-disable-next-line prefer-template
            (tableInfo[i].submissionNumber === 0
              ? 0
              : (tableInfo[i].acceptedNumber / tableInfo[i].submissionNumber).toFixed(2)) + '%',
          // tagShow: tableInfo[i].tags[0],
        });

        obj.id = obj.originId;
        this.tableInfo.push(obj);
      }
    },
    // 初始化要传递给子组件的分页相关的数据
    initPaginationInfo() {
      this.paginationInfo.total = this.tableInfoCnt;
      this.paginationInfo.page_size = this.tableLimit;
    },
    getProblems(pageNum) {
      api
        .getProblems({
          page: pageNum,
          size: 10,
          search: '',
          visible: true,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.tableInfoCnt = data.total;
            this.solveTableInfo(data.problem_list);
            this.initPaginationInfo();
            this.loadingStatus = false;
          }
        });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #problems
    width 100%
    .el-row
      padding 0 20px
      .el-col
        padding 0 10px
        .mode
          display inline-block
          margin-left 15px
          vertical-align middle
        .tags
          margin-top 20px
</style>
