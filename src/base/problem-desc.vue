<template>
  <div id="problem-desc">
    <div class="title">
      <span class="id">{{ problemInfo.originId }}.</span>
      <span class="name">{{ problemInfo.title }}</span>
    </div>
    <div class="action">
      <!-- <span class="level">
        <el-tag size="mini" type="info">{{ firstTag }}</el-tag>
      </span> -->
      <span class="good"></span>
      <span class="bad"></span>
      <span class="like"></span>
    </div>
    <div class="desc">
      <div class="text" v-html="problemInfo.description"></div>
      <div class="in-out">
        <div class="in">
          <div class="in-title">Input</div>
          <div class="in-desc" v-html="problemInfo.sampleInput"></div>
        </div>
        <div class="out">
          <div class="out-title">Ouput</div>
          <div class="out-desc" v-html="problemInfo.sampleOutput"></div>
        </div>
      </div>
      <div class="example" v-for="(sample, index) in problemInfo.samples" :key="index">
        <div class="num">{{ `Example${index + 1}` }}</div>
        <div class="put-wrap">
          <div class="input">
            <span class="put-title">Input : </span>
            <span class="put-content">{{ sample.input }}</span>
          </div>
          <div class="output">
            <span class="put-title">Output : </span>
            <span class="put-content">{{ sample.output }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="hint" v-if="problemInfo.hint != ''">
        <div class="hint-title">Hint</div>
        <div class="hint-body" v-html="problemInfo.hint"></div>
      </div> -->
      <!-- <div class="source" v-if="problemInfo.source">
        <div class="source-title">Source</div>
        <div class="source-body">{{ problemInfo.source }}</div>
      </div> -->
      <div class="submit">
        <div class="accept">
          <span>Accept</span>
          <span>{{ problemInfo.acceptedNumber }}</span>
        </div>
        <span class="line">|</span>
        <div class="submission">
          <span>Submission</span>
          <span>{{ problemInfo.submissionNumber }}</span>
        </div>
      </div>
      <div class="contributor">
        <div class="contributor-title">Contributor</div>
        <div class="contributor-body" v-if="problemInfo.author">
          {{ problemInfo.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from 'api/api';

export default {
  mounted() {
    console.log(this.$route.params.id);
  },
  data() {
    return {
      problemInfo: {},
    };
  },
  computed: {
    ...mapGetters(['problem']),
    // firstTag() {
    //   const tmp = this.problemInfo.tags;
    //   // console.log(tmp)
    //   return tmp[0];
    // },
  },
  created() {
    api
      .getProblem({
        originId: this.$route.params.id,
      })
      .then(res => {
        console.log(res);
        let { data } = res;
        if (data.code === 1) {
          data = data.data;
          this.problemInfo = data;
        }
      });
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #problem-desc
    width 100%
    // background-color yellow
    .title
      width 100%
      padding 12px 0
      // border 1px solid #000
      span
        display inline-block
        vertical-align middle
        font-size $font-size-regular-m
        font-weight 500
        letter-spacing 1px
        // border 1px solid #000
      .name
        margin-left 3px
    .action
      width 100%
      padding 0 0 12px
      border-bottom 1px solid #e4e7ed
    .desc
      width 100%
      padding 15px 0
      .text
        letter-spacing 1px
        color $color-font-text
        line-height 1.5
        p
          margin-bottom 15px
      .in-out
        width 100%
        padding-top 15px
        .in, .out
          width 100%
          .in-title, .out-title
            padding-bottom 15px
            font-size $font-size-regular-m
            font-weight 500
            letter-spacing 1px
          .in-desc, .out-desc
            // padding-bottom 15px
            padding 10px 0
            margin-bottom 15px
            letter-spacing 1px
            color $color-font-text
            line-height 1.5
            width 100%
            background-color $color-background-text-theme
      .example
        width 100%
        margin-bottom 15px
        // border 1px solid #000
        .num
          wdith 100%
          // border 1px solid #000
          font-size $font-size-regular-m
          font-weight 500
          letter-spacing 1px
          margin-bottom 15px
        .put-wrap
          width 100%
          padding 10px 0
          background-color $color-background-text-theme
          .input, .output
            width 100%
            .put-title
              font-weight 500
          .output
            margin-top 8px
      .hint
        width 100%
        margin-bottom 15px
        .hint-title
          font-size $font-size-regular-m
          font-weight 500
          letter-spacing 1px
          margin-bottom 15px
        .hint-body
          width 100%
          padding 10px 0
          background-color $color-background-text-theme
          letter-spacing 1px
          color $color-font-text
          line-height 1.5
      .source
        width 100%
        margin-bottom 15px
        .source-title
          font-size $font-size-regular-m
          font-weight 500
          letter-spacing 1px
          margin-bottom 15px
        .source-body
          width 100%
          padding 10px 0
          background-color $color-background-text-theme
          letter-spacing 1px
          color $color-font-text
          line-height 1.5
      .submit, .contributor
        width 100%
        padding 12px 0
        border-bottom 1px solid $color-border-light
        .accept, .submission
          display inline-block
          span
            display inline-block
            &:nth-child(1)
              color $color-font-text-1
            &:nth-child(2)
              margin-left 10px
        .line
          margin 0 12px
          color $color-border-light
      .contributor
        div
          display inline-block
          color $color-font-text-1
        .contributor-body
          margin-left 12px
</style>
