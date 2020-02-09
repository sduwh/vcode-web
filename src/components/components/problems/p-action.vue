<template>
  <div id="p-action">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Action</span>
        <el-button style="float: right; padding: 3px 0" type="text">Reset</el-button>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
      <!-- difficulty, search, tags, mode[recommend, upgrade, challenge] -->
      <el-form label-width="70px" :label-position="labelPosition" size="small">
        <el-form-item label="搜索">
          <el-input v-model="search" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item label="难度">
          <el-select v-model="level" placeholder="难度">
            <el-option v-for="(level, index) in actionInfo.difficulty" :key="index" :label="level" :value="level"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模式">
          <el-select v-model="mode" placeholder="模式">
            <el-option v-for="(mode, index) in actionInfo.mode" :key="index" :label="mode" :value="mode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-switch v-model="label"></el-switch>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["actionInfo"],
  data() {
    return {
      search: '',
      level: '',
      mode: '',
      label: '',
      labelPosition: 'right',
    };
  },
};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
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