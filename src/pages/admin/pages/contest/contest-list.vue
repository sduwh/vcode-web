<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Title" prop="name"></el-table-column>
      <el-table-column label="isAlways" prop="isAlways" v-slot="scope">
        <el-button
          prop="isAlways"
          type="success"
          icon="el-icon-check"
          circle
          size="mini"
          v-if="scope.row.always"
          @click="handleClick(scope.row.always)"
        ></el-button>
        <el-button
          prop="always"
          type="danger"
          icon="el-icon-close"
          circle
          size="mini"
          v-else
          @click="handleClick(scope.row.always)"
        ></el-button>
      </el-table-column>
      <el-table-column label="isLock" prop="name" v-slot="scope">
        <el-button
          prop="isAlways"
          type="success"
          icon="el-icon-check"
          circle
          size="mini"
          v-if="scope.row.lock"
          @click="handleClick(scope.row.lock)"
        ></el-button>
        <el-button
          prop="isAlways"
          type="danger"
          icon="el-icon-close"
          circle
          size="mini"
          v-else
          @click="handleClick(scope.row.lock)"
        ></el-button>
      </el-table-column>
      <el-table-column label="StartTime" width="170" v-slot="scope">
        <div v-show="scope.row.startTime !== null">
          {{ new Date(scope.row.startTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </el-table-column>

      <el-table-column label="EndTime" width="170" v-slot="scope">
        <div v-show="scope.row.endTime !== null">
          {{ new Date(scope.row.endTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </el-table-column>
      <el-table-column label="Owner" prop="owner"></el-table-column>
      <el-table-column align="right" width="300">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Title's keyword" @input="getContestList(1)" />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope)">
            Edit
          </el-button>
          <el-button size="mini" @click="handleEditContestProblems(scope.row.name)">
            Problems
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!-- 默认每页显示10条，暂时不提供修改page-size功能 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="itemTotal"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="Contest" :visible.sync="dialogFormVisible">
      <el-form :model="contestForm">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="contestForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="always" :label-width="formLabelWidth">
          <el-radio v-model="contestForm.always" :label="true">Always open</el-radio>
          <el-radio v-model="contestForm.always" :label="false">Time limit</el-radio>
        </el-form-item>
        <el-form-item label="isLock" :label-width="formLabelWidth">
          <el-radio v-model="contestForm.lock" :label="true">Lock</el-radio>
          <el-radio v-model="contestForm.lock" :label="false">UnLock</el-radio>
        </el-form-item>
        <el-form-item v-show="contestForm.lock" label="password" :label-width="formLabelWidth">
          <el-input
            placeholder="The max-length of password is ten."
            maxlength="10"
            v-model="contestForm.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item v-show="contestForm.always == false" label="startTime" :label-width="formLabelWidth">
          <el-date-picker v-model="contestForm.startTime" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item v-show="contestForm.always == false" label="endTime" :label-width="formLabelWidth">
          <el-date-picker v-model="contestForm.endTime" type="datetime" placeholder="选择日期时间" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave()">
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
    this.getContestList(1);
  },
  data() {
    return {
      itemTotal: 100,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      search: '',
      dialogFormVisible: false,
      contestForm: {
        name: '',
        always: true,
        lock: true,
        startTime: '',
        endTime: '',
        owner: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    checkTime(always, startTime, endTime) {
      if (always) {
        return true;
      }
      if (!(startTime instanceof Date)) {
        // eslint-disable-next-line no-param-reassign
        startTime = new Date(startTime);
      }
      if (!(endTime instanceof Date)) {
        // eslint-disable-next-line no-param-reassign
        endTime = new Date(endTime);
      }
      if (startTime === null || endTime == null) {
        this.$message.error('please check the time');
        return false;
      }
      if (startTime.getTime() - endTime.getTime() > 0) {
        this.$message.error('end time must be later than start time');
        return false;
      }
      return true;
    },
    handleEdit(scope) {
      this.dialogFormVisible = true;
      this.contestForm = scope.row;
    },
    handleDelete(form) {
      const { name } = form;
      api
        .deleteContest({
          name,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            this.getContestList(this.currentPage);
          }
        });
    },
    handleSave() {
      if (this.checkTime(this.contestForm.always, this.contestForm.startTime, this.contestForm.endTime)) {
        this.dialogFormVisible = false;
        api.editContest(this.contestForm).then(res => {
          const { data } = res;
          if (data.code === 1) {
            this.$message.success('Edit Success');
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.getContestList(val);
    },
    handleEditContestProblems(contestName) {
      this.$router.push({
        name: 'AdminContestProblems',
        params: { title: contestName },
      });
    },
    handleClick(scope) {
      console.log(scope);
    },
    getContestList(pageNum) {
      api
        .getContests({
          page: pageNum,
          size: 10,
          search: this.search,
        })
        .then(res => {
          let { data } = res;
          if (data.code === 1) {
            data = data.data;
            this.itemTotal = data.total;
            this.tableData = data.contestList;
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
