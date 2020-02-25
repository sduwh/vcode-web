<template>
  <div>
    <div class="header">
      <div class="theader">
        <el-row
          style="height:100%; font-size:18px; color:grey; line-height:38px"
        >
          <el-col :span="18">
            <div>About</div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="body">
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="rules"
        label-position="left"
      >
        <el-row>
          <el-form-item prop="doc">
            <MarkdownPro v-model="dataForm.doc"></MarkdownPro>
          </el-form-item>
        </el-row>
        <el-form-item>
          <div class="button-area">
            <el-button style="width:140px" @click="resetForm('dataForm')">
              Reset Form
            </el-button>
            <el-button
              style="width:140px"
              type="primary"
              @click="submitForm('dataForm')"
              >Update</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from 'api/api';
import { MarkdownPro } from 'vue-meditor';

export default {
  components: {
    MarkdownPro,
  },
  mounted() {
    api.getAbout().then(res => {
      if (res.data.code === 1) {
        this.dataForm.doc = res.data.data;
      } else {
        this.$message.error('Some error occurred here');
      }
    });
  },
  data() {
    return {
      dataForm: {
        doc: '',
      },
      rules: {
        doc: [{ required: true }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.editAbout(this.$refs[formName].model).then(res => {
            if (res.data.code === 1) {
              this.$message.success('update success');
            } else {
              this.$message.error('update error');
            }
          });
        } else {
          this.$message.error('Check the input data');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updateEditorValue(valueName, newValue) {
      this.dataForm[valueName] = newValue;
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
