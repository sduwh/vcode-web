<template>
  <div class="contest">
    <template>
      <h2 class="title">{{ this.$route.params.id }}</h2>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Overview" name="overview">
          <el-row>
            <el-col :span="24">
              <div class="overview-title">Title:</div>
              <div class="overview-content">{{ this.overView.name }}</div>
            </el-col>
            <el-col :span="24">
              <div class="overview-title">Time:</div>
              <div class="overview-content" v-if="this.overView.always">
                <el-tag size="medium" type="primary">
                  {{ new Date(this.overView.startTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }} </el-tag
                >-<el-tag size="medium" type="primary">
                  {{ new Date(this.overView.endTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
                </el-tag>
              </div>
              <div class="overview-content" v-else>No Time Limit</div>
            </el-col>
            <el-col :span="24">
              <div class="overview-title">Owner:</div>
              <div class="overview-content">{{ this.overView.ownerAccount }}</div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Problem" name="problems">
          <template>
            <el-tabs v-model="activeProblem">
              <el-tab-pane
                v-for="(item, index) in problemList"
                :key="index"
                :label="'Problem ' + (index + 1)"
                :name="'Problem ' + (index + 1)"
              >
                <el-row>
                  <el-col :span="24">
                    <div class="overview-title">OriginId:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.originId"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Description:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.description"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Input:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.input"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Output:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.output"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">SampleInput:</div>
                    <div class="overview-content" v-for="(value, key) in item.sampleInput" :key="key">
                      <MarkdownPreview :initialValue="value"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">SampleOutput:</div>
                    <div class="overview-content" v-for="(value, key) in item.sampleOutput" :key="key">
                      <MarkdownPreview :initialValue="value"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Time Limit:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.timeLimit + ' MS'"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Memory Limit:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.memoryLimit + ' MB'"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Hint:</div>
                    <div class="overview-content" v-if="item.hint">
                      <MarkdownPreview :initialValue="item.hint"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Author:</div>
                    <div class="overview-content" v-if="item.author">
                      <MarkdownPreview :initialValue="item.author"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Source:</div>
                    <div class="overview-content" v-if="item.source">
                      <MarkdownPreview :initialValue="item.source"></MarkdownPreview>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="overview-title">Submit:</div>
                    <div class="editor">
                      <div class="editor-div">
                        <problem-code-editor :language="mapLanguagesArray(item.choiceLanguages)" :contestName="overView.name" :problemOriginId="item.originId"></problem-code-editor>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-tab-pane>

        <el-tab-pane label="Submission" name="submission">
          <div class="button">
            <el-row>
              <el-col :span="12">
                <el-input
                  placeholder="Please input user keyword"
                  prefix-icon="el-icon-search"
                  v-model="search"
                  @input="changeInput()"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" icon="el-icon-refresh" size="small" @click="submissionRefresh"></el-button>
              </el-col>
            </el-row>
          </div>
          <template>
            <el-table :data="submission" style="width: 100%">
              <el-table-column prop="nickname" label="User"></el-table-column>
              <el-table-column prop="problemOriginId" label="Problem"></el-table-column>
              <el-table-column label="result">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-button style="padding: 0;border-width: 0;" @click="showSubmissionDetail(scope.row)">
                      <el-tag :type="tagMap(scope.row.result)">{{ statusMap(scope.row.result) }}</el-tag>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Time">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{ scope.row.time.length > 0 ? scope.row.time : 'N/A' }} &nbsp; ms
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="Memory">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{ scope.row.memory.length > 0 ? scope.row.memory : 'N/A' }} &nbsp; kb
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="language" label="Language"></el-table-column>
              <el-table-column prop="SubmitTime" label="SubmitTime">
                <template slot-scope="scope">
                  {{ new Date(scope.row.createTime) | dateFormat('YYYY-MM-DD HH:mm:ss') }}
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="paginationInfo.total"
                :current-page="paginationInfo.pageNum"
                :page-size="paginationInfo.pageSize"
                @current-change="listenCurrentChange"
              >
              </el-pagination>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="Rank" name="rank">
          <div class="button">
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="rankRefresh"></el-button>
          </div>
          <template>
            <el-table :data="rank" border style="width: 100%">
              <el-table-column type="index" label="Rank" width="100"></el-table-column>
              <el-table-column prop="username" label="User"></el-table-column>
              <el-table-column v-for="(item, index) in problemList" :key="index" :label="'Problem ' + (index + 1)">
                <template slot-scope="scope">
                  <div class="rankItem" v-if="scope.row.userProblems[index] == null"></div>
                  <div class="rankItem rankEarliest" v-else-if="scope.row.userProblems[index].earliest">
                    {{ new Date(scope.row.userProblems[index].timeUsed) | dateFormat('HH:mm:ss') }}
                    <span v-if="scope.row.userProblems[index].errorNum !== 0">
                      (-{{ scope.row.userProblems[index].errorNum }})
                    </span>
                  </div>
                  <div class="rankItem rankSuccess" v-else-if="scope.row.userProblems[index].ac">
                    {{ new Date(scope.row.userProblems[index].timeUsed) | dateFormat('HH:mm:ss') }}
                    <span v-if="scope.row.userProblems[index].errorNum !== 0">
                      (-{{ scope.row.userProblems[index].errorNum }})
                    </span>
                  </div>
                  <div class="rankItem rankError" v-else>(-{{ scope.row.userProblems[index].errorNum }})</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="Submission" :visible.sync="dialogVisible" width="70%">
        <submission-detail :hex="submissionHex"></submission-detail>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import api from 'api/api';
import { MarkdownPreview } from 'vue-meditor';
import problemCodeEditor from './problem-code-editor';
import SubmissionDetail from 'pages/usual/submission/submission-detail';
import {getLanguagesArray} from 'util/codeEditerUtil'
import { submitStatusMap, submitTagMap } from 'util/submitUtil';

export default {
  name: 'contest',
  components: {
    MarkdownPreview,
    problemCodeEditor,
    SubmissionDetail,
  },
  mounted() {
    this.getContest();
    this.getProblems();
    this.submissionTimer = setInterval(this.getSubmission, 1000);
  },
  beforeDestroy() {
    clearInterval(this.submissionTimer);
  },
  data() {
    return {
      submissionHex: '',
      dialogVisible: false,
      search: '',
      textarea: '',
      activeName: 'overview',
      activeProblem: 'Problem 1',
      problemActive: '2',
      overView: {},
      value: '',
      problemList: [],
      paginationInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      submission: [],
      rank: [],
      submissionTimer: null,
    };
  },
  methods: {
    mapLanguagesArray(languages) {
      return getLanguagesArray(languages)
    },
    showSubmissionDetail(form) {
      this.submissionHex = form.hex;
      this.dialogVisible = true;
    },
    statusMap(status) {
      return submitStatusMap(status);
    },
    tagMap(status) {
      return submitTagMap(status);
    },
    handleClick(tab, event) {},
    submissionRefresh() {
      this.getSubmission(this.paginationInfo.pageNum);
    },
    rankRefresh() {
      this.getContestRank();
    },
    getContest() {
      api
        .getContest({
          contestName: this.$route.params.id,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            this.overView = data.data;
            this.getSubmission(1);
          } else {
            this.$message.error('Contest is not exit');
            this.$router.push('/contests');
          }
        });
    },
    getProblems() {
      api
        .getContestProblemList({
          contestTitle: this.$route.params.id,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const problemData = data.data;
            this.problemList = problemData.problems;
            this.getContestRank();
          }
        });
    },
    getSubmission(pageNum) {
      if (pageNum === undefined || pageNum === null) {
        pageNum = this.paginationInfo.pageNum;
      }
      api
        .getContestSubmission({
          contestTitle: this.$route.params.id,
          page: pageNum,
          size: this.paginationInfo.pageSize,
          search: this.search,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const submissionData = data.data;
            this.paginationInfo.pageNum = pageNum;
            this.submission = submissionData.submissionList;
            this.paginationInfo.total = submissionData.total;
          }
        });
    },
    changeInput() {
      this.getSubmission(1);
    },
    listenCurrentChange(pageNum) {
      this.getSubmission(pageNum);
    },
    getContestRank() {
      api
        .getContestRank({
          contestName: this.$route.params.id,
        })
        .then(res => {
          const { data } = res;
          if (data.code === 1) {
            const rankData = data.data;
            const { rankList } = rankData;
            for (let i = 0; i < rankList.length; i++) {
              const user = rankList[i];
              const userProblems = [];
              for (let problemIndex = 0; problemIndex < this.problemList.length; problemIndex++) {
                let pushFlag = false;
                for (let userSolveIndex = 0; userSolveIndex < user.problemSolvedInfo.length; userSolveIndex++) {
                  if (
                    this.problemList[problemIndex].originId === user.problemSolvedInfo[userSolveIndex].problemOriginId
                  ) {
                    userProblems.push(user.problemSolvedInfo[userSolveIndex]);
                    pushFlag = true;
                  }
                }
                if (!pushFlag) {
                  userProblems.push(null);
                }
              }
              rankList[i].userProblems = userProblems;
            }

            this.rank = rankList;
          }
        });
    },
  },
};
</script>

<style scoped>
.contest {
  margin: 20px;
}
.title {
  height: 25px;
  font-size: 18px;
  color: rgb(128, 128, 128);
  margin-bottom: 20px;
}
.overview-title {
  font-size: 20px;
  color: rgb(150, 201, 252);
  height: 50px;
  line-height: 50px;
}
.overview-content {
  font-size: 16px;
  margin-left: 10px;
  white-space: pre-line;
  color: #606266;
}
.button {
  position: relative;
  margin-bottom: 10px;
}
.button .el-button {
  float: right;
  margin-bottom: 10px;
  margin-right: 30px;
}
.editor {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.editor-div {
  width: 90%;
  padding: 0 10px;
}
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rankItem {
  width: auto;
  text-align: center;
  color: black;
}

.rankSuccess {
  background: #67c23a;
}

.rankEarliest {
  background: green;
}

.rankError {
  background: #f56c6c;
}
</style>
