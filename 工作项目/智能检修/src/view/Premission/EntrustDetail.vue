<!--
 * @Description:
 *     权限委托
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\Premission\EntrustDetail.vue
-->
<template>
<div class="detail-container">
  <content-wrapper>
    <content-item label="申请人" :value="transferData.list.applicantName"></content-item>
    <content-item label="职务" :value="transferData.list.position"></content-item>
    <content-item label="组织机构" :value="transferData.list.applicantOrganName"></content-item>
    <content-item label="申请时间" :value="transferData.list.createTime"></content-item>
  </content-wrapper>
  <content-wrapper>
    <content-item label="委托理由" :value="transferData.list.supplement"></content-item>
    <!-- <content-item label="补充说明" :value="transferData.list.supplement"></content-item> -->
  </content-wrapper>
  <bottom-button>
    <van-button type="info" color="#ffffff" class="whiteBtn" @click="onClose">关闭</van-button>
    <van-button type="info" color="#ffffff" class="whiteBtn" @click="updateTransferType('30')">拒绝</van-button>
    <van-button type="info" color="#4FA0F7" @click="updateTransferType('20')">同意</van-button>
  </bottom-button>
</div>
</template>

<script setup>
import BottomButton from '../../components/BottomButton.vue';
import ContentItem from '../../components/ContentItem.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getService } from '../../service';

const service  = getService();
const route = useRoute();
const router = useRouter();

const transferData = reactive({
    list: []
})

service.getTransferDetail({
    id: route.params.id
}).then(res => {
    transferData.list = res
})

const updateTransferType = (e) => {
    const param = {
        id: route.params.id,
        state: e
    }
    if (e == '50') {
        param.expiryDate = new Date();
    }
    service.updateTransferType(param).then(res => {
        onClose();
    })
}

const onClose = () => {
    router.back()
}
</script>

<style lang='scss' scoped>
.detail-container {
  padding: 0 .32rem 2rem .32rem;
}
</style>
