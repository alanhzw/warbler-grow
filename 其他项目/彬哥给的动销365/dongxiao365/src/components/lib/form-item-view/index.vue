<template>
  <div class="group">
    <slot name="group-title"></slot>
    <template v-for="(element, index) in items">
      <form-item v-if="element.type==='group'" :items="element.children">
        <div slot="group-title" class="group-title">{{element.label}}</div>
      </form-item>
      <div class="item" v-else>
        <div class="label">{{element.label}}：</div>
        <div class="value">
          <div v-if="element.type==='text'">{{element.value}}</div>
          <div v-if="element.type==='number'">{{element.value}}</div>
          <div v-if="element.type==='textarea'">
            <pre>{{element.value}}</pre>
          </div>
          <div v-if="element.type==='date'">{{element.value}}</div>
          <div v-if="element.type==='time'">{{element.value}}</div>
          <div v-if="element.type==='select'">
            <div v-for="(vo,index) in element.options" :key="index">
              <div v-if="element.value===vo.value">{{vo.label}}</div>
            </div>
          </div>
          <div v-if="element.type==='radio'">
            <div v-for="(vo,index) in element.options" :key="index">
              <div v-if="element.value===vo.value">{{vo.label}}</div>
            </div>
          </div>
          <div v-if="element.type==='checkbox'">{{element.value}}</div>
          <div v-if="element.type==='switch'">
            <div v-if="element.value">{{element.activeText}}</div>
            <div v-else>{{element.inactiveText}}</div>
          </div>
          <div v-if="element.type==='slider'">{{element.value}}</div>
          <div v-if="element.type==='rate'">
            <el-rate
              v-model="element.value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></div>
          <div v-if="element.type==='upload'">
            <gallery-inline :data="element.value"></gallery-inline>
          </div>
          <div v-if="element.type==='camera'">
            <gallery-inline :data="element.value"></gallery-inline>
          </div>
          <div v-if="element.type==='scan'">{{element.value}}</div>
          <div v-if="element.type==='location'">{{element.value}}</div>
          <div v-if="element.type==='users'">
            <el-tag v-for="user in element.value" :key="user.emplId">{{user.name}}</el-tag>
          </div>
          <div v-if="element.type==='department'">
            <el-tag v-for="vo in element.value" :key="vo.id">{{vo.name}}</el-tag>
          </div>
          <div v-if="element.type==='customer'">
            <el-tag v-for="vo in element.value" :key="vo.id">{{vo.name}}</el-tag>
          </div>
          <div v-if="element.type==='good'">
            <el-tag v-for="vo in element.value" :key="vo.id">{{vo.name}}</el-tag>
          </div>
          <div v-if="element.type==='area'">
            <el-tag v-for="vo in element.value" :key="vo.id">{{vo.name}}</el-tag>
          </div>
          <div v-if="element.type==='tag'">
            <tag-view v-model="element.value"></tag-view>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import GalleryInline from '../../lib/gallery-inline'
  import TagView from '../../lib/tag-view'

  export default {
    name: "form-item",
    components: {GalleryInline, TagView},
    model: {
      prop: 'items',
      event: 'change'
    },
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group {
    padding: 10px;
    border: solid 1px #EBEEF5;
    margin-bottom: 10px;
    .group-title {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 1rem;
    }
    & > .item:last-child {
      border-bottom: none;
    }
    .item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: solid 1px #F2F6FC;
      transition: background-color 300ms linear;
      &:hover {
        background-color: #EBEEF5;
      }
      .label {
        font-weight: bold;
        word-break: keep-all;
        white-space: nowrap;
        flex-shrink: 0;
        flex-grow: 0;
      }
      .value {
        flex-shrink: 1;
        flex-grow: 1;
        text-align: right;
        pre {
          font-family: inherit;
          line-height: 110%;
        }
      }
    }
  }
</style>
