<template>
  <div class="component-prize-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">
      <lz-form-item label="奖项列表："
                    prop="prizeList"
                    required>
        <lz-table border
                  style="max-width: 1140px"
                  :data="form.prizeList">
          <lz-table-column width="150"
                           :resizable="false">
            <template slot-scope="scope"> {{ scope.$index | toCapitalization }}级奖项</template>
          </lz-table-column>
          <lz-table-column label="奖项数量"
                           align="center"
                           prop="prizeNumber"
                           :resizable="false"
                           v-if="activityInfo.activityType ===506 || activityInfo.activityType ===507 " />
          <lz-table-column label="获奖排名"
                           align="center"
                           :resizable="false"
                           v-if="activityInfo.activityType ===506 || activityInfo.activityType ===507 ">
            <template slot-scope="scope">
              <span v-if='scope.row.prizeNumber != "1" '> {{ scope.row.prizeRankBegin }} - {{ scope.row.prizeRankEnd }}</span>
              <span v-else> {{ scope.row.prizeRankBegin }}</span>
            </template>
          </lz-table-column>
          <lz-table-column width="150"
                           label="获奖消费金额（元）"
                           align="center"
                           :resizable="false"
                           prop="prizeQuota"
                           v-if="activityInfo.activityType !==506 && activityInfo.activityType !==507 " />
          <lz-table-column label="奖品类型"
                           align="center"
                           prop="prizeType"
                           :resizable="false">
            <template slot-scope="scope">
              {{ ["优惠券", "京豆", "实物", "积分"][scope.row.prizeType - 1] }}
            </template>
          </lz-table-column>
          <lz-table-column label="奖品名称"
                           align="center"
                           width="200"
                           prop="prizeName"
                           :resizable="false" />

          <lz-table-column width="100"
                           align="center"
                           label="单位数量"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.sendNumUnit ? scope.row.sendNumUnit : '1' }}
            </template>
          </lz-table-column>

          <lz-table-column width="100"
                           align="center"
                           label="发放份数"
                           :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.sendPeople ? scope.row.sendPeople : '-' }}
            </template>
          </lz-table-column>

          <lz-table-column width="150"
                           align="center"
                           :resizable="false">
            <template slot-scope="scope">
              <span class="table-column-btn iconfont icon-icon-08"
                    @click="editPrize(scope.row, scope.$index)"
                    :class="{ 'is-can-be-click':calcuStarted}" />
              <span class="table-column-btn iconfont icon-icon-07"
                    @click="removePrize(scope.$index)"
                    :class="{ 'is-can-be-click':calcuStarted}" />
              <span class="table-column-btn iconfont icon-iconjiantou-35"
                    v-if='activityInfo.activityType ===501 || activityInfo.activityType ===502 || activityInfo.activityType ===503 '
                    @click="scope.$index > 0 && movePrize(scope.$index, -1)"
                    :class="{ disable: scope.$index === 0 ,'is-can-be-click':calcuStarted}" />
              <span class="table-column-btn iconfont icon-iconjiantou-34"
                    v-if='activityInfo.activityType ===501 || activityInfo.activityType ===502 || activityInfo.activityType ===503 '
                    @click="scope.$index < form.prizeList.length - 1 && movePrize(scope.$index, 1)"
                    :class="{ disable: scope.$index === form.prizeList.length - 1,'is-can-be-click':calcuStarted }" />
            </template>
          </lz-table-column>
        </lz-table>
      </lz-form-item>
      <lz-form-item v-if="form.prizeList.length < settings.maxCount"
                    label="">
        <lz-button type="primary"
                   plain
                   @click="addPrize">添加奖项（{{ form.prizeList.length }} / {{
            settings.maxCount
          }}）
        </lz-button>
      </lz-form-item>
    </lz-form>
    <prize-editor ref="prizeEditor"
                  @confirm="confirm"
                  :activityInfo='activityInfo'
                  :prizeList='form.prizeList'
                  :allData="allData" />
  </div>
</template>

<script>
import Service from '@/business/service';
import PrizeEditor from '@/business/components/common/PrizeEditor';

