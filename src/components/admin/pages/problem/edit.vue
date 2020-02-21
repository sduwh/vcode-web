<template>
  <div>
    <div class="header">
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="18">
          <div>编辑题目</div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    </div>
    <div class="body">
      <el-form ref="form" 
      :model="ruleForm" 
      :rules="rules" 
      class="demo-ruleForm"
      label-width="140px"
      label-position="left"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item 
            label="Problem ID"
            prop="ID"
            >
              <el-input
                v-model="cid"
                placeholder="ID"
                maxlength="5"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item 
            label="Problem Title"
            prop="Title"
            >
              <el-input
                v-model="ruleForm.Title"
                placeholder="Title"
                maxlength="20"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item 
            label="Time Limit(ms)"
            prop="TimeLimit"
            >
              <el-input 
              type="number"
              v-model="ruleForm.TimeLimit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item 
            label="Memory limit(MB)"
            prop="MemoryLimit"
            >
              <el-input 
              type="number"
              v-model="ruleForm.MemoryLimit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item 
            label="Difficulty"
            prop="Difficulty"
            >
              <el-select v-model="ruleForm.Difficulty">
                <el-option label="Low" value="Low"></el-option>
                <el-option label="Mid" value="Mid"></el-option>
                <el-option label="High" value="High"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item 
            label="Visible"
            prop="Visible"
            style="margin-left:30px"
            label-width="60px"
            >
              <el-switch v-model="ruleForm.Visible"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item 
            label="Share Submission"
            prop="ShareSubmission"
            >
              <el-switch v-model="ruleForm.ShareSubmission"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item 
            style="margin-left:30px"
            label-width="60px"
            label="Tags"
            prop="Tags"
            >
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Language" prop="Language">
              <el-checkbox-group v-model="ruleForm.Language">
                <el-checkbox label="C" name="Language"></el-checkbox>
                <el-checkbox label="C++" name="Language"></el-checkbox>
                <el-checkbox label="Python3" name="Language"></el-checkbox>
                <el-checkbox label="Java" name="Language"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item 
            label="Description"
            prop="Description"
            >
            <tinymce-editor 
            ref="editor"
            >
            </tinymce-editor>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item 
            label="Input Description"
            prop="InputDescription"
            >
            <tinymce-editor 
            ref="editor"
            >
            </tinymce-editor>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item 
            label="Output Description"
            prop="OutputDescription"
            >
            <tinymce-editor 
            ref="editor"
            >
            </tinymce-editor>
          </el-form-item>
        </el-row>
        <el-row style="border:1px solid #eee">
          <h2 style="height:100%; font-size:18px; margin-top:20px; color:#606266; text-align:center">Samples</h2>
          <el-divider></el-divider>
          <el-row style="margin:10px;" :gutter="20">
            <el-col :span="12">
              <el-form-item 
              v-for="(input, index) in ruleForm.inputs"
              :label="'Input Sample' + (index + 1)"
              :key="input.key"
              :prop="'inputs.' + index + '.value'"
              :rules="{
                required: true, message: '请输入input', trigger: 'blur'
              }">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Input Samples"
                v-model="input.value"
                >
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item 
                v-for="(output, index) in ruleForm.outputs"
                :label="'Output Sample' + (index + 1)"
                :key="output.key"
                :prop="'outputs.' + index + '.value'"
                :rules="{
                  required: true, message: '请输入output', trigger: 'blur'
                }">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Output Samples"
                v-model="output.value"
                >
              </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center; margin: 20px">
            <el-button type="primary" style="width:40%" plain @click="addSample">Add New Sample</el-button>
            <el-button type="warning" style="width:40%" plain @click="deleteSample">Delete Last Sample</el-button>
          </el-row>
        </el-row>
        <el-row style="margin-top: 25px">
          <el-form-item 
            label="Hint"
            prop="Hint"
            >
            <tinymce-editor 
            ref="editor"
            >
            </tinymce-editor>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item 
            label="Source"
            prop="Source"
            >
            <el-input 
              v-model="ruleForm.source">
              </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="Type" prop="Type">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="ACM"></el-radio>
                <el-radio label="OI"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item 
            label="TestCase"
            prop="TestCase"
            >
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item 
            label="IOMode"
            prop="IOMode"
            >
              <el-radio-group v-model="ruleForm.IOMode" @click="showFileIO">
                <el-radio label="Standard IO"></el-radio>
                <el-radio label="File IO"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="showFileIO">
            <el-form-item 
              label="InputFileName"
              prop="InputFileName">
              <el-input v-model="ruleForm.InputFileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="showFileIO">
            <el-form-item 
              label="outputFileName"
              prop="outputFileName">
              <el-input v-model="ruleForm.OutputFileName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>  
</template>

<script>
  import TinymceEditor from './tinymce-editor/tinymce-editor'
  export default {
    components: {
      TinymceEditor
    },
    props: {
      cid: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          Title: '',
          Description: '',
          InputDescription: '',
          OutputDescription: '',
          Hint:'',
          TimeLimit: '1000',
          MemoryLimit: '256',
          Difficulty: 'Low',
          Visible: true,
          ShareSubmission: false,
          Language: [],
          source: '',
          type: 'ACM',
          IOMode: 'Standard IO',
          InputFileName: 'input.txt',
          OutputFileName: 'output.txt',
          inputs: [{
            value: ''
          }],
          outputs: [{
            value: ''
          }],
        },
        rules: {
          ID: [
            { required: true, message: '请输入题目ID', trigger: 'blur' },
          ],
          Title: [
            { required: true, message: '请输入题目Title', trigger: 'blur' }
          ],
          Description: [
            { required: true}
          ],
          InputDescription: [
            { required: true}
          ],
          OutputDescription: [
            { required: true}
          ],
          TimeLimit: [
            { required: true, message: '请输入Time Limit', trigger: 'blur'}
          ],
          MemoryLimit: [
            { required: true, message: '请输入Memory Limit', trigger: 'blur'}
          ],
          Language: [
            { type: 'array', required: true, message: '请至少选择一种语言', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      addSample() {
        this.ruleForm.inputs.push({
          value: '',
          key: Date.now()
        });
        this.ruleForm.outputs.push({
          value: '',
          key: Date.now()
        });
      },
      deleteSample() {
        this.ruleForm.inputs.pop()
        this.ruleForm.outputs.pop()
      },
      showFileIO(){
        if(this.IOMode == 'File IO'){
          
        }
      }
    }
  }
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
</style>