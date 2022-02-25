<template>
  <div id="home"></div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      img: require('../assets/images/loginLoding.gif'),
    };
  },
};
</script>

<style>
#home {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: url('../assets/images/loginLoding.gif') no-repeat;
  background-size: 100% 100%;
}
</style>
