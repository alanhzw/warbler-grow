<template>
  <div v-if="$store.state.showDetail" class="PointsSeckill allpage">
    <i-swipe :swipers='details.showPicsParse'></i-swipe>
    <i-bzzzik :product='details'></i-bzzzik>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-select :address='submitForm' :addressId='details.addressId' :options='options' @newAddress='newAddress'
              @select="selectItem"></i-select>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="102" @exchange="exchange"></i-button>

    <!-- 兑换成功弹窗 -->
    <i-dialog :showFinish="showFinish" :showSuccess="showSuccess" :text="tipMsg" @closeDialog="closeDialog"></i-dialog>
    <!-- 地址弹窗 -->
    <i-addressDialog :areaList="areaList" :showAddress="showAddress" :formData="details" @closeDialog="closeDialog" @formSubmit="formSubmit"></i-addressDialog>

    <!-- 选择规格 弹窗 -->
    <i-selectPopup :options="options" :showSelect="show" @changeItem="changeItem" @closeDialog="closeDialog"
                   @saveChange="saveChange"></i-selectPopup>
    <!-- 开卡弹窗 -->
    <i-openCard :isShowOpenCard="isShowOpenCard" @closeCardDialog="closeCardDialog"
                @toHandler="toOpenCardLink"></i-openCard>

  </div>
</template>
<script>
import { PointsService } from '@/http';
import { openCard } from '@/assets/js/openCard';
import IOpenCard from '@/components/IOpenCard.vue';
import ISelectPopup from '@/components/ISelectPopup.vue';
import ISwipe from '@/components/ISwipe.vue';
import ICondition from '@/components/ICondition.vue';
import ISelect from '@/components/ISelect.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IAddressDialog from '@/components/IAddressDialog.vue';
import IButton from '@/components/IButton.vue';
import IBzzzik from '@/components/IBzzzik.vue';

