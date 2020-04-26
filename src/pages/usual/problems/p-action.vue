<template>
  <div id="p-action">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Action</span>
        <el-button style="float: right; padding: 3px 0" type="text">Reset</el-button>
      </div>
      <el-form label-width="70px" :label-position="labelPosition" size="small">
        <el-form-item label="Search">
          <el-input v-model="search" placeholder="Key Word"></el-input>
        </el-form-item>
        <el-form-item label="Difficulty">
          <el-select v-model="level" placeholder="difficulty">
            <el-option
              v-for="(level, index) in actionInfo.difficulty"
              :key="index"
              :label="level"
              :value="level"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="searchProblem">Search</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['actionInfo'],
  data() {
    return {
      search: '',
      level: 'all',
      labelPosition: 'right',
    };
  },
  methods: {
    searchProblem() {
      const levelMap = {
        all: 0,
        low: 1,
        mid: 2,
        high: 3,
      };
      let actionData = {
        search: this.search,
        level: levelMap[this.level],
      };
      this.$emit('searchProblem', actionData);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

#p-action {
  width: 100%;

  .box-card {
    width: 100%;
  }

  span {
    vertical-align: middle;
    font-size: $font-size-medium;
  }

  .el-button {
    font-size $font-size-regular-m
  }
}
</style>
