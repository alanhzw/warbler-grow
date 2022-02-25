<template>
  <!-- 会员礼包领取记录 -->
  <div v-if="$store.state.showDetail" class="PointsRecords allpage">
    <van-list>
      <van-sticky>
        <div class="top">
          <div class="top_contain">
            <div class="data_time" @click="dataShow = true">{{ getTime }}
              <van-icon class="arrow_icon" color="#c6c6c6" name="arrow-down"/>
            </div>
          </div>
        </div>
      </van-sticky>
      <van-cell v-for="(item,index) in list" :key="item.id">
        <div class="product_item">
          <!-- 礼包 -->
          <van-icon color="#666666" name="point-gift-o" size="0.5rem"/>
          <div class="item_details">
            <div class="left_details">
              <div class="font_top"><p>{{ item.activityName }}</p></div>
              <p class="font_all">{{ item.createTime }}</p>
            </div>
            <div class="right_details" @click="giftDetial(index)">
              <span class="green">领取成功</span>
              <van-icon name="arrow"/>
            </div>
          </div>
        </div>
      </van-cell>
      <div v-if="list.length === 0" class="no_data">
        <img alt=''
             class="no_data_image"
             src='//img10.360buyimg.com/imgzone/jfs/t1/113809/33/5516/2214/5eb3a736Edd8d29bb/59c71b2a8ef678f1.png'>
        <p>暂无数据</p>
      </div>

    </van-list>

    <!-- 时间弹出 -->
    <i-dataTimePicker :dataShow="dataShow" :defaultDate="defaultDate" @closePop="closePop"
                      @timeChange="timeChange"></i-dataTimePicker>
    <!-- 礼包详细弹窗 -->
    <van-overlay :show="giftDetialShow">
      <div class="prizeExchangeWrapper" @click.stop>
        <div class="prizePopMain">
          <div class="prize-wrapper">
            <div class="prize-list">
              <div v-for="(val,index) in giftList" :key="index" class="prize-item">
                <div class="gift-icon">
                  <img v-if="val.resType === 1" alt=""
                       src="//img10.360buyimg.com/imgzone/jfs/t1/195822/30/11632/2563/60e276deEa0ebc53f/0f23f5e6a4d49aed.png">
                  <img v-if="val.resType === 2" alt=""
                       src="//img10.360buyimg.com/imgzone/jfs/t1/191120/36/11711/4998/60e276deEcb222d67/48977d0b101c7633.png">
                  <img v-if="val.resType === 4" alt=""
                       src="//img10.360buyimg.com/imgzone/jfs/t1/184637/28/12677/6096/60e276deE641ddd93/82d98bef4ad612bd.png">
                </div>
                <span class="prizeName"> {{ val.prizeName }}</span>
                <span class="status">已获得</span>
              </div>
            </div>
          </div>
          <div class="action-button-area" @click="giftDetialShow = false"></div>
        </div>
        <img alt="" class="giftBagDel" src="../../assets/images/close.png" @click="giftDetialShow = false">
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDataTimePicker from '@/components/IDataTimePicker.vue';

export default {
  name: 'PointsRecords',
  components: {
    IDataTimePicker,
  },
  data() {
    return {
      dataShow: false,
      defaultDate: new Date(),
      select: {
        activityType: [],
        getTime: '', // 当前时间
      },
      getTime: '',
      list: [], // 礼包领取记录
      giftList: [], // 礼包详情
      giftDetialShow: false, // 礼包领取详细弹窗展示

    };
  },
  created() {
    // 展示时间
    this.getTime = this.$core.timestampstr(new Date().getTime()).format3;
    // 默认当月
    this.select.getTime = this.$core.timestampstr(new Date().getTime()).format5;
    this.getList();
  },
  methods: {
    async getList() {
      const res = await PointsService.getGiftRecord({ getTime: this.select.getTime }, { needVisable: false });
      this.list = res.data;
      if (this.list.length > 0) {
        this.list.forEach((e) => {
          if (e.realName) {
            e.realNameStr = `${e.realName.slice(0, 1)}**`;
            e.mobileStr = `${(`${e.mobile}`).slice(0, 3)}****${(`${e.mobile}`).slice(7, 11)}`;
          }
        });
      }
    },
    // 子组件返回时间
    timeChange(val) {
      // 默认时间 便于下次传递
      this.defaultDate = val;
      // 展示时间
      this.getTime = this.$core.timestampstr(new Date(val).getTime()).format3;
      // 用于检索
      this.select.getTime = this.$core.timestampstr(new Date(val).getTime()).format5;
      this.getList();
      this.dataShow = false;
    },
    // 子组件返回类型
    typeChange(id, val, text) {
      this.select.activityType = val || [];
      this.text = text;
      this.typeShow = false;
      this.getList();
    },
    // 关闭时间选择器
    closePop() {
      this.dataShow = false;
    },
    // 显示礼包详情弹窗
    giftDetial(index) {
      this.giftDetialShow = true;
      this.giftList = this.list[index].giftList;
    },
    // 关闭礼包详情弹窗
    closeDialog() {
      this.giftDetialShow = false;
    },
  },

};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 0.9rem;
  font-size: 0.26rem;
  padding-top: 0.3rem;
  border-bottom: 1px solid #c5c5c5;
}

