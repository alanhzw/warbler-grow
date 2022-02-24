<!--
 * @Description:试用商品组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-19 17:57:33
 * @LastEditTime: 2021-08-18 11:57:21
 * @FilePath: \interact\src\business\forms\Trial\Settings.vue
-->
<template>
  <div class="component-trail-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="isCanBeClick">
      <lz-form-item label="实物商品："
                    prop="freeSamplingPrizeReqDTO"
                    v-if="settings.items.includes('freeSamplingPrizeReqDTO')">
        <lz-button v-if='isShowBtn'
                   type="primary"
                   plain
                   @click="addProduct">添加实物</lz-button>
        <div class="prize-info"
             v-if="!isShowBtn"
             :class="{'is-can-be-click':isCanBeClick}">
          <lz-row>
            <lz-col :span="24"><label>商品名称：</label><span>{{ form.freeSamplingPrizeReqDTO.skuName }}</span></lz-col>
          </lz-row>
          <lz-row>
            <lz-col :span="12"><label>商品编号：</label><span>{{ form.freeSamplingPrizeReqDTO.skuCode }}</span></lz-col>
            <lz-col :span="12"><label>商家内部编号：</label><span>{{ form.freeSamplingPrizeReqDTO.wmsCode }}</span></lz-col>
          </lz-row>
          <lz-row>
            <lz-col :span="12"><label>可用库存：</label><span>{{ form.freeSamplingPrizeReqDTO.quantityAvailable }}</span></lz-col>
            <lz-col :span="12"><label>创建时间：</label><span>{{ form.freeSamplingPrizeReqDTO.createTime }}</span></lz-col>
          </lz-row>
          <i class="btn-del iconfont icon-icon-07"
             @click="clearProduct"
             v-if="!isCanBeClick" />
        </div>
        <lz-dialog title="选择实物"
                   width='1060px'
                   :visible.sync="productDialogShow"
                   v-if='productDialogShow'
                   :modal-append-to-body='false'
                   :close-on-click-modal='false'>
          <product-selector @select="selectProduct" />
        </lz-dialog>
      </lz-form-item>
      <lz-form-item label="权益发放总量："
                    prop="sendTotal"
                    v-if="settings.items.includes('freeSamplingPrizeReqDTO')">
        <lz-input v-model="form.freeSamplingPrizeReqDTO.sendTotal"
                  :maxlength="7"
                  @input='toInteger()'></lz-input> 份
        <p class="tip">注：如不填写则不限制发放次数</p>
      </lz-form-item>
    </lz-form>
  </div>
</template>

<script>
import Service from '@/business/service';
import ProductSelector from '../../components/property/ProductSelector';

export default {
  name: 'DrawSettings',
  components: {
    ProductSelector,
  },
  props: {
    formData: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      productDialogShow: false, // 选择实物的弹窗
      isShowBtn: true, // 是否展示添加实物按钮
      form: {
        freeSamplingPrizeReqDTO: {
          prizeKey: '', // 资产id
          prizeName: '', // 奖项名称
          prizePicture: '', // 奖项图片
          sendTotal: '', // 奖项发放总数数量
        },
      },
      rules: {
        freeSamplingPrizeReqDTO: [
          {
            required: true,
            message: '请添加实物',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (!value.prizeKey) {
                cb(new Error('请添加实物商品'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    calcuStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
    isCanBeClick() {
      return this.settings.disableStatus.includes(this.activityInfo.status) || this.calcuStarted;
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
    if (this.form.freeSamplingPrizeReqDTO.prizeName) {
      this.isShowBtn = false;
      if (this.form.freeSamplingPrizeReqDTO.sendTotal === -1) {
        this.form.freeSamplingPrizeReqDTO.sendTotal = '';
      }
      if (this.form.freeSamplingPrizeReqDTO.prizeKey) {
        this.getProduct(this.form.freeSamplingPrizeReqDTO.prizeName, this.form.freeSamplingPrizeReqDTO.prizeKey);
      }
    }
  },
  methods: {
    // 删除试用商品
    clearProduct() {
      this.isShowBtn = !this.isShowBtn;
      this.form.freeSamplingPrizeReqDTO.prizeName = '';
    },
    // 输入正整数
    toInteger() {
      this.form.freeSamplingPrizeReqDTO.sendTotal = this.form.freeSamplingPrizeReqDTO.sendTotal.toString().replace(/^(0+)|[^\d]+/g, '');
    },
    // 点击添加实物按钮
    addProduct() {
      this.productDialogShow = true;
    },
    // 选择实物
    selectProduct(product) {
      this.form.freeSamplingPrizeReqDTO = {
        ...this.form.freeSamplingPrizeReqDTO,
        ...product,
      };
      this.form.freeSamplingPrizeReqDTO.prizeKey = product.skuCode;
      this.form.freeSamplingPrizeReqDTO.prizeName = product.skuName;
      this.productDialogShow = false;
      this.isShowBtn = false;
      this.$refs.elForm.validateField('freeSamplingPrizeReqDTO');
    },
    // 查询实物
    async getProduct(skuName, skuOrWmsCode) {
      const { data } = await Service.getProduct({
        skuName,
        skuOrWmsCode,
        pageNo: 1,
        pageSize: 10,
      });
      this.form.freeSamplingPrizeReqDTO = {
        ...this.form.freeSamplingPrizeReqDTO,
        ...data[0],
      };
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-trail-settings {
  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }

  .prize-info {
    border: 1px dashed $BORDER_GRAY;
    padding: 0 20px;
    color: $FONT_COMMON_GRAY;
    font-size: 12px;
    position: relative;

    .btn-del {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
  .draw-time-settings {
    font-size: 14px;

    color: $FONT_COMMON_GRAY;

    .btn-del {
      color: $TAG_INFO_BLUE;
      margin-left: 20px;
    }
  }

  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }

  .lz-input {
    width: 600px;
  }
}
</style>
