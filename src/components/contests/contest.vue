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
                v-for="(item, index) in problemlist"
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
                    <div class="overview-title">Time Limie:</div>
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
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.hint"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Author:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.author"></MarkdownPreview>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="overview-title">Source:</div>
                    <div class="overview-content">
                      <MarkdownPreview :initialValue="item.source"></MarkdownPreview>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="overview-title">Submit:</div>
                    <div class="editor">
                      <div class="editor-div">
                        <problem-editor :contestName="overView.name" :problemOriginId="item.originId"></problem-editor>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-tab-pane>

        <el-tab-pane label="Submisson" name="submission">
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
                    <el-tag v-if="scope.row.result === 5">Padding</el-tag>
                    <el-tag v-else-if="scope.row.result === 1" type="success">Success</el-tag>
                    <el-tag v-else-if="scope.row.result === 3" type="danger">MemoryLimit</el-tag>
                    <el-tag v-else-if="scope.row.result === 2" type="danger">TimeLimit</el-tag>
                    <el-tag v-else-if="scope.row.result === 6" type="danger">Complie Error</el-tag>
                    <el-tag v-else-if="scope.row.result === 4" type="danger">Unkonw Error</el-tag>
                    <el-tag v-else type="danger">Error Answer</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Time">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{ scope.row.time.length > 0 ? scrope.row.time : 'N/A' }} &nbsp; ms
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="Memory">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    {{ scope.row.memory.length > 0 ? scrope.row.memory : 'N/A' }} &nbsp; kb
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
              <el-table-column v-for="(item, index) in problemlist" :key="index" :label="'Problem ' + (index + 1)">
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
    </template>
  </div>
</template>

<script>
import api from 'api/api';
import { MarkdownPreview } from 'vue-meditor';
import problemEditor from './problem-editor';

export default {
  mounted() {
    this.getContest();
    this.getProblems();
  },
  name: 'contest',
  components: {
    MarkdownPreview,
    problemEditor,
  },
  data() {
    return {
      search: '',
      textarea: '',
      activeName: 'overview',
      activeProblem: 'Problem 1',
      problemActive: '2',
      overView: {},
      value: '',
      problemlist: [],
      paginationInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      submission: [],
      rank: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
            const contestData = data.data;
            this.overView = contestData;
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
            this.problemlist = problemData.problems;
            this.getContestRank();
          }
        });
    },
    getSubmission(pageNum) {
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
            console.log(rankData);
            const { rankList } = rankData;
            for (let i = 0; i < rankList.length; i++) {
              const user = rankList[i];
              const userProblems = [];
              for (let problemIndex = 0; problemIndex < this.problemlist.length; problemIndex++) {
                let pushFlag = false;
                for (let userSolveIndex = 0; userSolveIndex < user.problemSolvedInfo.length; userSolveIndex++) {
                  if (
                    this.problemlist[problemIndex].originId === user.problemSolvedInfo[userSolveIndex].problemOriginId
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
            console.log(rankList);
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
  font-family: '宋体';
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
