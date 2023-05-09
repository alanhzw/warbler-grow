<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 09:05:58
 * @LastEditTime: 2022-06-09 15:07:33
 * @FilePath: \lego-fe\src\views\Editor.vue
-->
<template>
  <div class="editor" id="editor-layout-main">
    <!-- header -->
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title" :style="{ color: '#fff' }">慕课乐高</div>
      </a-layout-header>
    </a-layout>
    <a-layout>
      <!-- 左侧组件列表 -->
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list @on-item-click="addItem" :list="defaultTemplates"></components-list>
        </div>
      </a-layout-sider>
      <!-- 中间画布编辑区域 -->
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <!-- 组件列表 -->
          <div class="preview-list" id="canvas-area">
            <!-- 使用动态组件进行渲染 -->
            <edit-warpper
              v-for="component in components"
              :id="component.id"
              @set-active="setActive"
              :active="component.id === currentElement?.id"
              :key="component.id">
              <component :is="componentMap[component.name]" v-bind="component.props"></component>
            </edit-warpper>
          </div>
        </a-layout-content>
      </a-layout>
      <!-- 右侧组件属性编辑 -->
      <a-layout-sider width="300" style="background: #fff" class="setting-container">
        组件属性
        <props-table
          v-if="currentElement"
          @change="handleChange"
          :props="currentElement?.props"></props-table>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
export interface ComponentMap {
  [key: string]: Component;
}
import { computed, Component } from 'vue';
import { useStore } from 'vuex';
import { GlobalStore } from '../store/index';
import type { ComponentData } from '../store/editor';
import LText from '../components/LText.vue';
import ComponentsList from '@/components/ComponentsList.vue';
import { PartialTextComponentProps } from '../defaultProps';
import { defaultTemplates } from '../defaultTemplates';
import EditWarpper from '@/components/EditWarpper.vue';
import PropsTable from '@/components/PropsTable.vue';

// 组件映射 用于动态组件
const componentMap: ComponentMap = {
  'l-text': LText,
};

// 从 store 里获取数据，使用泛型以获得类型
const store = useStore<GlobalStore>();

// v  从 store 里回组件列表
const components = computed(() => store.state.editor.components);

// 从组件列表添加组件到画布区域
const addItem = (props: PartialTextComponentProps) => {
  store.commit('addComponent', props);
};

// 点击组件时切换激活状态
const setActive = (id: string) => {
  store.commit('setActive', id);
};

// 获取当前激活的组件
const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);

// 更新事件
const handleChange = (e: any) => {
  store.commit('updateComponent', e);
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}

.ant-layout-has-sider {
  height: calc(100% - 64px);
}

.preview-list {
  background: #fff;
  position: relative;
}
</style>
