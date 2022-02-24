/**
 * @Description:caoshijie
 * @Date: 2021/12/15
 * @Description: 小糊涂仙 重启
 * @FilePath:src\pages\1000088382\99\2112100008838203\App.vue
*/
<template>
  <div class='rule_btn' @click='showDialog.isShowRule = true'>活动规则</div>
  <img class='kv' src='./assets/kv.png' />
  <div class='title_box'>
    <img class='title_img' src='./assets/title.png' alt=''>
    <div class='title'>
      <div class='trial'>
        <img @click='applySku("4256585")' class='trial_img' src='./assets/trial1.png'>
        <img @click='applySku("100015284704")' class='trial_img' src='./assets/trial2.png'>
        <img @click='applySku("7644963")' class='trial_img' src='./assets/trial3.png'>
      </div>
      <div class='claim_escription'>
        <p style='font-size: 0.21rem;color: #ffffff;'>申领说明：</p>
        <p>仅限京东自营小糊涂仙旗舰店会员参与活动，非会员可入会参与。每位用户仅可申请一次，每次仅可申请一款酒品，每期试用活动无法重复参与。</p>
        <p>活动结束后将在所有申请名单中随机选取<span class='key'>20</span>名用户赠送普仙小酒52度100ml，</p>
        <p>选取 <span class='key'>5</span>名用户赠送52度典藏500ml，选取<span class='key'>3</span>名用户赠送仙酿礼盒。奖品数量有限，火速参与吧！</p>
      </div>
    </div>
  </div>
  <div class='sku' v-once>
    <img v-for='item in 10' :key='item' @click='goDetails' class='sku_img' :src='require(`./assets/skuList/sku${item}.png`)'>
    <img @click='goDetails' style='width: 7.01rem;margin-right: 0;' class='sku_img' src='./assets/skuList/sku11.png'>
  </div>
  <img class='go_more' @click='goMore' src='./assets/title3.png'>

  <!--  非会员弹窗框-->
  <Overlay :show='showDialog.isNoMember' @click='showDialog.isNoMember = false'>
    <div class='wrapper' @click.stop>
      <div class='content'>
        <img class='logo' src='./assets/logo.png'>
        <div class='member'>您还不是小糊涂仙会员</div>
        <div class='member'>立即入会继续参加活动</div>
        <div class='join_btn' @click='joinMember'>立即入会</div>
      </div>
    </div>
  </Overlay>
  <!--  规则-->
  <Overlay :show='showDialog.isShowRule' @click='showDialog.isShowRule = false'>
    <div class='wrapper' @click.stop>
      <div class='content'>
        <div class='rule_box'>
          <div class='rule_title'>—活动规则—</div>
          <div class='rule' v-html='ruleText'></div>
        </div>
      </div>
    </div>
  </Overlay>
  <!--  地址-->
  <Overlay :show='showDialog.isAddress' @click='showDialog.isAddress = false,formData={},addressCode=""' @touchmove.self.prevent :lock-scroll='false'>
    <div class='wrapper' @click.stop>
      <div class='content' @touchmove.self.prevent>
        <div class='address_form' @touchmove.self.prevent>
          <div class='address_title'>—填写信息—</div>
          <div class='form_item'>
            <div class='label' style='line-height: .59rem'>姓名</div>
            <input class='form_input' type='text' maxlength='10' v-model='formData.receiver' placeholder='请输入姓名'>
          </div>
          <div class='form_item'>
            <div class='label' style='line-height: .59rem'>电话</div>
            <input class='form_input' type='text' maxlength='11' v-model='formData.phone' placeholder='请输入电话'>
          </div>
          <div class='form_item'>
            <div class='label' style='line-height: .59rem'>地区</div>
            <div class='form_input'>
              <input type='text' readonly v-model='addressCode' @click='addressSelects =true' placeholder='请选择地区'>
            </div>
          </div>
          <div class='form_item'>
            <div class='label'>详细地址</div>
            <div class='form_input'>
              <input type='text' v-model='formData.address' placeholder='请输入详细地址'>
            </div>
          </div>
          <div class='form_item'>
            <div class='label'>邮政编码</div>
            <input class='form_input' type='text' maxlength='6' v-model='formData.postalCode' placeholder='请输入邮政编码'>
          </div>
          <div class='join_btn sub_btn' @click='confirmAdd'>确认提交</div>
        </div>
      </div>
    </div>
  </Overlay>
  <!--地址选择-->
  <Popup v-model:show='addressSelects' position='bottom'>
    <Area
      title='请输入详细地址'
      :area-list='areaList'
      @confirm='confirmAddress'
      @cancel='addressSelects = false'
    />
  </Popup>
</template>

