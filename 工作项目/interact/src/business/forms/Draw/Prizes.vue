<template>
  <div class="component-draw-prize-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

      <lz-form-item label="用户单次抽中奖品总概率："
                    prop="totalChance"
                    v-if="settings.items.includes('totalChance')">
        <span>{{totalChanceStr}}%</span>
      </lz-form-item>

      <lz-form-item label="奖项列表："
                    prop="drawPrizeInfoList"
                    v-if="settings.items.includes('drawPrizeInfoList')"
                    required>
        <lz-table border
                  style="max-width: 1140px"
                  :data="form.drawPrizeInfoList">
          <lz-table-column width="60"
                           label="位置"
                           align="center"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </lz-table-column>
          <lz-table-column label="奖品名称"
                           align="center"
                           prop="prizeName"
                           :resizable="false">
            <template slot-scope="scope">
              <span>{{ typeof scope.row.prizeName === "string" && scope.row.prizeName !== "" ? scope.row.prizeName : "谢谢参与" }}</span>
            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           label="奖品类型"
                           align="center"
                           prop="prizeType"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.prizeType?["优惠券", "京豆", "实物", "积分"][scope.row.prizeType - 1]:"-" }}
            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           align="center"
                           label="单位数量"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.sendNumUnit?scope.row.sendNumUnit:'-' }}
            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           align="center"
                           label="发放份数"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.sendPeople?scope.row.sendPeople:'-' }}
            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           label="中奖概率"
                           align="center"
                           prop="drawChance"
                           :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.drawChance >= 0">{{ scope.row.drawChance }}%</span>
              <span v-else>-</span>

            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           label="每日发放限额"
                           align="center"
                           :resizable="false"
                           prop="dailyLimit"
                           v-if="activityInfo.activityType===505 || activityInfo.activityType===504">
            <template slot-scope="scope">
              <span v-if="scope.row.dailyLimit === -1">不限</span>
              <span v-else-if="!scope.row.dailyLimit">-</span>
              <span v-else>{{scope.row.dailyLimit}}</span>
            </template>
          </lz-table-column>

          <lz-table-column width="150"
                           align="center"
                           label="操作"
                           :resizable="false">
            <template slot-scope="scope">
              <span class="table-column-btn iconfont icon-icon-08"
                    @click="editPrize(scope.row, scope.$index)"
                    :class="{ disable: isLast==scope.$index || (isActivityBegin && !scope.row.drawChance)}" />
              <span class="table-column-btn iconfont icon-icon-07"
                    @click="removePrize(scope.$index)"
                    v-if="!(settings.disableStatus.includes(activityInfo.status) || calcuStarted)"
                    :class="{ disable:isLast==scope.$index ||isActivityBegin}" />
              <span class="table-column-btn iconfont icon-iconjiantou-35"
                    v-if='activityInfo.activityType ===501 '
                    @click="scope.$index > 0 && movePrize(scope.$index, -1)"
                    :class="{ disable: scope.$index === 0 ||calcuStarted||activityInfo.status==4 }" />
              <span class="table-column-btn iconfont icon-iconjiantou-34"
                    v-if='activityInfo.activityType ===501 '
                    @click="scope.$index < form.drawPrizeInfoList.length - 1 && movePrize(scope.$index, 1)"
                    :class="{ disable: scope.$index === form.drawPrizeInfoList.length - 1||calcuStarted||activityInfo.status==4  }" />
            </template>
          </lz-table-column>
        </lz-table>
      </lz-form-item>
      <lz-form-item v-if="form.drawPrizeInfoList.length < settings.prizeCount"
                    label="">
        <lz-button type="primary"
                   plain
                   @click="addPrize">添加奖项（{{ form.drawPrizeInfoList.length }} / {{ settings.prizeCount }}）</lz-button>
      </lz-form-item>
    </lz-form>
    <prize-editor ref="prizeEditor"
                  @confirm="confirm"
                  :activityInfo='activityInfo' />
  </div>
</template>

<script>
import PrizeEditor from '@/business/components/common/DrawPrizeEditor';
import LzMsg from '@/business/utils/LzMsg';
import Service from '@/business/service';

