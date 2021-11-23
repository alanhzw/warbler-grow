<template>
  <div class="page-content customer">
    <!--头部级联菜单-->
    <breadcrumb/>
    <div class="fh-container clearfix">
        <div class="my-join">
      <div class="join-card"><br>
        <div class="card-title">
          <img src="../../assets/img/join-background.png" height="60px" width="60px" alt="">
          <p>动销365VIP专属客服</p>
        </div>
        <div class="card-title">
          <img src="https://sfa-app.oss-cn-hangzhou.aliyuncs.com/custsrv_qrcode.png" height="120px" width="120px" alt="">
          <p>请扫码添加专属客服</p>
        </div>
        <div class="line"></div>
        <div class="card-title">
          <p>我们为您提供以下服务</p>
        </div>
        <div class="flex">
            <div class="flex-demo">
              <img src="../../assets/img/join-business.png" height="40px" width="40px" alt="">
              <p>业务流程梳理</p>
            </div>
            <div class="flex-demo">
              <img src="../../assets/img/join-set.png" height="40px" width="40px" alt="">
              <p>产品后台设置</p>
            </div>
            <div class="flex-demo">
              <img src="../../assets/img/join-train.png" height="40px" width="40px" alt="">
              <p>产品操作培训</p>
            </div>
        </div>
        <div class="footer-tel">服务监督电话： <span @click="ddTel('029-68875860')">029-68875860</span></div><br>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {

        }
    }
}

</script>

<style scoped>
.flex{
  display: flex;
  text-align: center;
}
.my-join{
  margin:0 auto;
}
.flex-demo{
  width: 33.3%;
}
.join-card{
  width: 400px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #888888;
}

.line {
  width: 96%;
  height: 1px;
  background-color: #999 !important;
  margin: 15px auto;
}
.card-title {
  text-align: center;
}
.card-title p{
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}
.flex-demo p{
  font-size:14px;
}
.footer-tel {
  text-align: center;
  font-size: 14px;
}
.footer-tel span{
  font-size: 14px;
}
</style>
