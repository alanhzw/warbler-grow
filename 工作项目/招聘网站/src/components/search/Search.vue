<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-17 18:31:56
 * @LastEditTime: 2021-11-27 17:13:46
 * @FilePath: \ired_resource\src\components\search\Search.vue
-->
<template>
  <div class="search-common">
    <div class="search-content">
      <div class="top">
        <img src="../assets/icon-search.png" />
        <div class="title">海量人力资源广场</div>
      </div>
      <div class="bottom">
        <div class="search-kuang">
          <div class="search-kuang-input">
            <el-input v-model="queryContent"
                      placeholder="搜索企业/岗位"></el-input>
          </div>
          <div class="search-kuang-btn"
               @click="handleSearch">搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const queryContent = ref('');

const handleSearch = () => {
  router.push({
    name: 'Search',
    params: {
      queryContent: queryContent.value,
    },
  });
};

</script>

<style lang='scss'>
.search-common {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  .top{
      display: flex;
      justify-content: flex-start;
      img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      .title{

      }
  }
  .search-kuang {
    height: 46px;
    margin: 20px 0 30px 0;
    position: relative;
    .search-kuang-input {
      width: 100%;
      .el-input {
        width: 870px;
        .el-input__inner {
          border-radius: 8px 8px 8px 8px;
        }
      }
    }

    .search-kuang-btn {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      width: 120px;
      height: 40px;
      background-color: #ed263d;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      border-radius: 8px 8px 8px 8px;
    }
  }
}
</style>
