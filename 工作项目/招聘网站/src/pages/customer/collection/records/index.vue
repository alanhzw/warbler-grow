<!--
 * @Descripttion: 我的收藏
 * @Author: yang chenglin
 * @Date: 2021-09-25 16:36:07
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 19:49:57
-->
<template>
  <div class='collection-records'>
    <el-row>
      <el-col :span='15'>
        <div class='left-info'>
          <div class='page-title'>我的收藏</div>
          <div class='form-div'>
            <el-input v-model='formInfo.name'
                      placeholder='搜索企业/岗位'></el-input>
            <div class="input-wd"
                 @click="searchList">搜索</div>
          </div>
          <div class='collection-div'
               v-if="collectRecruitmentList.list.length > 0 && isLoading">
            <div v-for='(item, index) in collectRecruitmentList.list'
                 :key='item.id'
                 class='collection-item'
                 @mouseover='showBtn = index'
                 @mouseleave='showBtn = null'
                 @click="$router.push(`/job/${item.recruitmentInfoId}`)">
              <div class='display-flex'>
                <div class='collection-name'>{{item.recruitmentPostName}}</div>
                <div class='collection-pay'>{{item.moneyType == 1 ? `${item.moneyStart}-${item.moneyEnd}k` : '面议'}}
                </div>
              </div>
              <div class='display-flex'>
                <div>
                  <span class='collection-company'>{{item.shortName}}</span>
                  <span class='collection-position'>[{{item.city}}]</span>
                </div>
                <div class='btn-div'
                     :style="{display: showBtn === index ? 'flex' : 'none'}">
                  <div class='normal-btn'
                       v-if="item.deleteFlag === '1'">职位已关闭</div>
                  <div class='active-btn'
                       @click.stop="unCollectRecruitment(item.recruitmentInfoId)">取消感兴趣</div>
                  <!-- <div class='active-btn' @click="doDelivery(item.recruitmentInfoId)">投递简历</div> -->
                </div>
              </div>
            </div>
            <div class='pagination-div'
                 v-if="collectRecruitmentList.list.length">
              <el-pagination background
                             layout='prev, pager, next'
                             :page-size="collectRecruitmentList.page.size"
                             :total='collectRecruitmentList.page.total'
                             @current-change='goPage'
                             @prev-click='goPage'
                             @next-click='goPage'></el-pagination>
            </div>
          </div>
          <div v-if="collectRecruitmentList.list.length === 0  && isLoading"
               style="height: 100%;text-align: center;margin: auto; ">
            <div>
              <img src="https://ired-mp-1304913895.cos.ap-nanjing.myqcloud.com/mp_icon/zp-nodata.png"
                   alt="">
            </div>
            <div style="margin: 20px 0; color: #656565">暂无数据</div>
          </div>
        </div>
      </el-col>
      <el-col :span='1'
              class='display-flex'
              style='justify-content: center;'>
        <div class='middle-line'
             style='height: middleLineHieght'></div>
      </el-col>
      <el-col :span='8'
              class='similar-jobs-div'>
        <similar-jobs></similar-jobs>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { log } from 'console';
import SimilarJobs from '@/components/similarjobs/index.vue';
import useCollectRecruitmentList from './hooks/useCollectRecruitmentList';
import useDoCvDelivery from './hooks/useDoCvDelivery';

const isLoading = ref(false);

const formInfo = reactive({
  name: '',
  // status: 0,
});
// 收藏列表
const {
  collectRecruitmentList,
  setCollectRecruitmentList,
  setCollectRecruitment,
  setUnCollectRecruitment,
} = useCollectRecruitmentList();
onMounted(() => {
  isLoading.value = false;
  setCollectRecruitmentList({
    name: formInfo.name,
  });
  isLoading.value = true;
});

// 取消收藏职位
const unCollectRecruitment = async (id: any) => {
  await setUnCollectRecruitment({ recruitmentInfoId: id });

  isLoading.value = false;
  await setCollectRecruitmentList({
    name: formInfo.name,
    // status: formInfo.status,
  });
  isLoading.value = true;
};

// 投递简历
const { setDoCvDelivery } = useDoCvDelivery();
const doDelivery = async (id: any) => {
  await setDoCvDelivery({ recruitmentInfoId: id });
};

const showBtn = ref(null);
// const middleLineHieght = ref(500);
// watch(collection.list, () => {
//   debugger;
//   console.log(document.querySelector('.similar-jobs'));
//   document.querySelector('.middle-line').style.height = document.querySelector('.similar-jobs').style.height + 'px';
// });

// 查询列表数据
const searchList = async () => {
  isLoading.value = false;
  await setCollectRecruitmentList({
    // applyForStatus: formInfo.status,
    name: formInfo.name,
  });
  isLoading.value = true;
};

// 应聘情况的分页方法
const goPage = async (val: any) => {
  console.log(11111, val);

  collectRecruitmentList.page.current = val;
  await setCollectRecruitmentList({
    // applyForStatus: formInfo.status,
    name: formInfo.name,
  });
};
</script>

<style lang='scss'>
.collection-records {
  margin: 40px 0;
  color: #222222;
  font-family: PingFang SC-Medium, PingFang SC;
  .display-flex {
    display: flex;
  }

  .page-title {
    font-size: 24px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
  }

  .left-info {
    .form-div {
      height: 46px;
      margin: 20px 0;
      display: flex;
      .el-input {
        width: calc(100% - 120px);
        .el-input__inner {
          border-radius: 0;
        }
      }
      .input-wd {
        width: 120px;
        height: 40px;
        background-color: #ED263D;
        color: #ffffff;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
      }
    }
    .status-tabs {
      height: 64px;
      background: rgb(232, 235, 233);
      box-sizing: border-box;
      .normal-status-div {
        width: 20%;
        padding: 20px 0;
        text-align: center;
        color: #656565;
        font-size: 16px;
        cursor: pointer;
        &:not(:first-child) {
          span {
            width: 100%;
            display: inline-block;
            border-left: 1px solid #c7c6c6;
          }
        }
      }
      .active-status-div {
        color: #ED263D;
        border-bottom: 2px solid#ED263D;
      }
    }
    .collection-div {
      padding: 30px;
      border: 1px solid #E8E8E8;
      .collection-item {
        height: 114px;
        margin-bottom: 30px;
        padding: 30px;
        color: #222222;
        font-size: 14px;
        // line-height: 26px;
        box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
        border-radius: 0px 0px 0px 0px;
        box-sizing: border-box;
        cursor: pointer;
        .display-flex {
          justify-content: space-between;
        }
        .collection-name {
          font-size: 18px;
        }
        .collection-pay {
          font-size: 18px;
          color: #FF9100;
        }
        .collection-position {
          color: #999999;
          margin-left: 5px;
          line-height: 42px;
        }
        .collection-time {
          color: #999999;
          margin-right: 10px;
        }
        .btn-div {
          font-size: 14px;
          div {
            height: 30px;
            padding: 0 15px;
            line-height: 30px;
          }
          .normal-btn {
            color: #999999;
            border: 1px solid #E8E8E8;
          }
          .active-btn {
            margin-left: 15px;
            background-color: #ED263D;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .pagination-div {
        text-align: center;
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ED263D;
          color: #ffffff;
        }
      }
    }
  }

  .middle-line {
    width: 1px;
    background: #E8E8E8;
  }
}
</style>
