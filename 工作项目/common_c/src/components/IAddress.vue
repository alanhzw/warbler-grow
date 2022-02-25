<template>
  <!-- 地址列表 -->
  <div class="IAddress">
    <van-radio-group v-if="isSelect" v-model="selectRadio">
      <van-radio v-for="v in dealList" :key="v.addressId" :label-disabled='true' :name="v.addressId" icon-size='0.33rem'
                 @click="changeVal(v.addressId)">
        <div class="item">
          <div class="item_left">
            <div class="item_1"><span class="slice_name"
                                      style="margin-right:0.2rem;">{{ v.realName }}</span><span>{{ v.mobileStr }}</span><span
              v-if="v.isDefault" class="item_default">默认地址</span></div>
            <div class="item_2">{{ v.province + v.city + v.county + v.detailInfo }}</div>
          </div>
          <div class="item_right">
            <img :src="editIcon" class="item_right_icon" @click.stop="toEdit(v.addressId)"/>
          </div>
        </div>
      </van-radio>
    </van-radio-group>
    <div class="noSelect">
      <van-radio-group v-if="!isSelect">
        <van-radio v-for="v in dealList" :key="v.addressId" :label-disabled='true' icon-size='0.33rem'>
          <div class="item">
            <div class="item_left">
              <div class="item_1"><span class="slice_name"
                                        style="margin-right:0.2rem;">{{ v.realName }}</span><span>{{ v.mobileStr }}</span><span
                v-if="v.isDefault" class="item_default">默认地址</span></div>
              <div class="item_2">{{ v.province + v.city + v.county + v.detailInfo }}</div>
            </div>
            <div class="item_right">
              <span v-if="!v.isDefault" class="set_default" @click="setDefault(v.addressId)">设为默认</span>
              <img :src="editIcon" class="item_right_icon" @click="toEdit(v.addressId)"/>
              <img v-if="!v.isDefault" :src="delIcon" class="item_right_icon" @click="deletAddress(v.addressId)"/>
            </div>
          </div>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
