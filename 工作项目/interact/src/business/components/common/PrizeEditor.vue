<template>
  <div class="component-prize-editor">
    <lz-dialog title="编辑奖项"
               width='1060px'
               class="edit-prize"
               :visible.sync="prizeDialogShow"
               :close-on-click-modal='false'
               :modal-append-to-body='false'
               @closed='resetForms'>
      <lz-form label-width="130px"
               ref="elForm"
               :model="prizeForm"
               :rules="rules"
               :class="{'is-can-be-click':calcuStarted ||activityInfo.status==4}">
        <div class="prize-title"
             v-if="isShowPrizeNumber.includes(activityInfo.activityType)">获奖设置</div>
        <lz-form-item label="奖项数量："
                      v-show="isShowPrizeNumber.includes(activityInfo.activityType)"
                      prop="prizeNumber">
          <lz-input v-model="prizeForm.prizeNumber"
                    @input="changePrizeNumber"
                    maxlength="7">
            <span v-if="prizeForm.prizeType == 2"
                  class="suffix-text"
                  slot="suffix">人</span>
          </lz-input>
        </lz-form-item>

        <lz-form-item label="获奖排名："
                      v-if="isShowPrizeNumber.includes(activityInfo.activityType)"
                      prop="prizeRank">
          <span v-if='prizeForm.prizeNumber != "1" '>第 {{prizeForm.prizeRankBegin}} 至 {{prizeForm.prizeRankEnd}} 名</span>
          <span v-else>第 {{prizeForm.prizeRankBegin}} 名</span>
        </lz-form-item>
        <div class="prize-title"
             v-if="isShowPrizeNumber.includes(activityInfo.activityType)">奖品设置</div>
        <lz-form-item label="奖品类型："
                      prop="prizeType"
                      :class="{'is-can-be-click':calcuStarted}">
          <lz-radio-group v-model="prizeForm.prizeType"
                          @change="prizeTypeChange">
            <lz-radio :label="2">京豆</lz-radio>
            <lz-radio :label="1">优惠券</lz-radio>
            <lz-radio :label="4">积分</lz-radio>
            <lz-radio :label="3">实物</lz-radio>
          </lz-radio-group>
        </lz-form-item>
        <lz-form-item v-if="prizeForm.prizeType == 1"
                      label="优惠券："
                      required>
          <div class="prize-info"
               v-if="prizeForm.couponSelected.planId">
            <lz-row>
              <lz-col :span="24"><label>优惠券名称：</label><span>{{ prizeForm.couponSelected.planName }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="24"><label>领取时间：</label><span>{{ prizeForm.couponSelected.startTime }}-{{ prizeForm.couponSelected.endTime }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="12"><label>限领条件：</label><span>{{ prizeForm.couponSelected.couponQuota > 0 ? `满${prizeForm.couponSelected.couponQuota}元可用` : `无使用限制` }}</span></lz-col>
              <lz-col :span="12"><label>剩余张数：</label><span>{{ prizeForm.couponSelected.quantityRemain }}</span></lz-col>
            </lz-row>
            <i class="btn-del iconfont icon-icon-07"
               @click="prizeForm.couponSelected = {}" />
          </div>
          <div class="selector-tip"
               v-else
               @click="couponDialogShow = true">
            <div>
              <img :src="prizePic" />
              <p>请选择优惠券</p>
            </div>
          </div>
        </lz-form-item>
        <lz-form-item v-if="prizeForm.prizeType == 2"
                      label="京豆计划："
                      required>
          <lz-radio-group v-model="prizeForm.ifplan">
            <lz-radio :label="1">自动新建计划</lz-radio>
            <lz-radio :label="2">选择已有计划</lz-radio>
          </lz-radio-group>

          <div class="prize-info"
               v-if="prizeForm.ifplan === 2 && prizeForm.beanPlanSelected.planId">
            <lz-row>
              <lz-col :span="12"><label>计划名称：</label><span>{{ prizeForm.beanPlanSelected.planName }}</span></lz-col>
              <lz-col :span="12"><label>计划编号：</label><span>{{ prizeForm.beanPlanSelected.planId }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="12"><label>创建时间：</label><span>{{ prizeForm.beanPlanSelected.createTime }}</span></lz-col>
              <lz-col :span="12"><label>京豆余量：</label><span>{{ prizeForm.beanPlanSelected.quantityRemain }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="12"><label>生效时间：</label><span>{{ prizeForm.beanPlanSelected.startDate }}-{{ prizeForm.beanPlanSelected.endDate }}</span></lz-col>
            </lz-row>
            <i class="btn-del iconfont icon-icon-07"
               @click="prizeForm.beanPlanSelected = {}" />
          </div>

          <div v-if="prizeForm.ifplan === 2 && !prizeForm.beanPlanSelected.planId"
               class="selector-tip"
               @click="beanDialogShow = true">
            <div>
              <img :src="prizePic" />
              <p>请选择京豆计划</p>
            </div>
          </div>
        </lz-form-item>
        <lz-form-item v-if="prizeForm.prizeType == 3"
                      label="实物商品："
                      required>
          <div class="prize-info"
               v-if="prizeForm.productSelected.skuCode">
            <lz-row>
              <lz-col :span="24"><label>商品名称：</label><span>{{ prizeForm.productSelected.skuName }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="12"><label>商品编号：</label><span>{{ prizeForm.productSelected.skuCode }}</span></lz-col>
              <lz-col :span="12"><label>商家内部编号：</label><span>{{ prizeForm.productSelected.wmsCode }}</span></lz-col>
            </lz-row>
            <lz-row>
              <lz-col :span="12"><label>可用库存：</label><span>{{ prizeForm.productSelected.quantityAvailable }}</span></lz-col>
              <lz-col :span="12"><label>创建时间：</label><span>{{ prizeForm.productSelected.createTime }}</span></lz-col>
            </lz-row>
            <i class="btn-del iconfont icon-icon-07"
               @click="prizeForm.productSelected = {}" />
          </div>
          <div v-else
               class="selector-tip"
               @click="productDialogShow = true">
            <div>
              <img :src="prizePic" />
              <p>请选择实物</p>
            </div>
          </div>
        </lz-form-item>
        <lz-form-item label="奖品名称："
                      prop="prizeName">
          <lz-input v-model="prizeForm.prizeName"
                    :maxlength="10"
                    show-word-limit></lz-input>
        </lz-form-item>
        <lz-form-item label="单次发放量："
                      v-show="prizeForm.prizeType == 2 || prizeForm.prizeType == 4"
                      prop="sendNumUnit"
                      required
                      :class="{'is-can-be-click':calcuStarted}">
          <lz-input v-model="prizeForm.sendNumUnit"
                    maxlength="7"
                    @input='toInteger("sendNumUnit")'>
            <span v-if="prizeForm.prizeType == 2"
                  class="suffix-text"
                  slot="suffix">京豆</span>
            <span v-if="prizeForm.prizeType == 4"
                  class="suffix-text"
                  slot="suffix">积分</span>
          </lz-input>
        </lz-form-item>
        <lz-form-item label="权益发放总量："
                      prop="sendPeople">
          <span class="xingxing"
                v-if='prizeForm.prizeType == 2 ||prizeForm.prizeType == 1'>*</span>
          <lz-input :disabled='activityInfo.activityType==506||activityInfo.activityType==507'
                    v-model="prizeForm.sendPeople"
                    maxlength="7"
                    @input='toInteger("sendPeople")'>
            <span class="suffix-text"
                  slot="suffix">份</span>
          </lz-input>
          <span v-if='prizeForm.prizeType == 2'> = {{prizeForm.sendPeople * prizeForm.sendNumUnit}}京豆</span>
          <p class="tip"
             v-if='prizeForm.prizeType == 1'>注：权益发放总量不可超过优惠券剩余数量</p>
          <p class="tip"
             v-if='prizeForm.prizeType == 4 || prizeForm.prizeType == 3'>注：如不填写则不限制发放次数，到权益过期为止</p>
        </lz-form-item>
        <lz-form-item label="获奖消费额度："
                      prop="prizeQuota"
                      v-if="isShowPrizeQuota.includes(activityInfo.activityType)"
                      :class="{'is-can-be-click':calcuStarted}">
          <lz-input v-model="prizeForm.prizeQuota"
                    @input='toFixedTwo("prizeQuota")'>
            <span class="suffix-text"
                  slot="suffix">元</span>
          </lz-input>
        </lz-form-item>

        <lz-form-item label="奖品图片："
                      prop="prizePicture">
          <img class="prize-img"
               v-if="!prizeForm.prizePicture || prizeForm.prizePicture == '' || prizeForm.prizePicture == '1' "
               :src="tipPic"
               @click="imageDialogShowed = true" />
          <img v-else
               class="prize-img"
               :src="`${CONST.IMAGE_PREFIX}${prizeForm.prizePicture}`"
               @click="imageDialogShowed = true" />
          <p class="tip">注：请上传尺寸为500*500px，文件大小不超过500kb的图片</p>
        </lz-form-item>
      </lz-form>
      <span slot="footer"
            class="dialog-footer"
            v-if="activityInfo.status!=4">
        <lz-button type="primary"
                   @click="confirm()">确 定</lz-button>
        <lz-button @click="cancel()">取 消</lz-button>
      </span>
    </lz-dialog>

    <lz-dialog title="选择优惠券"
               width='1060px'
               :visible.sync="couponDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <coupon-selector @select="selectCoupon" />
    </lz-dialog>
    <lz-dialog title="选择京豆计划"
               width='1060px'
               :visible.sync="beanDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <bean-plan-selector @select="selectBeanPlan" />
    </lz-dialog>
    <lz-dialog title="选择实物"
               width='1060px'
               :visible.sync="productDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <product-selector @select="selectProduct" />
    </lz-dialog>
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="imageDialogShowed"
               width="1150px"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <jd-image-selector @selected="selectImage"
                         :validator="imgValidator" />
    </lz-dialog>
  </div>
</template>

<script>
import LzMsg from '@/business/utils/LzMsg';
import CouponSelector from '../property/CouponSelector';
import BeanPlanSelector from '../property/BeanPlanSelector';
import ProductSelector from '../property/ProductSelector';
import JdImageSelector from '../common/JdImageSelector';
import CONST from '@/utils/constant';

const initPrizeForm = {
  prizeIndex: 0, // 奖项级别(数字1/2/3表示)
  prizeQuota: '', // 获奖消费额度
  prizeType: 2, // 奖项类型(1-优惠券；2-京豆；3-实物商品；4-积分)
  ifplan: 1, // 1自动新建计划，2选择已有计划
  prizeKey: '', // 资产id
  prizeName: '', // 奖项名称
  prizeNumber: '', // 奖项数量
  prizePicture: '1', // 奖项图片
  sendNumUnit: '', // 奖项发放单位数量
  sendPeople: '', // 奖项发放人数
  couponSelected: {},
  beanPlanSelected: {},
  productSelected: {},
  prizeRankBegin: '—',
  prizeRankEnd: '—',
};

export default {
  name: 'PrizeEditor',
  components: {
    CouponSelector,
    BeanPlanSelector,
    ProductSelector,
    JdImageSelector,
  },
  props: {
    show: false,
    activityInfo: {
      default: () => ({}),
    },
    prizeList: {
      default: () => ([]),
    },
    allData: {
      default: () => ({}),
    },
  },
  data() {
    return {
      isShowPrizeQuota: [501, 502, 503, 504, 505, 508], // 是否展示获奖消费额度
      prizeIndexOnEdit: -1, // 当前在编辑的索引
      isShowPrizeNumber: [506, 507], // 是否展示奖项数量
      CONST,
      prizePic: require('@/assets/select.jpg'),
      prizeDialogShow: false,
      couponDialogShow: false,
      beanDialogShow: false,
      productDialogShow: false,
      imageDialogShowed: false,
      prizeForm: {
        ...initPrizeForm,
      },
      rules: {
        prizeQuota: [
          {
            required: true,
            message: '请设置消费额度',
            trigger: 'change',
          },

        ],
        prizeType: [
          {
            required: true,
            trigger: 'change',
          },
        ],
        ifplan: [
          {
            required: true,
            trigger: 'change',
          },
        ],
        // prizeKey: "", //资产id
        prizeName: [
          {
            required: true,
            message: '请设置奖项名称',
            trigger: 'change',
          },
        ],
        prizePicture: [
          {
            required: true,
            message: '请设置奖品图片',
            trigger: 'change',
          },
        ],
        sendNumUnit: [
          {
            required: true,
            message: '请设置单次发放量',
            trigger: 'blur',
          },
          {
            validator(rule, value, cb) {
              if (/(^[1-9]\d*$)/.test(value)) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],

        prizeNumber: [
          {
            required: true,
            message: '请设置奖项数量',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (/(^[1-9]\d*$)/.test(value)) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    tipPic() {
      // 奖项类型(1-优惠券；2-京豆；3-实物商品；4-积分)
      if (this.prizeForm.prizeType === 2) {
        return require('@/assets/gift-bean.png');
      } else if (this.prizeForm.prizeType === 1) {
        return require('@/assets/gift-coupon.png');
      } else if (this.prizeForm.prizeType === 4) {
        return require('@/assets/gift-point.png');
      }
      return require('@/assets/image-select.png');
    },
    // 活动是否开始
    isActivityBegin() {
      if (this.$route.params.id && this.activityInfo.status && this.activityInfo.status > 0) {
        return true;
      }
      return false;
    },
    // 用来判断输入框是否可以修改
    calcuStarted() {
      if (this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507 || this.activityInfo.activityType == 503) {
        // 结算开始时间小于当前时间返回true  代表已经到了结算时间
        return new Date(this.activityInfo.orderStartTime) < new Date();
      }
      // 结算开始时间小于当前时间返回true  代表已经到了结算时间
      return false;
    },
  },

  methods: {

    // 重置表单
    resetForms() {
      if (this.$refs.elForm) {
        this.$refs.elForm.resetFields();
      }
      this.prizeForm.prizeQuota = ''; // 获奖消费额度
      this.prizeForm.ifplan = 1; // 1自动新建计划，2选择已有计划
      this.prizeForm.prizeKey = ''; // 资产id
      this.prizeForm.prizeName = ''; // 奖项名称
      this.prizeForm.prizeNumber = ''; // 奖项数量
      this.prizeForm.prizePicture = '1'; // 奖项图片
      this.prizeForm.sendPeople = ''; // 奖项发放人数
      this.prizeForm.couponSelected = {};
      this.prizeForm.beanPlanSelected = {};
      this.prizeForm.productSelected = {};
      this.prizeForm.prizeRankBegin = '—';
      this.prizeForm.prizeRankEnd = '—';
    },
    // 输入正整数
    toInteger(content) {
      this.prizeForm[content] = this.prizeForm[content].replace(/^(0+)|[^\d]+/g, '');
    },
    toFixedTwo(content) {
      if (this.prizeForm[content] > 9999999.99) {
        this.prizeForm[content] = 9999999.99;
      }
      try {
        this.prizeForm[content] = this.prizeForm[content].replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
        this.prizeForm[content] = this.prizeForm[content].replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
        this.prizeForm[content] = this.prizeForm[content].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        // eslint-disable-next-line no-useless-escape
        this.prizeForm[content] = this.prizeForm[content].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入2个小数
        if (this.prizeForm[content].indexOf('.') < 0 && this.prizeForm[content] !== '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.prizeForm[content] = parseFloat(this.prizeForm[content]);
        }
        if (this.prizeForm[content].indexOf('.') == 0) {
          this.prizeForm[content] = `${'0' + ''}${this.prizeForm[content]}`;
        }
      } catch (error) {
        console.log('error:', error);
      }
    },
    showDialog(product = {}, index = -1) {
      this.prizeForm = {
        ...initPrizeForm,
        ...product,
      };
      if (product.productData) {
        this.prizeForm.productSelected = product.productData;
      }
      if (product.beanData) {
        this.prizeForm.beanPlanSelected = product.beanData;
        this.prizeForm.ifplan = 2;
      }
      if (product.couponData) {
        this.prizeForm.couponSelected = product.couponData;
      }
      this.prizeDialogShow = true;
      this.prizeIndexOnEdit = index;
    },
    prizeTypeChange(type) {
      this.resetForms();
      this.prizeForm.prizeType = type;
      if (type === 1 || type === 3) {
        this.prizeForm.sendNumUnit = 1;
      } else {
        this.prizeForm.sendNumUnit = '';
      }
    },
    async confirm() {
      if (!this.isShowPrizeNumber.includes(this.activityInfo.activityType)) {
        this.prizeForm.prizeNumber = 1;
      }
      try {
        // (1-优惠券；2-京豆；3-实物商品；4-积分)
        switch (this.prizeForm.prizeType) {
          case 1:
            if (this.prizeForm.prizePicture === '1') {
              this.prizeForm.prizePicture = 'jfs/t1/168213/39/7088/1294/60321504E0dc51392/ac632ed8e6f9e3fb.png';
            }
            if (!this.prizeForm.sendPeople) {
              throw new Error('请输入权益发放总量');
            }
            if (this.prizeForm.couponSelected.planId && this.prizeForm.couponSelected.planId !== '') {
              this.prizeForm.prizeKey = this.prizeForm.couponSelected.planId;
            } else {
              throw new Error('请选择优惠券');
            }
            if (Number(this.prizeForm.couponSelected.quantityRemain) < Number(this.prizeForm.sendPeople)) {
              throw new Error('优惠券剩余数量不足');
            }
            break;
          case 2:
            if (this.prizeForm.prizePicture === '1') {
              this.prizeForm.prizePicture = 'jfs/t1/165038/27/7099/1574/60321500E2c8d8bfd/da4953c4bace47b7.png';
            }
            if (!this.prizeForm.sendPeople) {
              throw new Error('请输入权益发放总量');
            }
            // 1自动新建计划，2选择已有计划
            if (this.prizeForm.ifplan === 1) {
              this.prizeForm.prizeKey = '';
            } else {
              if (this.prizeForm.beanPlanSelected.planId && this.prizeForm.beanPlanSelected.planId !== '') {
                this.prizeForm.prizeKey = this.prizeForm.beanPlanSelected.planId;
              } else {
                throw new Error('请选择京豆计划');
              }
              if (Number(this.prizeForm.beanPlanSelected.quantityRemain) < Number(this.prizeForm.sendNumUnit) * Number(this.prizeForm.sendPeople)) {
                throw new Error('京豆剩余数量不足');
              }
            }
            break;
          case 3:
            if (this.prizeForm.productSelected.skuCode && this.prizeForm.productSelected.skuCode !== '') {
              this.prizeForm.prizeKey = this.prizeForm.productSelected.skuCode;
            } else {
              throw new Error('请选择实物商品');
            }
            // quantityRemain : 剩余库存
            // if (Number(this.prizeForm.productSelected.quantityRemain) < Number(this.prizeForm.sendPeople)) {
            //   throw new Error('实物商品剩余数量不足');
            // }
            // quantityAvailable : 可用库存
            // bug: 17559
            if (Number(this.prizeForm.productSelected.quantityAvailable) < Number(this.prizeForm.sendPeople)) {
              throw new Error('实物商品剩余数量不足');
            }
            if (this.prizeForm.prizePicture === '1') {
              throw new Error('请上传实物商品的图片');
            }
            break;
          case 4:
            if (this.prizeForm.prizePicture === '1') {
              this.prizeForm.prizePicture = 'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png';
            }
            this.prizeForm.prizeKey = '';
            break;
          default:
            return;
        }

        if (this.prizeForm.prizeQuota) {
          this.prizeForm.prizeQuota = parseFloat(this.prizeForm.prizeQuota);
        }
        if (this.prizeForm.sendNumUnit) {
          this.prizeForm.sendNumUnit = parseInt(this.prizeForm.sendNumUnit);
        }
        if (this.prizeForm.sendPeople) {
          this.prizeForm.sendPeople = parseInt(this.prizeForm.sendPeople);
        }
        await this.$refs.elForm.validate();
        this.$emit('confirm', this.prizeForm);
        this.prizeDialogShow = false;
        this.$refs.elForm.resetFields();
      } catch (e) {
        if (e) {
          LzMsg.error(e.message);
        }
      }
    },
    cancel() {
      // this.$refs.elForm.resetFields();
      this.prizeDialogShow = false;
    },
    selectProduct(product) {
      this.prizeForm.productSelected = {
        ...product,
      };
      this.productDialogShow = false;
    },
    selectCoupon(coupon) {
      this.prizeForm.couponSelected = {
        ...coupon,
      };
      this.couponDialogShow = false;
      console.log(coupon);
    },
    selectBeanPlan(plan) {
      this.prizeForm.beanPlanSelected = {
        ...plan,
      };
      this.beanDialogShow = false;
    },
    selectImage(pic) {
      this.prizeForm.prizePicture = pic;
      this.$refs.elForm.validateField('prizePicture');
      this.imageDialogShowed = false;
    },
    imgValidator(width, height, size, type) {
      return new Promise((resolve, reject) => {
        if (width !== 500 || height !== 500) {
          reject('上传图片的尺寸为500*500px,请上传对应尺寸图片');
        } else if (type !== 'png' && type !== 'jpeg') {
          reject('请上传png或jpg格式的图片');
        } else {
          resolve();
        }
      });
    },
    // 修改奖项数量
    changePrizeNumber() {
      this.prizeForm.prizeNumber = this.prizeForm.prizeNumber.replace(/^(0+)|[^\d]+/g, '');
      if (this.prizeForm.prizeNumber > 0) {
        // 新增
        if (this.prizeIndexOnEdit === -1) {
          this.prizeForm.prizeRankBegin = 1;
          this.prizeForm.prizeRankEnd = 0;
          this.prizeList.forEach((item) => {
            this.prizeForm.prizeRankBegin += Number(item.prizeNumber);
            this.prizeForm.prizeRankEnd += Number(item.prizeNumber);
          });
          this.prizeForm.prizeRankBegin = this.prizeForm.prizeRankBegin;
          this.prizeForm.prizeRankEnd = Number(this.prizeForm.prizeRankEnd) + Number(this.prizeForm.prizeNumber);
          // 修改
        } else {
          this.prizeForm.prizeRankBegin = this.prizeList[this.prizeIndexOnEdit].prizeRankBegin;
          this.prizeForm.prizeRankEnd = this.prizeList[this.prizeIndexOnEdit].prizeRankEnd;
          this.prizeForm.prizeRankEnd = Number(this.prizeForm.prizeRankBegin) + Number(this.prizeForm.prizeNumber) - 1;
        }
      } else {
        this.prizeForm.prizeRankBegin = ' — ';
        this.prizeForm.prizeRankEnd = ' — ';
      }
      if (this.allData.prizeDistributionForm.awardType == 1) {
        // 新增
        if (this.prizeIndexOnEdit === -1) {
          this.prizeForm.sendPeople = Number(this.prizeForm.prizeNumber);
          this.prizeList.forEach((item) => {
            this.prizeForm.sendPeople += Number(item.prizeNumber);
          });
        } else {
          // 修改
          this.prizeForm.sendPeople = Number(this.prizeForm.prizeNumber);
          this.prizeList.forEach((item, index) => {
            if (index < this.prizeIndexOnEdit) {
              this.prizeForm.sendPeople += Number(item.prizeNumber);
            }
          });
        }
      } else {
        this.prizeForm.sendPeople = this.prizeForm.prizeNumber;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-prize-editor {
  position: relative;
  .prize-title {
    width: 250px;
  }
  .xingxing {
    color: red;
    position: absolute;
    top: 0;
    left: -120px;
  }
  .suffix-text {
    margin-right: 10px;
    line-height: 40px;
  }
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
    div:nth-child(3) .el-col-12 {
      width: 70%;
    }
  }

  .prize-img {
    width: 100px;
  }

.edit-prize{
  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }

  .lz-input {
    width: 600px;
  }
}
}
</style>

