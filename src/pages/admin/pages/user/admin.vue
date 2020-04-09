<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.nickname.toLowerCase().includes(search))"
      style="width: 100%"
    >
      <el-table-column label="Account" prop="account"></el-table-column>
      <el-table-column label="Nickname" prop="nickname"></el-table-column>
      <el-table-column label="Role" prop="role"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!-- 默认每页显示10条，暂时不提供修改page-size功能 -->
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
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
        <el-button type="primary" @click="dialogFormVisible = false">
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
      tableData: [],
      search: '',
      pagesize: 10,
      dialogFormVisible: false,
      userForm: {},
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
    };
  },
  methods: {
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.userForm = row;
    },
    handleCurrentChange(val) {
      this.getUsers(val);
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
    getUsers(pageNum) {
      api
        .getAdmins({
          page: pageNum,
          size: this.pagesize,
          search: this.search,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const userData = data.data;
            this.tableData = userData.adminList;
            this.total = userData.total;
          }
        });
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
