<template>
  <div v-if="$store.state.showDetail" class="AddressSelect allpage">
    <!-- <i-address :list='list' :selectRadio='selectRadio' @editAddress='editAddress' @getAddress='getAddress' :isSelect='isSelect'></i-address> -->
    <!-- 组件如果不移动在这个页面会报错，原因是选择时在子组件改动父组件的selectRadio值，选择时就会改变，还没有解决 -->
    <van-radio-group v-model="selectRadio">
      <van-radio v-for="v in list" :key="v.addressId" :label-disabled='true' :name="v.addressId" icon-size='0.33rem'
                 @click="getAddress(v.addressId)">
        <div class="item">
          <div class="item_left">
            <div class="item_1"><span class="slice_name"
                                      style="margin-right:0.2rem;">{{ v.realName }}</span><span>{{ v.mobileStr }}</span><span
              v-if="v.isDefault" class="item_default">默认地址</span></div>
            <div class="item_2">{{ v.province + v.city + v.county + v.detailInfo }}</div>
          </div>
          <div class="item_right">
            <img :src="editIcon" class="item_right_icon" @click.stop="editAddress(v.addressId)"/>
          </div>
        </div>
      </van-radio>
    </van-radio-group>
    <i-shortButton :text='text' :type='long' @clickBtn="addAddress"></i-shortButton>
    <!-- 删除提示弹窗 修改为此页面不能删除-->
    <i-dialog :btns="btns" :showDelete="showDelete" @closeDialog="closeDialog"></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDialog from '@/components/IDialog.vue';
import IShortButton from '@/components/IShortButton.vue';

