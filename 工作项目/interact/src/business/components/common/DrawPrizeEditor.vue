<template>
  <div class="component-prize-editor">
    <lz-dialog width='1060px'
               title="编辑奖项"
               :visible.sync="prizeDialogShow"
               :close-on-click-modal='false'
               :modal-append-to-body='false'
               @closed='resetForms'>
      <lz-form label-width="130px"
               ref="elForm"
               :model="prizeForm"
               :rules="rules"
               :class="{'is-can-be-click':activityInfo.status==4}">
        <lz-form-item label="奖品类型："
                      prop="prizeType"
                      :class="{'is-can-be-click':isActivityBegin}">
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
               v-if="prizeForm.couponSelected.planId"
               @click="couponDialogShowFn()">
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
               @click.stop="prizeForm.couponSelected = {}" />
          </div>
          <div class="selector-tip"
               v-else
               @click="couponDialogShowFn()">
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
            <lz-radio :label="1">新建计划</lz-radio>
            <lz-radio :label="2">已有计划</lz-radio>
          </lz-radio-group>
          <span class="bean-account">京豆账户余额:{{ beanAccount.availableNum }}<a href="https://quanyi.shop.jd.com/#/beanAccount"
               class="add-count">去充值>></a></span>
          <div class="prize-info"
               v-if="prizeForm.ifplan === 2 && prizeForm.beanPlanSelected.planId"
               @click="beanDialogShowFn()">
            <lz-row>
              <lz-col :span=" 12"><label>计划名称：</label><span>{{ prizeForm.beanPlanSelected.planName }}</span></lz-col>
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
               @click.stop="prizeForm.beanPlanSelected = {}" />
          </div>

          <div v-if="prizeForm.ifplan === 2 && !prizeForm.beanPlanSelected.planId"
               class="selector-tip"
               @click="beanDialogShowFn()">
            <div>
              <img :src="prizePic" />
              <p>请选择京豆计划</p>
            </div>
          </div>
        </lz-form-item>
        <lz-form-item v-if="prizeForm.prizeType == 3"
                      label="实物："
                      required>
          <div class="prize-info"
               v-if="prizeForm.productSelected.skuCode"
               @click="productDialogShowFn()">
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
               @click.stop="prizeForm.productSelected = {}" />
          </div>
          <div v-else
               class="selector-tip"
               @click="productDialogShowFn()">
            <div>
              <img :src="prizePic" />
              <p>请选择实物</p>
            </div>
          </div>
        </lz-form-item>

        <lz-form-item label="奖品名称："
                      prop="prizeName"
                      :class="{'is-can-be-click':isActivityBegin}">
          <lz-input v-model="prizeForm.prizeName"
                    :maxlength="10"
                    show-word-limit></lz-input>
        </lz-form-item>

        <lz-form-item label="单次发放量："
                      v-show="prizeForm.prizeType == 2 || prizeForm.prizeType == 4"
                      prop="sendNumUnit"
                      :class="{'is-can-be-click':isActivityBegin}">
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
          <span class="tip"
                v-if="prizeForm.prizeType == 2">&nbsp;(1京豆约合0.01元)</span>
        </lz-form-item>

        <lz-form-item label="发放份数："
                      prop="sendPeople"
                      :class="{'is-can-be-click':isActivityBegin}">
          <lz-input v-model="prizeForm.sendPeople"
                    maxlength="7"
                    @input='toInteger("sendPeople")'>
            <span class="suffix-text"
                  slot="suffix">人</span>
          </lz-input>
          <span v-if='prizeForm.prizeType == 2'> = {{prizeForm.sendPeople * prizeForm.sendNumUnit}}京豆</span>
        </lz-form-item>
        <lz-form-item label="中奖概率："
                      prop="drawChance"
                      :class="{'is-can-be-click':activityInfo.status==4}">
          <lz-input v-model="prizeForm.drawChance"
                    maxlength="7"
                    @input="toFixedThree()">
            <span class="suffix-text"
                  slot="suffix">%</span>
          </lz-input>
        </lz-form-item>

        <lz-form-item label="每日发放限额："
                      prop="dailyLimit"
                      v-if="activityInfo.activityType===505 || activityInfo.activityType===504"
                      :class="{'is-can-be-click':activityInfo.status==4}">
          <lz-radio-group v-model="prizeForm.dailyLimitType"
                          @change="changeDailyLimitType">
            <lz-radio :label="1">无限制</lz-radio>
            <lz-radio :label="2">
              有限制
              <span style="margin-left: 10px"
                    v-if="prizeForm.dailyLimitType == 2">限
                <lz-input class="count-input"
                          maxlength="7"
                          @input='toInteger("dailyLimit")'
                          :disabled="prizeForm.dailyLimitType == 1"
                          v-model="prizeForm.dailyLimit" />次
              </span>
            </lz-radio>
          </lz-radio-group>
          <!-- <p class="tip">注：限制活动周期内用户最大抽奖次数，为避免客诉，需谨慎设置</p> -->
        </lz-form-item>

        <lz-form-item label="奖品图片："
                      prop="prizePicture"
                      :class="{'is-can-be-click':isActivityBegin}">
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
               v-if="couponDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <coupon-selector @select="selectCoupon"
                       :prizeForm='prizeForm' />
    </lz-dialog>
    <lz-dialog title="选择京豆计划"
               width='1060px'
               :visible.sync="beanDialogShow"
               v-if="beanDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <bean-plan-selector @select="selectBeanPlan"
                          :prizeForm='prizeForm' />
    </lz-dialog>
    <lz-dialog title="选择实物"
               width='1060px'
               :visible.sync="productDialogShow"
               v-if="productDialogShow"
               :modal-append-to-body='false'
               :close-on-click-modal='false'>
      <product-selector @select="selectProduct"
                        :prizeForm='prizeForm' />
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
import Service from '@/business/service';