const blankPrize = {
  isEmpty: true,
  prizeName: '',
};
export default {
  name: 'DrawPrizeSettings',
  components: {
    PrizeEditor,
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
      prizeIndexOnEdit: -1,
      isLast: -1,
      form: {
        // drawPrizeInfoList: [],
        drawPrizeInfoList: Array(this.settings.prizeCount).fill({
          ...blankPrize,
        }),
      },
      rules: {
        drawPrizeInfoList: [
          {
            validator: (rule, value, cb) => {
              let sum = 0;
              let num = 0;

              value.forEach((p) => {
                const chance = p.drawChance - 0 > 0 ? p.drawChance - 0 : 0;
                sum += chance;
                if (!p.isEmpty) {
                  num++;
                }
              });
              console.log('data -> sum', sum);

              if (sum > 100) {
                cb(new Error('总概率不能大于100%'));
              } else if (sum < 0) {
                cb(new Error('总概率不能小于0'));
              } else if (num == 0) {
                cb(new Error('请添加奖项'));
              } else {
                cb();
              }
              // if (!Array.isArray(value)) {
              //   cb(new Error('奖项设置有误'));
              // } else if (value.length === 0) {
              //   cb(new Error('请添加奖项'));
              // } else {
              //   if (value.length > 1) {
              //     let result = true
              //     for (let i = 1; i < value.length; i++) {
              //       if (value[i].prizeQuota >= value[i - 1].prizeQuota) {
              //         cb(new Error(`${i}级奖项的消费额度应该大于${i+1}级奖项`));
              //         result = false
              //       }
              //     }
              //     if (result) {
              //       cb()
              //     }
              //   } else {
              //     cb()
              //   }
              // }
              cb();
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    isActivityBegin() {
      if (this.activityInfo.orderStartTime) {
        return new Date(this.activityInfo.orderStartTime) < new Date();
      }
      if (new Date(this.activityInfo.startTime) < new Date()) {
        return true;
      }
      return false;


      // 是否已经开始结算
    },
    totalChanceStr() {
      let totalChance = 0; // 总概率
      this.form.drawPrizeInfoList.forEach((item) => {
        if (item.drawChance) {
          totalChance += Number(item.drawChance);
        }
      });
      if (totalChance > 100) {
        LzMsg.error('用户单次抽中奖品总概率不能超过100%');
      }

      return totalChance.toFixed(3);
    },
    prizesStr() {
      return JSON.stringify(this.drawPrizeInfoList);
    },
    calcuStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
  },

  created() {
    if (this.formData.prizeList) {
      this.formData.drawPrizeInfoList = this.formData.prizeList;
    }
    if (this.formData.prizeInfoList) {
      this.formData.drawPrizeInfoList = this.formData.prizeInfoList;
    }
    if (this.activityInfo.activityType === 504) {
      this.form.drawPrizeInfoList = [];
    }
    if (Array.isArray(this.formData.drawPrizeInfoList)) {
      this.formData.drawPrizeInfoList.forEach((prize) => {
        this.form.drawPrizeInfoList.splice(prize.position - 1, 1, prize);
      });
    }
    if (this.formData.drawPrizeInfoList) {
      this.formData.drawPrizeInfoList.forEach((item) => {
        if (item.prizeType == 2) {
          item.ifplan = 2;
        }
      });
    }
  },
  methods: {
    addPrize() {
      this.prizeIndexOnEdit = -1;
      this.$refs.prizeEditor.resetForms();
      this.$refs.prizeEditor.showDialog();
    },
    async editPrize(prize, index) {
      if (prize.prizeType === 3 && prize.prizeKey) {
        const { data } = await Service.getProduct({
          skuName: prize.skuName,
          skuOrWmsCode: prize.prizeKey,
          pageNo: 1,
          pageSize: 10,
        });
        prize = {
          ...data[0],
          ...prize,
          productData: data[0],
        };
      }
      if (prize.prizeType === 2 && prize.prizeKey) {
        const { data } = await Service.getNewBeanPlans({
          planId: prize.prizeKey,
          pageNo: 1,
          pageSize: 10,
        });
        prize = {
          ...data[0],
          ...prize,
          beanData: data,
        };
      }
      if (prize.prizeType === 1 && prize.prizeKey) {
        const { data } = await Service.getNewCoupon({
          planId: prize.prizeKey,
          pageNo: 1,
          pageSize: 10,
        });
        prize = {
          ...data[0],
          ...prize,
          couponData: data,
        };
      }

      this.prizeIndexOnEdit = index;
      this.$refs.prizeEditor.showDialog(prize);
    },
    removePrize(index) {
      this.form.drawPrizeInfoList.splice(index, 1, {
        ...blankPrize,
      });
      this.$refs.elForm.validateField('drawPrizeInfoList');
      this.isLastFn();
    },
    movePrize(index, offset) {
      const prize = this.form.drawPrizeInfoList.splice(index, 1)[0];
      this.form.drawPrizeInfoList.splice(index + offset, 0, prize);
      this.$refs.elForm.validateField('drawPrizeInfoList');
      this.isLastFn();
    },
    isLastFn() {
      let flagNum = 0;
      this.form.drawPrizeInfoList.forEach((item) => {
        if (item.prizeType) {
          flagNum++;
        }
        if (flagNum > 6) {
          this.form.drawPrizeInfoList.forEach((info, index) => {
            if (!info.prizeType) {
              this.isLast = index;
            }
          });
        } else {
          this.isLast = -1;
        }
      });
    },
    confirm(prize) {
      if (this.prizeIndexOnEdit === -1) {
        this.form.drawPrizeInfoList.push({
          ...prize,
          isEmpty: false,
        });
      } else {
        this.form.drawPrizeInfoList.splice(this.prizeIndexOnEdit, 1, {
          ...prize,
          isEmpty: false,
        });
      }
      this.isLastFn();
      this.$refs.elForm.validateField('drawPrizeInfoList');
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-draw-prize-settings {
  th {
    background-color: $BG_BLOCK_GRAY;
    height: 40px;
    padding: 0;
  }

  .table-column-btn {
    margin: 0 5px;
    color: $TAG_INFO_BLUE;

    &.disable {
      pointer-events: none;
      cursor: not-allowed;
      cursor: no-drop;
      color: $FONT_DISABLE_GRAY;
    }
  }

  .selector-tip {
    width: 340px;
    height: 120px;
    border: 1px dashed $BORDER_GRAY;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    img {
      vertical-align: top;
    }

    p {
      margin: 0;
      color: $FONT_DISABLE_GRAY;
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
