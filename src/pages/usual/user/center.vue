<template>
  <div id="user-center" class="user-center">
    <CenterWrap :title="title" class="center-wrap">
      <template #table>
        <div class="body-card" style="margin-top: 50px">
          <el-card class="info-card">
            <div class="info-card-item">
              <span class="info-card-title">Account</span>
              <span class="info-card-info">
                {{ userInfo.account }}
              </span>
            </div>
            <div class="info-card-item">
              <span class="info-card-title">Nickname</span>
              <span class="info-card-info"> {{ userInfo.nickname }}</span>
            </div>
            <div class="info-card-item">
              <span class="info-card-title">Email</span>
              <span class="info-card-info"> {{ userInfo.email }}</span>
            </div>
            <div class="info-card-button">
              <el-button plain @click="changePassword">
                Reset password
              </el-button>
              <el-button type="primary" plain @click="editUserInfo">
                Edit
              </el-button>
            </div>
          </el-card>
          <el-card class="info-card" style="width:25%">
            <p class="words">
              愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能
              做事的做事，能发声的发声。有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。
            </p>
            <br />
            <p class="signature">——鲁迅先生</p>
          </el-card>
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
  mounted() {
    api.getUserInfo().then(res => {
      const { data } = res;
      if (data.code === 1) {
        const userData = data.data;
        this.$store.commit('user/setUserInfo', userData.user);
        this.$store.commit('user/setPermissions', userData.user);
        this.$store.commit('user/setRole', userData.user);
        this.userInfo = userData.user;
      }
    });
  },
  data() {
    return {
      title: 'User Center',
      userInfo: {
        account: this.$store.state.user.account,
        nickname: this.$store.state.user.nickname,
        email: this.$store.state.user.email,
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
  },
};
</script>

<style scoped>
.user-center {
  box-sizing: border-box;
  padding: 0 50px 20px;
  min-height: 400px;
}

.body-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info-card {
  width: 55%;
}

.info-card-item {
  width: 100%;
  font-size: 18px;
  margin-top: 5px;
  height: 30px;
}

.info-card-title {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-right: 5px;
  height: 100%;
  font-weight: bold;
}

.info-card-info {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 100%;
  font-size: 15px;
}

.info-card-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-right: 20px;
}

.words {
  text-indent: 2em;
  line-height: 1.5;
}

.signature {
  display: flex;
  justify-content: flex-end;
}
</style>
