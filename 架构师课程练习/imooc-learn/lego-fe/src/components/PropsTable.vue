<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-26 11:24:56
 * @LastEditTime: 2022-06-01 17:18:00
 * @FilePath: \lego-fe\src\components\PropsTable.vue
-->
<template>
  <div class="props-table">
    <div v-for="(item, index) in finalProps"
         class="prop-item"
         :key="index">
      <span class="label">{{ item.text }}</span>
      <div class="prop-component">
        <!-- 使用 antd 组件库中的组件 -->
        <component v-if="item.valueProp"
                   :[item.valueProp]="item?.value"
                   v-bind="item?.extraProps"
                   v-on="item.events"
                   :is="item?.component">
          <template v-if="item.options">
            <component :is="item.subComponent"
                       v-for="(option, key) in item.options"
                       :key="key"
                       :value="option.value">
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, VNode } from 'vue';
import { mapPropsToForms } from '../propsMap'
import { reduce } from 'lodash-es'
import type { PartialTextComponentProps } from '../defaultProps'
import RenderVnode from './RenderVnode';
export interface Props {
  props: PartialTextComponentProps;
}
export interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: {
    text: string | VNode;
    value: any;
  }[];
  initalTransform?: (v: any) => any;
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}



const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', data: any): void;
}>()

// 获取属性表单映射列表
const finalProps = computed(() => {
  return reduce(props.props, (result, value, key) => {
    const newKey = key as keyof PartialTextComponentProps
    const item = mapPropsToForms[newKey]
    if (item) {
      const { valueProp = 'value', eventName = 'change', initalTransform, afterTransform } = item
      const newItem: FormProps = {
        ...item,
        value: initalTransform ? initalTransform(value) : value,
        valueProp,
        eventName,
        events: {
          [eventName]: (e: any) => {
            emit('change', { key, value: afterTransform ? afterTransform(e) : e })
          }
        }
      }
      result[newKey] = newItem
    }
    return result
  }, {} as { [key: string]: FormProps })
})



</script>

<style scoped>
.props-table {}

.prop-item {
  display: flex;
  margin-bottom: 10px;
  ;
  align-items: center;
}

.label {
  width: 28%;
}

.prop-component {
  width: 70%;
}
</style>