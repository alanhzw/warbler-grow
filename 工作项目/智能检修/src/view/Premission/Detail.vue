<!--
 * @Description:
 *     权限委托
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\Premission\Detail.vue
-->
<template>
  <div class="detail-container">
    <content-wrapper>
      <content-item label="委托至" :value="detailData.data.transferToName" />
      <content-item label="职务" :value="detailData.data.position" />
      <content-item label="组织结构" :value="detailData.data.transferToOrganName" />
      <content-item label="申请时间" :value="detailData.data.createTime" />
      <div class="content-item" v-if="type=='1'">
        <span class="label">状态</span>
        <div class="value">
          <div v-if="detailData.data.state=='10'" class="circle-blue"></div>
          <div v-if="detailData.data.state=='10'" class="circle-right-blue">申请中</div>
          <div v-if="detailData.data.state=='20'" class="circle-green"></div>
          <div v-if="detailData.data.state=='20'" class="circle-right-green">已委托</div>
          <div v-if="detailData.data.state=='30'" class="circle-red"></div>
          <div v-if="detailData.data.state=='30'" class="circle-right-red">已拒绝</div>
          <div v-if="detailData.data.state=='50'" class="circle-gray"></div>
          <div v-if="detailData.data.state=='50'" class="circle-right-gray">已收回</div>
        </div>
      </div>
    </content-wrapper>
    <content-wrapper>
      <content-item label="委托理由" :value="detailData.data.supplement" />
      <!-- <content-item label="补充说明" :value="detailData.data.supplement" /> -->
    </content-wrapper>
    <bottom-button v-if="type=='1'">
      <van-button type="info" color="#ffffff" @click="reset()" class="whiteBtn">关闭</van-button>
      <van-button v-if="detailData.data.state=='10'" type="info" color="#4FA0F7" @click="updateTransferType('40')">撤销委托申请</van-button>
      <van-button v-if="detailData.data.state=='20'" type="info" color="#4FA0F7" @click="updateTransferType('50')">收回委托</van-button>
    </bottom-button>
    <!-- <bottom-button>
      <van-button type="info" color="#ffffff" @click='reset()' class="whiteBtn">关闭</van-button>
    </bottom-button> -->
    <bottom-button v-else>
      <van-button type="info" color="#ffffff" @click="reset()" class="whiteBtn">关闭</van-button>
      <van-button type="info" color="#ffffff" @click="updateTransferType('30')" class="whiteBtn">拒绝</van-button>
      <van-button type="info" color="#4FA0F7" @click="updateTransferType('20')">同意</van-button>
    </bottom-button>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from "vue";
import BottomButton from '../../components/BottomButton.vue';
import ContentItem from '../../components/ContentItem.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
import { getService } from '../../service';
export default {
  name: 'Detail',
  components: { BottomButton, ContentItem, ContentWrapper},
  props: {
    popupId: {
      default: ''
    },
    type: {
      default: '2'
    }
  },
  setup(props,context) {
    const service = getService();

    const detailData = reactive({
      data: {}
    });

    // 权限委托 - 获取移交申请详情
    const getTransferDetail = () => {
      service.getTransferDetail({
        id: props.popupId.value,
      }).then(res => {
        detailData.data = res;
      })
    }
    // 权限委托 - 修改申请的状态[同意/拒绝][撤销移交/收回移交]
    const updateTransferType = (e) => {
      var param = {
          id: props.popupId.value,
          state: e
          };
      if(e=='50'){
        param.expiryDate = new Date();
      }
      service.updateTransferType(param).then(res => {
        reset();
      })
    }
    function reset(){
      context.emit("close");
    }
     onMounted(() => {
      getTransferDetail();
    })
    return {
      updateTransferType,
      detailData,
      reset
    }
  },
}
</script>

<style lang='scss'>
.detail-container {
  padding: 0 .32rem 2rem .32rem;
  .content-item {
  display: flex;
  font-size: 0.28rem;
  line-height: 0.4rem;
  text-align: left;
  margin-top: 0.32rem;
  margin-bottom: 0.32rem;

  .label {
    width: 1.7rem;
    margin-right: 0.32rem;
    font-weight: 500;
  }

  .value {
    flex: 1;
    font-weight: 400;
    display: flex;
    align-items: center;
    // color: #045BB8;
    .circle-blue {
      width: .16rem;
      height: .16rem;
      background-color: #045BB8;
      border-radius: 50%;
      margin-right: .16rem;
    }
    .circle-right-blue {
      color: #045BB8;
    }
    .circle-green {
      width: .16rem;
      height: .16rem;
      background-color: #3A8B14;
      border-radius: 50%;
      margin-right: .16rem;
    }
    .circle-right-green {
      color: #3A8B14;
    }
    .circle-red {
      width: .16rem;
      height: .16rem;
      background-color: #db0808;
      border-radius: 50%;
      margin-right: .16rem;
    }
    .circle-right-red {
      color: #db0808;
    }
    .circle-gray {
      width: .16rem;
      height: .16rem;
      background-color: #505050;
      border-radius: 50%;
      margin-right: .16rem;
    }
    .circle-right-gray {
      color: #505050;
    }
  }
}
}
</style>