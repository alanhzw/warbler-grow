<template>
  <!-- 新增地址 -->
  <div class="AddressAdd allpage">
    <i-inputAddress :formData='form' @saveForm='saveForm'></i-inputAddress>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IInputAddress from '@/components/IInputAddress.vue';

export default {
  name: 'AddressAdd',
  components: {
    IInputAddress,
  },
  data() {
    return {
      visible: false,
      text: '保存',
      form: {
        realName: '',
        mobile: '',
        province: '',
        city: '',
        county: '',
        address: [],
        detailInfo: '',
        countyCode: '',
        checked: true,
        isDefault: false,
      },
      state: 1,
    };
  },
  created() {

  },
  methods: {
    // 保存地址 返回上一页
    async saveForm(form) {
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 调用接口
      const res = await PointsService.addAddress({
        ...form,
        isDefault: form.isDefault ? 1 : 0,
      }, { needVisable: false });
      this.$toast('保存成功');
      this.state = 1;
      this.$router.back();
    },
  },

};
</script>

<style scoped>

</style>
