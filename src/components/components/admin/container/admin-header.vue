<template>
  <div id="header" class="header">
    <el-row style="height:100%;">
      <el-col :span="12" class="header-icon">
      </el-col>
      <el-col :span="12" class="header-user">
        <div>nickname</div>
        <div>logout</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  height: 100%;
}
.header-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.header-user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.header-user div {
  margin-right: 10px;
}
</style>
