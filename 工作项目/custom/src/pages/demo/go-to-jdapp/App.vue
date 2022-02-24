<template>
  <div></div>
</template>

<script setup lang="ts">
import QS from 'qs';

const { url, ...params } = QS.parse(window.location.search.slice(1));

const openJDApp = () => {
  if (url) {
    const pageUrl = `${decodeURIComponent(url as string)}${(url as string).includes('?') ? '&' : '?'}${QS.stringify(params)}`;
    const jdAppUrl = `openApp.jdMobile://virtual?params={"category":"jump","des":"m","needlogin":1,"url":"${pageUrl}"}`;
    console.log('🚀 ~ openJDApp ~ pageUrl', pageUrl);
    console.log('🚀 ~ openJDApp ~ jdAppUrl', jdAppUrl);
    window.location.href = jdAppUrl;
  }
};
openJDApp();
</script>

<style scoped>

</style>
