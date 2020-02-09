<template>
  <div>
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="18">
          <div>题目列表</div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="mytable">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="150%">
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="150%">
        </el-table-column>
        <el-table-column
          prop="author"
          label="Author"
          width="200%">
        </el-table-column>
        <el-table-column
          prop="time"
          label="Create Time"
          width="250%">
        </el-table-column>
        <el-table-column
          label="Visible"
          width="200%">
          <template slot-scope="scope">
             <el-switch
              v-model="scope.row.status"
              active-color="##13ce66"
              inactive-color="#13ce66"
              @change="change(scope.$index, scope.row)">
            </el-switch>
          </template>        
        </el-table-column>
        <el-table-column
          label="Operation"
          width="250%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:100%;">
        <el-pagination class="page"
          background
          width="40%"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          :total="tableData.length"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>  
    </div>  
  </div>  
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },
          {
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          }
          ,{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          },{
            id: '1001',
            title: '最大子序和',
            author: 'lsh',
            time: '2019-4-23 22:05:47',
            value: true
          }],
          currentPage:1,
          pagesize:10,
        }
      },
      methods: {
            handleSizeChange(val) {
              this.pagesize = val
              this.tableData = this.allData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
              this.totalCount = this.allData.length
            },
            handleCurrentChange(val) {
              this.currentPage = val
              this.tableData = this.allData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
              this.totalCount = this.allData.length
            },
          }
    }
  </script>

<style scoped>
.page{
  text-align: right;
}

</style>