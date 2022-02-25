<template>
  <!-- 积分兑换物品 -->
  <div v-if="$store.state.showDetail" class="ProductDetail allpage">
    <i-swipe :swipers='details.showPicsParse'></i-swipe>
    <i-allDetial :details='details'></i-allDetial>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-select :address='submitForm' :addressId='details.addressId' :options='options' @newAddress='newAddress'
              @select="selectItem"></i-select>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="101" @exchange="exchange"></i-button>

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
import IAllDetial from '@/components/IAllDetial.vue';
import ICondition from '@/components/ICondition.vue';
import ISelect from '@/components/ISelect.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IAddressDialog from '@/components/IAddressDialog.vue';
import IButton from '@/components/IButton.vue';

export default {
  mixins: [openCard],
  name: 'ProductDetail',
  components: {
    ISelectPopup,
    ISwipe,
    IAllDetial,
    ICondition,
    ISelect,
    IRules,
    IDialog,
    IAddressDialog,
    IButton,
    IOpenCard,
  },
  data() {
    return {
      show: false,
      prizeId: '',
      pindex: '',
      setIntervalNum: 0,
      form: {},
      showAddress: false,
      showFinish: false,
      showSuccess: false,
      tipMsg: '',
      details: {
        type: 3,
        currentGradeNeedPoint: '',
        nextGradeNeedPoint: '',
        isDaily: '',
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
        addressId: '', // addressId
        customerId: '', // 0-常规地址，1-默认地址
        showPicsParse: [],
      },
      // 实物规格 wareData  默认给初始值，不然报错
      options: [{
        prizeName: '',
      }],
      state: 1, // 防止连点
      // 兑换数据
      submitForm: {},
      prizeIndex: 0,
      // 地址库
      areaList: {},
    };
  },
  beforeRouteLeave(to, from, next) {
    if (from.name !== 'AddressSelect') {
      this.$store.commit('setAddressToProduct', {});
    }
    next();
  },
  watch: {
    // 监听活动大时间  开始 与 结束
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
            if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
              this.getDetail();
            }
            if (oldVal <= this.details.endTime1 && newVal >= this.details.endTime1) {
              this.getDetail();
            }
          }
        } else {

        }
      },
    },
  },
  created() {
    this.prizeIndex = this.$store.state.prizeIndex;
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
      // 接口逻辑
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      try {
        const res = await PointsService.exchangeWare(this.submitForm, {
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
      const res = await PointsService.getProductDetail({
        activityId: this.$route.query.activityId,
      });
      console.log('res', res.data);

      this.details = {
        ...res.data,
        type: 3,
        showPicsParse: JSON.parse(res.data.showPics),
        ...this.$store.state.addressToProduct,
      };

      // 提交时的参数
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
      // 规格选择
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
        if (!v.operation && index === this.prizeIndex) {
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
      if ((new Date().getTime() < new Date(this.details.endTime).getTime()) && this.details.hasCycle === 2) {
        this.details.startTime1 = new Date(this.details.beginDate).getTime();
        this.details.endTime1 = new Date(this.details.endDate).getTime();
      }
      this.setIntervalNum = setInterval(() => {
        this.details.newDate = new Date().getTime();
        this.details = this.$core.dealFormDetail(this.setIntervalNum, this.details);
      }, 1000);
      this.getOpenCard(this.details.groupId, this.details.shopId, this.details.channelId);
      this.state = 1;
      this.getAreaInfo(this.details.shopId);
    },
    // dealForm() {
    //   if(this.details.startTime){
    //     this.details.startTime = this.details.startTime.replace(/-/g, "/");
    //   }
    //   if(this.details.endTime){
    //     this.details.endTime = this.details.endTime.replace(/-/g, "/");
    //   }
    //   this.details = {
    //     ...this.details,
    //     time: (new Date(this.details.endTime).getTime()) - (new Date().getTime()),
    //     state: new Date(this.details.startTime).getTime() > new Date().getTime() ? 0 :
    //            new Date().getTime() > new Date(this.details.endTime).getTime() ? 2 : 1
    //   }
    //   if (this.details.time <= 0) {
    //     clearInterval(this.setIntervalNum)
    //   }
    // },
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
        sessionStorage.setItem('lz_address_name', 'ProductDetail');
        // 跳转地址选择页面
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
      } catch {

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
