<!--
 * @Author: YC
 * @Date: 2020-12-29 14:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 15:06:23
 * @Description:
-->
<template>
  <div class="test">
    <lz-input v-model="input"
              style="width:200px"
              placeholder="请输入内容"></lz-input>

    <br>
    <br>
    <br>

    <lz-button type="primary"
               :disabled='isDisabled'
               @click='addSort'>添加节点</lz-button>

    <br>
    <br>
    <br>

    <span>当前目录:{{ nowPath }}</span>

    <br>
    <br>
    <br>

    <span>当前目录的父级目录:{{ faterName }}</span>

    <br>
    <br>
    <br>

    <lz-tree :data="data"
             :props="defaultProps"
             accordion
             ref="tree"
             node-key="id"
             :default-expanded-keys='[1]'
             @node-click="handleNodeClick"></lz-tree>
  </div>
</template>
<script>
import Service from '@/business/service';

export default {
  data() {
    return {
      input: '',
      nowClickNode: '', // 当前点击的节点
      faterName: '', // 父级的名称
      nowPathArr: [], // 存放路径的数组
      nowPath: '', // 最终的路径

      data: [{
        id: 1,
        label: '图片空间',
        children: [{
          id: 2,
          label: '蔬菜',
          children: [{
            id: 3,
            label: '菠菜',
          },
          {
            id: 4,
            label: '生菜',
          },
          ],
        },
        {
          id: 5,
          label: '水果',
          children: [{
            id: 6,
            label: '香蕉',
          }],
        },
        {
          id: 7,
          label: '美女',
          children: [{
            id: 8,
            label: '秦岚',
          }],
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  created() {
    this.getCategoryListNew();
  },
  computed: {
    // 是否可以新建分类
    isDisabled() {
      if (this.nowClickNode.level > 2) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // 获取树形结构
    getCategoryListNew() {
      Service.getCategoryListNew({ parentId: 0 }).then((data) => {
        console.log('🚀🚀~ getCategoryListNew:', data);
        this.$refs.tree.getNode();
        this.$refs.tree.append(data, this.nowClickNode);
      }).catch((e) => {
        console.log(e);
      });
    },
    // 点击节点的时候触发事件
    handleNodeClick(nodes, node, self) {
      console.log('传递给 data 属性的数组中该节点所对应的对象', nodes);
      console.log('节点对应的 Node', node);
      console.log('节点组件本身', self);
      this.nowClickNode = node;
      this.nowPathArr = [];
      if (!node.parent.parent) {
        this.nowPath = '图片空间';
        this.faterName = '- -';
      } else {
        this.faterName = node.parent.data.label;
        this.findParentName(node);
        this.nowPath = `图片空间 / ${this.nowPathArr.join(' / ')}`;
        console.log('🚀🚀~ this.nowPath:', this.nowPath);
      }
    },
    // 添加节点
    addSort() {
      const data = {
        label: '草莓',
      };
      this.$refs.tree.append(data, this.nowClickNode);
    },
    // 查找父节点的分类名称
    findParentName(node) {
      if (node.parent.parent) {
        this.nowPathArr.unshift(node.data.label);
        this.findParentName(node.parent);
        console.log('🚀🚀~ this.nowPathArr:', this.nowPathArr);
      }
    },
  },
};
</script>

<style lang='scss'>
.test{
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
</style>
