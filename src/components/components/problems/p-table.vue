<template>
  <div id="p-table">
    <el-table :data="tableInfo" style="width: 100%">
      <el-table-column prop="_id" label="#" width="120">
        <template slot-scope="scope">
          <router-link :to="{ name: 'ProblemDetail', params: {id: scope.row._id} }">{{ scope.row._id }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title">
        <template slot-scope="scope">
          <router-link :to="{ name: 'ProblemDetail', params: {id: scope.row._id} }">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="Level" width="120">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="medium" :type="tagType(scope.row)">{{ scope.row.difficulty }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="submission_number" label="Total" width="120"></el-table-column>
      <el-table-column prop="ac_rate" label="AC Rate" width="120"></el-table-column>
      <el-table-column prop="tags" label="Tags" width='120'>
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="medium">{{ scope.row.tagShow }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: {
    tableInfo: {
      type: Array,
      required: true,
    },
    tableLimit: {
      type: Number,
      default: 20,
    }
  },
  methods: {
    // 根据标签类型返回要渲染什么样式的标签的 type
    tagType(row) {
      let typeMap = {
        Low: 'success',
        Mid: 'warning',
        High: 'danger',
      }
      return typeMap[row.difficulty]
    },
    problemDetail(index, row) {
      this.setProblem(this.tableInfo[index])
    },
    ...mapMutations({
      setProblem: 'SET_PROBLEM',
    }),
  },
};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
  a
    &:hover
      color $color-font-theme
      text-decoration underline
</style>