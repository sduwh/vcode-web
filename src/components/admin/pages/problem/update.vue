<template>
  <div id="create" class="create">
    <Edit
      :problemOriginId="this.$route.params.id"
      title="EditProblem"
      @saveFubction="updateProblem"
    ></Edit>
  </div>
</template>

<script>
import Edit from 'components/admin/pages/problem/edit';

export default {
  components: {
    Edit,
  },
  methods: {
    updateProblem(params) {
      console.log('update');
      console.log(params);
    },
  },
};
</script>

<style></style>
