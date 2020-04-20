<template>
  <el-dialog title="Task Detail" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="showTask" label-width="100px">
      <el-form-item label="Id">
        {{ showTask.hex }}
      </el-form-item>
      <el-form-item label="Task Id">
        {{ showTask.taskId }}
      </el-form-item>
      <el-form-item label="OJ">
        {{ showTask.oj }}
      </el-form-item>
      <el-form-item label="Key">
        {{ showTask.key }}
      </el-form-item>
      <el-form-item label="Result">
        <el-tag :type="statusMap(showTask.result)"> {{ showTask.result }} </el-tag>
      </el-form-item>
      <el-form-item label="Message">
        {{ showTask.message }}
      </el-form-item>
      <el-form-item label="Create Time">
        {{ new Date(showTask.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
      </el-form-item>
      <el-form-item label="Author">
        {{ showTask.author }}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClone">Clone</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { crawlStatusMap } from 'util/crawlUtil';

export default {
  name: 'crawl-problem-task-detail',
  props: {
    showTask: {
      type: Object,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleClone() {
      this.$confirm('Sure you want to clone this task.')
        .then(_ => {
          this.$emit('cloneTask', this.showTask);
          this.$emit('update:dialogVisible', false);
        })
        .catch(_ => {});
    },
    handleClose(){
      this.$emit('update:dialogVisible', false);
    },
    statusMap(status) {
      return crawlStatusMap(status);
    },
  },
};
</script>

<style scoped></style>
