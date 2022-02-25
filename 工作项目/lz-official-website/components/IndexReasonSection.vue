<template>
  <div class="reason-section">
    <h1 class="reason-title">
      选择我们的理由
    </h1>
    <div class="reason-list">
      <div class="reason-item">
        <div class="media-body">
          <h3>服务好</h3>
          <p>
            1对1专属服务<br>
            7*24小时客户接待<br>
            定期上门沟通<br>
            响应速度快<br>
          </p>
        </div>
        <div class="media-image">
          <img src="/images/reason01.png" class="reason01">
        </div>
      </div>
      <div class="reason-item">
        <div class="media-body">
          <h3>系统稳</h3>
          <p>
            每日千万级数据处理量<br>
            专业的软件开发团队<br>
            2020年双11服务商家成交额近77亿
          </p>
        </div>
        <div class="media-image">
          <img src="/images/reason02.png" class="reason02">
        </div>
      </div>
      <div class="reason-item">
        <div class="media-body">
          <h3>专业强</h3>
          <p>
            8年专业电商运营<br>
            京东数坊JSP认证<br>
            荣获京东服务市场“京卓越”奖项
          </p>
        </div>
        <div class="media-image">
          <img src="/images/reason03.png" class="reason03">
        </div>
      </div>
      <div class="reason-item">
        <div class="media-body">
          <h3>功能全</h3>
          <p>
            4大产品体系<br>
            33个功能模块<br>
            119个功能类目<br>
            产品+服务多维度组合
          </p>
        </div>
        <div class="media-image">
          <img src="/images/reason04.png" class="reason04">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexReasonSection'
}
</script>

<style lang="scss" scoped>
.reason-section {
  .reason-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .6rem;
    color: $--color-white;
    height: 2.53rem;
    margin: auto;

  }

  .reason-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: .4rem;
    grid-column-gap: .4rem;

    .reason-item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 8.30rem;
      height: 3.60rem;
      background-color: $--color-white;
      box-shadow: 0px 0.01rem 1.33rem 0px rgba(38, 71, 200, 0.15);
      border-radius: .20rem;

      .media-body {
        h3 {
          font-size: .36rem;
          color: $--color-title;
          margin-bottom: .31rem;

        }

        p {
          font-size: .24rem;
          line-height: .42rem;
          color: $--color-text;
        }
      }

      .media-image {
        .reason01 {
          width: 3.44rem
        }

        .reason02 {
          width: 2.75rem
        }

        .reason03 {
          width: 1.84rem
        }

        .reason04 {
          width: 3.87rem
        }
      }
    }
  }
}
</style>
