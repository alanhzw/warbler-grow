<template>
  <div class="ctrl-member-coupon-editor">
    <form-block title="楼层标题"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <lz-input placeholder="请填写楼层标题"
                maxlength="6"
                size="small"
                v-model="data.title" />
    </form-block>

    <form-block title="权益设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <div slot="header">
        <lz-button size="mini"
                   v-show="data.coupons.length < 20"
                   type="primary"
                   @click="selectorShow = true">添加权益</lz-button>
        <lz-button size="mini"
                   @click="data.coupons = []">清空</lz-button>
      </div>
      <div v-if="data.coupons.length > 0">
        <div v-for="(coupon, index) in data.coupons"
             class="coupon-info coupon-item"
             :key="`coupon-${coupon.id}`">
          <coupon-thumb :info="coupon" />
          <div class="info-item">
            <p class="info-name">{{coupon.activityName}}</p>
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
        <p class="tip">注：最多可添加20个会员专属权益</p>
      </div>
      <div v-else
           class="blank-tip">请添加会员专属权益</div>
    </form-block>
    <lz-checkbox v-model="data.showTitle">显示标题</lz-checkbox>
    <lz-checkbox v-model="data.showExpire">显示过期权益</lz-checkbox>

    <MarginBottomSetting :data="data" />
    <lz-dialog title="会员专属权益"
               class="selector-dialog"
               append-to-body
               :visible.sync="selectorShow">
      <div style="margin-bottom:20px"
           v-if='shopList.length>0'>
        <label>选择店铺：</label>
        <lz-select v-model="shopId"
                   placeholder="请选择"
                   style="width:300px"
                   @change='getMemberCoupons(1)'>
          <lz-option v-for="item in shopList"
                     :key="item.shopId"
                     :label="item.shopName"
                     :value="item.shopId">
          </lz-option>
        </lz-select>
        <label style="margin-left:10px">注:限POP选择店铺</label>
      </div>
      <div style="margin-bottom:20px"
           v-else>
        <label>选择店铺：</label>
        <lz-select v-model="selsectDis"
                   placeholder="————"
                   style="width:300px"
                   disabled>
        </lz-select>
        <label style="margin-left:10px">注:限POP选择店铺</label>
      </div>
      <lz-table class="selector-table"
                border
                :data="couponPool">
        <lz-table-column label="活动详情"
                         width="380">
          <template slot-scope="scope">
            <div class="coupon-info">
              <coupon-thumb :info="scope.row" />
              <div class="info-item">
                <p class="info-name">{{scope.row.activityName}}</p>
                <p>会员等级：{{levels[scope.row.supportLevels] ? levels[scope.row.supportLevels].levelName : ''}}{{levels.length > 0 && levels.length - 1 > scope.row.supportLevels ? '及以上' : ''}}</p>
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
            <lz-button v-if="data.coupons.some(c => c.id === scope.row.id)"
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
                       @current-change="getMemberCoupons"
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
import utils from '@/utils';
import { LzMsg, LzLoading } from '@/utils/UI';
import CouponThumb from '@/business/components/CouponThumb';

export default {
  name: 'CtrlMemberCouponEditor',
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
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      selsectDis: '',
      levels: [],
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      shopId: Number(utils.getShopId()),

      shopList: [],

      selectorShow: false,
      couponPool: [],
      rules: {
        coupons: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.trigger(value),
        },
      },
    };
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
  },
  methods: {
    // 获取店铺列表
    async getShopsList() {
      const loading = LzLoading.start();
      try {
        const { data } = await Service.getShopsInfo();
        this.shopList = data.shops.filter(item => item.venderType == 0);
        if (this.shopList.length > 0) {
          this.shopId = this.shopList[0].shopId;
          await this.getMemberCoupons(1);
        }
      } catch (error) {
        console.log('🚀🚀~ error:', error);
      } finally {
        loading.close();
      }
    },
    async getMemberCoupons(pageNo = this.page.pageNo) {
      this.data.cShopId = this.shopId;
      const loading = LzLoading.start();
      try {
        await Service.getMemberCoupons({
          searchActivityType: [321],
          exchangeStatus: -9, // 全部
          shopId: this.shopId,
          isNow: 0,
          isHidden: 0,
          ...this.page,
          pageNo,
        }).then(({
          data,
          page,
        }) => {
          this.couponPool = data.filter(item => item.beginStatus != 3);
          this.page = {
            ...this.page,
            ...page,
          };
        });
      } catch (error) {
        console.log('🚀🚀~ error:', error);
      } finally {
        loading.close();
      }
    },
    add(coupon) {
      if (this.data.coupons.length < 20) {
        this.data.coupons.push(coupon);
      } else {
        LzMsg.error('权益数量不可超过20个');
      }
      this.$refs.formBlock.$refs.elForm.validateField('coupons');
    },
    move(index, offset) {
      if (index + offset < 0) {
        return;
      }
      const coupon = this.data.coupons.splice(index, 1)[0];
      this.data.coupons.splice(index + offset, 0, coupon);
    },
    remove(coupon) {
      this.data.coupons = this.data.coupons.filter(c => c.id !== coupon.id);
    },
    moveTop(index) {
      if (index === 0) {
        return;
      }
      let target = [];
      target = this.data.coupons;
      const item = target.splice(index, 1)[0];
      target.splice(0, 0, item);
    },
    moveBottom(index) {
      let target = [];
      target = this.data.coupons;
      if (index === target.length - 1) {
        return;
      }
      const item = target.splice(index, 1)[0];
      target.splice(target.length, 0, item);
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-member-coupon-editor {
  .lz-textarea__inner {
    padding-bottom: 30px;
  }

  .blank-tip {
    // background-color: $WHITE;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
    // padding: 20px;
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
  padding-top: 30px;
  .float-icon {
    display: flex;
    justify-content: end;
    position: absolute;
    right: 5px;
    top: 10px;
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
      margin: 5px;
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

.selector-dialog {
  .lz-dialog{
  min-width: 800px !important;
  }
  .selector-table {
    width: 1200px;
  }

  // width: 800px;
}
</style>
