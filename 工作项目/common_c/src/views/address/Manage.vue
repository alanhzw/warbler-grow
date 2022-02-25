<template>
  <div v-if="$store.state.showDetail" class="AddressManage allpage">
    <i-address :isSelect='isSelect' :list='list' @deletAddress='deletAddress' @editAddress='editAddress'
               @setDefault='setDefault'></i-address>
    <i-shortButton :text='text' :type='long' @clickBtn="addAddress"></i-shortButton>
    <!-- 删除提示弹窗 -->
    <i-dialog :btns='btns' :showDelete='showDelete' @closeDialog='closeDialog' @toHandler='toDelet'></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IAddress from '@/components/IAddress.vue';
import IDialog from '@/components/IDialog.vue';
import IShortButton from '@/components/IShortButton.vue';

export default {
  name: 'AddressManage',
  components: {
    IAddress,
    IDialog,
    IShortButton,
  },
  computed: {
    // 取地址长度 最多10个地址 超过10个添加按钮不显示
  },
  data() {
    return {
      long: '1',
      text: '+添加新地址',
      showDelete: false,
      deleteVal: '',
      isSelect: false,
      btns: ['是否删除该地址', '删除', '取消'],
      list: [],
      state: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取地址列表
    async getList() {
      const res = await PointsService.getAddressList();
      if (res.data) {
        this.list = res.data.addressRespList;
        this.list = this.list.map((v) => ({
          ...v,
          mobileStr: `${(`${v.mobile}`).slice(0, 3)}****${(`${v.mobile}`).slice(7, 11)}`,
        }));
      } else {
        this.list = [];
      }
    },
    // 添加新地址
    addAddress() {
      if (this.list.length === 10) {
        this.$toast('最多可以添加10条地址');
        return;
      }
      this.$router.push({
        name: 'AddressAdd',
      });
    },
    editAddress(val) {
      // 跳编辑地址页面
      this.$router.push({
        name: 'AddressEdit',
        query: {
          id: val,
        },
      });
    },
    // 关闭弹窗
    closeDialog() {
      this.showDelete = false;
    },
    // 删除地址提示
    deletAddress(val) {
      // 记录要删除的id
      this.deleteVal = val;
      // 删除地址弹窗
      this.showDelete = true;
    },
    // 删除地址接口
    async toDelet() {
      if (this.state === 2) {
        return;
      }
      this.state = 2;
      // 请求数据
      const req = {
        addressId: this.deleteVal,
      };
      try {
        const res = await PointsService.deleteAddress(req);
        this.$toast('删除地址成功');
        // 重新调取接口
        this.getList();
        this.showDelete = false;
      } finally {
        this.state = 1;
      }
    },
    // 设为默认
    async setDefault(val) {
      if (this.state === 2) {
        return;
      }
      this.state = 2;
      // 请求数据
      const req = {
        addressId: val,
        isDefault: 1,
      };
      // 设为默认接口
      try {
        const res = await PointsService.isDefault(req);
        this.$toast('设置默认地址成功');
        // 重新调取接口
        this.getList();
      } finally {
        this.state = 1;
      }
    },
  },
};
</script>
<style scoped>

</style>
