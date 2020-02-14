<template>
  <div id="v-admin" class="v-admin" style="background: rgb(244,244,245)">
    <el-container style="height:100%">
      <el-aside style="height:100%; background: #fff;" width="200px">
        <AdminAside></AdminAside>
      </el-aside>
      <el-container>
        <el-header style="background: #545c64">
          <AdminHeader></AdminHeader>
        </el-header>
        <el-main style="margin:20px; background: #FFF">
          <AdminMain></AdminMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminAside from 'components/admin/container/admin-aside';
import AdminHeader from 'components/admin/container/admin-header';
import AdminMain from 'components/admin/container/admin-main';

export default {
  components: {
    AdminAside,
    AdminHeader,
    AdminMain,
  },
};
</script>

<style scoped>
.v-admin {
  height: 100%;
}
</style>
