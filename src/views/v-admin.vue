<template>
  <div id="v-admin" class="v-admin">
    <el-container style="height:100%">
      <el-aside style="height:100%" width="200px">
        <AdminAside></AdminAside>
      </el-aside>
      <el-container>
        <el-header style="background: #545c64;">
          <AdminHeader></AdminHeader>
        </el-header>
        <el-main>
          <AdminMain></AdminMain>
        </el-main>
        <el-footer style="height:120px">
          <AdminFooter></AdminFooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "components/admin/container/admin-aside";
import AdminFooter from "components/admin/container/admin-footer";
import AdminHeader from "components/admin/container/admin-header";
import AdminMain from "components/admin/container/admin-main";

export default {
  components: {
    AdminAside,
    AdminFooter,
    AdminHeader,
    AdminMain
  }
};
</script>

<style scoped>
.v-admin {
  height: 100%;
}
</style>
