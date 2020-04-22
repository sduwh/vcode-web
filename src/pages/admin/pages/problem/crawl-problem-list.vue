<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="originId" label="ID" width="150%"> </el-table-column>
      <el-table-column prop="title" label="Title" width="150%"> </el-table-column>
      <el-table-column prop="author" label="Author" width="200%"> </el-table-column>
      <el-table-column prop="createTime" label="Create Time" width="250%">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="Visible" width="200%">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.visible" @change="handleVisibleChange(scope.$index)"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width:100%;" class="pagination">
      <el-pagination
        class="page"
        background
        width="40%"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableInfoCnt"
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  name: 'crawl-problem-list',
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getProblems(1);
  },
  data() {
    return {
      localSearch: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      tableInfoCnt: 0,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getProblems(val);
    },
    handleEdit(index) {
      this.$router.push({
        name: 'AdminProblemUpdate',
        params: { problem: JSON.stringify(this.tableData[index]), backUrlName:"AdminProblemCrawl" },
      });
    },
    handleDelete(index) {
      this.$confirm('Please confirm your option', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const problem = this.tableData[index];
        api
          .delProblem({
            originId: problem.originId,
          })
          .then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.tableData.splice(index, 1);
            }
          });
        this.$message({
          type: 'success',
          message: 'Delete success',
        });
      });
    },
    handleVisibleChange(index) {
      const problem = this.tableData[index];
      api
        .updateProblemVisible({
          originId: problem.originId,
          visible: problem.visible,
        })
        .then(res => {
          const { data } = res;
          if (data.code !== 1) {
            this.tableData[index].visible = !problem.visible;
            this.$message({
              message: 'update error',
              type: 'error',
            });
          }
        });
    },
    getProblems(pageNum) {
      api
        .getProblems({
          page: pageNum,
          size: this.pageSize,
          search: this.search,
          visible: false,
          originType: 2,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.tableInfoCnt = data.total;
            this.tableData = data.problemList;
          }
        });
    },
  },
  watch: {
    search() {
      this.getProblems(1);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
