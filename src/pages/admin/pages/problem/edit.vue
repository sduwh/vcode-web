<template>
  <div>
    <div class="header">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="18">
          <div>{{ title }}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
    <div class="body">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Problem ID" prop="originId" label-width="150px">
              <el-input v-model="ruleForm.originId" placeholder="ID" maxlength="5" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="Problem Title" prop="title" label-width="150px">
              <el-input v-model="ruleForm.title" placeholder="Title" maxlength="50" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Time Limit(ms)" prop="timeLimit" label-width="150px">
              <el-input type="number" v-model="ruleForm.timeLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Memory limit(MB)" prop="memoryLimit" label-width="150px">
              <el-input type="number" v-model="ruleForm.memoryLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Difficulty" prop="difficulty" label-width="150px">
              <el-select v-model="ruleForm.difficulty" style="margin:-50px;">
                <el-option label="Low" value="Low"></el-option>
                <el-option label="Mid" value="Mid"></el-option>
                <el-option label="High" value="High"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="Visible" prop="Visible" style="margin-left:30px" label-width="60px">
              <el-switch v-model="ruleForm.visible"></el-switch>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item label="Share Submission" prop="ShareSubmission">
              <el-switch v-model="ruleForm.ShareSubmission"></el-switch>
            </el-form-item>
          </el-col> -->
          <el-col :span="16">
            <el-form-item label="Language" prop="language">
              <el-checkbox-group v-model="ruleForm.choiceLanguages">
                <el-checkbox
                  v-for="language in ruleForm.languages"
                  :key="language"
                  :label="language"
                  :name="language"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="Description" prop="description" label-width="150px">
            <Markdown v-model="ruleForm.description" :height="400" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Input Description" prop="input" label-width="150px">
            <Markdown v-model="ruleForm.input" :height="400" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Output Description" prop="output" label-width="150px">
            <Markdown v-model="ruleForm.output" :height="400" />
          </el-form-item>
        </el-row>
        <el-row style="border:1px solid #eee">
          <h2 style="height:100%; font-size:18px; margin-top:20px; color:#606266; text-align:center">
            Samples
          </h2>
          <el-divider></el-divider>
          <el-row style="margin:10px;" :gutter="20">
            <el-col :span="12">
              <el-form-item
                v-for="(_input, index) in ruleForm.sampleInput"
                :label="'Input Sample' + (index + 1)"
                :key="index"
                :prop="'sampleInput.' + index"
                :rules="{
                  required: true,
                  message: '请输入input',
                  trigger: 'blur',
                }"
              >
                <el-input type="textarea" :rows="3" placeholder="Input Samples" v-model="ruleForm.sampleInput[index]">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-for="(_output, index) in ruleForm.sampleOutput"
                :label="'Output Sample' + (index + 1)"
                :key="index"
                :prop="'sampleOutput.' + index"
                :rules="{
                  required: true,
                  message: '请输入output',
                  trigger: 'blur',
                }"
              >
                <el-input type="textarea" :rows="3" placeholder="Output Samples" v-model="ruleForm.sampleOutput[index]">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center; margin: 20px">
            <el-button type="primary" style="width:40%" plain @click="addSample">Add New Sample</el-button>
            <el-button type="warning" style="width:40%" plain @click="deleteSample">
              Delete Last Sample
            </el-button>
          </el-row>
        </el-row>
        <el-row style="margin-top: 25px">
          <el-form-item label="Hint" prop="hint">
            <Markdown v-model="ruleForm.hint" :height="400" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Source" prop="Source">
            <el-input v-model="ruleForm.source"></el-input>
          </el-form-item>
        </el-row>
        <!-- 此功能延后 -->
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="Type" prop="Type">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="ACM"></el-radio>
                <el-radio label="OI"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row v-if="ruleForm.origin === 'VCODE'">
          <el-col :span="6">
            <el-form-item label="TestCase" prop="TestCase">
              <el-upload
                class="upload-demo"
                multiple
                :action="uploadUrl"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :on-exceed="handleOnExceed"
                :on-remove="handleOnRemove"
                :limit="1"
                :headers="uploadHeaders"
              >
                <el-button size="small" type="primary">upload</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 此功能延后 -->
        <!-- <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="IOMode" prop="IOMode">
              <el-radio-group v-model="ruleForm.IOMode" @click="showFileIO">
                <el-radio label="Standard IO"></el-radio>
                <el-radio label="File IO"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="showFileIO">
            <el-form-item label="InputFileName" prop="InputFileName">
              <el-input v-model="ruleForm.InputFileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="showFileIO">
            <el-form-item label="outputFileName" prop="outputFileName">
              <el-input v-model="ruleForm.OutputFileName"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div class="button-area">
        <el-button type="primary" @click="submitForm('ruleForm')">
          Save
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { testCaseUploadAPI } from 'api/config';
import Markdown from 'vue-meditor';

