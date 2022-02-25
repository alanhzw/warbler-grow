<template>
  <!-- 积分流水 -->
  <div v-if="$store.state.showDetail" class="PointsHistory allpage">
    <div class="PointsList_top">
      <p v-if="form.curPoint" class="p1">{{ form.curPoint }}<span>{{ form.pointAlias }}</span></p>
      <p v-if="form.preExpiredPoint > 0" class="p2">{{ form.preExpiredPoint }} {{ form.pointAlias }}将于
        {{ $core.timestampstr(form.pointExpiredTime).format7 }}日过期</p>
      <p v-else class="p2">无即将到期的历史积分</p>
    </div>
    <div class="PointsList_bottom">
      <van-cell class="first_child" is-link title="收支明细" value="积分规则" @click="goRule"/>
      <van-list v-model="loading" :finished="finished" :immediate-check='checkDate' finished-text="没有更多了"
                @load="getPointsList">
        <van-cell v-for="v in pointRecordData" :key="v.recordId" :title="v.content" center>
          <template #default>
            <div class="custom-title">
              <p :class="[v.points < 0 ? 'cell_top_2' : 'cell_top_1']">{{
                  v.points > 0 ? '+' + v.points : v.points
                }}</p>
              <p class="cell_bottom">{{ v.createTime }}</p>
            </div>
          </template>
        </van-cell>
      </van-list>

    </div>
  </div>
</template>
<script>
import { PointsService } from '@/http';

export default {
  name: 'PointsHistory',
  data() {
    return {
      finished: false,
      loading: false,
      checkDate: false,
      pageNo: 1,
      form: {
        curPoint: '',
        preExpiredPoint: '',
        pointExpiredTime: '',
      },
      pointRecordData: [],
      state: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem('STARTROWKEY', '');
    next();
  },
  mounted() {
    sessionStorage.setItem('STARTROWKEY', '');
    // 获取积分信息
    this.getPointsList();
  },
  methods: {
    async getPointsList() {
      if (this.state) {
        return;
      }
      this.state = true;
      this.loading = true;
      try {
        const res = await PointsService.getPointRecordList({
          pageNo: this.pageNo,
          pageSize: 10,
          startRowKey: sessionStorage.getItem('STARTROWKEY') || null,
        }, {
          needLoading: false,
          needVisable: false,
        });
        this.form = res.data;
        document.title = `${this.form.pointAlias}流水`;
        sessionStorage.setItem('STARTROWKEY', this.form.startRowKey);
        if (res.data.pointRecordData.length < 10) {
          // console.log(this.pageNo, '加载完成')
          this.finished = true;
        } else {
          // console.log(this.pageNo, '加载更多')
          this.finished = false;
          this.pageNo += 1;
        }
        this.pointRecordData = [...this.pointRecordData, ...res.data.pointRecordData];
        this.pointRecordData.forEach((e) => {
          if (!e.content) {
            e.content = ' ';
          }
        });
      } catch {
        this.finished = true;
      } finally {
        this.state = false;
        this.loading = false;
      }
    },
    goRule() {
      // 积分规则页面
      this.$router.push('/rules');
    },
  },
};
</script>
<style scoped>
.PointsHistory {
  position: relative;
  height: 100vh;
}

p {
  margin: 0;
}

.PointsList_top {
  width: 100%;
  height: 1.5rem;
  background: url('//img10.360buyimg.com/imgzone/jfs/t1/104685/7/18010/40929/5e8ed4ffEd3a6aa85/fb638cc1d2a5a9ae.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  padding: 0.24rem;
  box-sizing: border-box;
}

.PointsList_top p {
  text-align: left;
  margin-top: 0.06rem;
}

.p1 {
  font-size: 0.4rem;
  display: flex;
}

.p1 span {
  font-size: 0.25rem;
  margin-left: 0.1rem;
  margin-top: 0.07rem;
}

.p2 {
  font-size: 0.24rem;
  color: #bad0fa;
}

.PointsList_bottom {
  position: absolute;
  top: 1.7rem;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: scroll;
}

.PointsList_bottom >>> .van-cell__title {
  text-align: left;
}

.PointsList_bottom >>> .first_child .van-cell__title {
  color: #000000;
  font-weight: bold;
  font-size: 0.3rem;
}

.cell_top_1 {
  height: 0.4rem;
  font-size: 0.3rem;
  color: #f23c3c;
}

.cell_top_2 {
  height: 0.4rem;
  font-size: 0.33rem;
  color: #666666;
}

.cell_bottom {
  height: 0.36rem;
  font-size: 0.24rem;
}

.van-cell:not(:last-child)::after {
  transform: scaleY(1) !important;
}
</style>
