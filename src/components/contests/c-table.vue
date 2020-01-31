<template>
  <div id="c-table">
    <ul>
      <li v-for="(contest, index) in tableInfo" :key="index">
        <!-- 标题、startTime、limit、duration、status -->
        <router-link class="title" :to="{ name: 'ConTestDetail', params: { id: contest.id } }">
          {{ contest.title }} <i class="el-icon-lock" v-show="contest.contest_type == 'Password Protected'"></i>
        </router-link>
        <div class="start">
          <i class="el-icon-date"></i>
          {{ timeFormat(contest.start_time) }}
        </div>
        <!-- <div class="duration">

        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      tableInfo: {
        type: Array,
        required: true,
      },
      tableLimit: {
        type: Number,
        default: 10,
      }
    },
    methods: {
      timeFormat(d) {
        var d = new Date(d)
        return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds())
      },
    },
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/variable.styl'
    #c-table
      width 100%
      ul
        width 100%
        box-sizing border-box
        padding 0 20px
        li
          padding 10px 0
          width 100%
          height 50px
          border-bottom 1px solid $color-border-light
          .title
            // display block
            color $color-font-text
            height 25px
            font-size $font-size-medium
            line-height @height
            &:hover
              text-decoration underline
              color $color-font-theme
          .start
            height 25px
            line-height @height
            color $color-font-gray 
</style>