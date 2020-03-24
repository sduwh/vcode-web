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
        <el-table-column prop="title" label="Title" width="400%"></el-table-column>
        <el-table-column prop="time" label="Time" width="350%"></el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" :type="scope.row.status === 'Ended' ? 'danger' : 'primary'">{{
                scope.row.status
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openness" label="Openness">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" :type="scope.row.openness === 'Public' ? 'success' : 'warning'">{{
                scope.row.openness
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="manager" label="Manager"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="SearchDetails(scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:100%;" class="pagination">
        <el-pagination
          class="page"
          background
          width="40%"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="pagesize"
          :total="tableData.length"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="Password" :visible.sync="dialogVisible" width="30%">
      <el-input placeholder="password" v-model="password" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      tableData: [
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2019软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: 'Ended',
          openness: 'Public',
          manager: 'Manager',
          password: null,
        },
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2018软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: ' in progress',
          openness: 'Public',
          manager: 'Manager',
          password: null,
        },
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2018软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: ' in progress',
          openness: 'Private',
          manager: 'Manager',
          password: 123,
        },
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2018软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: 'Ended',
          openness: 'Private',
          manager: 'Manager',
          password: 456,
        },
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2018软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: 'Ended',
          openness: 'Public',
          manager: 'Manager',
          password: null,
        },
        {
          title: 'SDUWH-《数据结构课程设计》-队列-2018软件',
          time: '2020-03-02 10:00:00 ~ 2020-03-07 18:00:00',
          status: 'Ended',
          openness: 'Public',
          manager: 'Manager',
          password: null,
        },
      ],
      currentPage: 1,
      pagesize: 10,
      dialogVisible: false,
      password: '',
      index: null,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.tableData = this.allData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
      this.totalCount = this.allData.length;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.allData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
      this.totalCount = this.allData.length;
    },
    SearchDetails(index) {
      if (this.tableData[index].password !== null) {
        this.password = null;
        this.dialogVisible = true;
        this.index = index;
      } else {
        this.$router.push(`/contest/${this.tableData[index].title}`);
      }
    },
    checkPass() {
      console.log(this.password);
      console.log(this.tableData[this.index].password);
      if (this.password == this.tableData[this.index].password) {
        this.$router.push(`/contest/${this.tableData[this.index].title}`);
      } else {
        this.$message.error('请输入正确密码');
      }
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
