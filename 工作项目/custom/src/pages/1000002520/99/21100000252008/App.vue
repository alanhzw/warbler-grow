<template>
    <div class="e-card">
        <div class="e-card-background" v-for="item,index in eCard.values" :key="index">
            <input type="text" class="copy-input" :id="'copyInput' + index" :value="item.cardPwd"/>
            <span>{{ item.cardPwd }}</span>
            <img src="//img10.360buyimg.com/imgzone/jfs/t1/202587/10/2036/4566/611db822Ef6ad2b81/cb57cdbc0815546e.png" class="copy-btn"
                 :id="'cliptxt' + index" @click="copy(index)"
                 :data-clipboard-target="'#copyInput' + index">
        </div>
    </div>
    <div>
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/189598/25/19099/1021185/611db824Edf38f089/c714f7214dc77e2d.png" class="process">
    </div>

    <div class="unmatched" v-show="isCanExchange">
        <div class="modalBlock">
            <div class="contentBlock">
                <div class="close_btn" @click="isCanExchange = false"></div>
                <a class="goToShop" href="javascript:;" @click="goToShop()"></a>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, onMounted,
} from 'vue';
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

// 未中奖弹窗
const isCanExchange = ref(false);
const eCard = reactive([]);

const getECard = () => {
  const param = {
    activityId: baseInfo.activityId,
    pin: encodeURIComponent(baseInfo.pin),
  };
  cjwxRequest.post('/wyeth/card/main', param).then((res) => {
    if (res.success) {
      if (res.data.infos.length > 0) {
        eCard.values = res.data.infos;
      } else {
        isCanExchange.value = true;
      }
    } else {
      Toast(res.msg);
    }
  });
};

const copy = (id:string) => {
  const clipboard = new Clipboard(`#cliptxt${id}`);
  clipboard.on('success', (e) => {
    Toast('复制成功！');
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    Toast('复制失败，请长按复制！');
    clipboard.destroy();
  });
};

// 店铺首页
const goToShop = () => {
  window.location.href = `https://shop.m.jd.com/?shopId=${venderId}`;
};

onMounted(() => {
  getECard();
});
</script>

<style lang='scss'>
  body{
      background-color: #c0ed84;
  }
  #app{
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/182321/30/20055/848253/611db824E219d518d/71e802e23dd8bfa9.png") no-repeat #c0ed84;
      background-size: 100%;
  }
  .e-card{
      padding-top: 1.84rem;
      padding-bottom: 0.2rem;
  }
  .e-card-background{
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/198984/14/3918/3359/611db823E7662b14f/ea3c9f42f03fbbb9.png") no-repeat;
      background-size: 100%;
      width: 5rem;
      height: 1.15rem;
      padding: 0 0.2rem 0 0.16rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .copy-input{
      z-index: -999;
      position: absolute;
  }
  .e-card-background span{
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
      font-size: 0.4rem;
  }
  .copy-btn{
      width: 1.2rem;
  }
  .process{
      width: 90%;
      margin: 0 auto;
      display: block;
  }

  .modalBlock {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 1000;
      padding-top: 4rem;
      background: rgba(0, 0, 0, 0.8);
  }

  .contentBlock {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/36699/27/3197/74820/5cb7e1c6E346b3728/f60873e0ac3b31e6.png") no-repeat;
      background-size: 100%;
      width: 6.84rem;
      height: 5.92rem;
      display: block;
      margin: 0 auto 0 auto;
  }

  .goToShop {
      width: 5rem;
      height: 1.3rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 8.1rem;
  }

  .close_btn {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/31260/5/12583/1477/5cb7e1c6E66717eef/516b532546738cc7.png") no-repeat;
      background-size: 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 10rem;
  }
</style>
