<template>
  <div class="contest">
    <template>
      <h2 class="title">{{this.$route.params.id}}</h2>
      <el-tabs v-model="activeName" type="card">
        <!-- -------------------1-------------------- -->
        <el-tab-pane label="Overview" name="first">
          <el-row>
            <el-col :span="24" v-for="(value, key, index) in overView" :key="index">
              <div class="overview-title">{{key}}:</div>
              <div class="overview-content">{{value}}</div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- -------------------2-------------------- -->
        <el-tab-pane label="Problem" name="second">
          <template>
            <el-tabs>
              <el-tab-pane 
              v-for="(item, index) in problemlist"
              :key="index"
              :label="'Problem ' + (index+1)"
              :name="(index+1)">
                <el-row>
                  <el-col :span="24" v-for="(value, key, index) in item" :key="index">
                    <div class="overview-title">{{key}}:</div>
                    <div class="overview-content">{{value}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="overview-title">Submit:</div>
                    <el-input
                      type="textarea"
                      :rows="10"
                      placeholder="请输入内容"
                      v-model="textarea">
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                  <el-col :span="12">
                    <el-select v-model="value">
                      <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" style="float: right; margin-right: 20px">提交</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-tab-pane>


        <!-- -------------------3-------------------- -->
        <el-tab-pane label="Submisson" name="third">
          <div class="button">
            <el-row>
              <el-col :span="12">
                <el-input placeholder="请输入User关键字" prefix-icon="el-icon-search" v-model="search"></el-input>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" icon="el-icon-refresh" size="small" @click="refresh"></el-button>
              </el-col>
            </el-row>                       
          </div>
          <template>
            <el-table :data="submission" style="width: 100%">
              <el-table-column prop="User" label="User"></el-table-column>
              <el-table-column prop="Problem" label="Problem"></el-table-column>
              <el-table-column label="Result">
                <template slot-scope="scope">
                 <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" :type="scope.row.Result === 'Accepted' ? 'success' : 'danger'">{{ scope.row.Result }}</el-tag>
                  </div>
                </template>
              </el-table-column>  
              <el-table-column label="Time">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.Time }}&nbspms</span>
                </template>
              </el-table-column>  
              <el-table-column label="Memory">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.Memory }}&nbspkb</span>
                </template>
              </el-table-column>  
              <el-table-column prop="Language" label="Language"></el-table-column>  
              <el-table-column label="CodeSize">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.CodeSize }}&nbspbytes</span>
                </template>
              </el-table-column>   
              <el-table-column prop="SubmitTime" label="SubmitTime"></el-table-column>             
            </el-table>
          </template>
        </el-tab-pane>

        <!-- -------------------4-------------------- -->
        <el-tab-pane label="Rank" name="fourth">
          <div class="button">
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="refresh"></el-button>
          </div>          
          <template>
            <el-table :data="rank" border style="width: 100%">
              <el-table-column type="index" label="Rank" width="100"></el-table-column>
              <el-table-column prop="User" label="User"></el-table-column>
              <el-table-column prop="AT" label="AC/Total"></el-table-column>              
              <el-table-column 
                v-for="(item, index) in problemlist" 
                :key="index" 
                :label="'Problem ' + (index+1)">
                <template slot-scope="scope">
                  <span style="color: red">(-{{ scope.row.problem[index]}})</span>             
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
export default {
  name: "contest",
  data() {
    return {
      textarea: '',
      activeName: 'second',
      problemActive: '2',
      overView: {
        Description: 'None', 
        Time: '2019-04-16 17:30:00 ~ 2019-04-16 22:30:00', 
        Status: 'Ended', 
        Openness: 'Public', 
        Manager: '叶良辰'},
        options: ['C', 'C++', 'Python', 'Java'],
        value: '',
        problemlist: [{
          Description: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          Input: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          SampleInput: `ABCA BACA
                        ELLY KRIS
                        AAAA ZZZZ`,
          SampleOnput: `0
                        29
                        100`,
          Source: '“浪潮杯”山东省第九届ACM大学生程序设计竞赛（感谢山东财经大学）'
      },{
          Description: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          Input: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          SampleInput: `ABCA BACA
                        ELLY KRIS
                        AAAA ZZZZ`,
          SampleOnput: `0
                        29
                        100`,
          Source: '“浪潮杯”山东省第九届ACM大学生程序设计竞赛（感谢山东财经大学）'
      },{
          Description: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          Input: `In GGO, a world dominated by gun and steel, players are fighting for the honor of being the strongest gunmen. 
          Player Shino is a sniper, and her aimed shot kills one monster at a time. 
          Now she is in an $n times n$ map, and there are monsters in some grids. 
          Each monster has an experience. As a master, however, Shino has a strange self-restrain. 
          She would kill at most one monster in a column, and also at most one in a row. Now she wants to know how to get max experience, under the premise of killing as many monsters as possible.`,
          SampleInput: `ABCA BACA
                        ELLY KRIS
                        AAAA ZZZZ`,
          SampleOnput: `0
                        29
                        100`,
          Source: '“浪潮杯”山东省第九届ACM大学生程序设计竞赛（感谢山东财经大学）'
      }],
      submission: [{
        User: 'Reinhardt',		 				
        Problem: 'Problem B',
        Result: 'Compile Error',
        Time:	0 ,
        Memory:	0 ,
        Language:	'C#',
        CodeSize:	767,
        SubmitTime: '2019-04-16 22:23:03'
      },
      {
        User: 'Reinhardt',		 				
        Problem: 'Problem B',
        Result: 'Accepted',
        Time:	0 ,
        Memory:	0 ,
        Language:	'C#',
        CodeSize:	767,
        SubmitTime: '2019-04-16 22:23:03'
      }],
      rank: [{
          User: '王小虎',
          AT: '0/3',
          Penalty: '0:0:0',
          problem: [1, 1, 4]
        },{
          User: '王小虎',
          AT: '0/3',
          Penalty: '0:0:0',
          problem: [1, 1, 4]
        },{
          User: '王小虎',
          AT: '0/3',
          Penalty: '0:0:0',
          problem: [1, 1, 4]
        },]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    refresh() {

    }
  }
}
</script>

<style scoped>
.contest {
  margin: 20px;
}
.title {
  height: 25px;
  font-size:18px; 
  color:rgb(128, 128, 128); 
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
  font-family: "宋体"
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
</style>