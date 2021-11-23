<template>
  <div>
    <h1>覆盖率报表</h1>
    <div id="main" style="width: 100%;height: 500px"></div>
  </div>
</template>

<script>

  export default {
    created() {
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '月度拜访'
        },
        legend: {
          data: ['拜访次数']
        },
        tooltip: {},
        xAxis: {
          data: ['赵雨', '闫中华', '孙琦', '韩梅梅', '李雷', '周杰伦', '赵雨', '闫中华', '孙琦', '王大春', '李小璐', '周杰伦']
        },
        yAxis: {},
        series: [{
          name: '拜访次数',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
        }]
      });
    },
    methods: {}
  }
</script>

<style scoped>

</style>
