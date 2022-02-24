<template>
  <div class="hotzone-edit-wrapper">
    <div class="hotzone-edit-panel">
      <div class="hotzone-position-panel">
        <div ref="hzBg"
             class="hotzone-pic-wrapper"
             :class="{editable: hotzones.length < 5, 'on-edit': hzBgOnEdit}"
             :style="{width: bg.w + 'px', height: bg.h + 'px', backgroundImage: `url(${imgUrl})`}"
             @mousedown="startEdit">
          <div class="hotzone-box"
               v-for="(hz, index) in hotzones"
               :key="`hotzone-${index}-edit-box`"
               :class="{selected: index === hzIndex, error: hz.overlap}"
               :style="{left: hz.x * 100 + '%',  top: hz.y * 100 + '%',  width: hz.w * 100 + '%',  height: hz.h * 100 + '%'}"
               @mousedown.stop.prevent="dragHotzone($event, index)"
               @click.stop>
            热区{{index + 1}}
            <div class="corner corner-t"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 't')"
                 @click.stop></div>
            <div class="corner corner-b"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'b')"
                 @click.stop></div>
            <div class="corner corner-l"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'l')"
                 @click.stop></div>
            <div class="corner corner-r"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'r')"
                 @click.stop></div>
            <div class="corner corner-tl"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'tl')"
                 @click.stop></div>
            <div class="corner corner-bl"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'bl')"
                 @click.stop></div>
            <div class="corner corner-tr"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'tr')"
                 @click.stop></div>
            <div class="corner corner-br"
                 @mousedown.stop.prevent="dragHotzoneCorner($event, index, 'br')"
                 @click.stop></div>
            <!-- <img class="btn-delete" src='@/assets/delete.png' @mousedown.stop.prevent @mousemove.stop.prevent @mouseup.stop.prevent="removeHotzone(index)"> -->
            <i class="btn-delete iconfont icon-icon-07"
               @mousedown.stop.prevent
               @mousemove.stop.prevent
               @mouseup.stop.prevent="removeHotzone(index)"></i>
          </div>
          <div class="hotzone-box-temp"
               :style="{left: temp.x + 'px', top: temp.y + 'px', width: temp.w + 'px', height: temp.h + 'px'}" />
        </div>
      </div>
      <div class="hotzone-link-panel">
        <div class="hotzone-link-panel-header"><span class="panel-title">热区管理</span> <span class="hotzone-count">{{hotzones.length}}/8</span></div>
        <div class="hotzon-link-list">
          <div class="hotzone-link-edit-block"
               v-for="(hz, index) in hotzones"
               :key="`hotzone-${index}-link-box`">
            <p class="hotzone-block-header">
              <span class="hotozne-title">热区{{index + 1}}：</span>
              <lz-button type="text"
                         class="btn-delete"
                         size="small"
                         @click.stop.prevent="removeHotzone(index)">删除</lz-button>
            </p>
            <lz-input :class="{'error': hz.link === '' || !V.isValidLink(hz.link)}"
                      size="small"
                      v-model="hz.link"
                      @focus="hzIndex=index" />
            <p class="error-blank"
               v-show="hz.link === ''">请编辑热区链接</p>
            <p class="error-blank"
               v-show="hz.link !== '' && !V.isValidLink(hz.link)">请使用以http/https开头，{{V.getValidDomains().join('、')}}域名下的链接</p>
          </div>
        </div>
        <div>
          <lz-button plain
                     size="small"
                     class="btn-delete-all"
                     @click="hotzones=[]">清空热区</lz-button>
          <link-tips></link-tips>
        </div>
      </div>
    </div>
    <div class="hotzone-edit-footer">
      <p class="tip">注：鼠标移至图片区域可添加热区，拖拽热区可进行编辑</p>
      <lz-button size="small"
                 type="success"
                 plain
                 @click="save">提交</lz-button>
      <lz-button size="small"
                 type="info"
                 plain
                 @click="$emit('cancel')">取消</lz-button>
    </div>
  </div>
</template>

