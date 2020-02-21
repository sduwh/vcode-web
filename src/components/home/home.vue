<template>
  <div id="home">
    <div class="desc transition-box" v-show="showPageDesc">
      <span>{{ pageDesc }}</span>
    </div>
    <!-- <div class="challenge">
      <ul>
        <li v-for="(item, index) in challenge" :key="index" @click="changeRoute">
          <div class="top">
            <div class="pic"><img src='../../common/image/challenge.svg' alt=""></div>
          </div>
          <div class="bottom">
            <div class="num">5+</div>
            <div class="c-desc">{{ item.desc }}</div>
          </div>
        </li>
      </ul>
    </div> -->
    <div class="calendar">
      <el-calendar v-model="date"></el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageDesc: 'Virtual Code',
      showPageDesc: false,
      // challenge: [
      //   {
      //     desc: 'More than 5 easy problems...',
      //     title: ['problem1', 'problem2', 'problem3', 'problem4', 'problem5'],
      //     img: '../../common/image/challenge.svg',
      //   },
      //   {
      //     desc: 'More than 5 medium problems...',
      //     title: ['problem1', 'problem2', 'problem3', 'problem4', 'problem5'],
      //     img: '../../common/image/challenge.svg',
      //   },
      //   {
      //     desc: 'More than 5 hard problems...',
      //     title: ['problem1', 'problem2', 'problem3', 'problem4', 'problem5'],
      //     img: '../../common/image/challenge.svg',
      //   },
      // ],
      date: new Date(),
    };
  },
  mounted() {
    this.showPageDesc = true;
  },
  methods: {
    changeRoute() {
      // this.$route.path.push('/problem')
      // this.$route.path = '/problems'
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
  #home
    width 100%
    .desc
      position relative
      width 100%
      height 100vh
      span
        position absolute
        top 50%
        left 50%
        width w = 800px
        height h = 100px
        margin-left -(w / 2)
        margin-top -(h / 2 + 130px)
        font-size $font-size-max-m
        letter-spacing 5px
        text-align center
        line-height h
    .challenge
      width 100%
      height 300px
      // border 1px solid #000
      // background-color $color-border-light
      ul
        width 100%
        text-align center
        li
          width 150px
          height 150px
          // border 1px solid #000
          display inline-block
          margin-left 30px
          box-shadow 0 0 24px rgba(91, 94, 222, 0.16)
          border-radius 5px
          vertical-align middle
          cursor pointer
          &:first-child
            margin-left 0
          .top
            position relative
            width 100%
            height 75px
            .pic
              position absolute
              top 50%
              left 50%
              width w = 48px
              height h = 48px
              margin-left -(w / 2)
              margin-top -(h / 2)
              img
                width 100%
                height 100%
          .bottom
            width 100%
            height 75px
            .num
              width 100%
              height 30px
              font-size $font-size-large
              text-shadow: 1px 1px 2px $color-font-text
            .c-desc
              color $color-font-text
              font-weight 500
    .calendar
      width 800px
      width 70%
      // height 600px
      box-sizing border-box
      // border 1px solid #000
      margin 0 auto
</style>
