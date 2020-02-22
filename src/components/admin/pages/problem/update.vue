<template>
 <div id="create" class="create">
   <Edit :cid='this.$route.params.id'></Edit>
 </div>
</template>

<script>
import Edit from "components/admin/pages/problem/edit"
export default{
  components: {
    Edit
  },
};
</script>

<style>
</style>