<script>
import LinkTips from '../components/LinkTips.vue';
import CONST from '@/utils/constant';
import Utils from '@/utils';
import { LzMsg } from '@/utils/UI';
import V from '@/utils/valid';

const HOTZONE_MAX_COUNT = 8;

const MIN_HZ_WIDTH = 50;
const MIN_HZ_HEIGHT = 50;
const initTemp = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

export default {
  name: 'HotzoneEditor',
  components: {
    LinkTips,
  },
  props: {
    imgUrl: {
      default: '',
    },
  },

  data() {
    return {
      CONST,
      V,
      hzBgOnEdit: false,
      hotzones: [],
      hzIndex: 0,
      bg: {
        w: 0,
        h: 0,
      },
      temp: {
        ...initTemp,
      },
    };
  },
  watch: {
    imgUrl(url) {
      this.setBg(url);
    },
  },
  created() {
    this.setBg();
  },
  methods: {
    save() {
      Utils.checkOverlap(this.hotzones);
      const olHzs = this.hotzones.map((hz, idx) => ({ idx, ...hz })).filter(hz => hz.overlap);
      if (olHzs.length > 0) {
        LzMsg.error(`热区${olHzs.map(hz => hz.idx + 1).join('、')}存在重叠，请修正`);
        return;
      }
      // if (this.hotzones.some(hz => hz.overlap)) {
      //   LzMsg.error('热区存在重叠，请继续编辑');
      //   return
      // }

      if (this.hotzones.some(hz => hz.link === '')) {
        LzMsg.error('请添加热区的链接');
        return;
      } else if (this.hotzones.some(hz => !V.isValidLink(hz.link))) {
        LzMsg.error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`);
        return;
      }
      this.$emit('save', this.hotzones);
    },
    removeHotzone(index) {
      this.hotzones.splice(index, 1);
      Utils.checkOverlap(this.hotzones);
    },
    dragHotzone(e, index) {
      this.hzIndex = index;
      const disX = e.clientX - e.target.offsetLeft;
      const disY = e.clientY - e.target.offsetTop;

      document.onmousemove = (e) => {
        // 通过事件委托，计算移动的距离
        let x = e.clientX - disX;
        let y = e.clientY - disY;
        if (x < 0) {
          x = 0;
        } else if (x + this.hotzones[index].w * this.bg.w > this.bg.w) {
          x = this.bg.w - this.hotzones[index].w * this.bg.w;
        }
        if (y < 0) {
          y = 0;
        } else if (y + this.hotzones[index].h * this.bg.h > this.bg.h) {
          y = this.bg.h - this.hotzones[index].h * this.bg.h;
        }
        // 移动当前元素
        this.hotzones[index].x = x / this.bg.w;
        this.hotzones[index].y = y / this.bg.h;
      };
      document.onmouseup = (e) => {
        Utils.checkOverlap(this.hotzones);
        document.onmousemove = null;
        document.onmouseup = null;
      };
      // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      return false;
    },
    dragHotzoneCorner(e, index, type) {
      this.hzIndex = index;
      const disX = e.clientX;
      const disY = e.clientY;

      const offX = e.clientX - e.target.parentNode.offsetLeft;
      const offY = e.clientY - e.target.parentNode.offsetTop;

      const x0 = this.hotzones[index].x * this.bg.w;
      const y0 = this.hotzones[index].y * this.bg.h;
      const w0 = this.hotzones[index].w * this.bg.w;
      const h0 = this.hotzones[index].h * this.bg.h;

      document.onmousemove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (type.indexOf('l') > -1) {
          let x = e.clientX - offX;
          if (x < 0) {
            x = 0;
          } else if (x + this.hotzones[index].w * this.bg.w > this.bg.w) {
            x = this.bg.w - this.hotzones[index].w * this.bg.w;
          } else if (w0 + x0 - x < MIN_HZ_WIDTH) {
            x = w0 + x0 - MIN_HZ_WIDTH;
          }
          this.hotzones[index].x = x / this.bg.w;
          this.hotzones[index].w = (w0 + x0 - x) / this.bg.w;
        }
        if (type.indexOf('t') > -1) {
          let y = e.clientY - offY;
          if (y < 0) {
            y = 0;
          } else if (y + this.hotzones[index].h * this.bg.h > this.bg.h) {
            x = this.bg.h - this.hotzones[index].h * this.bg.h;
          } else if (h0 + y0 - y < MIN_HZ_HEIGHT) {
            y = h0 + y0 - MIN_HZ_HEIGHT;
          }
          this.hotzones[index].y = y / this.bg.h;
          this.hotzones[index].h = (h0 + y0 - y) / this.bg.h;
        }
        if (type.indexOf('r') > -1) {
          const x = e.clientX - disX;
          let w = w0 + x;
          if (w < MIN_HZ_WIDTH) {
            w = MIN_HZ_WIDTH;
          } else if (this.hotzones[index].x * this.bg.w + w > this.bg.w) {
            w = this.bg.w - this.hotzones[index].x * this.bg.w;
          }
          this.hotzones[index].w = w / this.bg.w;
        }
        if (type.indexOf('b') > -1) {
          const y = e.clientY - disY;
          let h = h0 + y;
          if (h < MIN_HZ_HEIGHT) {
            h = MIN_HZ_HEIGHT;
          } else if (this.hotzones[index].y * this.bg.h + h > this.bg.h) {
            h = this.bg.h - this.hotzones[index].y * this.bg.h;
          }
          this.hotzones[index].h = h / this.bg.h;
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        Utils.checkOverlap(this.hotzones);
      };
      return false;
    },
    setHotzones(hotzones) {
      const hzs = JSON.parse(JSON.stringify(hotzones));
      Utils.checkOverlap(hzs);
      this.hotzones = hzs;
    },
    setBg(url = this.imgUrl) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > img.height) {
          this.bg = {
            w: 400,
            h: img.height * 400 / img.width,
          };
        } else {
          this.bg = {
            h: 400,
            w: img.width * 400 / img.height,
          };
        }
      };
    },
    resetTemp() {
      this.temp = {
        ...initTemp,
      };
    },
    createHotzoneFromTemp() {
      if (this.hotzones.length < HOTZONE_MAX_COUNT) {
        this.hotzones.push({
          link: '',
          overlap: false,
          x: this.temp.x / this.bg.w,
          y: this.temp.y / this.bg.h,
          w: this.temp.w / this.bg.w,
          h: this.temp.h / this.bg.h,
        });
        Utils.checkOverlap(this.hotzones);
      }
      this.temp = {
        ...initTemp,
      };
      this.hzIndex = this.hotzones.length - 1;
    },
    createHotzoneFromPosition(x, y) {
      if (this.hotzones.length < HOTZONE_MAX_COUNT) {
        this.hotzones.push({
          link: '',
          overlap: false,
          x: x / this.bg.w,
          y: y / this.bg.h,
          w: 100 / this.bg.w,
          h: 100 / this.bg.h,
        });
        Utils.checkOverlap(this.hotzones);
      }
      this.temp = {
        ...initTemp,
      };
      this.hzIndex = this.hotzones.length - 1;
    },
    startEdit(e) {
      if (this.hotzones.length < HOTZONE_MAX_COUNT) {
        this.hzBgOnEdit = true;
        const x0 = e.clientX;
        const y0 = e.clientY;
        this.temp.x = e.offsetX;
        this.temp.y = e.offsetY;
        this.temp.w = 0;
        this.temp.h = 0;

        document.onmousemove = (e) => {
          // 热区宽高
          let w = e.clientX - x0;
          let h = e.clientY - y0;
          if (w < 0) {
            w = 0;
          } else if (w + this.temp.x > this.bg.w - 2) {
            w = this.bg.w - this.temp.x - 2;
          }
          if (h < 0) {
            h = 0;
          } else if (h + this.temp.y > this.bg.h - 2) {
            h = this.bg.h - this.temp.y - 2;
          }
          this.temp.w = w;
          this.temp.h = h;
        };
        document.onmouseup = (e) => {
          this.hzBgOnEdit = false;
          document.onmousemove = null;
          document.onmouseup = null;

          if (this.temp.w > 10 || this.temp.h > 10) {
            this.createHotzoneFromTemp();
          } else {
            let x = this.temp.x + this.temp.w - 50;
            let y = this.temp.y + this.temp.h - 50;
            if (x < 0) {
              x = 0;
            }
            if (x + 100 > this.bg.w) {
              x = this.bg.w - 100;
            }
            if (y < 0) {
              y = 0;
            }
            if (y + 100 > this.bg.h) {
              y = this.bg.h - 100;
            }
            this.createHotzoneFromPosition(x, y);
          }
        };
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.hotzone-edit-wrapper {
  .hotzone-edit-panel {
    padding: 0 10px;
    display: flex;

    .hotzone-position-panel {
      width: 480px;
      border: 1px solid $BORDER_GRAY;
      background-color: $BG_BLOCK_GRAY;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;

      .hotzone-pic-wrapper {
        position: relative;
        background-size: 100%;
        overflow: hidden;
        border: 1px dashed $BORDER_GRAY;

        &.editable {
          // cursor: crosshair;
          cursor: copy;
        }

        &.on-edit {
          cursor: crosshair;

          .hotzone-box {
            display: none;
          }

          .hotzone-box-temp {
            display: block;
          }
        }

        .hotzone-box {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.8);
          color: $WHITE;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: all-scroll;

          .btn-delete {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 16px;
            height: 15px;
            display: none;
          }

          .corner {
            display: none;
            position: absolute;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            background-color: $WHITE;
            border: 1px solid;

            &.corner-t {
              left: 50%;
              top: 0;
              cursor: n-resize;
            }

            &.corner-b {
              left: 50%;
              top: 100%;
              cursor: s-resize;
            }

            &.corner-l {
              left: 0;
              top: 50%;
              cursor: w-resize;
            }

            &.corner-r {
              left: 100%;
              top: 50%;
              cursor: e-resize;
            }

            &.corner-tl {
              left: 0;
              top: 0;
              cursor: nw-resize;
            }

            &.corner-tr {
              left: 100%;
              top: 0;
              cursor: ne-resize;
            }

            &.corner-bl {
              left: 0;
              top: 100%;
              cursor: sw-resize;
            }

            &.corner-br {
              left: 100%;
              top: 100%;
              cursor: se-resize;
            }
          }

          &.selected {
            background-color: rgba(255, 255, 255, 0.8);
            color: $BLACK;
            border: 1px solid $BLACK;
            z-index: 1;

            .btn-delete {
              display: block;
            }

            .corner {
              display: block;
            }
          }

          &.error {
            // border-color: #3399FF;
            outline: 2px solid #3399FF;
            color: #3399FF;
          }
        }

        .hotzone-box-temp {
          position: absolute;
          display: none;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px dashed $BLACK;
        }
      }
    }

    .hotzone-link-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid $BORDER_GRAY;
      height: 480px;
      margin-left: -1px;
      padding: 15px 30px 10px;

      .hotzone-link-panel-header {
        margin-bottom: 10px;
      }

      .hotzone-block-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
        margin-bottom: 0;
      }

      .lz-input.error .lz-input__inner {
        border-color: #3399FF;
      }

      .error-blank {
        color: #3399FF;
        font-size: 10px;
        margin: 0;
      }

      .panel-title {
        font-size: 18px;
      }

      .hotzone-count {
        font-zie: 12px;
        color: $FONT_MINOR_GRAY;
      }

      .hotzon-link-list {
        flex: 1;
        overflow-y: auto;
      }

      .hotzone-title {
        font-size: 12px;
        color: 4font_common_black;
      }

      .btn-delete {
        float: right;
      }

      .btn-delete-all {
        margin-top: 10px;
        width: 100%;
      }
    }

    .tip {
      font-size: 12px;
      color: $FONT_MINOR_GRAY;
    }
  }

  .hotzone-edit-footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .tip {
      flex: 1;
      font-size: 12px;
      color: $FONT_MINOR_GRAY;
    }

    .lz-button {
      margin-left: 10px;
      width: 88px;
    }
  }
}
</style>
