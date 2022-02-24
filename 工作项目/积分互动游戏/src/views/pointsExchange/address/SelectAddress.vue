<!--
 * @Description:地址列表页面
 * @Autor: hanzhiwei
 * @Date: 2020-12-31 09:47:00
 * @LastEditTime: 2021-01-07 19:14:45
 * @FilePath: \SNActivity\src\views\pointsExchange\address\SelectAddress.vue
-->
<template>
  <div class="select-address-box">
    <van-radio-group v-model="selectRadio">
      <van-radio v-for="(item ,index) in addressList" :key="item.addressId + '' + index" :name="item.addressId" icon-size='0.33rem' :label-disabled='true' @click="getAddress(item.addressId)">
        <div class="item">
          <div class="item-left">
            <div class="item-1"><span class="slice-name">{{item.realName}}</span><span>{{item.mobileStr}}</span><span v-if="item.isDefault" class="item-default">默认地址</span></div>
            <div class="item-2">{{item.province + item.city + item.county+ item.detailInfo}}</div>
          </div>
          <div class="item-right">
            <img class="item-right-icon" :src="editIcon" @click="editAddress(item.addressId)" />
          </div>
        </div>
      </van-radio>
    </van-radio-group>

    <div class="button">
      <van-button type="info" block @click="addNewAddress()">+添加新地址</van-button>
    </div>
  </div>
</template>

<script>
// 引入封装api
import { commonService } from '@/axios/apis';
// 调用map辅助函数
import { mapMutations } from 'vuex';
export default {
  name: '',
  data () {
    return {
      selectRadio: '', // 选择的地址索引
      editIcon: '//img10.360buyimg.com/imgzone/jfs/t1/170484/4/196/1691/5fed6e04Edd1e6e82/ab17f8fcf9d087f8.png', // 修改地址图标
      addressList: [], // 地址列表
      selectedAddressForm: {}, // 选择的地址详细内容
    };
  },

  methods: {
    ...mapMutations('pointsExchange', ['changeAddress']),
    /**
     * @description: 获取地址列表
     */
    async getAddressList () {
      await commonService['getAddressList']({
        shopId: this.$route.query.shopId,
        pin: this.$route.query.pin,
      }).then(({ data }) => {
        if (data.success) {
          this.addressList = data.data.addressRespList;
          this.addressList = this.addressList.map(item => {
            return {
              ...item,
              mobileStr: (item.mobile + '').slice(0, 3) + '****' + (item.mobile + '').slice(7, 11)
            };
          });
          this.selectRadio = Number(this.$route.query.addressId);
        } else {
          this.$toast(data.resp_msg);
        }
      });
    },
    /**
     * @description: 去修改地址
     * @param {*} addressId
     */
    editAddress (addressId) {
      // 跳转修改地址页面
      this.$router.push({
        name: 'EditAddress',
        query: {
          shopId: this.$route.query.shopId,
          pin: this.$route.query.pin,
          addressId: addressId
        }
      });
    },
    /**
     * @description: 去添加新地址
     */
    addNewAddress () {
      // 跳转添加地址页面
      this.$router.push({
        name: 'EditAddress',
        query: {
          shopId: this.$route.query.shopId,
          pin: this.$route.query.pin,
        }
      });
    },
    /**
    * @description: 选择某个地址
    */
    getAddress (addressId) {
      this.selectRadio = addressId;
      this.selectedAddressForm = this.addressList.find(item => {
        return item.addressId === addressId;
      });
      this.changeAddress(this.selectedAddressForm);
      this.$router.back();
    }
  },
  mounted () {
    this.getAddressList();
  }
};
</script>

<style lang="scss">
.select-address-box {
  padding-bottom: 2rem;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #969696;
  }

  .item-1 {
    text-align: left;
    padding: 0.24rem 0;
    display: flex;
    justify-content: flex-start;
    line-height: 0.5rem;
  }

  .item-2 {
    text-align: left;
  }

  .item-default {
    background: #fb9f30;
    font-size: 0.24rem;
    color: #ffffff;
    padding: 0 0.06rem;
    margin-left: 0.3rem;
    line-height: unset;
  }
  .van-radio {
    margin-top: 0.24rem;
    background-color: #ffffff;
    font-size: 0.26rem;
    padding: 0.1rem 0.24rem 0.24rem 0.3rem;
    box-sizing: border-box;
  }

  .van-radio__label {
    display: inline-block;
    width: 100%;
  }

  .item-right-icon {
    width: 0.36rem;
    margin-top: 0.2rem;
  }
  .slice-name {
    display: inline-block;
    max-width: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 0.2rem;
  }
  .button {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;

    .van-button {
      width: 100%;
      height: 1rem;
    }

    .van-radio__icon--checked .van-icon {
      background-color: #ffffff;
    }

    .van-radio__icon--checked .van-icon-success::before {
      color: #1989fa;
    }
  }
}
</style>