export default {
  name: 'PrizeSettings',
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
    getAllData: {
      type: Function,
    },
  },
  filters: {
    toCapitalization: (value) => {
      if (value === 0) {
        return '一';
      } else if (value === 1) {
        return '二';
      } else if (value === 2) {
        return '三';
      }
    },
  },
  data() {
    return {
      allData: {},
      prizeIndexOnEdit: -1,
      form: {
        prizeList: [],
      },
      rules: {
        prizeList: [
          {
            validator: (rule, value, cb) => {
              if (!Array.isArray(value)) {
                cb(new Error('奖项设置有误'));
              } else if (value.length === 0) {
                cb(new Error('请添加奖项'));
              } else if (value.length > 1) {
                let result = true;
                for (let i = 1; i < value.length; i++) {
                  if (value[i].prizeQuota) {
                    console.log(i, value[i].prizeQuota);
                    if (value[i].prizeQuota <= value[i - 1].prizeQuota) {
                      cb(new Error(`${i}级奖项的消费额度应该小于${i + 1}级奖项`));
                      result = false;
                    }
                  }
                }
                if (result) {
                  cb();
                }
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
    prizesStr() {
      return JSON.stringify(this.prizeList);
    },
    calcuStarted() {
      if (this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507 || this.activityInfo.activityType == 503 || this.activityInfo.activityType == 501) {
        // 结算开始时间小于当前时间返回true  代表已经到了结算时间
        return new Date(this.activityInfo.orderStartTime) < new Date();
      }
      // 结算开始时间小于当前时间返回true  代表已经到了结算时间
      return false;
    },
  },

  created() {
    if (this.formData.drawPrizeInfoList) {
      this.formData.prizeList = this.formData.drawPrizeInfoList;
    }
    if (this.formData.prizeInfoList) {
      this.formData.prizeList = this.formData.prizeInfoList;
    }
    this.form = {
      ...this.form,
      ...this.formData,
    };

    this.sortPrize();
  },
  mounted() {
    setTimeout(() => {
      this.getAllDataSelf();
    }, 500);
  },
  methods: {
    // 获取所有数据
    getAllDataSelf() {
      this.allData = this.getAllData();
    },
    // 排序函数
    compare(property) {
      return (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
      };
    },
    // 重新排序奖项
    sortPrize() {
      this.form.prizeList.sort((this.compare('prizeIndex')));
      for (let i = 0; i < this.form.prizeList.length; i++) {
        this.form.prizeList[i] = {
          ...this.form.prizeList[i],
          prizeRankBegin: '',
          prizeRankEnd: '',
        };
        if (i === 0) {
          this.form.prizeList[i].prizeRankBegin = 1;
          this.form.prizeList[i].prizeRankEnd = Number(this.form.prizeList[i].prizeRankEnd) + Number(this.form.prizeList[i].prizeNumber);
        } else {
          this.form.prizeList[i].prizeRankBegin = Number(this.form.prizeList[i - 1].prizeRankEnd) + 1;
          this.form.prizeList[i].prizeRankEnd = Number(this.form.prizeList[i - 1].prizeRankEnd) + Number(this.form.prizeList[i].prizeNumber);
        }
        if (this.form.prizeList[i].prizeType === 2) {
          this.form.prizeList[i].ifplan = 2;
        }
      }
    },
    addPrize() {
      this.prizeIndexOnEdit = -1;
      this.$refs.prizeEditor.showDialog();
      this.$refs.prizeEditor.resetForms();
      this.getAllDataSelf();
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
      this.$refs.prizeEditor.showDialog(prize, index);
    },
    removePrize(index) {
      this.form.prizeList.splice(index, 1);
      this.$refs.elForm.validateField('prizeList');
      this.calcuPrizeRank();
    },
    // 计算奖项排名
    calcuPrizeRank() {
      this.getAllDataSelf();
      // 如果不这样做 数据不是响应式的  不知道为什么
      this.form.prizeList.push(1);
      this.form.prizeList.pop();
      if (this.activityInfo.activityType === 506 || this.activityInfo.activityType === 507) {
        for (let i = 0; i < this.form.prizeList.length; i++) {
          if (i === 0) {
            this.form.prizeList[i].prizeRankBegin = 1;
            this.form.prizeList[i].prizeRankEnd = Number(this.form.prizeList[i].prizeNumber);
            this.form.prizeList[i].sendPeople = Number(this.form.prizeList[i].prizeNumber);
          } else {
            this.form.prizeList[i].prizeRankBegin = Number(this.form.prizeList[i - 1].prizeRankEnd) + 1;
            this.form.prizeList[i].prizeRankEnd = Number(this.form.prizeList[i - 1].prizeRankEnd) + Number(this.form.prizeList[i].prizeNumber);
            if (this.allData.prizeDistributionForm.awardType == 1) {
              this.form.prizeList[i].sendPeople = Number(this.form.prizeList[i - 1].sendPeople) + Number(this.form.prizeList[i].prizeNumber);
            } else {
              this.form.prizeList[i].sendPeople = this.form.prizeList[i].prizeNumber;
            }
          }
        }
      }
    },
    movePrize(index, offset) {
      const prize = this.form.prizeList.splice(index, 1)[0];
      this.form.prizeList.splice(index + offset, 0, prize);
      this.$refs.elForm.validateField('prizeList');
    },
    confirm(prize) {
      if (this.prizeIndexOnEdit === -1) {
        this.form.prizeList.push({
          ...prize,
        });
      } else {
        this.form.prizeList.splice(this.prizeIndexOnEdit, 1, {
          ...prize,
        });
      }
      this.$nextTick(() => {
        for (let i = 1; i < this.form.prizeList.length; i++) {
          this.form.prizeList[i].prizeRankBegin = Number(this.form.prizeList[i - 1].prizeRankEnd) + 1;
          this.form.prizeList[i].prizeRankEnd = Number(this.form.prizeList[i - 1].prizeRankEnd) + Number(this.form.prizeList[i].prizeNumber);
        }
        console.log('validate prizeList');
        this.$refs.elForm.validateField('prizeList');
      });
      this.calcuPrizeRank();
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-prize-settings {
  th {
    background-color: $BG_BLOCK_GRAY;
    height: 40px;
    padding: 0;
  }

  .table-column-btn {
    margin: 0 5px;
    color: $TAG_INFO_BLUE;

    &.disable {
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

  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
    color: $FONT_DISABLE_GRAY;
  }

}
</style>
