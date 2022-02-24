<!--
 * @Author: 一尾流莺
 * @Description:左侧工作列表
 * @Date: 2021-09-28 16:54:27
 * @LastEditTime: 2021-11-27 17:32:24
 * @FilePath: \ired_resource\src\pages\public\home\components\NavSider.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="nav-sider">
    <div class="list-show"
         @mouseleave="closeHover">
      <div class="show-item"
           :class="{ 'hover-style': cIndex === hoverIndex && isHoverList }"
           @mouseenter="openHover(cIndex)"
           v-for="(classify,cIndex) in talentsClassifyList"
           :ref="handleNodes"
           :key="classify.classificationValue">
        <div class="title">{{ classify.classificationName }}</div>
        <div class="divide"></div>
        <div class="text">
          <div v-for="item in classify.classifies"
               style="cursor: pointer"
               @click="gotoOverall(classify.classificationValue,item.classifyCode)"
               :key="item.classifyCode">{{ item.classifyName }}</div>
        </div>
        <div class="icon-arrow">
          <img src="../assets/icon-right-arrow.png" />
        </div>
        <div class="list-hidden"
             v-if='cIndex === hoverIndex'
             @mouseenter="openHover2()"
             @mouseleave="closeHover()"
             v-show="showPopup">
          <div class="hover-container">
            <div class="hover-item"
                 v-for="(item) in hoverList"
                 @click="gotoOverall(classify.classificationValue,item.classifyCode)"
                 :key="item">{{ item.classifyName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import useGetTalentsClassifyListNew from "../apis/getTalentsClassifyListNew";

// 获取分类列表 拿到每一行
const typeItemList = ref([]);
const handleNodes = (el: any) => {
  //@ts-ignore
  typeItemList.value.push(el);
};

// 观察方法
const observe = () => {
  // 循环每一行的数据
  typeItemList.value.forEach((item, index) => {
    // 回调函数
    const callback = (entries: any, observer: any) => {
      // 循环每一个被观察的对象
      entries.forEach((entry: any) => {
        // 如果有被隐藏的部分 就把整个div 设置为 display:none
        if (entry.intersectionRatio < 1) {
          entry.target.style.display = "none";
        }
      });
    };
    // 配置对象
    const options = {
      root: item.children[2],    // 获取根元素
      rootMargin: "0px 0px 0px 0px",
      threshold: [0],
      trackVisibility: false,
      delay: 100,
    };
    // 开始观察
    const myObserver = new IntersectionObserver(callback, options);
    // 循环观察每一个子节点
    for (let i = 0; i < item.children[2].children.length; i++) {
      myObserver.observe(item.children[2].children[i]);
    }
  });
};

const router = useRouter();
const showPopup = ref(false);


const isHoverList = ref(false)
const hoverIndex = ref(0)


const openHover = (index?: number) => {
  hoverIndex.value = index
  showPopup.value = true
  isHoverList.value = true
}

const closeHover = () => {
  showPopup.value = false
  isHoverList.value = false
}

const openHover2 = () => {
  showPopup.value = true
  isHoverList.value = true
}

const { talentsClassifyList, getTalentsClassifyListNew } = useGetTalentsClassifyListNew();

const hoverList = computed(() => talentsClassifyList?.value[hoverIndex.value]?.classifies)

// 查看全部页面
const gotoOverall = (classificationValue:any,classifyCode: any) => {
  router.push(`/overall/${classificationValue}/${classifyCode}`);
};
onMounted(async () => {
  await getTalentsClassifyListNew();
  observe();

});
</script>

<style lang="scss">
.nav-sider {
  position: relative;
  top: 8px;
  * {
    box-sizing: border-box;
    line-height: 20px;
  }
  .list-show {
    .show-item {
      position: relative;
      width: 465px;
      height: 46px;
      display: grid;
      grid-template-columns: 68px 1px 360px 20px 16px;
      grid-column-gap: 0px;
      align-content: center;

      .title {
        width: 32px;
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: bold;
        color: #222222;
        margin: 0 16px 0 20px;
      }
      .divide {
        height: 20px;
        border-left: 1px solid #e8e8e8;
      }
      .text {
        font-size: 14px;
        font-family: PingFang SC-Light, PingFang SC;
        color: #999999;
        margin: 0 0px 0 10px;
        line-height: 20px;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;

        div {
          margin: 0 10px;
          white-space: nowrap;
        }
      }
      .icon-arrow {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .hover-style {
      background: #ffffff;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.07999999821186066);
    }
  }
  .list-hidden {
    width: 465px;
    min-height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(100%);
    background: #ffffff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.07999999821186066);
    z-index: 99;
    .hover-container {
      padding: 0 10px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 46px;

      .hover-item {
        margin: 0px 10px;
        line-height: 46px;
        height: 46px;
        font-size: 14px;
        font-family: PingFang SC-Light, PingFang SC;
        color: #999999;
        cursor: pointer;
      }
    }
  }
}
</style>
