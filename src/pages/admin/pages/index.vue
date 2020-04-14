<template>
  <div>
    <div class="card-area">
      <el-row :gutter="20" class="card-row">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Problem</span>
                <el-button style="float: right; padding: 3px 0" type="text">Manage</el-button>
              </div>
              <div class="text item">
                <el-form ref="problemForm" :model="problemForm" label-width="120px">
                  <el-form-item label="Support OJ">
                    <span v-for="oj in problemForm.ojList" :key="oj">
                      <el-tag style="margin-right:10px">{{ oj }}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="Problem Total"> {{ problemForm.problemTotal }}</el-form-item>
                  <el-form-item label="Submission">
                    {{ problemForm.submissionTotal }}
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>User</span>
                <el-button style="float: right; padding: 3px 0" type="text">Manage</el-button>
              </div>
              <div class="text item">
                <el-form ref="userForm" :model="userForm" label-width="120px">
                  <el-form-item label="User Total">
                    {{ userForm.userTotal }}
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  mounted() {
    this.getIndexData();
  },
  data() {
    return {
      problemForm: {
        ojList: [],
        problemTotal: 0,
        submissionTotal: 0,
      },
      userForm: {
        userTotal: 0,
      },
      form: {},
    };
  },
  methods: {
    /**
     * get admin index page data
     */
    getIndexData() {
      api.getAdminIndex().then(res => {
        const { data } = res;
        if (data.code === 1) {
          const indexData = data.data;
          this.problemForm = indexData.problemForm;
          this.userForm = indexData.userForm;
        }
      });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  min-height: 180px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.card-area {
  width: 100%;
}

.card-row {
  margin-bottom: 20px;
}
</style>
