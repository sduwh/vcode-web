<template>
  <div id="sign-in" class="login-div">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="login-form">
      <el-form-item><span class="login-title">Sign In</span></el-form-item>
      <el-form-item label="Account" prop="account">
        <el-input type="text" v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Verify password" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Sign In</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        account: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            account: this.ruleForm.account,
            password: this.ruleForm.pass,
            rePassword: this.ruleForm.checkPass,
          };
          api.signIn(params).then(res => {
            let { data } = res;
            if (data.code === 1) {
              data = data.data;
              this.$store.commit('user/setUserInfo', data);
              this.$store.commit('user/setToken', data.token);
              this.$store.commit('user/setLoginStatus', true);
              this.$router.push('/home');
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-div {
  display: flex;
  justify-content: center;
}

.login-form {
  width: 30%;
}

.login-title {
  font-size: 26px;
}
</style>
