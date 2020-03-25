import api from 'api/api';
<template>
  <div class="contests">
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="16">
          <div>Contest List</div>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入Title关键字" prefix-icon="el-icon-search" v-model="search"> </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider"></el-divider>
    <div class="mytable">
      <el-table
        :data="
          tableData
            .slice((currentPage - 1) * pagesize, currentPage * pagesize)
            .filter(data => !search || data.title.toLowerCase().includes(search))
        "
        style="width: 100%"
      >
        <el-table-column prop="name" label="Title" width="400%"></el-table-column>
        <el-table-column prop="time" label="Time" width="350%" v-slot="scope">
          <div v-if="scope.row.always">
            <el-tag size="medium" type="success"> No Time Limit</el-tag>
          </div>
          <div v-else>
            <el-tag size="medium" type="primary">
              {{ new Date(scope.row.startTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}</el-tag
            >

            -
            <el-tag size="medium" type="primary">
              {{ new Date(scope.row.endTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}</el-tag
            >
          </div>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <div v-if="scope.row.always">
                <el-tag size="medium" type="primary">opening</el-tag>
              </div>
              <div v-else-if="new Date().getTime() - new Date(scope.row.startTime) < 0">
                <el-tag size="medium" type="primary">Ready</el-tag>
              </div>
              <div v-else-if="new Date().getTime() - new Date(scope.row.endTime) > 0">
                <el-tag size="medium" type="danger">End</el-tag>
              </div>
              <div v-else>
                <el-tag size="medium" type="primary">Started</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lock" label="Lock">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <div v-if="scope.row.lock">
                <el-tag size="medium" type="warning">lock</el-tag>
              </div>
              <div v-else>
                <el-tag size="medium" type="success">unlock</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ownerAccount" label="Manager"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="SearchDetails(scope.row)">View</el-button>
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
          :page-size="pagesize"
          :total="total"
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="Password" :visible.sync="dialogVisible" width="30%">
      <el-input placeholder="password" v-model="password" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancle</el-button>
        <el-button type="primary" @click="checkPass">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  mounted() {
    this.getContestList(1);
  },
  data() {
    return {
      search: '',
      tableData: [],
      currentPage: 1,
      pagesize: 3,
      dialogVisible: false,
      password: '',
      index: null,
      total: 0,
      currentContest: null,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getContestList(val);
    },
    SearchDetails(row) {
      if (row.lock === true) {
        this.password = '';
        this.dialogVisible = true;
        this.currentContest = row;
      } else {
        this.$router.push(`/contest/${row.name}`);
      }
    },
    checkPass() {
      api
        .checkContestPassword({
          password: this.password,
          contestName: this.currentContest.name,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const checkData = data.data;
            if (checkData.result === true) {
              this.$router.push(`/contest/${this.currentContest.name}`);
            } else {
              this.$message.error('Password is wrong');
            }
          }
        });
    },
    getContestList(pageNum) {
      api
        .getContests({
          page: pageNum,
          size: this.pagesize,
          search: this.search,
        })
        .then(res => {
          console.log(res);
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.total = data.total;
            this.tableData = data.contestList;
          }
        });
    },
  },
};
</script>

<style scoped>
.page {
  text-align: right;
}
.pagination {
  margin-top: 20px;
}
.divider {
  margin: 10px 0;
}
</style>
