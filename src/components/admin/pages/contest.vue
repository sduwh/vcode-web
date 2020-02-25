<template>
  <div>
    <div class="header">
      <div class="theader">
        <el-row
          style="height:100%; font-size:18px; color:grey; line-height:38px"
        >
          <el-col :span="18">
            <div>Create Contest</div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="body">
      <el-form
        ref="contestForm"
        :model="contestForm"
        :rules="rules"
        label-width="140px"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="Contest Title" prop="name">
              <el-input
                v-model="contestForm.name"
                placeholder="Title"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item
              label="Lock"
              prop="isLock"
              style="margin-left:80px"
              label-width="60px"
            >
              <el-switch v-model="contestForm.isLock"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Keep Open" label-width="90px" prop="always">
              <el-switch v-model="contestForm.always"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="margin-left:50px"
          v-show="contestForm.isLock"
        >
          <el-form-item label="Password" label-width="90px" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="contestForm.password"
              autocomplete="off"
              show-password
              style="width: 220px"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row
          :gutter="20"
          style="margin-left:50px"
          v-show="contestForm.always === false"
        >
          <el-form-item label="Start Time" label-width="90px" prop="startTime">
            <el-date-picker
              v-model="contestForm.startTime"
              type="datetime"
              placeholder="Start Time"
            />
          </el-form-item>
          <el-form-item label="End Time" label-width="90px" prop="endTime">
            <el-date-picker
              v-model="contestForm.endTime"
              type="datetime"
              placeholder="End Time"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Description" prop="description">
            <tinymce-editor
              ref="editor"
              valueName="description"
              :value="contestForm.description"
              @input="updateEditorValue"
            >
            </tinymce-editor>
          </el-form-item>
        </el-row>
        <el-form-item>
          <div class="button-area">
            <el-button style="width:140px" @click="resetForm('contestForm')"
              >Reset Form</el-button
            >
            <el-button
              style="width:140px"
              type="primary"
              @click="submitForm('contestForm')"
              >Create</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import TinymceEditor from './problem/tinymce-editor/tinymce-editor';
import api from 'api/api';

export default {
  components: {
    TinymceEditor,
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (value === null && this.contestForm.always === false) {
        callback(new Error('Please check the start time'));
      } else {
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      if (value === null && this.contestForm.always === false) {
        callback(new Error('Please check the end time'));
      } else if (this.contestForm.startTime === null) {
        this.$refs.contestForm.validateField('startTime');
        callback();
      } else if (this.contestForm.startTime.getTime() - value.getTime() > 0) {
        callback(new Error('end time must be later than start time'));
      } else {
        callback();
      }
    };
    return {
      contestForm: {
        name: '',
        isLock: true,
        always: true,
        password: '',
        startTime: null,
        endTime: null,
        description: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input contest title',
            trigger: 'blur',
          },
        ],
        startTime: [{ validator: validateStartTime, trigger: 'blur' }],
        endTime: [{ validator: validateEndTime, trigger: 'blur' }],
        description: [{ required: true }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = this.$refs[formName].model;
          form.ownerAccount = 'admin';
          api.createContest(form).then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.$message({
                message: 'Create Contest Success',
                type: 'success',
              });
              this.$refs[formName].resetFields();
              this.$router.push({ name: 'AdminContestList' });
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
      this.contestForm[valueName] = newValue;
    },
  },
  watch: {
    'contestForm.isAlways': function(oldV, newV) {
      if (newV === false) {
        this.contestForm.startTime = null;
        this.contestForm.endTime = null;
      }
    },
    'contestForm.lock': function(oldV, newV) {
      if (newV === false) {
        this.contestForm.password = '';
      }
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
