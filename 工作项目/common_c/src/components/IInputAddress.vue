<template>
  <!-- 填写地址 -->
  <div class="IInputAddress">
    <van-form input-align="right" label-align="left">
      <van-field v-model.trim="form.realName" label="收货人" maxlength='20' name="收货人" placeholder="请输入收货人姓名"/>
      <van-field v-model.trim="form.mobile" label="手机号码" maxlength='11' name="手机号码" placeholder="请输入手机号码" type="tel"
                 @input="numberInput"/>
      <van-field :value="value" clickable label="选择省/市/区" name="area" placeholder="请选择" readonly
                 @click="showArea = true"/>
      <van-field v-model.trim="form.detailInfo" label="详细地址" maxlength='100' name="详细地址" placeholder="请输入详细地址"/>
      <van-switch-cell v-model="form.isDefault" :disabled="isDefault" size='0.32rem' title="设为默认地址"/>
    </van-form>
    <i-shortButton :text='text' @clickBtn="saveForm"></i-shortButton>
    <!-- closeable :style="{ height: '60%' }" -->
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        :value="form.countyCode"
        @cancel="showArea = false"
        @confirm="onConfirm"
      />
      <!-- <div class="popup_class">
        <div class="popup_class_header">
          <span :class="[state === 1 ? 'red_border': '']" @click="changeProvice">{{form.province ? form.province : '请选择'}}</span>
          <span :class="[state === 2 ? 'red_border': '']" @click="changeCity" v-if="form.province">{{form.city ? form.city : '请选择'}}</span>
          <span :class="[state === 3 ? 'red_border': '']" @click="changeCounty" v-if="form.city">{{form.county ? form.county : '请选择'}}</span>
        </div>
        <div class="popup_class_body" v-if="state === 1">
          <div v-for='(v,index) in columns1' :key='index' @click='selectValue(v)'><van-icon v-if="v.select" color="#1989fa" name="success" />{{v.areaName}}</div>
        </div>
        <div class="popup_class_body"  v-if="state === 2">
          <div v-for='(v,index) in columns2' :key='index' @click='selectValue(v)'><van-icon v-if="v.select" color="#1989fa" name="success" />{{v.areaName}}</div>
        </div>
        <div class="popup_class_body"  v-if="state === 3">
          <div v-for='(v,index) in columns3' :key='index' @click='selectValue(v)'><van-icon v-if="v.select" color="#1989fa" name="success" />{{v.areaName}}</div>
        </div>
      </div> -->
    </van-popup>
  </div>
</template>
<script>
// formData格式：
// realName: '',
// mobile: '',
// province: '河北省',
// city: '石家庄市',
// county: '丰台区',
// address: [],
// detailInfo: '',
// isDefault: false
import { PointsService } from '@/http';
import IShortButton from '@/components/IShortButton.vue';

