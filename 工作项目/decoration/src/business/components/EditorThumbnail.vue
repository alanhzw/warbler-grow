<template>
  <div v-if="pageInfo && Array.isArray(pageInfo.floors) && pageInfo.floors.length > 0" class="editor-thumbnail">
    <header>
      <i class="icon iconfont icon-yemianzhuangxiuicon_huaban1-04"></i>
      <span class="title">模块导航</span>
      <i v-if="fold" @click="fold=false" class="iconfont icon-icon-12"></i>
      <i v-else @click="fold=true" class="iconfont icon-icon-13"></i>
    </header>

    <div v-show="!fold">
      <draggable class="list-group" tag="ul" v-model="pageInfo.floors" v-bind="dragOptions" @update='log'>
        <transition-group type="transition" :name="'flip-list'">
          <li :class="{'activated': fIndex === pageInfo.fIndex}" v-for="(floor, fIndex) in pageInfo.floors" :key="`thumbnail-floor-${fIndex}`" @click="$emit('editFloor', fIndex)">
            <span class="ctrl-name">{{floor.info.label}}</span>
            <!-- 必有控件不能删除 -->
            <i class="iconfont icon-icon-07" v-if="floor.info.isRequired != 1" @click.stop.prevent="$emit('removeFloor', fIndex)"></i>
          </li>
        </transition-group>
      </draggable>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'EditorThumbnail',
  props: {
    pageInfo: {
      default: () => ({}),
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      fold: false,
    };
  },
  methods: {
    log(evt) {
      console.log('123:', evt);
      this.pageInfo.fIndex = evt.newIndex;
      if (evt.newIndex > 0) {
        this.$emit('save');
      }
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        touchStartThreshold: 150,
      };
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables.scss';
$THUMBNAIL_WIDTH: 150px;

.editor-thumbnail {
  width: $THUMBNAIL_WIDTH;

  .list-group {
    max-height: 50vh;
    overflow: auto;
  }
  header {
    height: 40px;
    padding: 0 15px;
    background-color: $BG_BLOCK_GRAY;
    display: flex;
    align-items: center;
    color: $TAG_INFO_BLUE;

    .icon {
      margin-right: 6px;
    }

    .title {
      flex: 1;
      font-size: 14px;
    }
  }

  ul {
    background-color: $WHITE;
    padding: 10px;
    font-size: 12px;

    li {
      line-height: 30px;
      color: $FONT_COMMON_GRAY;
      padding: 0 5px;
      border-radius: 2px;
      display: flex;
      align-items: center;

      .ctrl-name {
        flex: 1;
      }

      .btn {
        margin-left: 5px;
      }

      .btn-delete {
        display: none;
      }

      &:hover {
        background-color: $BG_BLOCK_GRAY;
        color: $FONT_COMMON_BLACK;

        .btn-delete {
          display: block;
        }
      }

      &.activated {
        color: $TAG_INFO_BLUE;
      }
    }
  }
  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.5;
    // background: #c8ebfb;
    border-top: 3px solid #3399ff;
  }
}
</style>