<script setup lang='ts'>
import { inject, onMounted, reactive, ref } from 'vue';
import { Overlay, Popup, Area, Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { BaseInfo } from '@/types/BaseInfo';
import { ruleText, subForm, addressForm, getApplyStatue } from './hook/tools';

const isOpenCard = inject('isOpenCard');
const showDialog = reactive({
  isNoMember: false, // 不是会员
  isShowRule: false, // 规则
  isAddress: false, // 地址
});
// 选择地区
const addressSelects = ref(false);
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const formData = reactive({}) as addressForm;
const addressCode = ref('');
// 申领
const applySku = async (skuId: string) => {
  if (!isOpenCard) {
    showDialog.isNoMember = true;
    return;
  }
  const status = await getApplyStatue(skuId, baseInfo.activityId);
  if (status.result) {
    formData.applyType = skuId;
    showDialog.isAddress = true;
  }
};
// 地址确认三级联动地址
const confirmAddress = (addressItemList: any) => {
  formData.province = addressItemList[0].name;
  formData.city = addressItemList[1].name;
  formData.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item: any) => item.name)
    .join('/');
  addressSelects.value = false;
};
// 地址确认提交
const confirmAdd = async () => {
  const res = await subForm(formData, baseInfo.activityId);
  if (res.result) {
    Toast('申请成功。');
    showDialog.isAddress = false;
  }
};
const goDetails = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/2RSY9As3TKAF88sGYyzim9hJEKBb/index.html';
};
const goMore = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/nyb4ALUMVryrauAdZU3peCHDPZ7/index.html';
};
const joinMember = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000088382&channel=9678&returnUrl=${window.location.href}`;
};
// onMounted(() => {
//   if (!isOpenCard) {
//     showDialog.isNoMember = true;
//   }
// });
</script>
<style>
html, body {
  width:100%;
  background: #b42117;
  overflow-x: hidden;
}
/*修改滚动条样式*/
div::-webkit-scrollbar {
  display: none;
}
</style>
<style lang='scss' scoped>
.kv {
  width:100%;
  display: block;
}

.rule_btn {
  line-height: 0.52rem;
  background-image: linear-gradient(90deg,
    #dfb083 0%,
    #ffe8d3 49%,
    #dfb083 100%),
  linear-gradient(
      #ffffff,
      #ffffff);
  background-blend-mode: normal,
  normal;
  box-shadow: 0rem 0.12rem 0.18rem 0rem rgba(0, 0, 0, 0.47);
  border-radius: 0.25rem 0 0 .25rem;
  text-align: center;
  font-size: 0.28rem;
  color: #cb1812;
  position: absolute;
  right:0rem;
  top: .78rem;
  padding: 0 .1rem 0 .15rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.title_box {
  position: relative;
  width:100%;
  .title_img {
    width:100%;
    margin-top: -1rem;
  }

  .title {
    width: 6.6rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .trial_img {
    width: 2.2rem;
    display: inline-block;
  }

  .claim_escription {
    margin-top: .15rem;
    font-size: .15rem;
    color: #f2e6c8;
    line-height: .3rem;

    .key {
      color: #f5bf03;
    }
  }
}

.sku {
  padding: 0 .24rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width:100%;
  display: flex;
  flex-wrap: wrap;
  .sku_img {
    width: 49%;
    margin-right: .12rem;
    margin-bottom: .16rem;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

}

.go_more {
  width: 5.47rem;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: .2rem;
  margin-bottom: 1.39rem;
}

.wrapper {
  width: 6.8rem;
  height: 8rem;
  margin-left: .35rem;
  margin-top: 1.7rem;
  background: url("./assets/dialogBg.png") no-repeat;
  background-size: 100%;
  position: relative;
}

.content {
  overflow: hidden;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  text-align: center;
  color: #fff;
  //非会员
  .logo {
    width: 2.2rem;
    margin-top: 1.3rem;
  }

  .member {
    font-size: 0.42rem;
    line-height: .7rem;
    color: #ffffff;

    &:nth-child(2) {
      margin-top: .3rem;
    }
  }

  .join_btn {
    width: 2.37rem;
    margin-left: 50%;
    transform: translateX(-50%);
    line-height: 0.72rem;
    border-radius: 0.36rem;
    border: solid 0.04rem #c9ab89;
    background: url("./assets/btnBg.png") no-repeat;
    background-size: 100%;
    font-size: 0.42rem;
    color: #fae1c9;
    margin-top: 1rem;
  }

  //规则
  .rule_box {
    width: 5.68rem;
    height: 7.4rem;
    background-image: linear-gradient(131deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(3, 3, 3, 0.5) 100%),
    linear-gradient(
        #f3dcc0,
        #f3dcc0);
    background-blend-mode: overlay,
    normal;
    box-shadow: -0.08rem 0.05rem 0.09rem 0rem rgba(0, 0, 0, 0.1);
    border-radius: 0.3rem;
    margin-top: .35rem;
    margin-left: .56rem;
    overflow: hidden;

    .rule_title {
      line-height: 0.4rem;
      font-size: 0.42rem;
      color: #d03b31;
      margin-top: .27rem;
    }

    .rule {
      max-height: 6.6rem;
      overflow-y: auto;
      font-size: 0.18rem;
      line-height: 0.3rem;
      color: #010000;
      padding: 0 .47rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: left;
    }
  }

  //地址
  .address_form {
    width: 4.8rem;
    height: 6.06rem;
    background: #fff;
    margin-left: 1rem;
    margin-top: .97rem;
    padding: 0 .53rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #010000;

    .address_title {
      padding: .2rem 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 0.4rem;
      font-size: 0.42rem;
      border-bottom: solid 0.01rem #000000;
    }

    .form_item {
      display: flex;
      font-size: .3rem;
      margin-top: .3rem;

      .label {
        width: .8rem;
        vertical-align: middle;
        line-height: 0.29rem;
      }

      .form_input {
        width: 3rem;
        background-image: linear-gradient(
            #d9d7d7,
            #d9d7d7),
        linear-gradient(
            #c0c0c0,
            #c0c0c0);
        background-blend-mode: normal,
        normal;
        border-radius: 0.3rem;
        border: 0;
        padding: 0 .3rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        line-height: .59rem;
        overflow-x: auto;

        input {
          width: 6rem;
          display: inline-block;
          border: 0;
          margin-left: -.1rem;
          background-image: linear-gradient(
              #d9d7d7,
              #d9d7d7),
          linear-gradient(
              #c0c0c0,
              #c0c0c0);
        }
      }

    }

    .sub_btn {
      margin-top: .4rem;
    }
  }
}
</style>
