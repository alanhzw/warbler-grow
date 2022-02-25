<template>
  <!-- 实物发货详情 -->
  <div v-if="$store.state.showDetail" class="ProductLogistics BtnStyle allpage">
    <div v-if="form.dealStatus === -1" class="bg_white"></div>
    <div v-if="form.dealStatus === -1" class="bg bgUrl_1">
      <p>已取消</p>
    </div>
    <div v-if="form.dealStatus === 0" class="bg bgUrl_2">
      <p>未发货</p>
    </div>
    <div v-if="form.dealStatus === 1" class="bg bgUrl_3">
      <p>已发货</p>
    </div>
    <div v-if="form.dealStatus === 9" class="bg bgUrl_4">
      <p>已完成</p>
    </div>
    <div class="contain">
      <div class="part_1">
        <van-icon v-if="form.dealStatus === -1" color="#a7a7a7" name="location-o" size="0.4rem"/>
        <van-icon v-else color="#0481ff" name="location-o" size="0.4rem"/>
        <div style="width: 5rem">
          <div class="namePhone">{{ form.realNameStr }} &nbsp;&nbsp;&nbsp; {{ form.mobileStr }}</div>
          <div v-if="form.province" class="address">
            {{ form.province + '' + form.city }}{{ form.county ? form.county : '' }}{{ form.detailInfo }}
          </div>
        </div>
      </div>
      <div class="part_2">
        <van-icon v-if="form.dealStatus === -1" color="#a7a7a7" name="point-gift-o" size="0.4rem"/>
        <van-icon v-else color="#0481ff" name="point-gift-o" size="0.4rem"/>
        <div class="part_2_position">
          <div class="product_name">
            <span>{{ form.prizeName }}</span>
            <!-- <span>x{{form.goodsNum}}</span> -->
          </div>
          <div v-if="form.dealStatus == 1" class="product_log">
            <span class="logistics">物流：{{ form.deliverName }}</span>
            <span>运单号：{{ form.deliverNo }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <i-shortButton v-if="form.dealStatus === 0 && form.addressLock === 1" :text='text' @clickBtn="changeAddress"></i-shortButton> -->
    <!-- 修改提示弹窗 -->
    <i-dialog :btns='btns' :showDelete='showDialog' @closeDialog='closeDialog' @toHandler='editAddress'></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDialog from '@/components/IDialog.vue';

export default {
  name: 'ProductLogistics',
  components: {
    IDialog,
  },
  data() {
    return {
      btns: ['收货地址错误可能无法收到奖品，是否确认修改？', '去修改', '取消'],
      showDialog: false,
      text: '修改地址',
      form: {},
    };
  },
  beforeRouteLeave(to, from, next) {
    this.showDialog = false;
    next();
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await PointsService.getDeliveryDetail({
        orderCode: this.$route.query.orderCode,
        shopId: this.$route.query.shopId,
        groupId: this.$route.query.groupId,
        session: this.$route.query.session,
      });
      this.form = res.data;
      this.form.realNameStr = `${this.form.realName.slice(0, 1)}**`;
      this.form.mobileStr = `${(`${this.form.mobile}`).slice(0, 3)}****${(`${this.form.mobile}`).slice(7, 11)}`;
    },
    // 关闭弹窗
    closeDialog() {
      this.showDialog = false;
    },
    // 提示信息
    changeAddress() {
      this.showDialog = true;
    },
    // 更改地址。跳入地址选择页
    editAddress() {
      this.showDialog = false;
      sessionStorage.setItem('lz_address_name', 'ProductLogistics');
      this.$router.push({
        name: 'AddressSelect',
        query: {
          // id: this.form.addressId,   // 地址id
          address: `${`${this.form.province}${this.form.city}`}${this.form.county ? this.form.county : ''}${this.form.detailInfo}`,
          // formId: this.form.id,       // 物流id
          orderCode: this.$route.query.orderCode,
          shopId: this.$route.query.shopId,
          groupId: this.$route.query.groupId,
          session: this.$route.query.session,
        },
      });
    },
  },
};
</script>

<style scoped>
.bg_white {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.bg {
  margin-top: 0.24rem;
  width: 100%;
  background: #ffffff;
  height: 2rem;
  padding: 0.3rem;
  box-sizing: border-box;
}

.bg p {
  font-size: 0.3rem;
  text-align: left;
  line-height: 0.7rem;
  color: #ffffff;
}

.bgUrl_1 {
  background: url('//img10.360buyimg.com/imgzone/jfs/t1/127841/22/1487/85819/5ebcc4caEba074049/eee2f24ee345236f.png') no-repeat;
  background-size: 100% 100%;
}

.bgUrl_2 {
  background: url('//img10.360buyimg.com/imgzone/jfs/t1/105186/10/17087/77146/5e844dbaE4c10e015/4fbe94fe32f12e35.png') no-repeat;
  background-size: 100% 100%;
}

.bgUrl_3 {
  background: url('//img10.360buyimg.com/imgzone/jfs/t1/125238/38/1482/56682/5ebcbe97E58fd7eb9/86af7501887e64ea.png') no-repeat;
  background-size: 100% 100%;
}

.bgUrl_4 {
  background: url('//img10.360buyimg.com/imgzone/jfs/t1/117363/12/6755/71783/5ebcc4caEa83d544c/1ba415262047d320.png') no-repeat;
  background-size: 100% 100%;
}

.contain {
  width: 100%;
  position: fixed;
  padding: 0.3rem;
  top: 1.2rem;
  box-sizing: border-box;
}

.part_1 {
  background: #ffffff;
  width: 100%;
  min-height: 2rem;
  border-radius: 0.1rem;
  display: flex;
  justify-content: flex-start;
  padding: 0.3rem;
  box-sizing: border-box;
}

.part_2 {
  margin-top: 0.24rem;
  background: #ffffff;
  width: 100%;
  min-height: 2rem;
  border-radius: 0.1rem;
  padding: 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}

.part_2_position {
  width: 100%;
  padding-right: 0.3rem;
}

.part_1 >>> .van-icon, .part_2 >>> .van-icon {
  display: flex;
  align-items: center;
  padding-right: 0.3rem;
}

.namePhone {
  font-size: 0.32rem;
  color: #333333;
  font-weight: bold;
  text-align: left;
  padding: 0.2rem 0 0.1rem 0;
}

.address {
  text-align: left;
  color: #a7a7a7;
  font-size: 0.24rem;
  width: 80%;
}

.product_name {
  display: flex;
  color: #333333;
  justify-content: space-between;
  font-size: 0.28rem;
  line-height: 0.6rem;
  text-align: left;
}

.product_log {
  text-align: left;
  color: #a7a7a7;
  font-size: 0.24rem;
  width: 100%;
}

.logistics {
  padding: 0.06rem;
  background: #f2f2f2;
  margin-right: 0.1rem;
}
</style>
