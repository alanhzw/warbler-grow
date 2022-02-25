<template>
  <div class="page-error">
    <div class="container">
      <template v-if="error.statusCode === 404">
        <div class="code">404</div>
        <h1>非常抱歉，你访问的页面找不到了...</h1>
      </template>
      <template v-else>
        <h1>非常抱歉，页面暂时无法访问...</h1>
        <p>{{ JSON.stringify(error) }}</p>
      </template>
      <br>
      <a href="/">返回到首页</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  layout: 'blog',
  props: {
    error: {
      type: Object,
      default () {
        return {}
      }
    }
  } // you can set a custom layout for the error page
}
</script>
<style lang="scss" scoped>
.page-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    font-size: 16px;
    color: white;
    text-align: center;

    .code {
      font-family: "Agency FB";
      font-size: 200px;
    }

    a {
      text-decoration: underline;
    }
  }
}

</style>
