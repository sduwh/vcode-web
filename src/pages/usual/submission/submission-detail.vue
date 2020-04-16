<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="submissionDetailForm">
      <el-form-item label="Id">
        {{ submissionDetailForm.hex }}
      </el-form-item>
      <el-form-item label="Problem">
        {{ submissionDetailForm.problemOriginId }}
      </el-form-item>
      <el-form-item label="ProblemTitle">
        {{ submissionDetailForm.problemTitle }}
      </el-form-item>
      <el-form-item label="Time">
        {{
          submissionDetailForm.time !== undefined && submissionDetailForm.time > 0 ? submissionDetailForm.time : 'N/A'
        }}
      </el-form-item>
      <el-form-item label="Memory">
        {{
          submissionDetailForm.memory !== undefined && submissionDetailForm.memory > 0
            ? submissionDetailForm.memory
            : 'N/A'
        }}
      </el-form-item>
      <el-form-item label="Result">
        <el-tag v-if="submissionDetailForm.result === 5">Padding</el-tag>
        <el-tag v-else-if="submissionDetailForm.result === 1" type="success">Success</el-tag>
        <el-tag v-else-if="submissionDetailForm.result === 3" type="danger">MemoryLimit</el-tag>
        <el-tag v-else-if="submissionDetailForm.result === 2" type="danger">TimeLimit</el-tag>
        <el-tag v-else-if="submissionDetailForm.result === 6" type="danger">Compile Error</el-tag>
        <el-tag v-else-if="submissionDetailForm.result === 4" type="danger">Unknown Error</el-tag>
        <el-tag v-else type="danger">Error Answer</el-tag>
      </el-form-item>
      <el-form-item label="Result Info">
        {{ submissionDetailForm.resultMessage }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from 'api/api';

export default {
  name: 'problem-submission-detail',
  props: {
    hex: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.showSubmissionDetail(this.hex);
  },
  data() {
    return {
      submissionDetailForm: {
        problemOriginId: '',
        problemTitle: '',
        time: '',
        memory: '',
        result: '',
        resultMessage: '',
        hex: '',
      },
    };
  },
  methods: {
    showSubmissionDetail(hex) {
      api
        .getSubmissionDetail({
          submissionIdHex: hex,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const submissionData = data.data;
            this.submissionDetailForm = submissionData.submission;
            this.dialogVisible = true;
          }
        });
    },
  },
  watch: {
    hex(newValue) {
      this.showSubmissionDetail(newValue);
    },
  },
};
</script>

<style scoped></style>
