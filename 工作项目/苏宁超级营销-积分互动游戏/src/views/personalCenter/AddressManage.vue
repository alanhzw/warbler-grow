<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-05 10:14:04
 * @LastEditTime: 2021-01-05 14:50:54
 * @FilePath: \SNActivity\src\views\personalCenter\AddressManage.vue
-->
<template>
  <div class="address-manage-box">
    <van-radio-group>
      <van-radio v-for="(item ,index) in addressList" :key="item.addressId + '' + index" :name="item.addressId" icon-size='0.33rem' :label-disabled='true'>
        <div class="item">
          <div class="item-left">
            <div class="item-1"><span class="slice-name">{{item.realName}}</span><span>{{item.mobileStr}}</span><span v-if="item.isDefault" class="item-default">默认地址</span></div>
            <div class="item-2">{{item.province + item.city + item.county+ item.detailInfo}}</div>
          </div>
          <div class="item-right">
            <span v-if="!item.isDefault" class="set-default" @click="updateDefault(item.addressId)">设为默认</span>
            <img class="item-right-icon" :src="editIcon" @click="toEdit(item.addressId)" />
            <img v-if="!item.isDefault" class="item-right-icon" :src="delIcon" @click="deleteAddress(item.addressId)" />
          </div>
        </div>
      </van-radio>
    </van-radio-group>
    <div class="button">
      <van-button type="info" block @click="addNewAddress()">+添加新地址</van-button>
    </div>
    <Dialog ref="dialog" :shopId="shopId" :unionld="unionld" :addressId="addressId" :type="2" @toDelete="toDelete" />
  </div>
</template>

<script>
// 引入封装api
import { commonService } from '@/axios/apis';

// 引入提示弹窗
import Dialog from '@/components/common/Dialog.vue';

const IS_DEFAULT = 1;
export default {
  name: '',
  components: {
    Dialog,
  },
  data () {
    return {
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      addressList: '', // 地址列表
      editIcon: '//img10.360buyimg.com/imgzone/jfs/t1/170484/4/196/1691/5fed6e04Edd1e6e82/ab17f8fcf9d087f8.png', // 修改地址图标
      delIcon: require('../../assets/img/del-icon.png'), // 删除地址图标
      addressId: '', // 地址id
    };
  },
  methods: {
    /**
     * @description:获取地址列表
     */
    async getAddressList () {
      await commonService['getAddressList']({
        shopId: this.shopId,
        pin: this.unionld,
      }).then(({ data }) => {
        // 如果请求成功
        if (data.success) {
          // 保存地址列表信息
          this.addressList = data.data.addressRespList;
          // 在地址列表信息中新增一个字段,用来对手机号进行中间四位加密
          this.addressList = this.addressList.map(item => {
            return {
              ...item,
              mobileStr: (item.mobile + '').slice(0, 3) + '****' + (item.mobile + '').slice(7, 11)
            };
          });
        } else {
          this.$toast(data.resp_msg);
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
          shopId: this.shopId,
          pin: this.unionld,
        }
      });
    },
    /**
     * @description: 展示确认删除地址的确认弹窗
     * @param {*} addressId 地址id
     */
    deleteAddress (addressId) {
      // 调用dialog组件的openDialog方法,参数为弹窗要显示的提示信息
      this.$refs.dialog.openDialog('是否删除该地址');
      this.addressId = addressId;
    },
    /**
    * @description: 确认删除地址
    * @param {*} addressId 地址id
     */
    async toDelete (addressId) {
      await commonService['deleteAddress']({
        shopId: this.shopId,
        pin: this.unionld,
        addressId: addressId
      }).then(({ data }) => {
        if (data.success) {
          // 关闭提示弹窗
          this.$refs.dialog.closeDialog();
          // 重新获取地址列表数据
          this.getAddressList();
          setTimeout(() => {
            this.$toast('删除地址成功');
          }, 500);
        } else {
          this.$toast(data.resp_msg);
        }
      });
    },
    /**
     * @description: 去修改地址
     */
    async toEdit (addressId) {
      // 跳转修改地址页面
      this.$router.push({
        name: 'EditAddress',
        query: {
          shopId: this.shopId,
          pin: this.unionld,
          addressId: addressId
        }
      });
    },
    /**
     * @description: 设为默认
     */
    async updateDefault (addressId) {
      await commonService['updateDefault']({
        shopId: this.shopId,
        pin: this.unionld,
        addressId: addressId,
        isDefault: IS_DEFAULT
      }).then(({ data }) => {
        if (data.success) {
          // 重新获取地址列表数据
          this.getAddressList();
          setTimeout(() => {
            this.$toast('设置默认地址成功');
          }, 500);
        } else {
          this.$toast(data.resp_msg);
        }
      });
    }
  },
  mounted () {
    // 初始化获取地址列表数据
    this.getAddressList();
  }
};
</script>

<style lang="scss">
.address-manage-box {
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
  .van-radio__icon {
    display: none;
  }
  .van-radio__label {
    display: inline-block;
    width: 100%;
  }
  .item-left {
    width: 80%;
  }
  .item-right {
    width: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .item-right-icon {
      width: 0.36rem;
      margin-top: 0.2rem;
    }

    .set-default {
      font-size: 0.25rem;
      color: #057eff;
    }
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

    .van-radio__icon--checked .van-icon-success::before {
      color: #1989fa;
    }
  }
}
</style>