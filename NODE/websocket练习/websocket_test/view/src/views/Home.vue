<!--
 * @Description: 
 * @Autor: hanzhiwei
 * @Date: 2021-01-03 12:24:10
 * @LastEditTime: 2021-01-09 16:16:26
 * @FilePath: \websocket_test\view\src\views\Home.vue
-->
<template>

  <div id="app">
    <div id="nav">
      <button @click="clickButton">连接socket</button>
    </div>
  </div>

</template>

<script>



export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$socket.open()
  },
  sockets: {
    connecting () {
      console.log("正在连接");
    },
    disconnect () {
      console.log("Socket 断开");
    },
    connect_failed () {
      console.log("连接失败");
    },
    connect () {
      console.log("连接成功了", this.$socket.id);
    },
    show (data) {
      console.log("客户端发过来了一个请求", data);
    }
  },
  methods: {
    clickButton: function () {//添加按钮事件向服务端发送数据
      this.$socket.emit('emit_method', this.$socket.id);
    }
  },
  beforeDestroy () {
    this.$socket.close()
  }
}
</script>
