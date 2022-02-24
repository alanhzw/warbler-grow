<!--
 * @Description:
 * @Date: 2021-01-19 14:07:03
 * @LastEditTime: 2021-08-18 10:03:56
 * @FilePath: \interact\src\business\components\common\FormBlock.vue
-->
<template>
  <div class="editor-form-block">
    <header class="editor-form-block-header"
            v-if="title">
      <span class="beacon" />
      <span>{{title}}</span>

      <lz-popover placement="top-start"
                  width="200"
                  trigger="hover"
                  popper-class='wheel-position-box'>
        <div>如未添加奖项，该位置为“谢谢参与”</div>
        <div>奖盘位置示意图</div>
        <br>
        <div>
          <img class="wheel-position"
               src="../../../assets/wheel-position.png">
        </div>
        <i class="iconfont1 iconfont icon-icon4-33"
           slot="reference"
           v-if='title==="奖品设置"'></i>
      </lz-popover>
    </header>
    <div class="editor-form-block-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormBlock',
  props: {
    title: {
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';
.wheel-position-box {
  height: 250px;
  .wheel-position {
    width: 150px;
    height: 150px;
    transform: rotate(22deg);
  }
}

.editor-form-block {
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 2px 15px 0px rgba(169, 182, 199, 0.2);
  border-radius: 5px;
  margin-bottom:20px;

  .iconfont1 {
    font-size: 14px;
    position: relative;
    top: 2px;
    left: 4px;
  }

  .editor-form-block-header {
    display: flex;
    font-size: 14px;
    color: $FONT_MAIN_BLACK;
    padding: 20px 20px 10px 20px;
    margin-bottom: 0px;
    // border-bottom: 1px solid $BORDER_GRAY;

    .beacon {
      width: 4px;
      margin-right: 10px;
      background-color: $BG_BLUE;
    }
  }

  .editor-form-block-body {
    padding: 20px 20px 12px 20px;
  }

  // .lz-form-item__label{
  //   font-size: 12px;
  // }
}
</style>
