<template>
  <div class="company-banner">
    <div class="company-info">
      <img class="avatar"
           :src="companyInfo.logoUrl">
      <p class="company-name">{{companyInfo.shortName}}</p>
      <!-- <p class="company-desc">{{companyInfo.name}}主板上市公司：600556</p> -->
    </div>

    <ul class="company-nav">
      <li :class="{active: activeIndex === 0}"
          id='info'
          @click="scrollTo(0)">公司介绍</li>
      <li :class="{active: activeIndex === 3}"
          id='position'
          @click="scrollTo(3)">招聘职位</li>
      <li :class="{active: activeIndex === 2}"
          id='luck'
          @click="scrollTo(2)">公司福利</li>
    </ul>
  </div>
  <wrapper>
    <div class="page-company-detail">
      <div class="left">
        <block title="公司介绍"><span class="cp-detail">{{companyInfo.companyIntroduce}}</span></block>
        <block title="公司地址">
          <Map :address="companyInfo.companyAddr"
               :pos="{
            lng: companyInfo.longitude,
            lat: companyInfo.latitude,
          }"></Map>
        </block>
        <block title="公司福利">
          <span class="welfare"
                v-for="welfare in companyInfo.companyWelfareList"
                :key="welfare">{{welfare}}</span>
        </block>
        <block title="招聘职位">
          <Position v-for="position in positions"
                    :key="`position${position.id}`"
                    :info="position" />
        </block>
      </div>
      <div class="right">
        <sign class="sign-block" />
        <div>
          <header class="title">公司环境</header>
          <div v-if="companyInfo && companyInfo.companyEnvPicList">
            <!-- <img v-for="img in companyInfo.companyEnvPicList" :key="`img-${img}`" class="company-inner-pic" :src="img"> -->
            <img class="company-inner-pic"
                 :src="companyInfo.companyEnvPicList[0]">
          </div>
        </div>
        <!-- <block title="公司环境">
          <el-carousel>
            <el-carousel-item v-for="item in companyInfo.companyEnvPicList" :key="item">
              <img class="company-inner-pic" :src="item">
            </el-carousel-item>
          </el-carousel>
        </block> -->
        <ul class="nav">
          <li class="item" :class="{active: activeIndex === 0}" @click="scrollTo(0)">公司介绍</li>
          <li class="item" :class="{active: activeIndex === 1}" @click="scrollTo(1)">公司地址</li>
          <li class="item" :class="{active: activeIndex === 2}" @click="scrollTo(2)">公司福利</li>
          <li class="item" :class="{active: activeIndex === 3}" @click="scrollTo(3)">招聘职位</li>
        </ul>
      </div>
    </div>
  </wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';


import Wrapper from 'layout/components/Wrapper.vue';
import Block from './components/Block.vue';
import Sign from '@/components/sign/index.vue';
import Map from './components/Map.vue';
import Position from './components/Position.vue';

import { CommonService } from '@/service';

const route = useRoute ();
const companyInfo: any = ref({})

CommonService.getCompanyDetail({
  companyId: route.params.companyId,
}).then((info: any) => {
  companyInfo.value = info;
})

const positions = ref<Array<any>>([]);
CommonService.getPositionsOfCompany({
  companyId: route.params.companyId,
  recruitmentStatus: 1,
}).then((res: Array<any>) => {
  positions.value = res.records;
})


const activeIndex  = ref(0)


const scrollTo = (index:number)=>{
  activeIndex.value = index
  if(index === 0) {
    document.getElementById('info')!.scrollIntoView()
  }
  if(index === 1) {
    document.getElementById('position')!.scrollIntoView()
  }
  if(index === 2) {
    document.getElementById('luck')!.scrollIntoView()
  }
  if(index === 3) {
    document.getElementById('jobs')!.scrollIntoView()
  }
}

</script>

<style scoped lang="scss">
.company-banner {
  height: 338px;
  position: relative;
  padding-top: 50px;
  background-color: #f8f8f8;
  background-position: center;
  background-size: cover;
  text-align: center;
  background-image: url(@/assets/company/company_banner.png);
  background-size: cover;
  background-position: center;

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 16px 16px 16px 16px;
  }

  .company-name {
    font-size: 40px;
    font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 60px;
    margin-top: 30;
  }
  .company-desc {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 21px;
    margin-top: 15px;
  }
  .company-nav {
    position: absolute;
    left: 50%;
    margin-left: -600px;
    box-sizing: border-box;
    padding: 0 30px;
    bottom: 0;
    display: flex;
    width: 1200px;
    line-height: 60px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 16px 16px 0px 0px;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;

    li{
      margin: 0 30px;
      &.active {
        position: relative;
        color: #FF9100;

        &::after{
          position: absolute;
          content: ' ';
          width: 100%;
          height: 2px;
          background-color: #FF9100;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}

.page-company-detail {
  display: flex;
  padding-top: 40px;
  background-color: #ffffff;
  .cp-detail {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 33px;
	  white-space: pre-line;

  }
  .left {
    width: 750px;
    padding-right: 30px;
    border-right: 1px solid #E8E8E8;

    .welfare {
      margin-right: 30px;
      padding: 12px 20px;
      line-height: 38px;
      font-size: 14px;
      font-weight: 400;
      color: #656565;
      background: #F8F8F8;
      border-radius: 8px 8px 8px 8px;
    }
    .container-amap {
      height: 120px;
    }
  }
  .right {
    margin-left: 30px;
    flex: 1;
    .sign-block {
      margin-bottom: 50px;
    }
    .company-inner-pic {
      // height: 218px;
      width: 100%;
    }
    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .nav {
      position: relative;
      font-size: 16px;
      line-height: 52px;
      color: #999999;
      &::before {
        content: ' ';
        width: 2px;
        background-color: #999999;
        position: absolute;
        top: 26px;
        bottom: 26px;
        left: 7px;
      }

      .item {
        display: flex;
        align-items: center;
        &::before {
          z-index: 1;
          content: ' ';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999999;
          margin-right: 10px;
          border: 4px solid #ffffff;
        }
        &.active {
          color: #ED263D;
          &::before {
            background-color: #ED263D;
          }
        }
      }
    }
  }
}

</style>
