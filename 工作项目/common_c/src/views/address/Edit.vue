<template>
  <!-- 编辑地址 -->
  <div class="AddressEdit allpage">
    <i-inputAddress v-if="visible" :formData='form' :isDefault='isDefault' @saveForm='saveForm'></i-inputAddress>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IInputAddress from '@/components/IInputAddress.vue';

export default {
  name: 'AddressEdit',
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
        isDefault: '',
        countyCode: '',
      },
      isDefault: '',
      state: 1,
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    // 详情
    async getDetails() {
      const res = await PointsService.addressDetails({
        addressId: this.$route.query.id,
      });
      this.form = {
        ...res.data,
        isDefault: res.data.isDefault === 1,
      };
      this.isDefault = res.data.isDefault === 1;
      this.visible = true;
    },
    // 保存地址 返回上一页
    async saveForm(form) {
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 调用接口
      const res = await PointsService.updateAddress({
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
