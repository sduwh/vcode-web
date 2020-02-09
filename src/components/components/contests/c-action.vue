<template>
  <div id="c-action">
    <div class="status">
      <el-select size="small" v-model="value" placeholder="Status">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search">
      <el-input
        placeholder="keyword"
        size='small'
        suffix-icon="el-icon-search"
        v-model="input">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      status: [{
        label: 'All',
        value: 'All'
      }, {
        label: 'UnderWay',
        value: 'UnderWay'
      }, {
        label: 'NotStart',
        value: 'NotStart'
      }, {
        label: 'Ended',
        value: 'Ended'
      }],
      input: '',
    }
  },
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/variable.styl'
    #c-action
      width 500px
      display inline-block
      vertical-align middle
      text-align center
      .status, .search
        display inline-block
      .search
        margin-left 20px

</style>