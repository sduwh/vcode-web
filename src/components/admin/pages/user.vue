<template>
  <div>
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="16">
          <div>用户列表</div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            v-model="search">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider"></el-divider>
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(
          data => !search || data.title.toLowerCase().includes(search))"
      style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="Account" prop="account"></el-table-column>
      <el-table-column label="Nickname" prop="name"></el-table-column>
      <el-table-column label="CreateTime" prop="name"></el-table-column>
      <el-table-column label="Email" prop="name"></el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button size="mini" @click="dialogFormVisible = true"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="width:100%;" class="pagination">
        <el-pagination class="page"
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

    <el-dialog title="User" :visible.sync="dialogFormVisible">
      <el-form :model="userForm">
        <el-form-item label="Nickname" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Permissions" :label-width="formLabelWidth">
          <el-select
            v-model="userForm.value1"
            multiple
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in userForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemTotal: 100,
      tableData: [
        {
          account: '2016-05-02',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1518 弄',
        },
        {
          account: '2016-05-04',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1517 弄',
        },
        {
          account: '2016-05-01',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1519 弄',
        },
        {
          account: '2016-05-03',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1516 弄',
        },
        {
          account: '2016-05-02',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1518 弄',
        },
        {
          account: '2016-05-04',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1517 弄',
        },
        {
          account: '2016-05-01',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1519 弄',
        },
        {
          account: '2016-05-02',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1518 弄',
        },
        {
          account: '2016-05-02',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1518 弄',
        },
        {
          account: '2016-05-02',
          name: '王小虎',
          permissions: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      search: '',
      dialogFormVisible: false,
      userForm: {
        name: '',
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
        value1: [],
        value2: [],
      },
      formLabelWidth: '120px',
      currentPage:1,
      pagesize:10,
      multipleSelection: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1);
    },
    handleCurrentChange: val => {
      // Todo: 调用api获取User列表
      console.log(val);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(multipleSelection);
    }
  },
};
</script>

<style scoped>
.page{
  text-align: right;
}
.divider{
  margin: 10px 0;
}
.pagination{
  margin-top: 20px;
}
</style>
