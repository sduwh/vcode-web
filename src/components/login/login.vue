<template>
  <div id="login" class="login-div">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-form"
    >
      <el-form-item><span class="login-title">登录</span></el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          提交
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      // 检查密码
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度小于6'));
      } else {
        callback();
      }
    };
    const validateAccount = (rule, value, callback) => {
      // 检查账号
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        account: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 登录
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            account: this.ruleForm.account,
            password: this.ruleForm.pass,
          };
          api.login(params).then(res => {
            let { data } = res;
            if (data.code === 1) {
              data = data.data;
              this.$store.commit('user/setUserInfo', data.user);
              this.$store.commit('user/setToken', data.token);
              this.$store.commit('user/setLoginStatus', true);
              this.$store.commit('user/setPermissions', data.user);
              this.$store.commit('user/setRole', data.user);
              this.$router.push('/home');
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    },
    resetForm(formName) {
      // 重置表单
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
