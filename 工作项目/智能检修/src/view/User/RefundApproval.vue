<template>
    <div class="header-item">
        <div class="sub-item" @click="onGoToPrev">
            <div></div>
            <div>返回</div>
        </div>
        <div>退单审批</div>
        <div></div>
    </div>
    <div>
    <div class="test1">
        <div class="filter-container divItem">
          <div class="divItemSmallFirst">
            <div class="resultDescription"><span>标准项目编号</span></div><div class="margin-left"><p>711271M02J001</p></div>
          </div>
          <div class="divItemSmall">
            <div class="resultDescription"><span>项目名称</span></div><div style="width:5rem"><span>#添加水泵变频调速电机用通风机电
机及电缆绝缘测定常规维护</span></div>
          </div>
        </div>
    </div>
    <div class="test2">
        <div class="filter-container divItem">
          <div class="divItemSmall">
            <div class="resultDescription"><span>申请人</span></div><div>王大明</div>
          </div>
          <div class="divItemSmall">
            <div class="resultDescription"><span>职务</span></div><div>班组长</div>
          </div>
          <div class="divItemSmall">
            <div class="resultDescription"><span>申请时间</span></div><div>2021-4-21 12:00:00</div>
          </div>
        </div>
    </div>
    <div class="test3">
        <div class="filter-container divItem">
          <div class="divItemSmall">
            <div class="resultDescription"><span>申请人</span></div><div>王大明</div>
          </div>
          <div class="divItemSmall">
            <div class="resultDescription"><span>补充说明</span></div><div style="width:5rem"><span>如果文字很多的话，这里的文字就这
排布就可以了。如果文字很多的话，
里的文字就这样排布就可以了。字就
样排布就可以了。</span></div>
          </div>
        </div>
    </div>
    </div>
    <!-- <div class="order-source" @click="showOrder(order.id)">
              <div class="list-div">
                <div><span class="p1">退单审批结果</span><span class="clock">10:51</span></div>
                <div class="p2">你的订单已被作业张王大明拒绝</div>
              </div>
    </div> -->
    <div class="botton-div">
        <van-button type="default" class="botton" @click="onOk">查看委托书</van-button>
        <van-button type="default" class="botton" @click="onOk">拒绝</van-button>
        <van-button type="primary" class="botton" @click="onOk">同意</van-button>
    </div>
</template>

<script setup>
import { useRouter} from 'vue-router';
const router = useRouter();
const onOk = () => {
  router.push(`/h5/message`)
}
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

.header-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    background-image: url(/src/assets/bg-home-banner.png);
    font-size: 0.32rem;
    color: $WHITE;
    .sub-item {
        width: 20%;
        > :nth-child(1) {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
        border-top: 2px solid $WHITE;
        border-right: 2px solid $WHITE;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
        }
        > :nth-child(2) {
            display: inline-block;
        }
    }
    > :nth-child(2) {
        width: 60%;
    }
    > :nth-child(3) {
        width: 20%;
    }
}
.test1{
  position: relative;
  width: 100%;
  background: #F7F9FD;
  height: 2.18rem;
}
.test2{
  position: relative;
  width: 100%;
  height: 3rem;
  border-bottom:1px solid #F7F9FD ;
}
.test3{
  position: relative;
  width: 100%;
}
.botton-div{
    position: absolute;
    bottom: 0px;
    height: 1.36rem;
    border-top: 1px solid gainsboro;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.botton{
    width: 6.8rem;
    border-radius: 0.1rem;
    margin: 10px;
}
.resultDescription{
    font-size: 0.28rem;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #000000;
    line-height: 0.42rem;
    width: 2rem;
    text-align: left;;
    margin-left: 20px;
}
.margin-left{
  margin-left: 20px;
  width: 90%;
  margin-top: -16px;
}
.margin-left-two{
  margin-left: 20px;
  width: 4.8rem;
}
.margin-left-three{
  margin-left: 20px;
  width: 90%;
}
.divItemSmall{
  margin-top: 0.32rem;
  display: -webkit-box;
  flex-direction: row;
}
.divItem{
  display: flex;
  flex-direction: column;
  top: 0.4rem;
  position: relative;
}
</style>