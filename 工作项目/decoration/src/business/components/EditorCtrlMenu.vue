<template>
  <div class="editor-ctrl-menu block">
    <!-- <div class="ctrl-module">
    <header class="ctrl-module-header">基础模块</header>
    <div class="ctrl-list">
      <ctrl-icon class="ctrl-item" v-for="(ctrl, cIndex) in ctrls.filter(c => c.info.isRequired !== 1)" :key="`ctrl-icon-box-${cIndex}`" :disable="
          ctrl.info.maxCount > 0 &&
          pageOnEdit &&
          Array.isArray(pageOnEdit.floors) &&
          pageOnEdit.floors.filter(floor => floor.info.name === ctrl.info.name).length >= ctrl.info.maxCount" :ctrl="ctrl" @click="$emit('addFloor', ctrl)" />
    </div>
  </div> -->

    <div class="ctrl-module"
         v-for="(category,cIndex) in categories"
         :key="`category-${category.cType}`">
      <div v-if="category.ctrls.filter(c => c.info.isRequired !== 1).length > 0">
        <header class="ctrl-module-header">{{category.cTypeName}}</header>
        <div class="ctrl-list">
          <draggable v-bind="dragOptions"
                     :move="onMove"
                     v-model="category.ctrls"
                     @end="(evt)=>onEnd(evt, cIndex)">
            <ctrl-icon class="ctrl-item"
                       v-for="(ctrl, cIndex) in category.ctrls"
                       :key="`ctrl-icon-box-${cIndex}`"
                       :disable="
            ctrl.info.maxCount > 0 &&
            pageOnEdit &&
            Array.isArray(pageOnEdit.floors) &&
            pageOnEdit.floors.filter(floor => floor.info.name === ctrl.info.name).length >= ctrl.info.maxCount"
                       :ctrl="ctrl"
                       @click="$emit('addFloor',ctrl)" />
          </draggable>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/**
 * 左侧的装修组件菜单组件
 */
import draggable from 'vuedraggable';
import CtrlIcon from '@/business/components/CtrlIcon';

export default {
  name: 'EditorCtrlMenu',
  components: {
    CtrlIcon,
    draggable,
  },
  props: {
    pageOnEdit: {
      default: () => { },
    },
    ctrls: {
      default: () => [],
    },
    canMove: {
      default: () => false,
    },
  },
  computed: {
    canMoveData: {
      get() {
        return this.canMove;
      },
      set(val) {
        return val;
      },
    },
    dragOptions() {
      return {
        animation: 0,
        group: { name: 'componentsGroup', pull: 'clone', put: false },
        sort: false,
        disabled: false,
        forceFallback: true,
        fallbackClass: true,
        chosenClass: 'chosen',
        dragClass: 'chosen',
        ghostClass: 'ghost',
      };
    },
    categories() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const ctrls = this.ctrls.length > 1 ? this.ctrls.sort((c1, c2) => c1.info.cType - c2.info.cType).sort((c1, c2) => c1.info.componentId - c2.info.componentId) : [...this.ctrls];
      const array = [];
      ctrls.forEach((ctrl) => {
        const category = array.filter(c => c.cType === ctrl.info.cType)[0];
        if (category) {
          category.ctrls.push(ctrl);
        } else {
          array.push({
            cType: ctrl.info.cType,
            cTypeName: ctrl.info.cTypeName,
            ctrls: [ctrl],
          });
        }
      });
      array.forEach((item) => {
        item.ctrls = item.ctrls.filter(c => c.info.isRequired !== 1);
        if (item.cTypeName == '图文类') {
          item.cTypeName = '图文类模块';
        }
        if (item.cTypeName == '会员类') {
          item.cTypeName = '会员权益模块';
        }
      });
      return array;
    },
  },
  methods: {
    onMove(e) {
      if (e.relatedContext.component.$attrs.name === 'preview') {
        this.canMoveData = true;
      } else {
        this.canMoveData = false;
        return false;
      }
    },
    onEnd(e, index) {
      if (this.canMoveData) {
        this.$emit('addFloor', this.categories[index].ctrls[e.oldIndex], e.newIndex);
      }
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables.scss';

.editor-ctrl-menu {
  height: 100%;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
      position: absolute;
      right: 30px;
      /*滚动条整体样式*/
      width: 7px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      }

      &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background-color: #D7DDE4;
          border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          /* 阴影 */
          -webkit-box-shadow: inset 0 0 5px #fff;
          background: #fff;
      }
  .ctrl-module {
    .ctrl-module-header {
      font-size: 14px;
      color: $FONT_MAIN_BLACK;
      text-align: left;
      padding: 20px 15px;
    }

    .ctrl-list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      padding: 10px;
    }
    .ctrl-list > div {
      display: flex;
      flex-wrap: wrap;
    }
    .ctrl-item {
      // flex: 0 0 33%;
      // margin: 10px;
      text-align: center;
    }

    border-bottom: 1px solid $BG_BLOCK_GRAY;

    &:last-child {
      border-bottom: 0px;
    }
  }
}
</style>
