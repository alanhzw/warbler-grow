<template>
  <div class="ctrl-point-money-buy-editor">

    <form-block title="楼层标题" ref="formBlock" :model="data" :rules="rules">
      <lz-input placeholder="请填写楼层标题" maxlength="6" size="small" v-model="data.title" />
    </form-block>

    <form-block title="权益设置" ref="formBlock" :model="data" :rules="rules">
      <div slot="header">
        <lz-button size="mini" v-show="data.activities.length < 20" type="primary" @click="selectorShow = true">添加权益</lz-button>
        <lz-button size="mini" @click="data.activities = []">清空</lz-button>
      </div>
      <div v-if="data.activities.length > 0">
        <div class="activity-detail activity-item" v-for="(activity, index) in data.activities" :key="`activity-${activity.id}`">
          <img :src="`${CONST.IMAGE_PREFIX}${activity.showPics}`">
          <div class="activity-info">
            <p>{{activity.activityName}}</p>
            <p>兑换积分:{{activity.integralMin}}</p>
            <p>折后价:{{activity.discountPriceMin}}元</p>
            <p>会员等级:{{`${activity.levelName}${activity.supportLevels < 5 ? '及以上' : ''}`}}</p>
          </div>
          <div class="float-icon">
            <div class="transform-180">
              <span class="iconfont icon-iconxx-31 btn-del" :class="{disable: index === 0}" @click="moveTop(index)" />
            </div>
            <div>
              <span class="iconfont icon-iconjiantou-35 btn-del" :class="{disable: index === 0}" @click="move(index, -1)" />
              <span class="iconfont icon-iconjiantou-34 btn-del" :class="{disable: index === data.activities.length - 1}" @click="move(index, 1)" />
              <span class="iconfont icon-iconxx-31 btn-del" :class="{disable: index === data.activities.length - 1}" @click="moveBottom(index)" />
              <span class="iconfont icon-icon-07 btn-del" @click="remove(activity)" />
            </div>
          </div>
        </div>
        <p class="tip">注：最多可添加20个权益项</p>
      </div>
      <div v-else class="blank-tip">请添加活动</div>
    </form-block>
    <lz-checkbox v-model="data.showTitle">显示标题</lz-checkbox>
    <lz-checkbox v-model="data.showExpire">显示过期权益</lz-checkbox>
    <MarginBottomSetting :data="data" />
    <lz-dialog title="积分加钱购" class="selector-dialog" append-to-body :visible.sync="selectorShow" width='50%'>
      <div style="margin-bottom:20px" v-if='shopList.length>0'>
        <label>选择店铺：</label>
        <lz-select v-model="shopId" placeholder="请选择" style="width:300px" @change='getActivities(1)'>
          <lz-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId">
          </lz-option>
        </lz-select>
        <label style="margin-left:10px">注:限POP选择店铺</label>
      </div>
      <div style="margin-bottom:20px" v-else>
        <label>选择店铺：</label>
        <lz-select v-model="selsectDis" placeholder="————" style="width:300px" disabled>
        </lz-select>
        <label style="margin-left:10px">注:限POP选择店铺</label>
      </div>
      <lz-table class="selector-table" border :data="pool">
        <lz-table-column label="活动详情" min-width='300px'>
          <template slot-scope="scope">
            <div class="activity-detail">
              <img :src="`${CONST.IMAGE_PREFIX}${scope.row.showPics}`">
              <div class="activity-info">
                <p>{{scope.row.activityName}}</p>
                <p>兑换积分:{{scope.row.integralMin}}</p>
                <p>折后价:{{scope.row.discountPriceMin}}元</p>
                <p>会员等级:{{`${scope.row.levelName}${scope.row.supportLevels < 5 ? '及以上' : ''}`}}</p>
              </div>
            </div>
          </template>
        </lz-table-column>
        <lz-table-column label="活动有效期" align="center" width="180">
          <template slot-scope="scope">
            <div>起：{{scope.row.startTime}}</div>
            <div>止：{{scope.row.endTime}}</div>
          </template>
        </lz-table-column>
        <lz-table-column label="活动总量" align="center" prop="activityGiftTotal" width="80" />
        <lz-table-column label="活动剩余量" align="center" prop="activityGiftRemain" width="100" />
        <lz-table-column label="活动状态" align="center" width="80">
          <template slot-scope="scope">
            {{['', '未开始', '进行中', '已结束','已暂停'][scope.row.activityStatus]}}
          </template>
        </lz-table-column>
        <lz-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <lz-button v-if="data.activities.some(c => c.id === scope.row.id)" size="mini" type="text" @click="remove(scope.row)">删除</lz-button>
            <lz-button v-else size="mini" type="text" @click="add(scope.row)">添加</lz-button>
          </template>
        </lz-table-column>
      </lz-table>

      <div style="text-align: right;" v-show="page.total > 0">
        <lz-pagination layout="total, prev, pager, next" :current-page="page.pageNo" :page-size="page.pageSize" @current-change="getActivities" :total="page.total">
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
import CouponThumb from '@/business/components/CouponThumb';
import { LzMsg, LzLoading } from '@/utils/UI';

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
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      selsectDis: '',
      CONST,
      levels: [],
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 999,
      },
      shopId: Number(utils.getShopId()),
      shopList: [],

      selectorShow: false,
      pool: [],
      rules: {
        activities: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.activities(value),
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
      const { data } = await Service.getShopsInfo();
      this.shopList = data.shops.filter(item => item.venderType == 0);
      if (this.shopList.length > 0) {
        this.shopId = this.shopList[0].shopId;
        this.getActivities(1);
      }
    },
    async getActivities(pageNo = this.page.pageNo) {
      this.data.cShopId = this.shopId;
      const loading = LzLoading.start();
      try {
        await Service.getPointMoneyBuyActivities({
          searchActivityType: [341],
          exchangeStatus: -9, // 全部
          shopId: this.shopId,
          isNow: 1,
          isHidden: 0,
          ...this.page,
          pageNo,
        }).then(({
          data,
          page,
        }) => {
          this.pool = data.filter(item => item.activityStatus != 3);
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
    add(activity) {
      if (this.data.activities.length < 20) {
        this.data.activities.push(activity);
      } else {
        LzMsg.error('权益数量不可超过20个');
      }
      this.$refs.formBlock.$refs.elForm.validateField('activities');
    },
    move(index, offset) {
      if (index + offset < 0) {
        return;
      }
      const activity = this.data.activities.splice(index, 1)[0];
      this.data.activities.splice(index + offset, 0, activity);
    },
    remove(activity) {
      this.data.activities = this.data.activities.filter(c => c.id !== activity.id);
    },
    moveTop(index) {
      if (index === 0) {
        return;
      }
      let target = [];
      target = this.data.activities;
      const item = target.splice(index, 1)[0];
      target.splice(0, 0, item);
    },
    moveBottom(index) {
      let target = [];
      target = this.data.activities;
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

.ctrl-point-money-buy-editor {
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

.activity-detail {
  display: flex;
  align-items: center;
  position: relative;
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

  &.activity-item {
    background-color: $WHITE;
    padding: 10px;
    margin: 5px 0;
  }

  img {
    width: 80px;
    height: 80px;
  }

  .activity-info {
    margin-left: 10px;
    flex: 1;
  }

  p {
    margin: 0px;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
  }

  .btn-del {
    color: $TAG_INFO_BLUE;

    &.disable {
      color: $FONT_DISABLE_GRAY;
    }
  }
}
</style>
