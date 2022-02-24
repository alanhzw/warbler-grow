<template>
  <div class="page-activity-preview" @click.capture.stop>
    <component :is="$route.params.templateKey" :options="options" :formData="formData"/>
  </div>
</template>
<script>
import '../modules';
import { ActivityService } from '@/mobile/service';

export default {
  data() {
    return {
      options: {},
      formData: {},
    };
  },
  created() {
    this.getCacheJSON();
  },
  methods: {
    async getCacheJSON() {
      try {
        const { data } = await ActivityService.getCacheJSON({
          key: this.$route.query.key,
        });
        console.log('🚀 ~ getCacheJSON ~ value', data);
        const {
          options, formData,
        } = JSON.parse(data.value);
        this.options = options;
        this.formData = formData;
      } catch (ignore) {
        console.error(ignore);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-activity-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>
