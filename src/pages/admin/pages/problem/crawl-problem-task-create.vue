<template>
  <el-dialog title="Create Task" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="OJ" prop="oj">
        <el-select v-model="ruleForm.oj" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Key" prop="key">
        <el-input type="text" v-model="ruleForm.key" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from 'api/api';

export default {
  name: 'crawl-problem-task-create',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    api.getOJList().then(res => {
      const { data } = res;
      if (data.code === 1) {
        let ojList = data.data;
        this.options = [];
        for (let i = 0; i < ojList.length; i++) {
          if (ojList[i] === 'VCODE') {
            continue;
          }
          this.options.push({
            value: ojList[i],
            label: ojList[i],
          });
        }
      }
    });
  },
  data() {
    const validateOJ = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please select one OJ origin'));
      } else {
        callback();
      }
    };
    const validateKey = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input Key'));
      } else {
        callback();
      }
    };
    return {
      options: [],
      reloadList: true,
      ruleForm: {
        oj: '',
        key: '',
      },
      rules: {
        oj: [{ validator: validateOJ, trigger: 'blur' }],
        key: [{ validator: validateKey, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.createCrawlTask(this.ruleForm).then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.$refs[formName].resetFields();
              this.$emit('update:dialogVisible', false);
              this.$emit('update:reloadList', false);
              this.$nextTick(() => {
                this.$emit('update:reloadList', true);
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose() {
      this.$confirm('Sure you want to close this page.')
        .then(_ => {
          this.$refs['ruleForm'].resetFields();
          this.$emit('update:dialogVisible', false);
        })
        .catch(_ => {});
    },
  },
};
</script>

<style scoped></style>
