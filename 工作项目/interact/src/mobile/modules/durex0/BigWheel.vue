<template>
  <div class="box-style-durex"
       :style="options.boxStyle">
    <!-- 转盘指针 -->
    <div class='wheel-pointer-box'>
      <img class="wheel-pointer"
           :src="options.pointerPic"
           :style="options.pointerStyle"
           v-lz-click.isMain="'12'"
           @click="$emit('roll')" />
    </div>
    <div style='position: absolute;top:2.5rem;z-index:1'></div>
    <div class="drow-wheel-box">
      <div style='position: absolute;top:2rem;z-index:1'></div>
      <div :style="options.backgroundOutsideStyle"
           class="outside-bg"></div>

      <div class="wheel-draw"
           :style="`width:${options.wheelContentStyle.width};height:${options.wheelContentStyle.height};top:${options.wheelContentStyle.top}`">
        <div class="wheel-content"
             :style="`transform: rotate(${wheelDeg}deg);width:${options.wheelContentStyle.width};height:${options.wheelContentStyle.height};top:${options.wheelContentStyle.top};background-color:${options.wheelContentStyle.backgroundColor};border:${options.wheelContentStyle.border}`">
          <div class="item"
               v-for='(item,index) in prizes'
               :key="index+'33'"
               :style="`transform: rotate(${SettingsMap[prizes.length].rotate * index + SettingsMap[prizes.length].rotateRest}deg) skewY(${SettingsMap[prizes.length].skewY}deg);background-color:${index %2 ===0?options.itemStyle.itemColor[1]:options.itemStyle.itemColor[0]};width:${options.itemStyle.width};height:${options.itemStyle.height}`">
          </div>
          <div class="item3"
               @click="handleClickImg(index,item)"
               v-for='(item,index) in prizes'
               :key="index"
               :style="`transform: rotate(${SettingsMap[prizes.length].rotate * index + SettingsMap[prizes.length].rotateRest}deg) skewY(${SettingsMap[prizes.length].skewY}deg);width:${options.itemStyle.width};height:${options.itemStyle.height}`">
          </div>
          <div class="item2"
               v-for='(item,index) in prizes'
               :key="index+'22'"
               :style="`transform: rotate(${SettingsMap[prizes.length].rotate * index}deg) translateX(-50%);width:${options.itemStyle.width};height:${options.itemStyle.height}`">

            <img class="prize-icon"
                 :src="item.prizePicture"
                 :style="options.prizePictureStyle" />
            <p class="title-empty"
               v-if='item.isEmpty'>谢谢参与</p>
            <p class="title"
               v-else
               :style="options.prizeNameStyle">{{item.prizeName}}</p>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showBigImg"
               class="durex-popup"
               get-container="#mobile-app">
      <div class='show-big-img-durex'>
        <img v-if='bigImgSrc'
             :src="bigImgSrc"
             class='big-img'>
        <div v-else
             class='big-img'>暂无图片</div>
        <span class="big-text">{{bigImgText}}</span>
        <div class="big-close"
             @click='showBigImg=false'></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'BigWheel',
  props: {
    prizes: {
      default: () => [],
    },
    options: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      bigImgSrc: '',
      bigImgText: '',
      showBigImg: false,
      rolling: false, // 是否正在抽奖
      wheelDeg: 0, // 旋转的角度
      prizeNumber: 6, // 奖品数量
      prizeResult: '', // 奖品结果
      isShowPrizeResult: '', // 奖品结果弹窗
      SettingsMap: {
        4: {
          rotate: 90,
          skewY: 0,
          rotateRest: 45,
        },
        6: {
          rotate: 60,
          skewY: 30,
          rotateRest: 30,
        },
        8: {
          rotate: 45,
          skewY: 45,
          rotateRest: 22.5,
        },
        10: {
          rotate: 30,
          skewY: 60,
          rotateRest: 15,
        },
      },
    };
  },
  created() {

  },
  methods: {
    handleClickImg(index, item) {
      if (item.prizePicture) {
        this.bigImgSrc = item.prizePicture;
        this.bigImgText = item.prizeName;
      } else {
        this.bigImgSrc = '';
        this.bigImgText = item.prizeName;
      }
      this.showBigImg = true;
    },
    /**
     * @description: 开始抽奖
     */
    roll(result) {
      return new Promise((resolve) => {
        if (this.rolling) {
          return;
        }
        this.rolling = true; // 状态置为当前正在抽奖
        const { wheelDeg, prizes } = this;
        // 自身旋转的度数,加上转的圈数
        this.wheelDeg = wheelDeg - (wheelDeg % 360) + 6 * 360 + (360 - (360 / prizes.length) * result);
        // 定时器结束,显示结果
        setTimeout(() => {
          // 当前状态置为没有抽奖
          this.rolling = false;
          // 显示结果
          this.prizeResult = prizes[result].prizeName;
          this.isShowPrizeResult = true;
          resolve();
        }, 4500);
      });
    },
  },
};
</script>

<style lang="scss">
.box-style-durex {
  position: relative;

  .wheel-pointer-box {
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      z-index: 999;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .wheel-pointer {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    perspective: 1000;
    -webkit-perspective: 1000;
  }

  .drow-wheel-box {
    position: relative;
    z-index: 0;
    .outside-bg {

      position: absolute;
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
    .inside-bg {
      position: absolute;
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
    .item {
      position: absolute;
      left: 0;
      transform-origin: right bottom;
    }
    .item3 {
      position: absolute;
      left: 0;
      transform-origin: right bottom;
      z-index: 3005;
    }
    .item2 {
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      transform-origin: left bottom;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3000;
      img {
        z-index: 3001;
      }
    }
    .title {
      display: inline-block;
      width: 35%;
      line-height: 0.3rem;
      text-align: center;
      margin-bottom: 0.2rem;
      font-size: 0.2rem;
      transform: scale(0.7);
    }
    .title-empty {
      font-size: 0.2rem;
      width: 50%;
      text-align: center;
    }
    .wheel-draw {
      -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translateX(-50%);
      left: 50%;
      position: absolute;
      overflow: hidden;
      border-radius: 50%;
      z-index: 0;
    }
    .wheel-content {
      border-radius: 50%;
      overflow: hidden;
      transition: transform 4s ease-in-out;
            background-image: url("./assets/plate.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .prize-icon {
      border-radius: 0 !important;
      margin-top: 0.6rem;
    }
  }
  .van-popup {
    background-color: transparent;
  }
  .van-popup--center {
    background-color: transparent;
  }

  .show-big-img {
    background: url('../../../assets/common-prize-bg3.png') no-repeat;
    width: 5rem;
    height: 10rem;
    background-size: contain;
    position: relative;
    .big-img {
      width: 2rem;
      height: 2rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 2rem;
    }
    .big-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 4.3rem;
      color: #fd2826;
      font-size: 0.3rem;
    }
    .big-close {
      width: 3rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5.3rem;
    }
  }


}


.durex-popup{
  background: transparent;
}
 .show-big-img-durex {
    background: url('./assets/show.png') no-repeat;
    width: 5rem;
    height: 10rem;
    background-size: contain;
    position: relative;
    .big-img {
      width: 2rem;
      height: 2rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 2.5rem;
    }
    .big-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 4.8rem;
      color: #000;
      font-size: 0.3rem;
    }
    .big-close {
      width: 3rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5.3rem;
    }
  }

</style>