.top_contain {
  padding: 0 0.24rem;
  width: 100%;
  height: 0.9rem;
  display: flex;
  background: #ffffff;
  line-height: 0.9rem;
  justify-content: space-between;
  box-sizing: border-box;
  color: #353535;
}

.data_time {
  display: flex;
}

.select_type {
  display: flex;
}

.arrow_icon {
  margin-left: 0.1rem;
  padding-top: 0.3rem;
}

.PointsRecords > > > .van-cell {
  height: 1.0rem;
  padding: 0 0.24rem;
  box-sizing: border-box;
}

.product_item {
  width: 100%;
  height: 1.0rem;
  display: flex;
  justify-content: start;
}

.van-cell:not(:last-child)::after {
  right: 0.24rem;
  border-bottom: 1px solid #c5c5c5;
}

.product_item > > > .van-icon {
  padding: 0.24rem;
}

.item_details {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.right_details > > > .van-icon {
  padding: 0.04rem;
}

.right_details {
  font-size: 0.24rem;
  color: #a7a7a7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

.right_details > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.font_top {
  font-size: 0.25rem;
  color: #909090;
  height: 0.4rem;
  margin-top: 0.1rem;
  display: flex;
}

.font_top p {
  display: inline-block;
  width: 56vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.font_top span {
  font-size: 0.22rem;
  margin-left: 0.1rem;
  padding: 0 0.04rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.green {
  padding: 0 5px;
  background: #e0f1e9;
  color: #5cca99;
}

.font_all {
  font-size: 0.24rem;
  color: #a7a7a7;
}

.no_data {
  margin-top: 2rem;
}

.no_data_image {
  width: 2rem;
  height: 2rem;
}

.no_data p {
  margin: 0;
  text-align: center;
  font-size: 0.25rem;
  color: #c9c9c9;
}

/* 礼包弹窗 */
.prizeExchangeWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .prizePopMain {
    position: relative;
    width: 6.22rem;
    height: 6.54rem;
    max-height: 7.76rem;
    /*background-color: #fff;*/
    margin-bottom: 1.15rem;
    box-sizing: border-box;
    font-size: 0.24rem;
    background: transparent url("//img10.360buyimg.com/imgzone/jfs/t1/185776/16/12816/172686/60e26b23Ee1ff636f/0461e58c8ea8015a.png") no-repeat center bottom;
    background-size: 100% 100%;

    .prize-wrapper {
      background: linear-gradient(to bottom, white 0%, white 70%, #ffffff00 71%, #ffffff00 100%);
      width: 5.09rem;
      min-height: 1.66rem;
      max-height: 4.35rem;
      border-radius: 0.2rem;
      position: absolute;
      left: 0.529rem;
      box-sizing: border-box;
      overflow-y: auto;
      bottom: 3.7rem;

      .prize-list {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.3rem 0.3rem 0 0.3rem;

        .prize-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 4.5rem;
          height: 1.3rem;
          background-color: #fef2d4;
          border-radius: 0.1rem;
          margin-bottom: 0.05rem;
          padding: 0.2rem;
          box-sizing: border-box;

          .gift-icon {
            width: 0.9rem;
            height: 0.9rem;
            background-color: #ffffff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 0.7rem;
            }
          }

          .prizeName {
            font-size: 0.36rem;
            font-weight: bold;
            color: #fe2263;
            flex-grow: 1;
            flex-shrink: 1;
            padding: 0 0.2rem;
            text-align: left;
          }

          .status {
            font-size: 0.24rem;
            font-weight: normal;
            font-stretch: normal;
            color: #333333;
          }
        }
      }
    }

    .action-button-area {
      width: 4.2rem;
      height: 1rem;
      position: absolute;
      bottom: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
      margin-left: -0.1rem;
    }

    .link {
      width: 1.14rem;
      height: 0.38rem;
      background: #e2231a;
      border-radius: 10px;
      color: #fff;
      line-height: 0.38rem;
    }
  }

  .giftBagDel {
    width: 0.6rem;
    height: 0.6rem;
  }
}

</style>
