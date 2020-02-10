<template>
  <div id="about" class="about">
    <CenterWrap :title="title">
      <template #table>
        <div class="about-block">
          <p class="about-body">
            这是一个延期很久很久的项目，如今缺专心前端的同学，我想把这里的数据做成活的，所以接下来的东西都是copy来的，
            Where is the input and the output? Your program shall read input
            from stdin('Standard Input') and write output to stdout('Standard
            Output'). For example,you can use scanf in C or cin in C++ to read
            from stdin,and use printf in C or cout in C++ to write to stdout.
            User programs are not allowed to read or write files, or you will
            get a Runtime Error. What's the meaning of the submission execution
            time? The onlinejudge might test your code multiple times with
            different input files. If your code gives the correct answer within
            the time limit for each input file, the execution time displayed is
            the max of the time spent for each test case. Otherwise, the
            execution time will have no sense. How can I use C++ Int64? You
            should declare as long long and use with cin/cout or %lld, using
            __int64 will result in Compile Error. Java specifications? All
            programs must begin in a static main method in a Main class. Do not
            use public classes: even Main must be non public to avoid compile
            error.Use buffered I/O to avoid time limit exceeded due to excesive
            flushing. About presentation error? There is no presentation error
            in this oj.The judger will trim the blacks and wraps in your ouput's
            last line. if it's still different with the correct output, the
            result will be Wrong Answer. How to report bugs about this oj?
          </p>
        </div>
      </template>
    </CenterWrap>
  </div>
</template>

<script>
import CenterWrap from 'components/user/center-wrap';

export default {
  components: {
    CenterWrap,
  },
  data() {
    return {
      title: 'About',
    };
  },
};
</script>

<style scoped>
.about {
  box-sizing: border-box;
  padding: 0 50px;
  padding-bottom: 20px;
}

.about-block {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
}

.about-body {
  text-indent: 2em;
  line-height: 1.5;
}
</style>
