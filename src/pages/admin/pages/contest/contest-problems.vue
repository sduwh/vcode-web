<template>
  <div>
    <el-page-header @back="goBack" title="Back" :content="contestName"></el-page-header>
    <el-table :data="problemTable" style="width: 100%">
      <el-table-column label="OriginId" prop="originId"> </el-table-column>
      <el-table-column label="Title" prop="title"> </el-table-column>
      <el-table-column label="Author" prop="author"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" @click="handleAddProblemsButton()">Add Problem</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Add Problems" :visible.sync="dialogVisible" width="60%">
      <el-table :data="addProblemTable" style="width: 100%" max-height="500">
        <el-table-column label="OriginId" prop="originId" width="150"> </el-table-column>
        <el-table-column label="Title" prop="title"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Title's key word"
              @input="changeInput(scope)"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click.native="handleAdd(scope.row)">
              <i class="el-icon-plus"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="itemTotal"
          :page-size="10"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  mounted() {
    this.getContentProblems();
  },
  data() {
    return {
      contestName: this.$route.params.title,
      search: '',
      dialogVisible: false,
      itemTotal: 0,
      problemTable: [
        {
          originId: 'vcode-1',
          title: 'two sum',
          author: 'admin',
        },
      ],
      addProblemTable: [
        {
          originId: 'vcode-1',
          title: 'two sum',
          author: 'admin',
        },
      ],
    };
  },
  methods: {
    handleAdd(form) {
      const params = {
        contestTitle: this.contestName,
        problemOriginId: form.originId,
      };
      api.addProblemToContest(params).then(res => {
        const { data } = res;
        if (data.code === 1) {
          this.$message.success('Add success');
        } else {
          this.$message.error('Add error');
        }
      });
    },
    handleDelete(form) {
      const params = {
        contestTitle: this.contestName,
        problemOriginId: form.originId,
      };
      api.removeProblemFromContest(params).then(res => {
        const { data } = res;
        if (data.code === 1) {
          this.$message.success('remove success');
        } else {
          this.$message.error('remove error');
        }
        this.getContentProblems();
      });
    },
    handleAddProblemsButton() {
      this.dialogVisible = true;
      this.getProblems(1);
    },
    goBack() {
      this.$router.go(-1);
    },
    getContentProblems() {
      const { title } = this.$route.params;
      if (title !== undefined) {
        api.getContestProblemList({ contestTitle: title }).then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.problemTable = data.problems;
          }
        });
      }
    },
    handleCurrentChange(pageNum) {
      this.getProblems(pageNum);
    },
    getProblems(pageNum) {
      api
        .getProblems({
          page: pageNum,
          size: 7,
          search: this.search,
          visible: true,
          originType: 0,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.itemTotal = data.total;
            this.addProblemTable = data.problemList;
          }
        });
    },
    // eslint-disable-next-line no-unused-vars
    changeInput(scope) {
      this.getProblems(1);
    },
  },
  watch: {
    dialogVisible(oldV) {
      if (oldV === false) {
        this.getContentProblems();
      }
    },
  },
};
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
</style>
