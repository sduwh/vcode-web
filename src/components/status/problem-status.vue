<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed label="日期" width="115">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="语言" width="100">
      <template slot-scope="scope">
        {{ scope.row.language }}
      </template>
    </el-table-column>
    <el-table-column label="执行用时" width="100">
      <template slot-scope="scope">
        {{ scope.row.usedTime }}
      </template>
    </el-table-column>
    <el-table-column label="内存占用" width="100">
      <template slot-scope="scope">
        {{ scope.row.usedMemory }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="提交结果" width="100">
      <template slot-scope="scope">
        {{ scope.row.result }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          language: 'language',
          usedTime: 'Time',
          usedMemory: 'Memory',
          result: 'result',
        },
        {
          date: '2016-05-02',
          language: 'language',
          usedTime: 'Time',
          usedMemory: 'Memory',
          result: 'result',
        },
        {
          date: '2016-05-02',
          language: 'language',
          usedTime: 'Time',
          usedMemory: 'Memory',
          result: 'result',
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
