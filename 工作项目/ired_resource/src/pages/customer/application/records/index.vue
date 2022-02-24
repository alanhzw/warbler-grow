<!--
 * @Descripttion: 应聘记录
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 19:47:36
-->
<template>
  <div class='application-records'>
    <el-row>
      <el-col :span='15'>
        <div class='left-info'>
          <div class='page-title'>应聘记录</div>
          <div class='form-div'>
            <el-input v-model='formInfo.name'
                      placeholder='搜索企业/岗位'></el-input>
            <div class="input-wd"
                 @click="searchList">搜索</div>
          </div>
          <div class='display-flex status-tabs'>
            <div v-for='item in resumeState'
                 :key='item.key'
                 :class="item.key === formInfo.status ? 'active-status-div normal-status-div' : 'normal-status-div'"
                 @click="handleTabClick(item.key)">
              <span class=''>{{item.title}}</span>
            </div>
          </div>
          <div class='applyInfo-div'
               v-if="applyForList.list.length > 0 && isLoading">

            <div v-for='item in applyForList.list'
                 :key='item'
                 class='applyInfo-item'
                 @click="$router.push( formInfo.status ==2?`/invite/${item.recruitmentInfoId}`:`/job/${item.recruitmentInfoId}`)">
              <div class='display-flex'>
                <div class='applyInfo-name'><span style="margin-right: 5px">{{item.recruitmentPostName}}</span><img src="@/assets/desc-icon.png"
                       alt=""></div>
                <div class='applyInfo-pay'>
                  {{item.moneyStart ?? '?'}}k-{{item.moneyEnd ?? '?'}}k
                </div>
              </div>
              <div class='display-flex'>
                <div>
                  <span class='applyInfo-company'>{{item.shortName}}</span>
                  <span class='applyInfo-position'>[{{item.city}}]</span>
                </div>
                <div>
                  <span class='applyInfo-time'>{{item.statusTime}}</span>
                  <span class='applyInfo-status'>{{item.status}}</span>
                </div>
              </div>
            </div>
            <div class='pagination-div'
                 v-if="applyForList.list.length > 0">
              <el-pagination background
                             layout="prev, pager, next"
                             :page-size="applyForList.page.size"
                             :total='applyForList.page.total'
                             @current-change='goPage'
                             @prev-click='goPage'
                             @next-click='goPage'>
              </el-pagination>
            </div>
          </div>

          <div v-if="applyForList.list.length === 0  && isLoading"
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
import dayjs from 'dayjs';
import SimilarJobs from '@/components/similarjobs/index.vue';
import useApplyForList from './hooks/useApplyForList';

const isLoading = ref(false);

// 简历投递状态枚举
const resumeState = [
  {
    key: 0,
    title: '已投递',
  },
  {
    key: 1,
    title: '被查看',
  },
  {
    key: 2,
    title: '邀请面试',
  },
  {
    key: 3,
    title: '已录用',
  },
  {
    key: 4,
    title: '未录用',
  },
  {
    key: 5,
    title: '已转正',
  },
];
const formInfo = reactive({
  name: '',
  status: 0,
});

const { applyForList, setApplyForList } = useApplyForList();

onMounted(() => {
  isLoading.value = false;
  setApplyForList({
    applyForStatus: formInfo.status,
    name: formInfo.name,
  });
  isLoading.value = true;
});

// const middleLineHieght = ref(500);
// watch(applyForList.list, () => {
//   debugger;
//   console.log(document.querySelector('.similar-jobs'));
//   document.querySelector('.middle-line').style.height = `${document.querySelector('.similar-jobs').style.height}px`;
// });

// 查询列表数据
const searchList = async () => {
  isLoading.value = false;
  await setApplyForList({
    applyForStatus: formInfo.status,
    name: formInfo.name,
  });
  isLoading.value = true;
};

/**
 * @description: 切换tab
 * @param {*} key-当前点击的tab所表示的值
 * @return {*}
 */
const handleTabClick = async (key: any) => {
  formInfo.status = key;
  await searchList();
};

// 分页方法
const goPage = async (val: any) => {
  isLoading.value = false;
  applyForList.page.current = val;
  await setApplyForList({
    applyForStatus: formInfo.status,
    name: formInfo.name,
  });
  isLoading.value = true;
};
</script>

<style lang='scss'>
.application-records {
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
        background-color: #ed263d;
        color: #ffffff;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
      }
    }
    .status-tabs {
      height: 64px;
      background: #F8F8F8;
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
        color: #ed263d;
        border-bottom: 2px solid#ED263D;
      }
    }
    .applyInfo-div {
      padding: 30px;
      border: 1px solid #e8e8e8;
      border-top: none;
      .applyInfo-item {
        margin-bottom: 30px;
        padding: 30px;
        color: #222222;
        font-size: 14px;
        line-height: 26px;
        box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
        border-radius: 0px 0px 0px 0px;
        cursor: pointer;
        .display-flex {
          justify-content: space-between;
        }
        .applyInfo-name {
          font-size: 18px;
          display: flex;
          align-items: center;
        }
        .applyInfo-pay {
          font-size: 18px;
          color: #ff9100;
        }
        .applyInfo-position {
          color: #999999;
          margin-left: 5px;
        }
        .applyInfo-time {
          color: #999999;
          margin-right: 10px;
        }
      }
      .pagination-div {
        text-align: center;
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ed263d;
          color: #ffffff;
        }
      }
    }
  }

  .middle-line {
    width: 1px;
    background: #e8e8e8;
  }
}
</style>
