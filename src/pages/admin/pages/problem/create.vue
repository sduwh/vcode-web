<template>
  <div id="create" class="create">
    <Edit :problem="problem" title="CreateProblem" @saveFunction="createProblem"></Edit>
  </div>
</template>

<script>
import Edit from 'pages/admin/pages/problem/edit';
import api from 'api/api';

export default {
  components: {
    Edit,
  },
  data() {
    return {
      problem: {
        originId: '',
      },
    };
  },
  methods: {
    createProblem(params) {
      api.createProblem(params).then(res => {
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