export default {
  created() {
    if (this.problem.originId !== '') {
      const difficultMap = {
        0: 'Low',
        1: 'Mid',
        2: 'High',
      };
      this.ruleForm = this.problem;
      this.ruleForm.originId = this.ruleForm.originId.slice(
        this.ruleForm.origin.length + 1,
        this.ruleForm.originId.length
      );
      this.ruleForm.difficulty = difficultMap[this.ruleForm.difficulty];
    }
  },
  components: {
    Markdown,
  },
  props: {
    problem: {
      type: Object,
      required: true,
      default: {},
    },
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.problem);
  },
  data() {
    return {
      uploadUrl: testCaseUploadAPI,
      uploadHeaders: { Authorization: this.$store.state.user.token },
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        origin: 'VCODE',
        title: '',
        originId: '',
        description: '',
        input: '',
        output: '',
        hint: '',
        timeLimit: '1000',
        memoryLimit: '256',
        difficulty: 'Low',
        visible: true,
        // ShareSubmission: false,
        languages: ['C', 'C++', 'JAVA', 'PYTHON3', 'GO'],
        choiceLanguages: [],
        source: '',
        // type: 'ACM',
        // IOMode: 'Standard IO',
        // InputFileName: 'input.txt',
        // OutputFileName: 'output.txt',
        sampleInput: [''],
        sampleOutput: [''],
        testCaseId: '',
      },
      rules: {
        originId: [
          {
            required: true,
            message: 'Please Input Problem ID',
            trigger: 'blur',
          },
        ],
        title: [
          {
            required: true,
            message: 'Please Input Problem Title',
            trigger: 'blur',
          },
        ],
        description: [{ required: true }],
        input: [{ required: true }],
        output: [{ required: true }],
        timeLimit: [
          {
            required: true,
            message: 'Please Input Time Limit',
            trigger: 'blur',
          },
        ],
        memoryLimit: [
          {
            required: true,
            message: 'Please Input Memory Limit',
            trigger: 'blur',
          },
        ],
        languages: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one language',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs[formName].model.origin === 'VCODE' && this.$refs[formName].model.testCaseId === '') {
            this.$message.error('please upload test case file');
          } else {
            const difficultMap = {
              Low: 0,
              Mid: 1,
              High: 2,
            };
            const { difficulty } = this.$refs[formName].model;
            const problem = this.$refs[formName].model;
            problem.difficulty = difficultMap[difficulty];
            problem.author = 'admin';
            if (problem.origin !== 'VCODE') {
              problem.testCaseId = '';
            }
            this.$emit('saveFunction', problem);
          }
        } else {
          this.$message.error('check the input data');
        }
      });
    },
    addSample() {
      this.ruleForm.sampleInput.push('');
      this.ruleForm.sampleOutput.push('');
    },
    deleteSample() {
      this.ruleForm.sampleInput.pop();
      this.ruleForm.sampleOutput.pop();
    },

    // upload file
    handleUploadSuccess(response) {
      if (response.code === 1) {
        const { data } = response;
        this.ruleForm.testCaseId = data.testCaseId;
      } else {
        this.$message.error('upload file error');
      }
    },
    handleUploadError(err) {
      this.$message.error(err);
    },
    handleOnExceed() {
      this.$message.error('the files number limit 1, please remove ohter files');
    },
    handleOnRemove() {
      this.ruleForm.testCaseId = '';
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
