
<template>
  <div class="addr-form" @click.stop>
    <van-field v-model="value" label="文本" placeholder="输入框内容右对齐" input-align="right" />

    <address-edit save-button-text="提交" @save="onSave" />
  </div>
</template>
<script>
import areaData from '@/mobile/data/vantArea';

export default {
  name: 'AddrForm',
  data() {
    return {
      areaData,
      value: '',
    };
  },
  methods: {
    onSave() { },
    onDelete() { },
    onChangeDetail() { },
  },
};
</script>
<style lang="scss">
.addr-form {
}
</style>
