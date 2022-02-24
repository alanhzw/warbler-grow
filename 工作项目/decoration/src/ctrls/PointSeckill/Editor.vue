<template>
  <div class="ctrl-point-money-buy-editor">
    <form-block title="楼层标题"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <lz-input placeholder="请填写楼层标题"
                size="small"
                maxlength="6"
                v-model="data.title" />
    </form-block>

    <form-block title="权益设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title=""
                   prop="pic">
        <lz-select size="small"
                   v-model="data.type"
                   @change="changeType">
          <lz-option label="优惠券"
                     v-if='shopId!="703279"'
                     :value="312"></lz-option>
          <lz-option label="实物商品"
                     :value="311"></lz-option>
          <lz-option label="京豆"
                     :value="313"></lz-option>
        </lz-select>
      </input-block>
    </form-block>

    <form-block title="权益设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title=""
                   prop="activities">
        <div class='margin10'>
          <label class='label-style'>选择方式：</label>

          <lz-radio v-model="data.selectType"
                    label="1">手动选择</lz-radio>
          <lz-radio v-model="data.selectType"
                    label="2">自动选择</lz-radio>
        </div>
        <div v-if='data.selectType==2'
             class='margin10'>
          <label class='label-style'>展示数量：</label>

          <lz-input-number class="input-number"
                           v-model="data.showNum"
                           :min="1"
                           :max="20"
                           label="描述文字"></lz-input-number>
          <br>
          <div class='margin10'>
            <label class='label-style'>排序方式：</label>
            <lz-radio v-model="data.sortType"
                      label="1">创建时间倒序</lz-radio>
          </div>
        </div>
        <div v-else>
          <lz-button size="mini"
                     :disabled="enough"
                     type="primary"
                     @click="selectorShow = true">添加权益</lz-button>
          <lz-button size="mini"
                     @click="clear">清空</lz-button>

          <div v-if="data.type==312">
            <div v-if="data.coupons.length > 0">
              <div v-for="(coupon, index) in data.coupons"
                   class="coupon-info coupon-item"
                   :key="`coupon-${coupon.id}`">
                <coupon-thumb :info="coupon" />
                <div class="info-item">
                  <p class="info-name">{{coupon.activityName}}</p>
                  <p class="">兑换积分：{{coupon.exchangeWay === 1 ? getPointRange(coupon.exchangeMemberPointNum, coupon.supportLevels) :coupon.exchangePointNum}}</p>
                  <p>会员等级：{{levels[coupon.supportLevels] ? levels[coupon.supportLevels].levelName : ''}}{{levels.length > 0 && levels.length - 1 > coupon.supportLevels ? '及以上' : ''}}</p>
                </div>
                <div class="float-icon">
                  <div class="transform-180">
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === 0}"
                          @click="moveTop(index)" />
                  </div>
                  <div>
                    <span class="iconfont icon-iconjiantou-35 btn-del"
                          :class="{disable: index === 0}"
                          @click="move(index, -1)" />
                    <span class="iconfont icon-iconjiantou-34 btn-del"
                          :class="{disable: index === data.coupons.length - 1}"
                          @click="move(index, 1)" />
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === data.coupons.length - 1}"
                          @click="moveBottom(index)" />
                    <span class="iconfont icon-icon-07 btn-del"
                          @click="remove(coupon)" />
                  </div>
                </div>
              </div>
              <p class="tip">注：最多可添加20个活动</p>
            </div>
            <div v-else
                 class="blank-tip margin10">请添加积分秒杀优惠券活动</div>
          </div>

          <div v-if="data.type==311">
            <div v-if="data.products.length > 0">
              <div v-for="(product, index) in data.products"
                   class="coupon-info coupon-item"
                   :key="`product-${product.id}`">
                <img class="product-pic"
                     :src="`${CONST.IMAGE_PREFIX}${product.showPics ? JSON.parse(product.showPics)[0] : ''}`" />
                <div class="info-item">
                  <p class="info-name">{{product.activityName}}</p>
                  <p class="">兑换积分：{{product.exchangeWay === 1 ? getPointRange(product.exchangeMemberPointNum, product.supportLevels) :product.exchangePointNum}}</p>
                  <p>会员等级：{{levels[product.supportLevels-1] ? levels[product.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > product.supportLevels-1 ? '及以上' : ''}}</p>
                </div>
                <div class="float-icon">
                  <div class="transform-180">
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === 0}"
                          @click="moveTop(index)" />
                  </div>
                  <div>
                    <span class="iconfont icon-iconjiantou-35 btn-del"
                          :class="{disable: index === 0}"
                          @click="move(index, -1)" />
                    <span class="iconfont icon-iconjiantou-34 btn-del"
                          :class="{disable: index === data.products.length - 1}"
                          @click="move(index, 1)" />
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === data.products.length - 1}"
                          @click="moveBottom(index)" />
                    <span class="iconfont icon-icon-07 btn-del"
                          @click="remove(product)" />
                  </div>
                </div>
              </div>
              <p class="tip">注：最多可添加20个活动</p>
            </div>
            <div v-else
                 class="blank-tip margin10">请添加积分秒杀实物商品活动</div>
          </div>

          <div v-if="data.type==313">
            <div v-if="data.beans.length > 0">
              <div v-for="(product, index) in data.beans"
                   class="coupon-info coupon-item"
                   :key="`bean-${product.id}`">
                <img class="product-pic"
                     src="@/assets/bean-detail-icon.png" />
                <div class="info-item">
                  <p class="info-name">{{product.activityName}}</p>
                  <p class="">兑换积分：{{product.exchangeWay === 1 ? getPointRange(product.exchangeMemberPointNum, product.supportLevels) :product.exchangePointNum}}</p>
                  <p>会员等级：{{levels[product.supportLevels-1] ? levels[product.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > product.supportLevels-1 ? '及以上' : ''}}</p>
                </div>
                <div class="float-icon">
                  <div class="transform-180">
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === 0}"
                          @click="moveTop(index)" />
                  </div>
                  <div>
                    <span class="iconfont icon-iconjiantou-35 btn-del"
                          :class="{disable: index === 0}"
                          @click="move(index, -1)" />
                    <span class="iconfont icon-iconjiantou-34 btn-del"
                          :class="{disable: index === data.beans.length - 1}"
                          @click="move(index, 1)" />
                    <span class="iconfont icon-iconxx-31 btn-del"
                          :class="{disable: index === data.beans.length - 1}"
                          @click="moveBottom(index)" />
                    <span class="iconfont icon-icon-07 btn-del"
                          @click="remove(product)" />
                  </div>
                </div>
              </div>
              <p class="tip">注：最多可添加20个活动</p>
            </div>
            <div v-else
                 class="blank-tip margin10">请添加积分秒杀京豆活动</div>
          </div>
          <lz-checkbox v-model="data.showExpire">显示过期权益</lz-checkbox>

        </div>
      </input-block>
    </form-block>
    <lz-checkbox v-model="data.showTitle">显示楼层标题</lz-checkbox>
    <MarginBottomSetting :data="data" />

    <lz-dialog title="积分秒杀"
               class="selector-dialog"
               append-to-body
               :visible.sync="selectorShow"
               width='50%'>
      <div style="margin-bottom:20px">
        <label>选择店铺：</label>
        <lz-select v-model="shopId"
                   placeholder="请选择"
                   style="width:300px"
                   @change='getActivities(1)'>
          <lz-option v-for="item in shopList"
                     :key="item.shopId"
                     :label="item.shopName"
                     :value="item.shopId">
          </lz-option>
        </lz-select>
      </div>
      <lz-table class="selector-table"
                border
                :data="pool">
        <lz-table-column label="活动详情"
                         min-width='365px'>
          <template slot-scope="scope">
            <div class="coupon-info">
              <coupon-thumb v-if="data.type==312"
                            :info="scope.row" />
              <img class="product-pic"
                   v-if="data.type==311"
                   :src="`${CONST.IMAGE_PREFIX}${JSON.parse(scope.row.showPics)[0]}`" />
              <img class="product-pic"
                   v-if="data.type==313"
                   src="@/assets/bean-detail-icon.png" />
              <div class="info-item">
                <p class="info-name">{{scope.row.activityName}}</p>
                <p class="">兑换积分：{{scope.row.exchangeWay === 1 ? getPointRange(scope.row.exchangeMemberPointNum, scope.row.supportLevels) :scope.row.exchangePointNum}}</p>
                <p>会员等级：{{levels[scope.row.supportLevels-1] ? levels[scope.row.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > scope.row.supportLevels-1 ? '及以上' : ''}}</p>
              </div>
            </div>
          </template>
        </lz-table-column>
        <lz-table-column label="活动有效期"
                         align="center"
                         width="180">
          <template slot-scope="scope">
            <div>起：{{scope.row.startTime}}</div>
            <div>止：{{scope.row.endTime}}</div>
          </template>
        </lz-table-column>
        <lz-table-column label="活动总量"
                         align="center"
                         prop="prizeTotalNum"
                         width="80" />
        <lz-table-column label="活动剩余量"
                         align="center"
                         prop="prizeRemainNum"
                         width="100" />
        <lz-table-column label="活动状态"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            {{['', '未开始', '进行中', '已结束','已暂停'][scope.row.beginStatus]}}
          </template>
        </lz-table-column>
        <lz-table-column label="操作"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            <lz-button v-if="data.coupons.some(c => c.id === scope.row.id) || data.products.some(c => c.id === scope.row.id) || data.beans.some(c => c.id === scope.row.id)"
                       size="mini"
                       type="text"
                       @click="remove(scope.row)">删除</lz-button>
            <lz-button v-else
                       size="mini"
                       type="text"
                       @click="add(scope.row)">添加</lz-button>
          </template>
        </lz-table-column>
      </lz-table>

      <div style="text-align: right;"
           v-show="page.total > 0">
        <!-- background -->
        <lz-pagination layout="total, prev, pager, next"
                       :current-page="page.pageNo"
                       :page-size="page.pageSize"
                       @current-change="getActivities"
                       :total="page.total">
        </lz-pagination>
      </div>

    </lz-dialog>
  </div>
</template>

<script>
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import InputBlock from '../components/InputBlock.vue';
import FormBlock from '../components/FormBlock.vue';
import Service from '@/business/service';
import CONST from '@/utils/constant';
import utils from '@/utils';
import { LzMsg, LzLoading } from '@/utils/UI';
import CouponThumb from '@/business/components/CouponThumb';

export default {
  name: 'CtrlPointMoneyBuyEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    CouponThumb,
  },
  props: {
    data: {
      default: () => ({}),
    },
    floorOnEdit: {
      default: () => ({}),
    },
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      levels: [],
      type: 311,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      shopId: Number(utils.getShopId()),
      shopList: [],
      selectorShow: false,
      pool: [],
      rules: {
        activities: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.activities(this.data),
        },
      },
    };
  },
  computed: {
    enough() {
      if (this.data.type === 311) {
        return this.data.products.length >= 20;
      }
      if (this.data.type === 312) {
        return this.data.coupons.length >= 20;
      }
      if (this.data.type === 313) {
        return this.data.beans.length >= 20;
      }
      return false;
    },
  },
  created() {
    Service.getShopLevels().then(({
      data,
    }) => {
      this.levels = data.levels.map(l => ({
        level: l.level,
        levelName: l.levelName,
        pic: '',
      }));
    });
    this.getShopsList();
    this.getActivities();
  },
  watch: {
    'data.type': function () {
      this.changeType();
    },
    'floorOnEdit.data.type': function () {
      this.data.beans = this.floorOnEdit.data.beans;
      this.data.products = this.floorOnEdit.data.products;
      this.data.coupons = this.floorOnEdit.data.coupons;
    },
  },
  methods: {
    // 获取店铺列表
    async getShopsList() {
      const { data } = await Service.getShopsInfo();
      this.shopList = data.shops;
    },
    async changeType() {
      this.data.beans = [];
      this.data.products = [];
      this.data.coupons = [];
      const loading = LzLoading.start();
      try {
        this.getActivities(1);
      } catch (error) {
        console.log('🚀🚀~ error:', error);
      } finally {
        loading.close();
      }
    },
    getActivities(pageNo = this.page.pageNo) {
      Service.getPointActivities({
        shopId: this.shopId,
        isNow: 0,
        exchangeStatus: 9,
        searchActivityType: [this.data.type],
        ...this.page,
        isHidden: 0,
        pageNo,
      }).then(({
        data,
        page,
      }) => {
        this.pool = data.filter(item => item.beginStatus != 3);
        this.page = {
          ...this.page,
          ...page,
        };
      });
    },
    getPointRange(levelsStr, startLevel) {
      try {
        // 根据可兑换的最小等级筛选出来符合条件的等级设置信息
        const points = JSON.parse(levelsStr).filter(level => +level.level >= +startLevel).map(l => l.point);
        // 获取最大值和最小值
        const min = Math.min(...points);
        const max = Math.max(...points);
        if (min === max) {
          // 如果最大值和最小值相等就返回一个数字
          return min;
        }
        // 最大值最小值不等返回一个范围
        return `${min}-${max}`;
      } catch (e) {
        // 解析数据的时候报错了
        return '按照等级设置';
      }
    },
    clear() {
      if (this.data.type === 311) {
        this.data.products = [];
      }
      if (this.data.type === 312) {
        this.data.coupons = [];
      }
      if (this.data.type === 313) {
        this.data.beans = [];
      }
    },
    add(activity) {
      this.data.activityShopId = activity.shopId;
      if (this.data.type === 311) {
        if (this.data.products.length < 20) {
          this.data.products.push(activity);
        } else {
          LzMsg.error('权益数量不可超过20个');
        }
      }
      if (this.data.type === 312) {
        if (this.data.coupons.length < 20) {
          this.data.coupons.push(activity);
        } else {
          LzMsg.error('权益数量不可超过20个');
        }
      }
      if (this.data.type === 313) {
        if (this.data.beans.length < 20) {
          this.data.beans.push(activity);
        } else {
          LzMsg.error('权益数量不可超过20个');
        }
      }
      this.$refs.formBlock.$refs.elForm.validateField('activities');
    },
    move(index, offset) {
      if (index + offset < 0) {
        return;
      }
      let target = [];
      if (this.data.type === 311) {
        target = this.data.products;
      }
      if (this.data.type === 312) {
        target = this.data.coupons;
      }
      if (this.data.type === 313) {
        target = this.data.beans;
      }
      const item = target.splice(index, 1)[0];
      target.splice(index + offset, 0, item);
    },
    moveTop(index) {
      if (index === 0) {
        return;
      }
      let target = [];
      if (this.data.type === 311) {
        target = this.data.products;
      }
      if (this.data.type === 312) {
        target = this.data.coupons;
      }
      if (this.data.type === 313) {
        target = this.data.beans;
      }
      const item = target.splice(index, 1)[0];
      target.splice(0, 0, item);
    },
    moveBottom(index) {
      let target = [];
      if (this.data.type === 311) {
        target = this.data.products;
      }
      if (this.data.type === 312) {
        target = this.data.coupons;
      }
      if (this.data.type === 313) {
        target = this.data.beans;
      }
      if (index === target.length - 1) {
        return;
      }
      const item = target.splice(index, 1)[0];
      target.splice(target.length, 0, item);
    },
    remove(activity) {
      if (this.data.type === 311) {
        this.data.products = this.data.products.filter(c => c.id !== activity.id);
      }
      if (this.data.type === 312) {
        this.data.coupons = this.data.coupons.filter(c => c.id !== activity.id);
      }
      if (this.data.type === 313) {
        this.data.beans = this.data.beans.filter(c => c.id !== activity.id);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-point-money-buy-editor {
  .input-number {
    .lz-input {
      // pointer-events: none;
    }
  }
  .lz-form-item__content {
  }
  .lz-textarea__inner {
    padding-bottom: 30px;
  }

  .blank-tip {
    // background-color: $WHITE;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
    // padding: 20px;
  }
  .margin10 {
    margin: 10px 0px;
  }
  .label-style {
    font-size: 14px;
    margin-right: 10px;
  }
}

.coupon-item {
  margin: 10px 0;
  background-color: $WHITE;
  padding: 10px;
}

.coupon-info {
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 20px;

  .float-icon {
    display: flex;
    justify-content: end;
    position: absolute;
    right: 5px;
    top: -15px;
    .transform-180 {
      transform: rotate(180deg);
    }
    margin-bottom: 5px;
  }
  .info-item {
    flex: 1;
    text-align: left;
    margin-left: 5px;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;

    p {
      // margin: 5px;
      line-height: 20px;
      margin: 0;
      padding: 0;
    }

    .info-name {
      width: 165px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .btn-del {
    color: $TAG_INFO_BLUE;

    &.disable {
      color: $FONT_DISABLE_GRAY;
    }
  }
}

.product-pic {
  width: 60px;
  height: 60px;
}

.selector-dialog {
  .selector-table {
    width: 1200px;
  }

  // width: 800px;
}
</style>
