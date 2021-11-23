<template>
  <div>
    <div id="main" class="echarts"></div>
  </div>
</template>

<script>
  export default {
    name: "echarts",
    props: {
      options: {
        type: Object
      },
      xData: Array
    },
    data() {
      return {
        chart: null
      }
    },
    created() {
      this.createEchartOne()
      window.addEventListener('resize', this.addEventListener)
    },
    updated() {
      this.dispose()
      this.createEchartOne()
    },
    destroyed() {
      this.dispose()
    },
    mounted() {
      this.createEchartOne()
      window.addEventListener('resize', this.addEventListener)
    },
    methods: {
      createEchartOne() {
        if (this.options && this.$el) {
          this.chart = echarts.init(this.$el);
          this.chart.setOption(this.options);
          this.chart.on('legendselectchanged', (params) => {
            this.$emit('lengendChange', params)
          })
        }
      },
      dispose() {
        if (this.chart && this.chart.dispose) {
          this.chart.dispose()
          this.chart = null
          window.removeEventListener('resize', this.addEventListener)
        }
      },
      addEventListener(event) {
        if (this.options && this.chart && this.chart.resize) {
          this.chart.resize({ silent: false })
        }
      }
    }
  }
</script>

<style lang="scss">
  .echarts {
    height: 300px;
    width: 300px
  }
</style>
