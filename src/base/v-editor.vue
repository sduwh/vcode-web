<template>
  <div id="v-editor">
    <div class="main">
      <div class="e-tab">
        <div class="language">
          <el-select size="mini" v-model="value">
            <el-option
              v-for="item in language"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="e-panel">
          <div class="virtual-header">virtual header</div>
          <div class="editor">
            <pre v-highlightjs>
              <code>
class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  insert(data) {
    let n = new Node(data, null, null);
    if (!this.root) {
      return this.root = n;
    }
    let currentNode = this.root;
    let parent = null;
    while (1) {
      parent = currentNode;
      if (data < currentNode.data) {
        currentNode = currentNode.left;
        if (currentNode === null) {
          parent.left = n;
          break;
        }
      } else {
        currentNode = currentNode.right;
        if (currentNode === null) {
          parent.right = n;
          break;
        }
      }
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data)
  }

  removeNode(node, data) {
    if (node == null) {
      return null;
    }

    if (data == node.data) {
      // no children node
      if (node.left == null && node.right == null) {
        return null;
      }
      if (node.left == null) {
        return node.right;
      }
      if (node.right == null) {
        return node.left;
      }

      let getSmallest = function(node) {
        if(node.left === null && node.right == null) {
          return node;
        }
        if(node.left != null) {
          return node.left;
        }
        if(node.right !== null) {
          return getSmallest(node.right);
        }

      }
      let temNode = getSmallest(node.right);
      node.data = temNode.data;
      node.right = this.removeNode(temNode.right,temNode.data);
      return node;

    } else if (data < node.data) {
      node.left = this.removeNode(node.left,data);
      return node;
    } else {
      node.right = this.removeNode(node.right,data);
      return node;
    }
  }

  find(data) {
    var current = this.root;
    while (current != null) {
      if (data == current.data) {
        break;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right
      }
    }
    return current.data;
  }

}

module.exports = BinarySearchTree;
              </code>
            </pre>
          </div>
      </div>
    </div>
    <div class="footer">
      <div class="console-btn"><el-button size="mini" @click='changeIsConsoleShow'>Console</el-button></div>
      <div class="console-body" v-show="isConsoleShow">
        <div class="result">['a', 'b', 'c']</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 'Javascript',
        language: [{
          label: 'C++',
          value: 'C++',
        }, {
          label: 'Java',
          value: 'Java',
        },{
          label: 'Python',
          value: 'Python'
        },{
          label: 'Python3',
          value: 'Python3',
        },{
          label: 'C',
          value: 'C',
        },{
          label: 'C#',
          value: 'C#',        
        },{
          label: 'Javascript',
          value: 'Javascript',
        },{
          label: 'Go',
          value: 'Go',
        },{
          label: 'PHP',
          value: 'PHP'
        }],
        isConsoleShow: false,
      }
    },
    methods: {
      changeIsConsoleShow() {
        this.isConsoleShow = !this.isConsoleShow
      },
    },
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
    #v-editor
      width 100%
      height 100%
      // border 1px solid #000
      .main
        position relative
        width 100%
        height  calc(100vh - 100px - 40px)
        // background-color gray
        .e-tab
          position absolute
          top 0
          left 0
          width 100%
          border 1px solid #e4e7ed
          border-right none
          border-left none
          background-color #fff
          .language
            display inline-block
            padding 4px 10px 5px
        .e-panel
          width 100%
          height 100%
          scroll-y()
          .virtual-header
            width 100%
            height 39px
      .footer
        position relative
        width 100%
        height 40px
        border-top 1px solid #e4e7ed
        line-height 40px
        .console-btn
          display inline-block
        .console-body
          position absolute
          width 100%
          top -200px
          left 0
          min-height 200px
          background-color #fff
          border-top 1px solid #e4e7ed
          .result
            width 90%
            height 170px
            margin 15px auto
            border 1px solid #e4e7ed
            border-radius 5px
            padding 0 10px
</style>