<!--
 * @Description:
 * @Date: 2021-03-26 17:26:18
 * @LastEditTime: 2021-04-16 15:22:18
 * @FilePath: \vite-project-js\src\views\Back.vue
-->
<template>
  <section class="back-box" ref='box' @contextmenu.prevent='ab'>
    <h2>10:59 </h2>
    <input type="text" style='text-align:center'>

  </section>

</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: '',
  setup() {
    const box = ref(null);
    const activeName = ref('second');
    const ab = () => {
      console.log(123);
    };
    function handleClick(tab, event) {
      // console.log(tab, event);
    }
    return {
      box,
      activeName,
      ab,
      handleClick,
    };
  },
});
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  // background: black;
}
.back-box {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    position: absolute;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 800;
    z-index: 3;
    transition: 2s;
  }

  h2:hover ~ img {
    left: 0;
    top: 0;
    transform: scale(1.1);
    filter: blur(10px);
  }

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    pointer-events: none;
    filter: blur(0px);

    transition: 0.25s;
  }
  .cover {
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .el-tabs__nav-scroll {
    .el-tabs__item {
      color: #fff;
    }
    .el-tabs__active-bar {
      background-color: #fff;
    }
  }
  .el-tabs__nav-wrap::after {
    width: 0px;
  }
}
</style>