// isSelect:地址选择页或者地址管理页  参数：
// true  false
// list: 地址列表  参数：
// {
//   addressId: 1,
//   isDefault: false,
//   realName: '只能告诉',
//   mobileStr: '123****5432',
//   province: '浙浙省',
//   city: '大连市',
//   county: '浙浙江浙江',
//   detailInfo: '而退哦怕法国海军的法国红酒看来的风格和健康'
// }
export default {
  name: 'AddressManage',
  props: ['isSelect', 'list', 'selectRadio'],
  data() {
    return {
      delIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAMAAAAJbCvNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCtpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkIxQUMyNjA2REQ4M0U3MTE5OUU5RTk1QzU3MDU3M0U5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3QzFEMTg1NzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3QzFEMTg0NzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNC0wMVQxNToyODoyNCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzBCQjE5NjU3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzBCQjE5NjY3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4cFNxJAAAAbFBMVEX////+/v7FxcX9/f3GxsbExMTDw8P8/PzCwsLIyMjHx8f7+/vT09PJycnf39/Ly8v5+fnV1dXa2tr09PT19fXR0dHh4eHPz8/39/f6+vri4uL29vbg4ODx8fHz8/Pu7u7p6enQ0NDd3d3S0tLzy1iyAAABjklEQVR42mxTh7bDIAhFxJlmdLyOt8f//+MDjaRpyjFxcIELIsAsx+GC3hGRj+P5FACMAQOLfF88ImYnGEf9R1CNoCxMKR4mK+sO4PM39m+sMLOHwPMBhwkCGDEMcDv4IYhptZbf2H/J0rAwAI7u78raots7Qk/ZJ8qIzDFSjp6PRmJSewXwJiaK6BJTZLbO+cjTj4YQtsJJvlDGzKCRrDhW2AoyVlNsWtNWZVR7LYaY8c9q7aplqFsD1zEWxO6FId1u13GUKWMAjYMoTg152SOWY++11hZiLhxSlmhExRKT7WZyAM6V+N7dmaoH5gYZCxvG8cweJNNELXfeIpWcyDEVy4R4Z5FaUjeAiAXsSU7Yj3iIDpaOwQ1Ak2mATYgngBXJDWCb5iNgW6g1YFvqJx7uL2sL2Fy3AtgGsgd9BE08traW2vQdaFPNvUfY+o75JX/qYPUS+WUkszTMgA6JPxlVcsSzWlgI7z2JTvVI6TVopxee1q551pcxd1Q7vwPI5dml6Y01DxxbwwP8CzAAJT8KUqUMbscAAAAASUVORK5CYII=',
      editIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCtpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkIxQUMyNjA2REQ4M0U3MTE5OUU5RTk1QzU3MDU3M0U5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3QzFEMTgxNzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3QzFEMTgwNzNFQjExRUFBMUVBOTYwMDhCMEM3NTg5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNC0wMVQxNToyODoyNCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDQtMDFUMTU6Mzg6NTYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzBCQjE5NjU3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzBCQjE5NjY3M0M3MTFFQUI0NTc4NDI5NUQwREFDOUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4CKAWMAAAAh1BMVEX////+/v7FxcX9/f3ExMT8/Pz7+/vGxsb6+vrKysrDw8PNzc3Pz8/IyMjHx8fR0dHCwsL4+PjQ0NDOzs7f39/AwMD39/f19fXLy8v29vbV1dXy8vLT09Px8fHb29vz8/Pj4+Pn5+fBwcHp6enU1NS9vb3W1tbi4uLMzMzg4ODe3t7Y2Nj5+fkW/av9AAABc0lEQVR42qRTR5bDIAyVkAD3kt6n97n/+UYUx5CX3bDII+g3hAzw74VA3yWruNp1705cobg8ydatFduprtblZygTLtVP2OrSHnFWJPISemeXJlpwp2dD4Tjab72rKQgYGGyaSQQMbBa8RD0dqAQgCnK+XVSHQugRoypM+CJQvHOzCfqOg51KLTToft2bmCcoqMgln3nbc2OmODMAQWv5QTQL1RSAqagD+CsJCExtS+PqiDjBvIL2cSS/rUn7dsH5DDlAjMdeldEZi7al1ELosD9JPi1ORPKPqzwkwv51kHxODR3F2tiLcE0N42lofD7y8ciq2Gxm0RePy9thnKdkIsrWsrcyL6tjNkmsrq0OD0uU9EcyC2AKSVEUdAbgCKhsSH19nBhCAGFbdTC9Ld4JCdjZIoxpAnBzxTaaldWDexrMB89suI0T8sVDq24Wczeox+hWfNTPt4BW2Xo1ekvXV7z3vRFcC9n98iReAe8X4/GfAAMAq2AK8d2lQWAAAAAASUVORK5CYII=',
    };
  },
  computed: {
    dealList() {
      return this.list;
    },
  },
  created() {

  },
  methods: {
    changeVal(val) {
      this.$emit('getAddress', val);
    },
    toEdit(val) {
      this.$emit('editAddress', val);
    },
    deletAddress(val) {
      this.$emit('deletAddress', val);
    },
    setDefault(val) {
      this.$emit('setDefault', val);
    },
  },
};
</script>
<style scoped>
.IAddress {
  padding-bottom: 2rem;
}

.IAddress >>> .van-radio {
  margin-top: 0.24rem;
  background-color: #ffffff;
  font-size: 0.26rem;
  padding: 0.1rem 0.24rem 0.24rem 0.3rem;
  box-sizing: border-box;
}

.IAddress >>> .van-radio__label {
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

.IAddress >>> .van-radio__icon--checked .van-icon {
  background-color: #ffffff;
}

.IAddress >>> .van-radio__icon--checked .van-icon-success::before {
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
