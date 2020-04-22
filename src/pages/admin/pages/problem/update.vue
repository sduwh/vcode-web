<template>
  <div id="create" class="create">
    <Edit :problem="problem" title="EditProblem" @saveFunction="updateProblem"></Edit>
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
      problem: JSON.parse(this.$route.params.problem),
    };
  },
  methods: {
    updateProblem(params) {
      api.updateProblem(params).then(res => {
        if (res.data.code === 1) {
          this.$message.success('update success');
          this.$router.push({
            name: this.$route.params.backUrlName === undefined ? 'AdminIndex' : this.$route.params.backUrlName,
          });
        } else {
          this.$message.error('update error');
        }
      });
    },
  },
};
</script>

<style></style>
