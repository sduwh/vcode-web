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
        <el-tag :type="localSubmitTagMap(submissionDetailForm.result)">
          {{ localSubmitStatusMap(submissionDetailForm.result) }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Code">
        <pre v-highlightjs>
          <code v-html="submissionDetailForm.code"> </code>
        </pre>
      </el-form-item>
      <el-form-item label="Result Info" class="result-content">
        {{ submissionDetailForm.resultMessage }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from 'api/api';
import { submitStatusMap, submitTagMap } from 'util/submitUtil';

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
    localSubmitTagMap(status) {
      return submitTagMap(status);
    },
    localSubmitStatusMap(status) {
      return submitStatusMap(status);
    },
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

<style scoped>
.result-content {
  width: 100%;
  white-space: normal;
  line-height: 20px;
  word-wrap:break-word;
  word-break:break-all;
}
</style>