const initPrizeForm = {
  prizeIndex: 0, // 奖项级别(数字1/2/3表示)
  prizeQuota: 100, // 获奖消费额度
  prizeType: 2, // 奖项类型(1-优惠券；2-京豆；3-实物商品；4-积分)
  ifplan: 1, // 1自动新建计划，2选择已有计划
  prizeKey: '', // 资产id
  prizeName: '', // 奖项名称
  prizePicture: '1', // 奖项图片
  sendNumUnit: '', // 奖项发放单位数量
  sendPeople: '', // 奖项发放人数
  drawChance: '',
  couponSelected: {},
  beanPlanSelected: {},
  productSelected: {},
  dailyLimitType: 1, // 每日发放限额单选框
  dailyLimit: -1, // 每日发放限额
};

export default {
  name: 'DrawPrizeEditor',
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
  },
  data() {
    return {
      beanAccount: {
        activePlanCount: '', // 已生效京豆计划个数
        availableNum: '', // 可用数量
        freezeNum: '', // 冻结数量
        mainNum: '', // 主账户数量
        runOutPlanCount: '', // 用完京东计划个数
      }, // 京豆账户余额
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
        drawChance: [
          {
            required: true,
            message: '请设置中奖概率',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value >= 0) {
                cb();
              } else {
                cb(new Error('请输入不小于0的数字'));
              }
            },
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value <= 100) {
                cb();
              } else {
                cb(new Error('中奖概率不能大于100%'));
              }
            },
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
        // 奖项发放单位数量
        sendPeople: [
          {
            required: true,
            message: '请设置奖项发放份数',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
        dailyLimit: [
          {
            required: true,
            message: '请设置每日发放限额',
            trigger: 'change',
          },

        ],
        sendNumUnit: [
          {
            required: true,
            message: '请设置奖项发放单位数量',
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
  methods: {
    // 打开京豆计划弹窗
    beanDialogShowFn() {
      this.beanDialogShow = true;
    },
    // 打开优惠券弹窗
    couponDialogShowFn() {
      this.couponDialogShow = true;
    },
    // 打开实物弹窗
    productDialogShowFn() {
      this.productDialogShow = true;
    },
    // 重置表单
    resetForms() {
      if (this.$refs.elForm) {
        this.$refs.elForm.resetFields();
      }
      this.prizeForm.prizeQuota = 100; // 获奖消费额度
      this.prizeForm.ifplan = 1; // 1自动新建计划，2选择已有计划
      this.prizeForm.prizeKey = ''; // 资产id
      this.prizeForm.prizeName = ''; // 奖项名称
      this.prizeForm.prizePicture = '1'; // 奖项图片
      this.prizeForm.sendPeople = ''; // 奖项发放人数
      this.prizeForm.drawChance = '';
      this.prizeForm.couponSelected = {};
      this.prizeForm.beanPlanSelected = {};
      this.prizeForm.productSelected = {};
      this.prizeForm.dailyLimitType = 1; // 每日发放限额单选框
      this.prizeForm.dailyLimit = -1; // 每日发放限额
    },
    // 获取京豆余额
    async getBeanAccount() {
      const { data } = await Service.getBeanAccount();
      this.beanAccount = data;
    },
    // 保留三位小数
    toFixedThree() {
      this.prizeForm.drawChance = this.prizeForm.drawChance.replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
      this.prizeForm.drawChance = this.prizeForm.drawChance.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      this.prizeForm.drawChance = this.prizeForm.drawChance.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      // eslint-disable-next-line no-useless-escape
      this.prizeForm.drawChance = this.prizeForm.drawChance.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');// 只能输入3个小数
      if (this.prizeForm.drawChance.indexOf('.') < 0 && this.prizeForm.drawChance !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.prizeForm.drawChance = parseFloat(this.prizeForm.drawChance);
      }
    },

    // 输入正整数
    toInteger(content) {
      this.prizeForm[content] = Number(this.prizeForm[content].toString().replace(/^(0+)|[^\d]+/g, ''));
    },
    toFixedTwo(content) {
      try {
        this.form[content] = this.form[content].replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
        this.form[content] = this.form[content].replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
        this.form[content] = this.form[content].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        // eslint-disable-next-line no-useless-escape
        this.form[content] = this.form[content].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入2个小数
        if (this.form[content].indexOf('.') < 0 && this.form[content] !== '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.form[content] = parseFloat(this.form[content]);
        }
        if (this.form[content].indexOf('.') == 0) {
          this.form[content] = `${'0' + ''}${this.form[content]}`;
        }
      } catch (error) {
        console.log('error:', error);
      }
    },
    changeDailyLimitType(value) {
      if (value === 1) {
        this.prizeForm.dailyLimit = -1;
      } else {
        this.prizeForm.dailyLimit = 1;
      }
    },

    showDialog(product = {}) {
      this.getBeanAccount();
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
      this.prizeForm.dailyLimitType = this.prizeForm.dailyLimit === -1 ? 1 : 2;
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
      try {
        // (1-优惠券；2-京豆；3-实物商品；4-积分)
        switch (this.prizeForm.prizeType) {
          case 1:
            if (this.prizeForm.prizePicture === '1') {
              this.prizeForm.prizePicture = 'jfs/t1/168213/39/7088/1294/60321504E0dc51392/ac632ed8e6f9e3fb.png';
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
            if (Number(this.prizeForm.productSelected.quantityRemain) < Number(this.prizeForm.sendPeople)) {
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

        // 数字类型的数据做一下处理
        // prizeQuota: 100, //获奖消费额度
        // sendNumUnit: 1, //奖项发放单位数量
        // sendPeople: 1, //奖项发放人数
        // drawChance: 0,
        if (this.prizeForm.prizeQuota) {
          this.prizeForm.prizeQuota = Number(this.prizeForm.prizeQuota);
        }
        if (this.prizeForm.sendNumUnit) {
          this.prizeForm.sendNumUnit = Number(this.prizeForm.sendNumUnit);
        }
        if (this.prizeForm.sendPeople) {
          this.prizeForm.sendPeople = Number(this.prizeForm.sendPeople);
        }
        if (this.prizeForm.drawChance) {
          this.prizeForm.drawChance = Number(this.prizeForm.drawChance);
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
  },
  computed: {
    isActivityBegin() {
      if (this.activityInfo.startTime) {
        return new Date(this.activityInfo.startTime) < new Date();
      } else if (this.activityInfo.orderStartTime) {
        return new Date(this.activityInfo.orderStartTime) < new Date();
      }
      return false;
    },
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
  },

};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-prize-editor {
  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }
  .bean-account {
    margin-left: 30px;
  }
  .add-count {
    color: #3399ff;
    margin-left: 10px;
  }
  .count-input.el-input {
    width: 60px;
    margin: 0 10px;
  }

  .draw-time-settings {
    font-size: 14px;

    color: $FONT_COMMON_GRAY;

    .btn-del {
      color: $TAG_INFO_BLUE;
      margin-left: 20px;
    }

    .-input {
      width: 80px;
      margin: 0 5px;
      text-align: center;
    }
  }
  .suffix-text {
    margin-right: 10px;
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

  .prize-img {
    width: 100px;
  }
}
</style>