export default {
  name: 'AddressSelect',
  components: {
    IDialog,
    IShortButton,
  },
  data() {
    return {
      long: '1',
      text: '+添加新地址',
      showDelete: false,
      deleteVal: '',
      isSelect: true,
      btns: ['是否删除该地址', '删除', '取消'],
      list: [],
      state: 1,
      fromRoute: '',
      selectRadio: '',
      selectForm: {},
      editIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCtpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkIxQUMyNjA2REQ4M0U3MTE5OUU5RTk1QzU3MDU3M0U5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3QzFEMTgxNzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3QzFEMTgwNzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNC0wMVQxNToyODoyNCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzBCQjE5NjU3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzBCQjE5NjY3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4CKAWMAAAAh1BMVEX////+/v7FxcX9/f3ExMT8/Pz7+/vGxsb6+vrKysrDw8PNzc3Pz8/IyMjHx8fR0dHCwsL4+PjQ0NDOzs7f39/AwMD39/f19fXLy8v29vbV1dXy8vLT09Px8fHb29vz8/Pj4+Pn5+fBwcHp6enU1NS9vb3W1tbi4uLMzMzg4ODe3t7Y2Nj5+fkW/av9AAABc0lEQVR42qRTR5bDIAyVkAD3kt6n97n/+UYUx5CX3bDII+g3hAzw74VA3yWruNp1705cobg8ydatFduprtblZygTLtVP2OrSHnFWJPISemeXJlpwp2dD4Tjab72rKQgYGGyaSQQMbBa8RD0dqAQgCnK+XVSHQugRoypM+CJQvHOzCfqOg51KLTToft2bmCcoqMgln3nbc2OmODMAQWv5QTQL1RSAqagD+CsJCExtS+PqiDjBvIL2cSS/rUn7dsH5DDlAjMdeldEZi7al1ELosD9JPi1ORPKPqzwkwv51kHxODR3F2tiLcE0N42lofD7y8ciq2Gxm0RePy9thnKdkIsrWsrcyL6tjNkmsrq0OD0uU9EcyC2AKSVEUdAbgCKhsSH19nBhCAGFbdTC9Ld4JCdjZIoxpAnBzxTaaldWDexrMB89suI0T8sVDq24Wczeox+hWfNTPt4BW2Xo1ekvXV7z3vRFcC9n98iReAe8X4/GfAAMAq2AK8d2lQWAAAAAASUVORK5CYII=',

    };
  },
  beforeRouteEnter(to, from, next) {
    // 如果我是从发货详情来的来的，我要在选择时调取保存接口
    next((vm) => {
      vm.fromRoute = from.name;
    });
  },
  computed: {
    // 取地址长度 最多10个地址 超过10个添加按钮不显示
  },
  activated() {
    if (sessionStorage.getItem('lz_address_name_edit') === 'AddressEdit') {
      this.getListEdit();
    } else {
      this.getList();
    }
  },
  created() {

  },
  methods: {
    // 获取地址列表
    async getListEdit() {
      const res = await PointsService.getAddressList();
      if (res.data) {
        let tempId;
        this.list = res.data.addressRespList;
        this.list = this.list.map((v) => ({
          ...v,
          mobileStr: `${(`${v.mobile}`).slice(0, 3)}****${(`${v.mobile}`).slice(7, 11)}`,
        }));
        this.selectRadio = +sessionStorage.getItem('lz_address');
      } else {
        this.list = [];
      }
    },
    // 获取地址列表
    async getList() {
      const res = await PointsService.getAddressList();
      if (res.data) {
        let tempId;
        this.list = res.data.addressRespList;
        this.list = this.list.map((v) => ({
          ...v,
          mobileStr: `${(`${v.mobile}`).slice(0, 3)}****${(`${v.mobile}`).slice(7, 11)}`,
        }));
        if (this.$route.query.address) {
          const temp = this.list.filter((v) => this.$route.query.address === `${`${v.province}${v.city}`}${v.county ? v.county : ''}${v.detailInfo}`);
          if (temp.length > 0) {
            tempId = temp[0].addressId;
          }
        }
        this.selectRadio = this.$route.query.id ? +this.$route.query.id : this.$route.query.address ? tempId : this.list[0].addressId;
      } else {
        this.list = [];
      }
    },
    // 选择某个地址
    async getAddress(val) {
      this.selectRadio = val;
      this.selectForm = this.list.find((v) => v.addressId === val);
      // 选择某个地址之后
      // 1.发货详情
      if (sessionStorage.getItem('lz_address_name') === 'ProductLogistics') {
        // 调用接口
        const res = await PointsService.changeLogistics({
          orderCode: this.$route.query.orderCode,
          shopId: this.$route.query.shopId,
          groupId: this.$route.query.groupId,
          session: this.$route.query.session,
          mobile: this.selectForm.mobile,
          realName: this.selectForm.realName,
          province: this.selectForm.province,
          city: this.selectForm.city,
          county: this.selectForm.county,
          detailInfo: this.selectForm.detailInfo,
        });
        this.$toast('修改成功');
        sessionStorage.removeItem('lz_address_name');
        sessionStorage.removeItem('lz_address_name_edit');
        this.$router.back();
      } else {
        // 2.记录数据 返回页面（实物兑换）
        this.$store.commit('setAddressToProduct', this.selectForm);
        sessionStorage.removeItem('lz_address_name');
        sessionStorage.removeItem('lz_address_name_edit');
        this.$router.back();
      }
    },
    // 添加新地址
    addAddress() {
      if (this.list.length === 10) {
        this.$toast('最多可以添加10条地址');
        return;
      }
      this.$router.push({
        name: 'AddressAdd',
      });
    },
    editAddress(val) {
      // 跳编辑地址页面
      sessionStorage.setItem('lz_address_name_edit', 'AddressEdit');
      sessionStorage.setItem('lz_address', this.selectRadio);
      this.$router.push({
        name: 'AddressEdit',
        query: {
          id: val,
        },
      });
    },
    // 关闭弹窗
    closeDialog() {
      this.showDelete = false;
    },
  },
};
</script>
<style scoped>
.AddressSelect {
  padding-bottom: 2rem;
}

.AddressSelect >>> .van-radio {
  margin-top: 0.24rem;
  background-color: #ffffff;
  font-size: 0.26rem;
  padding: 0.1rem 0.24rem 0.24rem 0.3rem;
  box-sizing: border-box;
}

.AddressSelect >>> .van-radio__label {
  display: inline-block;
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #969696;
}

.item_1 {
  text-align: left;
  padding: 0.24rem 0;
  display: flex;
  justify-content: flex-start;
  line-height: 0.5rem;
}

.item_2 {
  text-align: left;
  /* text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
-webkit-box-orient: vertical; */
}

.item_left {
  width: 80%;
}

.item_right {
  width: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.item_right >>> .van-icon:last-child {
  margin-top: 0.3rem;
}

.item_default {
  background: #fb9f30;
  font-size: 0.24rem;
  color: #ffffff;
  padding: 0 0.06rem;
  margin-left: 0.3rem;
  line-height: unset;
}

.AddressSelect >>> .van-radio__icon--checked .van-icon {
  background-color: #ffffff;
}

.AddressSelect >>> .van-radio__icon--checked .van-icon-success::before {
  color: #1989fa;
}

.noSelect >>> .van-radio__icon {
  display: none;
}

.set_default {
  font-size: 0.25rem;
  color: #057eff;
}

.item_right_icon {
  width: 0.36rem;
  margin-top: 0.2rem;
}

.slice_name {
  display: inline-block;
  max-width: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
