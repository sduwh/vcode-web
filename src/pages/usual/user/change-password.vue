<template>
  <div id="user-edit-info" class="user-edit">
    <CenterWrap :title="title">
      <template #table>
        <div class="edit-body">
          <el-page-header @back="goBack" content="Reset Password" title="Back"></el-page-header>
          <div class="edit-form">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="150px"
              class="edit-form-body"
            >
              <el-form-item label="Old Password" prop="oldPass">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="New Password" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Check Password" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </CenterWrap>
  </div>
</template>

<script>
import CenterWrap from './center-wrap';
import api from 'api/api';

export default {
  components: {
    CenterWrap,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Passwords don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      title: 'User Center',
      userInfo: {
        account: this.$store.state.user.account,
        nickname: this.$store.state.user.nickname,
        email: this.$store.state.user.email,
      },
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  methods: {
    changePassword() {
      this.$router.push('/user/change-password');
    },
    editUserInfo() {
      this.$router.push('/user/edit');
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.resetPassword(this.ruleForm).then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.$message.success('Reset password info success');
              this.$router.push('/user/center');
            } else {
              this.$message.error(data.message);
            }
          });
        } else {
          this.$message.error('Check the form data');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.push('/user/center');
    },
  },
};
</script>

<style scoped>
.user-edit {
  box-sizing: border-box;
  padding: 0 50px 20px;
}

.edit-body {
  padding-left: 25px;
  padding-right: 20px;
}

.edit-form {
  width: 95%;
  display: flex;
  justify-content: center;
}

.edit-form-body {
  width: 40%;
}

.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>
