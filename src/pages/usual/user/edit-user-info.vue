<template>
  <div id="user-edit-info" class="user-edit">
    <CenterWrap :title="title">
      <template #table>
        <div class="edit-body">
          <el-page-header @back="goBack" content="Edit Data" title="Back"></el-page-header>
          <div class="edit-form">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="edit-form-body"
            >
              <el-form-item label="昵称" prop="nickname">
                <el-input type="text" v-model="ruleForm.nickname" maxlength="12" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary" @click="submitForm('ruleForm')">
                  保存
                </el-button>
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
    const validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
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
        nickname: this.$store.state.user.nickname,
        email: this.$store.state.user.email,
      },
      rules: {
        nickname: [{ validator: validateNickname, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
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
          api.editUserInfo(this.ruleForm).then(res => {
            const { data } = res;
            if (data.code === 1) {
              this.$message.success('Edit user info success');
              this.ruleForm.account = this.$store.state.user.account;
              this.$store.commit('user/setUserInfo', this.ruleForm);
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
