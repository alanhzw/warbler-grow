<!--
 * @Description:
 *      委托单履历页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-02
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Record.vue
-->
<template>
  <div class="order-history">
    <div class="history-title">委托单履历</div>
    <van-steps direction="vertical" :active="-1">
      <van-step v-for="record in history.list" :key="record.id">
        <div class="order-record">
          <div class="overall">
            <span class="title">{{record.operateType}}</span>
            <span class="operator">{{record.sysOrgCode}} {{record.formOperator}}</span>
            <span class="operator">{{record.operateTime}}</span>
          </div>
          <div class="desc">
            <span>{{record.operateResult}}</span>
            <span v-if="record.operateOpinion">({{record.operateOpinion}})</span>
          </div>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { getService } from '../../service';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { formatDate} from '../../utils/date';
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD HH:mm'


const store = useStore();
const orderInfo = computed(() => store.state.order.current);

const route = useRoute();

const service = getService();

const history = reactive({
  list: []
});

service.getHistory({
  trustFormMainTableId: route.params.id,
}).then(res => {
  if (res != null && res.length > 0) {
    for(var i=0; i< res.length;i++) {
      var info = res[i];
      // info.operateTime = formatDate(info.operateTime, "yyyy-MM-dd hh:mm").replace(/\-/g, "/");
      info.operateTime = moment(info.operateTime).format(dateFormat);
    }
  }
  history.list = res;
})

</script>

<style lang="scss" scoped>
.order-history {
  .order-record {
    color: #000000;
    .overall {
      display: flex;
      align-items: center;
      font-size: 0.22rem;
      .title {
        text-align: left;
        font-size: 0.28rem;
        font-weight: 500;
        flex: 1;

      }
      .operator {
        margin-left: 0.4rem
      }

    }
    .desc {
      margin: 0.16rem 0;
      font-size: 0.22rem;
      line-height: 0.33rem;
      text-align: left;

    }
  }
}
</style>

<style lang="scss">
.order-history {
  .history-title {
    font-size: 0.28rem;
    font-weight: 500;
    text-align: left;
    margin: 0.4rem 0.32rem 0.32rem 0.32rem;
  }
  .van-step__circle {
    background-color: #045BB8;
    width: 0.16rem;
    height: 0.16rem;
    border: 2px solid #ffffff;
  }
  .error .van-step__circle {
    background-color: #D35C56;
  }
}
</style>