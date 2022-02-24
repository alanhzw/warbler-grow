<!--
 * @Description:
 * @Date: 2021-03-15 19:50:05
 * @LastEditTime: 2021-03-16 10:32:01
 * @FilePath: \yunluzhuangxiu\src\business\components\CtrlIcon.vue
-->
<template>
  <div class="ctrl-icon" :class="{disable: disable}" @click="(!disable) && $emit('click')">
    <i class="ctrl-avatar" :class="`iconfont ${ctrl.info.icon}`" />
    <p class="ctrl-name">{{ctrl.info.label}}</p>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {

  },
  props: {
    disable: {
      default: false,
    },
    ctrl: {
      default: () => ({}),
    },
  },
  methods: {

  },
  computed: {

  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-icon {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;

  * {
    user-select: none;
  }

  .ctrl-avatar {
    display: block;
    border-radius: 50%;
    background-color: #ceebff;
    color: $TAG_INFO_BLUE;
    line-height: 44px;
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    width: 44px;
    height: 44px;
  }

  &.disable .ctrl-avatar {
    background-color: #e3e8ee;
    color: $FONT_DISABLE_GRAY;
  }

  &:hover {
    background-color: $BG_BLOCK_GRAY;
  }

  .ctrl-name {
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
    margin-top: 5px;
    margin-bottom: 0px;
    text-align: center;
  }

  &.disable .ctrl-name {
    color: $FONT_DISABLE_GRAY;
  }
}
</style>
