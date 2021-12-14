<!--
 * @Description:积分兑换京豆
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 18:44:38
 * @LastEditTime: 2021-01-21 10:25:00
 * @FilePath: \SNActivity\src\views\pointsExchange\PointsExchange.vue
-->
<template>
  <div class="points-exchange-box">
    <div v-for="(item, index) in modules" :key="`module-${index}`">
      <component :is="item.name" :options="item.options || {}" :activityInfo="activityInfo || {}" @exChangePrice="exChangePrice" @showAddressModal="showAddressModal" @showSelectGoods="showSelectGoods" />
    </div>
    <!-- 开卡 -->
    <open-card ref="openCard" :activityInfo="activityInfo" :unionld="unionld" @getActivityInfo="getActivityInfo" />
    <add-address ref="addAddress" :unionld="unionld || {}" :addressForm="addressForm" @getActivityInfo="getActivityInfo" />
    <select-goods ref="selectGoods" :activityInfo="activityInfo || {}" @changeWareParamsPrize='changeWareParamsPrize' />
    <sun-code ref="SunCode" :activityInfo="activityInfo || {}" />
    <Dialog ref="dialog" :activityInfo="activityInfo" :unionld="unionld" :type=" 1" />
  </div>
</template>

<script>
// 引入通用方法
import { banScale } from '@/assets/js/common';
// 注入组件
import '@/components/pointsExchange/index.js';
// 引入添加地址弹窗
import AddAddress from '@/components/pointsExchange/AddAddress';
// 引入选择规格弹窗
import SelectGoods from '@/components/pointsExchange/SelectGoods';
// 引入开卡弹窗
import OpenCard from '@/components/common/OpenCard.vue';
// 引入提示弹窗
import Dialog from '@/components/common/Dialog.vue';
// 引入太阳码
import SunCode from '@/components/common/SunCode.vue';
// 引入封装api
import { commonService, pointsExchangeService } from '@/axios/apis';
// 引入活动配置文件
import activitySettings from '@/data/pointsExchange/activitySettings';
// 引入苏宁方法
import getSn from '@/assets/js/suning.js';
const { galaxie, isSnApp, isMiniApp } = getSn();
// 调用map辅助函数
import { mapState } from 'vuex';
export default {
  name: '',
  components: {
    AddAddress,
    SelectGoods,
    OpenCard,
    SunCode,
    Dialog
  },
  data () {
    return {
      settings: '', // 总配置信息
      modules: '', // 组件信息
      // 活动详情
      activityInfo: {
        activityType: this.$route.params.activityType, // 活动类型
        activityId: this.$route.params.activityId, // 活动id
        selectedItem: 0, // 选择的规格索引
        status: 0, // 当前按钮状态
      },
      unionld: '', // 用户pin
      // 领取奖品请求参数
      params: {
        activityId: '',
        id: '',
        prizeId: '',
        pin: '',
      },
      // 添加地址表单
      addressForm: {
        province: '',
        city: '',
        county: '',
        realName: '',
        mobile: '',
        detailInfo: '',
      },
    };
  },
  computed: {
    ...mapState('pointsExchange', ['selectAddressForm'])
  },
  methods: {
    /**
     * @description: 判断开卡
     */
    async getOpenCard () {
      await commonService['getOpenCard']({
        shopId: this.activityInfo.shopId,
        snUnionId: this.unionld
      }).then(({ data }) => {
        if (data.result) {
          if (data.data.isOpenMem === 'N') {
            this.$refs.openCard.showModal = true;
          }
        } else {
          this.$toast(data.errorMessage);
        }
      });
    },
    /**
     * @description: 活动初始化
     */
    init () {
      let _this = this;
      // 获取用户pin
      galaxie.user.getUnionId(async (err, unionld) => {
        if (process.env.NODE_ENV === 'loacl') {
          unionld = process.env.VUE_APP_PIN;
        }
        if (err) {
          console.log(err);
        } else if (unionld) {
          _this.unionld = unionld;
          // 获取活动信息
          await _this.getActivityInfo();
          _this.getOpenCard();
          _this.$refs.SunCode.getSunCode();
        } else {
          this.$toast('获取pin失败');
        }
      }, true);
    },
    /**
     * @description: 获取活动信息
     */
    async getActivityInfo () {
      await pointsExchangeService[this.settings.apis.getInfo]({
        activityId: this.activityInfo.activityId,
        pin: this.unionld
      }).then(({ data }) => {
        if (data.success) {
          this.activityInfo = {
            ...this.activityInfo,
            ...data.data,
            ...this.selectAddressForm
          };
          this.activityInfo.activityRule = this.activityInfo.activityRule.replace(/\n/, '').replace(/\n/g, '<br/>');
          // 如果是实物 默认选择第一个实物的id作为奖品id
          if (this.activityInfo.activityType === 301) {
            this.params.prizeId = this.activityInfo.wareData[0].prizeId;
            this.activityInfo.showPics = JSON.parse(data.data.showPics);
            this.addressForm.province = this.activityInfo.province;
            this.addressForm.city = this.activityInfo.city;
            this.addressForm.county = this.activityInfo.county;
            this.addressForm.realName = this.activityInfo.realName;
            this.addressForm.mobile = this.activityInfo.mobile;
            this.addressForm.detailInfo = this.activityInfo.detailInfo;
            this.addressForm.shopId = this.activityInfo.shopId;
          }
        }


      });
    },
    /**
     * @description:兑换权益
     */
    async exChangePrice () {
      this.params.activityId = this.activityInfo.activityId;
      this.params.pin = this.unionld;
      if (this.activityInfo.activityType !== 301) {
        this.params.prizeId = this.activityInfo.prizeId;
      }
      // 如果是实物  请求参数添加地址等信息
      if (this.activityInfo.activityType === 301) {
        // 如果没有填写地址
        if (!this.addressForm.province) {
          this.$toast('请选择收货地址');
          return;
        }
        this.params.id = this.activityInfo.id;
        this.params = {
          ...this.params,
          ...this.addressForm
        };
      }

      await pointsExchangeService[this.settings.apis.exChangePrice](this.params).then(async ({ data }) => {
        if (data.success) {
          await this.getActivityInfo();
          // this.$toast('权益兑换成功');
          this.$refs.dialog.openDialog('权益兑换成功');
        } else {
          this.$refs.dialog.openDialog(data.resp_msg);
          // this.$toast(data.resp_msg);
        }
      });
    },
    /**
     * @description: 修改兑换实物地址参数
     */
    changeWareParamsAddress (params) {
      this.params = params;
    },
    /**
     * @description: 修改实物奖品规格参数
     */
    changeWareParamsPrize (prizeId, selectedItem) {
      this.params.prizeId = prizeId;
      this.activityInfo.selectedItem = selectedItem;
    },
    /**
    * @description: 展示选择规格弹窗
    */
    showSelectGoods () {
      this.$refs.selectGoods.showSelectGoods();
    },
    /**
     * @description:展示添加地址弹窗
     */
    showAddressModal () {
      if (!this.activityInfo.province) {
        this.$refs.addAddress.openAddressModal();
      } else {
        // 跳转地址选择页面
        this.$router.push({
          name: 'SelectAddress',
          query: {
            shopId: this.activityInfo.shopId,
            pin: this.unionld,
            addressId: this.activityInfo.addressId
          }
        });
      }
    },


  },
  async created () {
    this.settings = await activitySettings.getActivitySettings(this.$route.params.activityType);
    this.modules = this.settings.config.modules;
    this.init();
    banScale();
  },
};
</script>

<style lang="scss">
.points-exchange-box {
}
</style>