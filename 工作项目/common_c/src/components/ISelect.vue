<template>
  <!-- 已选 送至 -->
  <!-- typexl:true  骁龙专用 -->
  <div :class="[typexl ? 'ISelect1' : 'ISelect']">
    <div class="con_select" v-if="!typexl">
      <p class="title">已选规格</p>
      <div :primaryKey="0" class="address_to" elemId="002" elemName="选择规格" @click="popShow">
        <p>{{
            optionsOther.length > 1 ? ((optionsOther.find(v => {
              return v.select
            }) && optionsOther.find(v => {
              return v.select
            }).prizeName)) : optionsOther[0].prizeName
          }}</p>
        <van-icon class="right_icon" name="arrow"/>
      </div>
    </div>
    <div class="con_address" v-if="!typexl">
      <p class="title">送至</p>
      <div :primaryKey="0" class="address_to" elemId="003" elemName="选择地址"
           @click="newAddress(addressId, address.province)">
        <p>{{ addressStr }}</p>
        <van-icon class="right_icon" name="arrow"/>
      </div>
    </div>
    <div class="con_address1" v-if="typexl">
      <p class="title">送至</p>
      <div :primaryKey="0" class="address_to" elemId="003" elemName="选择地址"
           @click="newAddress(addressId, address.province)">
        <p>{{ addressStr }}</p>
        <van-icon class="right_icon" name="arrow"/>
      </div>
    </div>

    <!-- 选择规格 弹窗 -->
    <van-popup v-model="show" :style="{ height: '40%' }" position="bottom">
      <p class="popup_title">选择规格</p>
      <div class="pop_container">
        <div v-for="(o, index) in poptions" :key="o.prizeId" :class="[(o.operation === 0 || o.operation === null) ? (o.select ? 'select_item' : 'other_item') : 'dis_item']"
             class="item"
             @click="changeItem(o.prizeId, index, o.operation)">
          <span>{{ o.prizeName }}</span>
        </div>
      </div>
      <div class="IShortButton2 iosButtonPop">
        <van-button :primaryKey="0" block elemId="004" elemName="选择规格确认" type="danger" @click="saveChange()">确认
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ISelect',
  props: ['options', 'address', 'addressId', 'typexl'],
  data() {
    return {
      show: false,
      prizeId: '',
      poptions: [],
      pindex: '',
      prizeName: '',
    };
  },
  computed: {
    optionsOther() {
      return this.options || [{ prizeName: '' }];
    },
    addressStr() {
      let temp = '';
      if (this.address.province) {
        temp = this.address.province + this.address.city + this.address.county + this.address.detailInfo;
      } else {
        temp = '点击新建收货地址';
      }
      return temp;
    },
  },
  methods: {
    // 显示弹窗
    popShow() {
      this.poptions = JSON.parse(JSON.stringify(this.optionsOther));
      try {
        this.poptions.forEach((element, index) => {
          if (element.operation === 0) {
            this.prizeId = this.poptions[index].prizeId;
            this.pindex = index;
            throw new Error();
          }
        });
      } catch {

      }
      this.show = true;
    },
    // 选中变色
    changeItem(prizeId, index, num) {
      // operation    是否可以操作   0：可以点击兑换，1：不可以
      if (num === 1) {
        return;
      }
      this.prizeId = prizeId;
      this.pindex = index;
      this.poptions.forEach((element) => {
        element.select = element.prizeId === prizeId;
      });
    },
    saveChange() {
      if (this.prizeId) {
        this.$emit('select', this.prizeId, this.pindex);
      }
      this.show = false;
    },
    newAddress(id, province) {
      this.$emit('newAddress', id, province);
    },
  },
};
</script>

<style scoped>
.ISelect {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.14rem 0.3rem;
  margin-bottom: 0.2rem;
}
.ISelect1 {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.14rem 0.3rem 0.14rem 0.3rem;
  margin-bottom: 0.2rem;
}
.con_select {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 0.24rem;
  border-bottom: 1px solid #ecebeb;
}

.con_address {
  height: 0.7rem;
  padding-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.con_address1 {
  height: 0.7rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.title {
  color: #303030;
  font-size: 0.3rem;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.address_to {
  width: 70%;
  font-size: 0.24rem;
  padding-top: 0.14rem;
  display: flex;
  justify-content: flex-end;
}

.address_to p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #a7a7a7;
  margin-top: 0.03rem;

}

.right_icon {
  padding-top: 0.08rem;
  height: 0.24rem;
  color: #a7a7a7;
}

.popup_title {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
}

.pop_container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-y: auto;
}

.item {
  display: inline-block;
  padding: 0.03rem 0.2rem 0.04rem 0.2rem;
  background: #ffffff;
  font-size: 0.24rem;
  margin-left: 0.2rem;
  word-wrap: initial;
  margin-bottom: 0.1rem;
  border-radius: 0.3rem;
  /* position: relative; */
  height: 0.3rem;
  margin-top: 0.1rem;
}

.item_icon {
  width: 0.2rem;
  position: absolute;
  right: 0;
  bottom: 0;
}

.IShortButton2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  z-index: 5000;
}

.IShortButton >>> .van-button {
  width: 100%;
  height: 1rem;
}

.select_item {
  border: 1px solid #e2231a;
  color: #e2231a;
  background: #f9dad9;
}

.other_item {
  border: 1px solid #e8e8e8;
  background: #e8e8e8;
  color: #676767;
}

.dis_item {
  border: 1px solid #f0f0f0;
  background: #e8e8e8;
  color: #cacaca;
}
</style>