export default {
  props: {
    formData: {
      required: true,
    },
    isDefault: {
      default: false,
    },
  },
  name: 'IInputAddress',
  components: {
    IShortButton,
  },
  data() {
    return {
      areaList: {},
      value: '',
      text: '保存',
      showArea: false,
      searchResult: [],
      form: {},
      columns1: [{
        areaId: 2,
        areaName: '上海市',
        parentId: 2,
        status: 1,
        level: 0,
      }, {
        areaId: 2,
        areaName: '背景',
        parentId: 2,
        status: 1,
        level: 0,
      }],
      columns2: [],
      columns3: [],
      state: 1,
    };
  },
  created() {
    this.getAreaInfo();
  },
  mounted() {
    this.form = this.formData;
    if (this.form.city) {
      this.value = this.form.province + this.form.city + this.form.county;
      this.form.countyCode = `${this.form.countyCode}`;
    }
  },
  methods: {
    async getAreaInfo() {
      try {
        const res = await PointsService.getAreaInfo({});
        this.areaList = res.data;
      } catch {

      } finally {

      }
    },
    onConfirm(val) {
      console.log(val);
      val = val.filter((e) => e != undefined);
      this.value = val.map((item) => item.name).join('');
      this.form.province = val[0].name;
      this.form.city = val[1].name;
      this.form.county = val[2] && val[2].name ? val[2].name : null;
      this.form.countyCode = val[2] && val[2].code ? val[2].code : val[1].code;
      this.showArea = false;
    },
    numberInput(val) {
      this.form.mobile = val.replace(/\D/g, '');
    },
    saveForm() {
      // 校验form
      if (this.form.realName === '') {
        this.$toast('请输入收货人姓名');
        return;
      }
      if (this.$core.isEmojiCharacter(this.form.realName)) {
        this.$toast('收货人姓名不能输入特殊字符，请重新输入');
        return;
      }
      if (this.form.mobile === '') {
        this.$toast('请输入手机号码');
        return;
      }
      if (this.form.mobile.length !== 11) {
        this.$toast('请输入正确的手机号码');
        return;
      }
      if (this.form.countyCode === '') {
        this.$toast('请选择省市区');
        return;
      }
      if (this.form.detailInfo === '') {
        this.$toast('请输入详细地址');
        return;
      }
      if (this.$core.isEmojiCharacter(this.form.detailInfo)) {
        this.$toast('详细地址不能输入特殊字符，请重新输入');
        return;
      }
      this.$emit('saveForm', this.form);
    },
    // test
    //     changeProvice() {
    //       this.state = 1
    //       this.columns1 = this.columns1.map(v => {
    //         if(v.areaName === this.form.province){
    //           return {
    //             ...v,
    //             select: true
    //           }
    //         } else {
    //           return {
    //             ...v,
    //             select: false
    //           }
    //         }
    //       })
    //     },
    //     changeCity() {
    //       this.state = 2
    //       this.columns2 = this.columns2.map(v => {
    //         if(v.areaName === this.form.city){
    //           return {
    //             ...v,
    //             select: true
    //           }
    //         } else {
    //           return {
    //             ...v,
    //             select: false
    //           }
    //         }
    //       })
    //     },
    //     changeCounty() {
    //       this.state = 3
    //       this.columns3 = this.columns3.map(v => {
    //         if(v.areaName === this.form.county){
    //           return {
    //             ...v,
    //             select: true
    //           }
    //         } else {
    //           return {
    //             ...v,
    //             select: false
    //           }
    //         }
    //       })
    //     },
    //     selectValue(v) {
    //       if(v.level === 0) {
    //         this.form.province = v.areaName
    //         // 参数 v.parentId
    //         this.columns2 = [{
    //             "areaId": 28,
    //             "areaName": "哈哈哈",
    //             "parentId": 2,
    //             "status": 1,
    //             "level": 1
    //         }]
    //         this.state = 2
    //         this.form.city = ''
    //       } else if(v.level === 1) {
    //         this.form.city = v.areaName
    //         // 参数 v.parentId
    //         this.columns3 = [{
    //             "areaId": 2815,
    //             "areaName": "长宁区",
    //             "parentId": 2,
    //             "status": 1,
    //             "level": 2
    //         }]
    //         this.state = 3
    //         this.form.county = ''
    //       } else {
    //         this.form.county = v.areaName
    //         this.value = this.form.province + this.form.city + this.form.county
    //       }
    //     },
  },

};
</script>

<style scoped>
.IInputAddress {
  margin-top: 0.24rem;
}

.IInputAddress >>> .van-field__label {
  color: #4d4d4d;
  text-align: left;
}

.IInputAddress >>> .van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}

.IInputAddress >>> .van-field__control::placeholder {
  color: #dadada;
}

.IInputAddress >>> .van-cell__title, .IInputAddress >>> .van-cell__value {
  text-align: left;
}

.IInputAddress >>> .van-switch {
  background-color: #c6c6c6;
}

.IInputAddress >>> .van-switch--on {
  background-color: #1989fa;
}

.popup_class {
  font-size: 0.3rem;
  position: relative;
  height: 100%;
}

.popup_class_header {
  position: absolute;
  top: 1rem;
  left: 0.3rem;
}

.popup_class_header span {
  margin-right: 10px;
  padding-bottom: 0.1rem;
}

.popup_class_body {
  position: absolute;
  top: 1.8rem;
  overflow: scroll;
  text-align: left;
  width: 100%;
  bottom: 0;
  left: 0.3rem;
  right: 0;
}

.popup_class_body div {
  height: 0.48rem;
  line-height: 0.48rem;
}

.red_border {
  border-bottom: 2px solid #1989fa;
}
</style>