export default {
  mixins: [openCard],
  name: 'PointsSeckill',
  components: {
    ISelectPopup,
    ISwipe,
    ICondition,
    ISelect,
    IRules,
    IDialog,
    IAddressDialog,
    IButton,
    IBzzzik,
    IOpenCard,
  },
  data() {
    return {
      areaList: {},
      show: false,
      // prizeId: '',
      // pindex: '',
      form: {},
      showAddress: false,
      showFinish: false,
      showSuccess: false,
      tipMsg: '',
      details: {
        state: 0,
        startTime: '',
        endTime: '',
        type: 3,
        currentGradeNeedPoint: '',
        nextGradeNeedPoint: '',
        isDaily: true,
        memberDaily: '',
        prizeName: '', // 奖品名称
        showPrice: '',
        supportLevels: '',
        status: 0, // 可兑换状态
        province: '',
        city: '',
        county: '',
        detailInfo: '',
        activityRule: '',
        mobile: '',
        isDefault: '',
        realName: '',
        showPicsParse: ['//img10.360buyimg.com/imgzone/jfs/t1/112649/17/5556/4678/5eb4f6f2E08d0e9a6/dd86b4e3652f4e44.png'],
        addressId: '', // addressId
        customerId: '', // 0-常规地址，1-默认地址
      },
      // 实物规格 wareData
      options: [{
        prizeName: '',
      }],
      state: 1,
      submitForm: {},
    };
  },
  watch: {
    'details.state': {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal === 1 && oldVal === 0) {
          this.getDetail();
        } else if (newVal === 2 && oldVal === 1) {
          this.getDetail();
        }
      },
    },
    'details.newDate': {
      deep: true,
      handler(newVal, oldVal) {
        if (this.details.startTime1) {
          if (new Date().getTime() >= new Date(this.details.startTime).getTime()) {
            // 未开始 ->  进行中
            if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
              this.getDetail();
              // 下一期  新加一个字段perStatus 0：可兑 1：不可兑  取消自动刷新
              // 如果可兑换 this.details.status === 7
              // 不可兑换 状态不变
            }
            // 进行中 ->  已结束
            if (oldVal <= this.details.endTime1 && newVal >= this.details.endTime1) {
              this.getDetail();
            }
          }
        } else {

        }
      },
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name !== 'AddressSelect') {
      this.$store.commit('setAddressToProduct', {});
    }
    next();
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getAreaInfo(shopId) {
      try {
        const res = await PointsService.getAreaInfo({ shopId });
        this.areaList = res.data;
      } catch {

      } finally {
        this.showArea = true;
      }
    },
    // 选中变色
    changeItem(prizeId) {
      this.options.forEach((element) => {
        element.select = element.prizeId === prizeId;
      });
    },
    // 点击确定之后直接兑换
    saveChange(id, index) {
      if (id) {
        this.submitForm.prizeId = id;
        this.options.forEach((element) => {
          element.select = element.prizeId === id;
        });
      }
      if (index) {
        this.$store.commit('setPrizeIndex', index);
      }
      this.exchangeWare();
    },
    // 兑换接口
    async exchangeWare() {
      // 防连点
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 请求参数
      try {
        const res = await PointsService.exchangeWareSeckill(this.submitForm, {
          needVisable: false,
        });
        this.showSuccess = true;
        this.tipMsg = this.$store.state.msg[2];
        this.getDetail();
      } catch {

      } finally {
        this.show = false;
        this.state = 1;
      }
    },
    // 获取详情
    async getDetail() {
      clearInterval(this.setIntervalNum);
      const res = await PointsService.getSeckillProductDetail({
        activityId: this.$route.query.activityId,
      });
      this.details = {
        ...res.data,
        type: 3,
        state: 0,
        showPicsParse: JSON.parse(res.data.showPics),
        ...this.$store.state.addressToProduct,
      };
      this.submitForm = {
        id: this.details.id,
        activityId: this.details.activityId,
        realName: this.details.realName,
        mobile: this.details.mobile,
        prizeId: res.data.wareData.length > 1 ? (res.data.wareData.filter((v) => v.operation === 0).length > 0 && res.data.wareData.filter((v) => v.operation === 0)[0].prizeId) : res.data.wareData[0].prizeId,
        province: this.details.province,
        city: this.details.city,
        county: this.details.county,
        detailInfo: this.details.detailInfo,
        grade: this.details.grade,
      };
      // 规格
      if (!this.prizeIndex) {
        try {
          res.data.wareData.forEach((e, index) => {
            if (!e.operation) {
              this.prizeIndex = index;
              throw new Error();
            }
          });
        } catch {
        }
      }
      this.options = res.data.wareData.map((v, index) => {
        if (index === this.prizeIndex) {
          return {
            ...v,
            select: true,
          };
        }
        return {
          ...v,
          select: false,
        };
      });
      // 当天开始，当天结束处理数据
      if ((new Date().getTime() < new Date(this.details.endTime).getTime()) && this.details.hasCycle === 2) {
        this.details.startTime1 = new Date(this.details.beginDate).getTime();
        this.details.endTime1 = new Date(this.details.endDate).getTime();
      }
      this.details = this.$core.dealForm(this.setIntervalNum, this.details);
      this.setIntervalNum = setInterval(() => {
        this.details = this.$core.dealForm(this.setIntervalNum, this.details);
      }, 1000);
      this.getOpenCard(this.details.groupId, this.details.shopId, this.details.channelId);
      this.getAreaInfo(this.details.shopId);
    },
    // 选择规格
    selectItem(id, index) {
      this.submitForm.prizeId = id;
      this.$store.commit('setPrizeIndex', index);
      this.options.forEach((element) => {
        element.select = element.prizeId === id;
      });
    },
    // 新建收货地址
    newAddress(id, province) {
      if (!province) {
        this.showAddress = true;
      } else {
        // 跳转地址选择页面
        sessionStorage.setItem('lz_address_name', 'ProductDetail');
        this.$router.push({
          name: 'AddressSelect',
          query: {
            id,
          },
        });
      }
    },
    // 地址提交
    async formSubmit(form) {
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 新增地址接口
      try {
        const res = await PointsService.addAddress({
          ...form,
          isDefault: 1,
        });
        this.$toast('保存成功');
        this.submitForm = {
          ...this.submitForm,
          ...form,
        };
        this.showAddress = false;
      } finally {
        this.state = 1;
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.showAddress = false;
      this.showFinish = false;
      this.showSuccess = false;
      this.show = false;
    },
    // 立即兑换
    async exchange() {
      // 判断地址是否存在
      if (!this.submitForm.province) {
        this.showAddress = true;
        return;
      }
      if (this.options.length > 1) {
        this.show = true;
      } else {
        this.exchangeWare();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.setIntervalNum);
  },
};
</script>
<style scoped>

</style>
