<template>
  <canvas width="100%" height="100%" class="rain-line-effect"></canvas>
</template>

<script>
export default {
  name: 'RainLineEffect',
  mounted () {
    const can = document.querySelector('.rain-line-effect')
    // 设置2d绘图环境
    const ctx = can.getContext('2d')

    // 获取浏览器窗口的宽高
    let w = can.width = window.innerWidth
    let h = can.height = window.innerHeight
    // 自适应浏览器窗口
    window.onresize = function () {
      w = can.width = window.innerWidth
      h = can.height = window.innerHeight
    }

    // 创建雨滴类
    function Drop () {
    }

    Drop.prototype = {
      init () {
        this.x = rand(0, w) // 雨滴的初始化坐标
        this.y = 0 // 雨滴y轴方向的坐标
        this.vy = rand(8, 9) // 雨滴下落的速度
        this.l = rand(h * 0.8, h * 0.9) // 雨滴下落的高度
        this.r = 1
        this.vr = 1 // 半径增加的速度
        this.a = 1
        this.va = 0.98 // 透明度的变化系数
      },
      // 绘制雨滴
      draw () {
        if (this.y > this.l) {
          // 绘制圆形
          ctx.beginPath() // 开始路径
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
          ctx.strokeStyle = 'rgba(255,255,255,' + this.a + ')'
          ctx.stroke()
        } else {
          // 绘制下落的雨滴
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillRect(this.x, this.y, 2, 10)
        }
        this.update()
      },
      // 更新坐标
      update () {
        if (this.y < this.l) {
          this.y += this.vy
        } else if (this.a > 0.03) {
          this.r += this.vr
          if (this.r > 50) {
            this.a *= this.va
          }
        } else {
          // 重新初始化了
          this.init()
        }
      }
    }
    // 实例化一个雨滴对象
    const drops = [] // 默认值为undefined
    // console.log(drops)
    for (let i = 0; i < 30; i++) {
      setTimeout(function () {
        const drop = new Drop()
        drop.init()
        drops.push(drop)
      }, i * 200)
    }

    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, h)
    backgroundGradient.addColorStop(0, '#011992')
    backgroundGradient.addColorStop(1, '#2647c8')

    // 实例初始化
    setInterval(function () {
      // 绘制一个透明层
      ctx.fillStyle = backgroundGradient
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < drops.length; i++) {
        drops[i].draw()
      }
    }, 30)

    function rand (min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<style lang="scss" scoped>
.rain-line-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10.80rem;
}
</style>
