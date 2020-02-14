<template>
  <div>
    <div class="header">
    <div class="theader">
      <el-row style="height:100%; font-size:18px; color:grey; line-height:38px">
        <el-col :span="18">
          <div>添加题目</div>
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
                v-model="ruleForm.ID"
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
                <el-checkbox label="Python" name="Language"></el-checkbox>
                <el-checkbox label="JavaScript" name="Language"></el-checkbox>
                <el-checkbox label="Go" name="Language"></el-checkbox>
                <el-checkbox label="Ruby" name="Language"></el-checkbox>
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
              :label="'域名' + index"
              :key="input.key"
              :prop="'domains.' + index + '.value'">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Input Samples"
                >
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item 
                label="Output Samples1"
                prop="OutputSamples">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Output Samples"
                >
              </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center">
            <el-button type="primary" style="width:40%" plain>Add New Sample</el-button>
            <el-button type="warning" style="width:40%" plain>Delete Last Sample</el-button>
          </el-row>
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
    data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          ID: '',
          Title: '',
          Description: '',
          InputDescription: '',
          OutputDescription: '',
          TimeLimit: '1000',
          MemoryLimit: '256',
          Difficulty: 'Low',
          Visible: true,
          ShareSubmission: false,
          Language: [],
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