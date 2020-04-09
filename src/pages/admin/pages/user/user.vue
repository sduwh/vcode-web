<template>
  <div>
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="16">
          <div>用户列表</div>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="search"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider"></el-divider>
    <el-table
      @selection-change="handleSelectionChange"
      :data="
        tableData
          .slice((currentPage - 1) * pagesize, currentPage * pagesize)
          .filter(data => !search || data.nickname.toLowerCase().includes(search))
      "
      style="width: 100%"
    >
      <el-table-column label="Account" prop="account"></el-table-column>
      <el-table-column label="Nickname" prop="nickname"></el-table-column>
      <el-table-column label="CreateTime" prop="createTime">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
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

    <el-dialog title="User" :visible.sync="dialogFormVisible">
      <el-form :model="userForm">
        <el-form-item label="Nickname" :label-width="formLabelWidth">
          <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Role" :label-width="formLabelWidth">
          <el-select v-model="userForm.role" placeholder="请选择">
            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancle</el-button>
        <el-button type="primary" @click="handleUserFormSave()">
          Save
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  mounted() {
    this.getUsers(1);
  },
  data() {
    return {
      total: 0,
      tableData: [
        {
          account: '2016-05-02',
          nickname: '王小虎',
          role: '上海市普陀区金沙江路 1518 弄',
          createTime: '2020-02-02',
          email: '12213123231@qq.com',
        },
      ],
      search: '',
      dialogFormVisible: false,
      userForm: {
        nickname: '',
        role: '',
        emial: '',
      },
      roles: [
        {
          value: 'teacher',
          label: 'teacher',
        },
        {
          value: 'caption',
          label: 'caption',
        },
        {
          value: 'admin',
          label: 'admin',
        },
        {
          value: 'user',
          label: 'user',
        },
      ],
      formLabelWidth: '120px',
      currentPage: 1,
      pagesize: 10,
      multipleSelection: [],
    };
  },
  methods: {
    handleCurrentChange(val) {
      // Todo: 调用api获取User列表
      this.currentPage = val;
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.userForm = row;
    },
    handleUserFormSave() {
      api.updateUserInfoByAdmin(this.userForm).then(res => {
        const { data } = res;
        if (data.code === 1) {
          this.$message.success('update success');
        } else {
          this.$message.error('update fail');
          this.getUsers(this.currentPage);
        }
      });
      this.dialogFormVisible = false;
    },
    handleDelete(row) {
      api.deleteUserByAdmin(row).then(res => {
        const { data } = res;
        if (data.code === 1) {
          this.$message.success('delete success');
        } else {
          this.$message.error('delete fail');
        }
        this.getUsers(this.currentPage);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getUsers(pageNum) {
      api
        .getUsers({
          page: pageNum,
          size: this.pagesize,
          search: this.search,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const userData = data.data;
            this.tableData = userData.userList;
            this.total = userData.total;
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
.divider {
  margin: 10px 0;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
