<template>
  <div id="create" class="create">
    <Edit
      problemOriginId=""
      title="CreateProblem"
      @saveFubction="createProblem"
    ></Edit>
  </div>
</template>

<script>
import Edit from 'components/admin/pages/problem/edit';
import api from 'api/api';

export default {
  components: {
    Edit,
  },
  methods: {
    createProblem(params) {
      api.createProblem(params).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.$message.success('create success');
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style></style>
